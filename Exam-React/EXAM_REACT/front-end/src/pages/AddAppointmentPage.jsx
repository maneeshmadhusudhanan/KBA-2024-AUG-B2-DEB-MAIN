/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAppointmentPage = () => {
  const [tokenId, settokenId] = useState('');
  const [patientname, setpatientname] = useState('')
  const [doctorname, setdoctorname] = useState('');
  const [appointment_date, setAppointment_date] = useState('')
  const [appointment_time, setAppointment_time] = useState('')

  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()

    const newAppointment = {
      tokenId,
      patientname,
      doctorname,
      appointment_date,
      appointment_time
    }
    console.log(newAppointment)
    const res = addAppointmentSubmit(newAppointment)
    toast.success('Appointment added successfully')
    navigate('/home')
  }

  const addAppointmentSubmit = async (newAppointment) => {
    const res = await fetch('/api/addAppointments', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(newAppointment)
    })
    return res;
  }

  return (
    <>

      <section className="bg-white mb-20">
        <div className="container m-auto max-w-2xl py-2">
          <div className="bg-blue-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">

            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
                Add Appointment
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Token ID
                </label>
                <input
                  type="text"
                  id="tokenId"
                  name="tokenId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 0001"
                  required
                  value={tokenId}
                  onChange={(e) => settokenId(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientname"
                  name="patientname"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Enter Patient Name"
                  required
                  value={patientname}
                  onChange={(e) => setpatientname(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="doctorname"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Doctor Name
                </label>
                <input
                  id="doctorname"
                  name="doctorname"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder=" Name of the Doctor for Appointment"
                  value={doctorname}
                  onChange={(e) => setdoctorname(e.target.value)}
                />
              </div>


              <div className="mb-4">
                <label
                  htmlFor="appointment_date"
                  className="block text-gray-700 font-bold mb-2"
                >
                  appointment date
                </label>
                <input
                type='date'
                  id="appointment_date"
                  name="appointment_date"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Select a Date"
                  value={appointment_date}
                  onChange={(e) => setAppointment_date(e.target.value)}
                />
              </div>
                           <div className="mb-4">
                <label
                  htmlFor="appointment_date"
                  className="block text-gray-700 font-bold mb-2"
                >
                  appointment time
                </label>
                <input
                type='time'
                  id="appointment_time"
                  name="appointment_time"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Select a Time"
                  value={appointment_time}
                  onChange={(e) => setAppointment_time(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="bg-purple-500 hover:bg-purple-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddAppointmentPage