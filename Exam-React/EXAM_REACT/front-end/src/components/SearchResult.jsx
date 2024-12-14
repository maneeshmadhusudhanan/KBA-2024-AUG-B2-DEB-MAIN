
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResult = () => {
  const location = useLocation();
  const { result } = location.state || {};

  return (
    <>
      <main className="flex-grow p-4">


        <section className=" mx-auto">
          <h2 className="text-2xl font-bold mb-4">Search Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {result==null?'not found':
            result.map((appointment)=>(

              <div className="bg-white rounded-lg shadow p-4" key={appointment._id}>
            <a>   
              <h3 className="text-xl font-semibold">{appointment.title}</h3>
              <p className="text-gray-600"><span className='font-bold'>Token ID:</span>{appointment.tokenId}</p>
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

export default SearchResult