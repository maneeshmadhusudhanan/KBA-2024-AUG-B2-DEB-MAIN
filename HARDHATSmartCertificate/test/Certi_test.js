const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Certi", function () {
  async function DeployContract() {
    const [admin, other] = await ethers.getSigners(); // the give files from hardhat stimulations
    const SmartCerti=await ethers.getContractFactory('Certi')   // creating and return the instance of contract afterthat we store in Certi this instance is deployed
    const Certi=await SmartCerti.deploy();
    return {Certi, admin, other }; //   we use provider in other cases
  }


  it("should be depoly only by admin", async function () {
    // teststring ,callback funtion
    const { Certi,admin } = await loadFixture(DeployContract);
    console.log(Certi);
    expect(Certi.deploymentTransaction().from).to.equals(admin.address);  //from is returned and admin.address is checked here
  });


  it("Able to issue and Read Certificate",async function(){
    const {Certi,admin } = await loadFixture(DeployContract);
   await Certi.Issue(1,"Akhil","CBA","A","01/12/2024");
    const App =await Certi.Certificate(1);
    console.log(App);
    expect(App[1]).to.equals("Akhil");
    expect(App[2]).to.equals("CBA");
    expect(App[3]).to.equals("A");
    expect(App[4]).to.equals("01/12/2024");
    
  })
  it("only Admin can issue the Certificate",async function(){
    const {Certi,other}= await loadFixture(DeployContract);
    await expect(Certi.connect(other).Issue(2,"Arya","CED","S","12/12/2024")) .to.be.revertedWith("Only admin have acess")
  })
});
