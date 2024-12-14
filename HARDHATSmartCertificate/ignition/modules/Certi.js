// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules"); //importing the bildmodule

module.exports = buildModule("CertiModule", (m) => {
  //change the name to certi that we changed before

  const Certi = m.contract("Certi");   //certi 

  return { Certi };
});
