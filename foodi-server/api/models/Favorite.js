const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referință către modelul de utilizator
        required: true
    },
    menuItemId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu', // Referință către modelul de meniu
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
