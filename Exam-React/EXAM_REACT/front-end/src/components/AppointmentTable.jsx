/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AppointmentTable = () => {
  const [Appointments, setAppointments] = useState([]);
  const [searchinput, setInput] = useState('')
  const navigate = useNavigate();

  useEffect(() => {

    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/Appointments');
        const data = await res.json()
        console.log(data)
        setAppointments(data)
        console.log(Appointments)

      } catch (error) {
        console.log('error', error)
        toast.error(`No Data Found`);

      }
    };
    fetchAppointments()
  }, []);
  const handleInput=async(value)=>{
  setInput(value)
    console.log(value)
  }
  const handleSearch=async (e)=>{
    e.preventDefault()
    const doctorname=searchinput
    console.log(doctorname)
    try {
      const res = await fetch(`/api/searchResult/${doctorname}`)
      const result=await res.json()
      console.log(result)
      if(result!=[]){
        navigate('/result', { state: { result } });
      }else{
        alert("not found any result")
        navigate('/home')

      }

    } catch (error) {
      console.log('error', error) 
      navigate('/home')
    }

  }
  return (
    <>
      <main className="flex-grow p-4">
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="w-full max-w-md flex">
            <input type="text" id="doctorname" onChange={(e)=>{handleInput(e.target.value)} }name="recname" placeholder="Search Appointments..." className="flex-grow rounded-l px-4 py-2 border border-gray-300" />
            <button  type='submit' className="bg-blue-500 text-white rounded-r px-4 py-2">Search</button>
          </form>
        </div>

        <section className=" mx-auto">
          <h2 className="text-2xl font-bold mb-4"> Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {
            Appointments.map((appointment)=>(

              <div className="bg-white rounded-lg shadow p-4"  key={appointment._id}>
            <a>               <h3 className="text-xl font-semibold">{appointment.title}</h3>
              <p className="text-gray-600"><span className='font-bold'>Token ID:</span>{appointment.tokenId}</p>
              <p className="text-gray-600"><span className='font-bold'>Doctor Name:</span> {appointment.doctorname}</p>

              <p className="text-gray-600"><span className='font-bold'>Patient Name:</span> {appointment.patientname}</p>
              <p className="text-gray-600"><span className='font-bold'>Appointment Date:</span>{appointment.appointment_date}</p>
              <p className="text-gray-600"><span className='font-bold'>Appointment Time:</span>{appointment.appointment_time}</p>


            </a>
          </div>
            ))
          }
          </div>
        </section>
      </main>
    </>)
}

export default AppointmentTable