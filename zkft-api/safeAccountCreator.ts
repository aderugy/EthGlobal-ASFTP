import { SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'

async function safeWalletCreator(signer) {
    console.log('Creating the safe.')
    console.log('Signing using wallet: ' + signer.address);

    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await signer.getAddress()
      ],
      threshold: 1
    }

    console.log('Safe account configuration created.')

    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: signer
    })

    console.log('EthersAdapter created.');

    console.log('Creating Safe (using SafeFactory)');
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    console.log('Done.');

    console.log('Deploying Safe.')
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce: `${Math.floor(Math.random() * 1000000000)}` })
    console.log('Done.');

    console.log('Retrieving safe address.')
    const safeAddress = await safeSdkOwner1.getAddress()
    console.log('Done.');
    console.log();

    console.log('Your Safe has been deployed:')
    console.log(`https://gnosisscan.io/address/${safeAddress}#code`)
    console.log();

    return safeAddress;
}

module.exports = { safeWalletCreator };