const mongoose = require('mongoose');

const clientMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ClientMessage = mongoose.model('ClientMessage', clientMessageSchema);

module.exports = ClientMessage;
