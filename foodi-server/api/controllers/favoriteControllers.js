const Favorite = require("../models/Favorite");

const getAllFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user._id }).populate('productId');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToFavorites = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;
    try {
        const favorite = await Favorite.create({ userId, productId });
        favorite.heartColor = "text-rose-500"; // Setăm culoarea inimii
        await favorite.save(); // Salvăm modificările
        res.status(200).json({ message: "Product added to favorites successfully!", favorite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const removeFromFavorites = async (req, res) => {
    const favoriteId = req.params.id;
    try {
        const favorite = await Favorite.findByIdAndDelete(favoriteId);
        res.status(200).json({ message: "Product removed from favorites successfully!", favorite });
        // Setăm culoarea inimii pe alb după eliminarea produsului din favorite
        favorite.heartColor = "text-white";
        await favorite.save(); // Salvăm modificările
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllFavorites,
    addToFavorites,
    removeFromFavorites
};
