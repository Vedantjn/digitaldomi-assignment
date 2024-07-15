const hre = require("hardhat");

async function main() {
  const AddressNFT = await hre.ethers.getContractFactory("AddressNFT");
  const addressNFT = await AddressNFT.deploy();

  await addressNFT.deployed();

  console.log("AddressNFT deployed to:", addressNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });