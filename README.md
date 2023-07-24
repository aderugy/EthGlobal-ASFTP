# zkFT
zkFT allows you to deploy and deposit funds on a Safe{CORE} anonymously. There is no direct link between the wallet that made the deposit and the deployed safe.

## Setup
### API Environment (./zkft-api)
- Add the API's wallet private key.

## The project

### The Proof of Concept
The user has to make a deposit on our smart contract. The funds are then periodically moved to our service's wallet, on our server (offchain, could be moved onchain later). We can then use Sismo to monitor the deposits made on the Smart contract and allow the user to generate zk-proofs that he made a deposit on our service. With this proof, the server can deploy the Safe smart wallet and add the user's funds to it. 

### The missing part of the Proof of Concept
We are looking to implement a Safe plugin that would allow us to take over the Safe smart wallet using a proof that we own it. Therefore, we could throw away the Safe owner's server side and the only way to interact with the Safe would be the ZKP.

### Team
- Arthur Goullet de Rugy
- Michael Rousseau
- Baptiste Entat-Pantagène

### Created at
ETHGLOBAL PARIS 2023
