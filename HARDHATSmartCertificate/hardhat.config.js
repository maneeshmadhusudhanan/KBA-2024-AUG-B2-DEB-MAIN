require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork:"HardhatNode",


  networks:{
    HardhatNode: {
      url: "http://127.0.0.1:8545/",   // here is node is connected to hardhat to lisen 
    },
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/Einy5guvEmXOlxX6hPT2jvdI516gyAiF",
      accounts:[process.env.PRIVATEKEY]
    }
      
  } 

 



}
