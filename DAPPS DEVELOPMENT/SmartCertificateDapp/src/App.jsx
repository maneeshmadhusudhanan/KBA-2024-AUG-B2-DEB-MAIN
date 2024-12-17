import { useState } from 'react'
import {ethers} from 'ethers'
import './App.css'
import ABI from './assets/Certi.json';
import address from './assets/deployed_addresses.json'

function App() {
const [formData,SetFormData]=useState ({
  id:0,
  name:'',
  course:'',
  grade:'',
  date:''
})
const[Output,setOutput]=useState('');
function handleChange(event) {
  console.log(event.target);
  const {name,value}=event.target;
  console.log(formData);
  
  SetFormData((preState)=>({
    ...preState,
    [name]:value
  }))
  
  
}

 async function ConnectToMetamask() {
  const provider = new ethers.BrowserProvider(window.ethereum);
 const signer = await provider.getSigner();
 console.log(signer.address);
 alert(`${signer.address} is Sucessfully Logged In`)
 }

 async function handleSubmit(event) {
  event.preventDefault();

  const provider = new ethers.BrowserProvider(window.ethereum);
 const signer = await provider.getSigner();
 const cAbi= ABI.abi;
 const cAddress= address['CertiModule#Certi']
 console.log(cAddress);
 
 const certiinstance= new ethers.Contract(cAddress,cAbi,signer)
 console.log(certiinstance);
 
 const txnReceipt= await certiinstance.Issue(
                      formData.id,
                      formData.name,
                      formData.course,
                      formData.grade,
                      formData.date)
                      console.log(txnReceipt);
 }
 async function GetCertificate() {
  const id = document.getElementById('id').value;
console.log(id);
const txValue= await certiinstance.Certificate(id);
console.log(txValue[0]);
setOutput(`{Name of candidate:${txValue[0]}Course:${txValue[1]}Grade:${txValue[2]}Date:${txValue[3]}}`);

  
 }

  return (
    <>

<div><button className='button' onClick={ConnectToMetamask}>CONNECT TO METAMASK</button></div>
<div>
  <br />
  <form action="" onSubmit={handleSubmit}>
    
    <div>
      <label>ID:</label>
      <input type="number" id='id' name='id' onChange={handleChange}/>
    </div>
    <br />
    <div>
    <label>NAME:</label>
    <input type="text" name='name' onChange={handleChange}/>
    </div>
    <br />
    <div>
    <label>Course:</label>
    <input type="text"  name='course' onChange={handleChange} />
    </div>
    <br />
    <div>
    <label>Grade:</label>
    <input type="text"  name='grade' onChange={handleChange} />
    </div>
    <br />
    <div>
    <label>DATE:</label>
    <input type="date"  name='date' onChange={handleChange} />
    </div>
    <div>
     <input type="submit" value="SUBMIT" />
    </div>

  </form>

  <br />
  <div>
    <input type="number" name="" id="id" />
    <button onClick={GetCertificate}>GET CERTIFICATE</button>
  </div>
  <div>
    <p >{Output}</p>
  </div>
  </div>



   
    </>
  )
}

export default App
