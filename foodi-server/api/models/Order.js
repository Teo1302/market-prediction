const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  nume: { type: String, required: true },
  email: { type: String, required: true },
  prenume: { type: String, required: true },
  phone: { type: String, required: true },
  tipLivrare: { type: String, required: true },
  adresaLivrare: String,
  oras: String,
  codPostal: String,
  metodaDePlata: { type: String, required: true },
  momentPrimireComanda: { type: Date, required: true },
  tacamuri: { type: String, required: true },
  instructiuniSpeciale: {type: String, required: false },
  created_at: { type: Date, default: Date.now },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;