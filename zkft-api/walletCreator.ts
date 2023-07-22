import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'

async function safeWalletCreator(signerPrivateKey:string) {
    const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/demo';
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    console.log('Provider created!');

    const signer = new ethers.Wallet(signerPrivateKey, provider);
    console.log('Wallet created!');
    console.log(`Address: ${signer.address}`);

    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await signer.getAddress()
      ],
      threshold: 1
    }

    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: signer
    })

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce: `${Math.floor(Math.random() * 1000000000)}` })
    const safeAddress = await safeSdkOwner1.getAddress()

    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
}


// Call start
(async() => {
    try {
        console.log('Creating wallet...');
        await safeWalletCreator('49e6ec70c0aac905f66cc0b1da815018f7f183e97194022e0c31d1a640c48235');
        console.log('Done.');
    }
    catch (err) {
        console.log(err);
    }
  })();