const ClientMessage = require('../models/ClientMessage');

// Funcție pentru a crea un mesaj nou
const createClientMessage = async (req, res) => {
  try {
    const newMessage = new ClientMessage(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funcție pentru a lista toate mesajele
const getAllClientMessages = async (req, res) => {
  try {
    const messages = await ClientMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Funcție pentru a șterge un mesaj după ID
const deleteClientMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await ClientMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      throw new Error('Message not found');
    }
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createClientMessage,
  getAllClientMessages,
  deleteClientMessage
};
