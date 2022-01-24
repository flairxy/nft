// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const IterableMapping = await hre.ethers.getContractFactory(
    'IterableMapping'
  );
  const iterableMapping = await IterableMapping.deploy();
  await iterableMapping.deployed();
  
  const Token = await hre.ethers.getContractFactory('Token', {
    libraries: {
      IterableMapping: iterableMapping.address,
    },
  });

  const greeter = await Token.deploy(
    [
      '0x67dD4EA99CE6453f28DA3b08d0257063189121e6',
      '0x2dC375d8c2c36ce78409A520ec96F917243DFfF5',
    ],
    [40, 50],
    [
      '0x9ae99b09dDE8395e6660f9cee0C5913182192FD4',
      '0x6ebC2d56Fd0BBf2332e81e7b385Ef29bdE364588',
      '0x67dD4EA99CE6453f28DA3b08d0257063189121e6',
      '0xAdFF1e288118c6D4831AeA5cB0e54a130F1606C5',
      '0x93372Cb081799B5c41917D973C7bC0A373539EcA',
      '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
    ],
    ['20456743', 0, 0, 0, 0, 0],
    [2, 60, 10, 1, 1],
    30, //swap amount
    10,
    2,
    10,
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  );

  await greeter.deployed();

  console.log('Greeter deployed to:', greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
