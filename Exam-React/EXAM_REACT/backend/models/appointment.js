const { Schema} =require('mongoose');
const { model} =require('mongoose');

const appointmentSchema = new Schema({
   tokenId: { type: String, required: true },
   patientname: { type: String, required: true},
   doctorname: { type: String, required: true },
   appointment_date: { type: String, required: true },
   appointment_time: { type: String, required: true }

   });

const appointment = model('appointments', appointmentSchema);

module.exports = appointment;
