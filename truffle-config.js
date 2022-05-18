const HDWalletProvider = require('truffle-hdwallet-provider');

require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: "*" // Match any network id
    },

    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },

  }
};

