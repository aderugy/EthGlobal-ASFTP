"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Starting zkFT-API!\n');
var express = require('express');
var body_parser = require('body-parser');
var ethers = require('ethers');
var sismo_connect_server_1 = require("@sismo-core/sismo-connect-server");
var sismo_connect_config_js_1 = require("./sismo-connect-config.js");
var userSafes = [];
var sismoConnect = (0, sismo_connect_server_1.SismoConnect)({ config: sismo_connect_config_js_1.CONFIG });
require('dotenv').config();
var app = express();
app.use(body_parser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});
console.log();
console.log('JsonRpcProvider URL: ' + process.env.JSON_RPC_PROVIDER_URL);
var providerUrl = process.env.JSON_RPC_PROVIDER_URL;
console.log('Initialising Ether.js JsonRpcProvider...');
var provider = new ethers.providers.JsonRpcProvider(providerUrl);
console.log('Provider initialized!\n');
console.log('Creating API Wallet...');
console.log(process.env.PRIVATE_KEY);
var apiWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log('Api Wallet Public Address: ' + apiWallet.address);
console.log();
function sendXDai(to, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var amountInXDai, transaction, tx, txReceipt, balance, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log("Attempting to send ".concat(amount, " XDai\n    From: apiWallet (").concat(apiWallet.address, ")\n    To: ").concat(to, "\n"));
                    amountInXDai = ethers.utils.parseEther(amount);
                    transaction = {
                        to: to,
                        value: amountInXDai
                    };
                    console.log('Signing and sending transaction...');
                    return [4 /*yield*/, apiWallet.sendTransaction(transaction)];
                case 1:
                    tx = _a.sent();
                    console.log('Transaction hash: ' + tx.hash);
                    return [4 /*yield*/, provider.waitForTransaction(tx.hash)];
                case 2:
                    txReceipt = _a.sent();
                    console.log('Transaction confirmed!\nReceipt: ', txReceipt);
                    return [4 /*yield*/, provider.getBalance(to)];
                case 3:
                    balance = _a.sent();
                    console.log("New balance on '".concat(to, "': \n    ").concat(ethers.utils.formatEther(balance), " xDai\n"));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error while sending XDai:\n', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function addSafe(vaultId, wallet, safePublicAddress) {
    console.log('Adding safe !');
    console.log('VaultID: ' + vaultId);
    console.log('Private signing key: ' + wallet);
    console.log('Safe public address: ' + safePublicAddress);
    if (userSafes.map(function (user) { return user.vaultId; }).includes(vaultId))
        throw new Error("User with vault ID '".concat(vaultId, "' already has a registered safe."));
    userSafes.push({
        vaultId: vaultId,
        wallet: wallet,
        publicAddress: safePublicAddress
    });
}
app.post('/api/v1/verify/new', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data_1, zkp_1;
    return __generator(this, function (_a) {
        try {
            console.log('Received ZKP to verify.');
            data_1 = '';
            req.on('data', function (chunk) {
                data_1 += chunk;
            });
            req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                var result, vaultId, safeAccountDeployerWallet, safeAccountCreator, safePublicAddress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            zkp_1 = JSON.parse(data_1);
                            console.log('Verifying ZKP...');
                            return [4 /*yield*/, sismoConnect.verify(zkp_1, {
                                    auths: sismo_connect_config_js_1.AUTHS,
                                    claims: sismo_connect_config_js_1.CLAIMS,
                                    signature: sismo_connect_config_js_1.SIGNATURE_REQUEST,
                                })];
                        case 1:
                            result = _a.sent();
                            console.log('ZKP verified successfully.');
                            vaultId = result.getUserId(sismo_connect_server_1.AuthType.VAULT);
                            console.log('Retrieved vault ID: ' + vaultId);
                            safeAccountDeployerWallet = ethers.Wallet.createRandom();
                            return [4 /*yield*/, sendXDai(safeAccountDeployerWallet.address, '0.01')];
                        case 2:
                            _a.sent();
                            safeAccountCreator = require('./safeAccountCreator.js');
                            return [4 /*yield*/, safeAccountCreator.safeWalletCreator(provider, safeAccountDeployerWallet.privateKey)];
                        case 3:
                            safePublicAddress = _a.sent();
                            addSafe(vaultId, safeAccountDeployerWallet, safePublicAddress);
                            return [2 /*return*/, res.status(200).json(result)];
                    }
                });
            }); });
        }
        catch (err) {
            console.log(err);
            return [2 /*return*/, res.status(500).send('Proof could not be verified.')];
        }
        return [2 /*return*/];
    });
}); });
module.exports = app;
