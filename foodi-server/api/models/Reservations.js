// models/Reservation.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    nume: String,
    prenume: String,
    email: String,
    phoneNumber: String,
    date: Date,
    time: String,
    numberOfPersons: Number,
    additionalDates: String,
    userEmail: String

});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
