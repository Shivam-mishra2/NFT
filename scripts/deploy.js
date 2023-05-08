const hre = require("hardhat");

async function main() {
  const DappWorldNFT = await hre.ethers.getContractFactory("DappWorldNFT");
  const dappWorldNFT = await DappWorldNFT.deploy();
  await dappWorldNFT.deployed();
  console.log("Contract deployed to address:", dappWorldNFT.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x5C2EeaA1Ced5573C414F4a8d785186afbe0e10F4
