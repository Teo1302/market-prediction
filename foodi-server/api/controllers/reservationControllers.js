// controllers/reservationController.js
const Reservation = require('../models/Reservations');

// Adăugare rezervare
const createReservation = async (req, res) => {
    const reservationData = req.body;
    try {
        const result = await Reservation.create(reservationData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obținere toate rezervările
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// // Actualizare rezervare
// const updateReservation = async (req, res) => {
//     const reservationId = req.params.id;
//     const updatedData = req.body;
//     try {
//         const result = await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true });
//         if (result) {
//             res.status(200).json(result);
//         } else {
//             res.status(404).json({ message: 'Reservation not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// Ștergere rezervare
const deleteReservation = async (req, res) => {
    const reservationId = req.params.id;
    try {
        const result = await Reservation.findByIdAndDelete(reservationId);
        if (result) {
            res.status(200).json({ message: 'Reservation deleted successfully' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    //updateReservation,
    deleteReservation,
};
