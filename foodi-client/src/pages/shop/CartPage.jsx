import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import CartDetails from "./CartDetails";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  console.log(cart)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Nu esti Logat!",
        text: "Treebuie sa fii logat ca sa vizualizezi cosul de cumparaturi.",
        icon: "warning",
        confirmButtonText: "Logheaza-te",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  }, [user, navigate]);

  // Calc pret total al fiecarui produs
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // cantitate crescuta
  const handleIncrease = async (item) => {
  try {
    const response = await fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    });

    if (response.ok) {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) { 
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      setCartItems(updatedCart);
      await refetch(); // Actualizare starea locală cartItems
    } else {
      console.error("Failed to update quantity");
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};

  // cantitate scazuta
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:6001/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Nu s-a putut actualiza cantitatea");
        }
      } catch (error) {
        console.error("Eroare in actualizarea cantitatii:", error);
      }
    }
  };

  // Subtotal Cos
  const cartSubtotal = Array.isArray(cart) ? cart.reduce((total, item) => total + calculateTotalPrice(item), 0) : 0;

  // Total comanda
  const orderTotal = cartSubtotal;
 

  // stergere produs
  const handleDelete =   (item) => {
    Swal.fire({
      title: "Esti sigur?",
      text: "Nu vei putea reveni asupra acestei acțiuni!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da, sterge meniul din cos!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:6001/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
             Swal.fire("Sters!", "Meniul a fost sters", "success");
           }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };
  if (!user) {
    return null; 
  }


  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* continut */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Meniuri adaugate in <span className="text-green"> Cosul de Cumparaturi</span>
            </h2>
          </div>
        </div>
      </div>

      {/* tabel cos */}

      {
        (cart.length > 0) ? <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* cap de tabel */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Meniu</th>
                  <th>Nume</th>
                  <th>Cantitate</th>
                  <th>Pret</th>
                  <th>Actiune</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => console.log(item.quantity)}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>{calculateTotalPrice(item).toFixed(2)} lei</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* footer */}
            </table>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3 mt-4">
             <p>Ai uitat să adaugi un meniu dorit în coș?</p>
            <Link to= '/menu'> 
            <button className="btn btn-md bg-green text-white px-8 py-1 mt-4">
             Continua Cumparaturile
            </button>
            </Link>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Detalii Comanda</h3>
            <p>Numar de Meniuri: {cart.length}</p>
            <p>
              Pret Total:{" "}
              <span id="total-price">{orderTotal.toFixed(2)} lei</span>
            </p>
            <Link to= '/cart-details'> 
            <button className="btn btn-md bg-green text-white px-8 py-1 mt-4">
              Plaseaza comanda
            </button>
            </Link>
          </div>
        </div>
      </div> : <div className="text-center mt-20">
        <p>Cosul de cumparaturi este gol. Te rog adauga produse.</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Inapoi la Meniu</button></Link>
      </div>
      }
      
    </div>
  );
};

export default CartPage;