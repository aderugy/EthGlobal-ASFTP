import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
require('dotenv').config();

async function safeWalletCreator(signerPrivateKey:string) {
    const RPC_URL='https://polygon-mumbai-bor.publicnode.com/'
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

    const owner1Signer = new ethers.Wallet(signerPrivateKey, provider) //need private key, not public

    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress()
      ],
      threshold: 1
    }

    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    })

    const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })

    const safeAddress = await safeSdkOwner1.getAddress()

    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
}


// Call start
(async() => {
    console.log('before start');

    await safeWalletCreator(process.env.PRIVATE_KEY);

    console.log('after start');
  })();