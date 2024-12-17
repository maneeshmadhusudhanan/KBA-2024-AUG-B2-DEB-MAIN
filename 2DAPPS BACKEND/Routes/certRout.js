import { ethers } from "ethers";
import { Router } from "express";
import ABI from "./Certi.json" with {type:"json"};
import address from "./deployed_addresses.json" with{type:"json"};

const certRoute = Router();
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");  //https://eth-sepolia.g.alchemy.com/v2/Einy5guvEmXOlxX6hPT2jvdI516gyAiF
const signer = await provider.getSigner();//const signer = new ethers.Wallets(process.env.PRIVATEKEY,provider) this instance is send to 
console.log(signer.address);
const contract = new ethers.Contract(address["CertiModule#Certi"],ABI.abi,signer);

certRoute.get("/", (req, res) => {
  console.log("HELLO");

  res.send("WELCOME TO CERTIAPP");
});

certRoute.post("/issue", async (req, res) => {
  const { id, name, course, grade, date } = req.body;
  const txnReciept = await contract.Issue(id,name,course,grade,date);
  console.log(txnReciept);

  if(txnReciept){
    res.send(txnReciept.hash)
  }else{
    res.status(400).json("Failed to issue certificate")
  }
});

certRoute.get('/getCertificate',async(req,res)=>{ 
   try{ 
    const id = req.query.id;
    console.log('fetching ID',id);
    
    console.log('getcall');
    const txnValue =await contract.Certificate(id);
    console.log(txnValue);
    if(txnValue){
        res.status(200).send(txnValue);
    }else{
        res.status(400).json({message:"No such entry"})
    }}catch{
        res.status(400).json({message:"Something happened...Tryagain"})
    }
    console.log('ERROR FECHING CERTIFICATE');
    
    
})








export { certRoute };
