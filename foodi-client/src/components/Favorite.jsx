import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/favorite');
        console.log('Favorites:', response.data);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);



  return (
    <div>
      <h2>Favorite Products</h2>
      <ul>
      {Array.isArray(favorites) && favorites.map((favorite) => (
  <li key={favorite._id}>
    {/* Afișăm imaginea */}
    <img src={favorite.image} alt={favorite.name} style={{ width: '100px' }} />
    {/* Afișăm numele */}
    <p>{favorite.name}</p>
    {/* Afișăm prețul */}
    <p>{favorite.price}</p>
    {/* Afișăm culoarea inimii */}
    <p className={favorite.heartColor}>Heart Color</p>
    {/* Buton pentru a adăuga produsul în coș */}
  </li>
))}

      </ul>
    </div>
  );
};

export default Favorite;
