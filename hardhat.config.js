require('@nomiclabs/hardhat-waffle');
// require('hardhat-contract-sizer');
require('dotenv').config({ path: __dirname + '/.env' });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const accounts = {
  mnemonic: process.env.MNEMONIC,
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.2',
  networks: {
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/cTLDdl8zs_4J-DDDvXx4M4MQ_hRPA0hn',
      },
      allowUnlimitedContractSize: true,
    },
    fantomtest: {
      url: 'https://rpc.testnet.fantom.network',
      accounts: [`0x${process.env.MNEMONIC}`],
      chainId: 4002,
      live: false,
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337.,
    },
    testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x${process.env.MNEMONIC}`],
      allowUnlimitedContractSize: true,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  }
};
