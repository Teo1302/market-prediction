// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationControllers');
const verifyToken = require('../middleware/verifyToken');

// Ruta pentru a adăuga o nouă rezervare
router.post('/', verifyToken, reservationController.createReservation);

// Ruta pentru a obține toate rezervările
router.get('/', verifyToken, reservationController.getAllReservations);

// Ruta pentru a actualiza o rezervare
//router.put('/:id', verifyToken, reservationController.updateReservation);

// Ruta pentru a șterge o rezervare
router.delete('/:id', verifyToken, reservationController.deleteReservation);

module.exports = router;
