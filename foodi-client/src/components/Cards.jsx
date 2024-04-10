import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";



const Cards = ({ item }) => {
  const {name,image, price, recipe, _id}= item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const{user}=useContext(AuthContext);
  const navigate = useNavigate();
  const location=useLocation();
  const [cart, refetch] = useCart();
  const [isInFavorites, setIsInFavorites] = useState(false);

  const showAddedToCartAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Produs adăugat în coș!",
      showConfirmButton: false,
      timer: 1500
    });
  };

//add to cart bttn
const handleAddtoCart = (item) => {
  console.log("btn is clicked", item);
  if (user && user?.email) {
    const cartItem = {
      menuItemId: item._id, // Modificare aici pentru a accesa corect _id-ul elementului
      name: item.name,
      quantity: 1, // Setăm cantitatea la 1 când adăugăm produsul în coș
      image: item.image,
      price: item.price,
      email: user.email,
    };

    fetch("http://localhost:6001/carts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          showAddedToCartAlert();
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  } else {
    Swal.fire({
      title: "Please Login",
      text: "Without an account you will not be able to add products",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Signup Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signup", { state: { from: location } });
      }
    });
  }
};

  const handleAddToFavorite = () => {
    if (!user || !user.email) {
      Swal.fire({
        title: "Please Login",
        text: "You need to be logged in to add products to favorites.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    } else {
      if (isInFavorites) {
        removeFromFavorite();
      } else {
        addToFavorite();
      }
    }
  };
  
  const removeFromFavorite = () => {
    setIsInFavorites(false);
    setIsHeartFilled(false);
    Swal.fire({
      title: "Do you want to remove the product from favorites?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Product Removed from Favorites!", "", "success");
        // Inima devine albă numai după confirmarea eliminării
      }
    });
  };
  
  
  
  const addToFavorite = () => {
    setIsInFavorites(true);
    setIsHeartFilled(true);
    Swal.fire("Product Added to Favorites!", "", "success");
   
  };
  
  const handleHeartClick = () => {
    handleAddToFavorite();
  };

  return (
    <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
  <div
  className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
    isHeartFilled ? "text-rose-500" : isInFavorites ? "text-rose-500" : "text-white"
  }`}
  onClick={handleHeartClick}
>
  <FaHeart className="w-5 h-5 cursor-pointer" />
</div>

      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
        </figure>
      </Link>
      <div className="card-body">
       <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
       <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
          <span className="text-sm text-black">{item.price} lei </span> 
          </h5>
          <button onClick={() => handleAddtoCart(item)} className="btn bg-green text-white">Adauga in Cos </button>
        </div>
      </div>
    </div>
 
  );
};

export default Cards;