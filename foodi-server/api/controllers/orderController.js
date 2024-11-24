const Order = require('../models/Order');
const Cart = require('../models/Carts');

const createOrder = async (req, res) => {
    const orderData = req.body;
  
    // Eliminăm câmpurile neutilizate pentru livrarea la domiciliu
    if (orderData.tipLivrare === 'ridicare') {
      delete orderData.adresaLivrare;
      delete orderData.oras;
      delete orderData.codPostal;
    } else if (orderData.tipLivrare === 'livrare') {
      // Verificăm dacă sunt completate toate câmpurile pentru livrare la domiciliu
      if (!orderData.adresaLivrare || !orderData.oras || !orderData.codPostal) {
        return res.status(400).json({ message: 'Pentru livrarea la domiciliu, adresa de livrare, orașul și codul poștal sunt obligatorii.' });
      }
    }
  
    // Adăugăm instrucțiuni speciale dacă sunt completate
    if (orderData.instructiuniSpeciale) {
      orderData.instructiuniSpeciale = orderData.instructiuniSpeciale.trim(); // Opțional: eliminăm spațiile albe redundante
    } else {
      delete orderData.instructiuniSpeciale; // Excludem câmpul dacă nu este completat
    }
  
    try {
      const result = await Order.create(orderData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getLastOrder = async (req, res) => {
    try {
        const lastOrder = await Order.findOne().sort({ created_at: -1 });

        if (!lastOrder) {
            return res.status(404).json({ message: 'Nu s-a găsit nicio comandă înregistrată.' });
        }

        res.status(200).json(lastOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Order.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Comanda nu a fost găsită.' });
    }
    res.status(200).json({ message: 'Comanda a fost ștearsă cu succes.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createOrder,
  getAllOrders,
  getLastOrder,
  deleteOrder
};