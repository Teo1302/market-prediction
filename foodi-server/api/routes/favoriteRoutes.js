const express = require("express");
const router = express.Router();
const favoriteController = require('../controllers/favoriteControllers');

router.get('/', favoriteController.getAllFavorites);
router.post('/', favoriteController.addToFavorites);
router.delete('/:id', favoriteController.removeFromFavorites);

module.exports = router;
