import React, { useContext, useState } from 'react'
import useCart from '../../hooks/useCart'
import {} from "react-icons/fa"
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider';

const CartPage = () => {
  const [cart,refetch]=useCart();
  const{user}=useContext(AuthContext);
  const [cartItems, setcartItems]=useState([]);
 
  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // Handle quantity increase
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
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // Handle quantity decrease
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
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  // delete an item
  const handleDelete =   (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
             Swal.fire("Deleted!", "Your file has been deleted.", "success");
           }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className='section-container'>

        {/* banner */}
            <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#f3f4f6] to-100%'>
      <div className='py-24 flex flex-col  justify-between items-center gap-8'>
        {/* text */}
        <div className='space-y-7 px-4'>
          <h2 className='md:text-6xl text-4xl font-bold text-green-500 md:leading-snug leading-snug transition-all duration-300 hover:scale-105'>
            Elemente adaugate in Cos
          </h2>
        </div>
      </div>
    </div>

{/* table for the cart */}
<div>
<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green text-white rounded-sm'>
      <tr>
        <th>#</th>
        <th>Food</th>
        <th>Item Name </th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
 {cart.map((item , index)=> (
 <tr key={index}>
 <td>{index+1}</td>
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={item.image} 
            alt="" />
          </div>
        </div>
        </div>
    </td>
    <td className='font-medium'>
      {item.name}
    </td>
    <td>
      <button className='btn btn-xs' onClick={ ()=> handleDecrease(item)}>-</button>
      <input type="number" value={item.quatity} className="w-10 mx-2 text-center overflow-hidden appearance-none" onChange={() => console.log(item.quatity)}/>
      <button className='btn btn-xs' onClick={ ()=> handleIncrease(item)} >+</button>
    </td>
    <td>
      ${calculateTotalPrice(item).toFixed(2)}
    </td>
    <th>
    <button className="btn btn-ghost btn-xs text-red" onClick={() => handleDelete(item)}>
  <FaTrash />
</button>

    </th>
  </tr>
 )
 )}
    </tbody>
  
  </table>
</div>
</div>
{/* customer details */}
<div className='my-12 flex flex-col md:flex-row justify-between items-start'>
  <div className='md:w-1/2 space-y-3'>
    <h3 className='font-medium'>Customer Details</h3>
    <p>Name:{user.displayName}</p>
    <p>Email:{user.email}</p>
    <p>User_id:{user.uid}</p>
    </div>
    <div className='md:w-1/2 space-y-3'>
    <h3 className='font-medium'>Shopping Details</h3>
    <p>Total Items:{cart.length}</p>
    <p>Total Price:{" "}
              <span id="total-price">${orderTotal.toFixed(2)}</span>
            </p>
   <button className='btn bg-green text-white'> Procceed Checkout</button>
    </div>
  </div>
</div>
  )
 }

export default CartPage