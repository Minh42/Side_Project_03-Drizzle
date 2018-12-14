const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
  'aware chalk boring duck hover gift bar anxiety search film since grain',
  'https://rinkeby.infura.io/v3/a91784083a2c4a14b703af287f106bc9'
);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: provider,
      network_id: '1',
    }
  }
};
