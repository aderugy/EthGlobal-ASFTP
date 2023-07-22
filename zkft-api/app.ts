console.log('Starting zkFT-API!\n');

const express = require('express');
const body_parser = require('body-parser');
const ethers = require('ethers');

import {AuthType, SismoConnect, SismoConnectVerifiedResult} from "@sismo-core/sismo-connect-server";
import {AUTHS, CLAIMS, CONFIG, SIGNATURE_REQUEST} from "./sismo-connect-config.js";

const userSafes = [];
const sismoConnect = SismoConnect({ config: CONFIG });

require('dotenv').config();

const app = express();
app.use(body_parser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

console.log();
console.log('JsonRpcProvider URL: ' + process.env.JSON_RPC_PROVIDER_URL);
const providerUrl = process.env.JSON_RPC_PROVIDER_URL;

console.log('Initialising Ether.js JsonRpcProvider...');
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
console.log('Provider initialized!\n');


console.log('Creating API Wallet...');
console.log(process.env.PRIVATE_KEY)
const apiWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log('Api Wallet Public Address: ' + apiWallet.address);
console.log();

async function sendXDai(to: string, amount: string) {
    try {
        console.log(`Attempting to send ${amount} XDai
    From: apiWallet (${apiWallet.address})
    To: ${to}\n`);
        const amountInXDai = ethers.utils.parseEther(amount);

        const transaction = {
            to: to,
            value: amountInXDai
        };

        console.log('Signing and sending transaction...');
        const tx = await apiWallet.sendTransaction(transaction);
        console.log('Transaction hash: ' + tx.hash);

        const txReceipt = await provider.waitForTransaction(tx.hash);
        console.log('Transaction confirmed!\nReceipt: ', txReceipt);

        const balance = await provider.getBalance(to);
        console.log(`New balance on '${to}': 
    ${ethers.utils.formatEther(balance)} xDai\n`);
    } catch (error) {
        console.error('Error while sending XDai:\n', error);
    }
}

function addSafe(vaultId, wallet, safePublicAddress) {
    console.log('Adding safe !')
    console.log('VaultID: ' + vaultId);
    console.log('Private signing key: ' + wallet);
    console.log('Safe public address: ' + safePublicAddress);

    if (userSafes.map(user => user.vaultId).includes(vaultId))
        throw new Error(`User with vault ID '${vaultId}' already has a registered safe.`);

    userSafes.push({
        vaultId: vaultId,
        wallet: wallet,
        publicAddress: safePublicAddress
    });
}

app.post('/api/v1/verify/new', async (req, res) => {
    try {
        console.log('Received ZKP to verify.');
        let data = '';
        let zkp;

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            zkp = JSON.parse(data);

            console.log('Verifying ZKP...');

            // Verify the proof.
            // Throws an exception if the proof is not verified.
            const result: SismoConnectVerifiedResult = await sismoConnect.verify(zkp, {
                auths: AUTHS,
                claims: CLAIMS,
                signature: SIGNATURE_REQUEST,
            });
            console.log('ZKP verified successfully.');

            // Retrieving vault ID (SISMO user ID)
            const vaultId = result.getUserId(AuthType.VAULT);
            console.log('Retrieved vault ID: ' + vaultId);

            // Creating the wallet that will deploy the Safe account
            const safeAccountDeployerWallet = ethers.Wallet.createRandom();
            await sendXDai(safeAccountDeployerWallet.address, '0.01');

            const safeAccountCreator = require('./safeAccountCreator.js');
            const safePublicAddress = await safeAccountCreator.safeWalletCreator(provider, safeAccountDeployerWallet.privateKey);

            addSafe(vaultId, safeAccountDeployerWallet, safePublicAddress);

            return res.status(200).json(result);
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Proof could not be verified.');
    }
});

module.exports = app;