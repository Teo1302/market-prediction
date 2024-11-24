const express = require('express');
const router = express.Router();
const clientMessagesController = require('../controllers/clientMessagesController');

// Rute pentru gestionarea mesajelor de la clienți
router.post('/', clientMessagesController.createClientMessage);
router.get('/', clientMessagesController.getAllClientMessages);
router.delete('/:id', clientMessagesController.deleteClientMessage);

module.exports = router;
