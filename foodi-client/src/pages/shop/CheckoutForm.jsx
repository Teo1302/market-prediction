import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from 'react';
import { useEffect,useContext } from 'react';
import CartPage from './CartPage';
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";

import Swal from 'sweetalert2';

const CheckoutForm = ({price, cart}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartData, refetch] = useCart();
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    prenume: '',
    phone: '',
    tipLivrare: '',
    adresaLivrare: '',
    oras: '',
    codPostal: '',
    metodaDePlata: 'Plata Online',
    momentPrimireComanda: '',
    tacamuri: '',
    instructiuniSpeciale: ''
  });
  const [livrareLaDomiciliu, setLivrareLaDomiciliu] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosSecure.get('http://localhost:6001/orders/last');

        if (!response.data) {
          console.error('Nu s-a primit niciun răspuns de la server.');
          return;
        }

        const {
          nume,
          email,
          prenume,
          phone,
          tipLivrare,
          adresaLivrare,
          oras,
          codPostal,
          momentPrimireComanda,
          tacamuri,
          instructiuniSpeciale
        } = response.data;

        setFormData({
          nume,
          email,
          prenume,
          phone,
          tipLivrare,
          adresaLivrare,
          oras,
          codPostal,
          metodaDePlata: 'Plata Online',
          momentPrimireComanda,
          tacamuri,
          instructiuniSpeciale
        });

        // Set state for delivery type
        if (tipLivrare === 'domiciliu') {
          setLivrareLaDomiciliu(true);
        }
      } catch (error) {
        console.error('Eroare la preluarea datelor ultimei comenzi:', error);
      }
    };

    fetchOrderDetails();
  }, [axiosSecure]);
  const formatDateTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const handleLivrareClick = () => {
    setLivrareLaDomiciliu(true);
    setFormData(prevFormData => ({
      ...prevFormData,
      tipLivrare: 'domiciliu'
    }));
  };

  const handleRidicareClick = () => {
    setLivrareLaDomiciliu(false);
    setFormData(prevFormData => ({
      ...prevFormData,
      tipLivrare: 'ridicare'
    }));
  };
  const placeOrder = () => {

    Swal.fire({
      icon: 'success',
      title: 'Comanda a fost plasată cu succes!',
      showConfirmButton: false,
      timer: 1500 
    });
  } 

  console.log(user.email)
  if (!user) {
    // Utilizatorul nu este autentificat, deci îl redirecționăm către pagina de autentificare
    navigate('/login');
    
  }
  useEffect(() => {
    if (!cart || cart.length === 0) return;

    // Calculăm prețul total al coșului
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  
    axiosSecure.post('/create-payment-intent', { price: total }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [cart, axiosSecure]);

  const calculateShippingFee = () => {
    if (livrareLaDomiciliu) {
      if (totalPrice >= 50) {
        return 'Gratis';
      } else {
        return '25 lei';
      }
    } else {
      return 'Gratis'; 
      // Taxa de livrare este 0 pentru ridicarea din restaurant
    }
  };


  const handleSubmit = async (event) => {
    // blocare trimitere form
    event.preventDefault();

    if (!stripe || !elements) {
  
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

 
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setcardError(error.message);
    } else {
     setcardError('Success!');
    console.log('[PaymentMethod]', paymentMethod);
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
          },
        },
      },
    );

    if(confirmError){
      console.log(confirmError)
    }

    console.log('paymentIntent', paymentIntent)

    if(paymentIntent.status ==="succeeded") {
      const transitionId =paymentIntent.id;
      setcardError(`Your transitionId is: ${transitionId}`)

      // salvare info legate de plata pe server
      const paymentInfo ={
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "order pending", 
        itemsName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id), 
        menuItems: cart.map(item => item.menuItemId)}

      axiosSecure.post('/payments', paymentInfo)
      .then( res => {
        console.log(res.data)
        if(res.data){
          alert('Payment info sent successfully!')
          navigate('/order')
        }
      })
    }


  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
       <div className="md:w-1/2 space-y-3">
  <div className="card w-100 bg-base-100 shadow-xl mb-8">
    <h4 className="text-lg font-semibold m-4"><FaShoppingCart/>Comanda mea</h4>
    {cart.map((item, index) => (
      <div key={index} className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full mr-2" />
          <div className="flex flex-col">
            <p className="font-medium">{index + 1}. {item.name}</p>
            <p className="text-xs text-gray-500 font-medium">Cantitate: <span className="text-sm">{item.quantity}</span></p>
          </div>
        </div>
        <span className="text-sm text-gray-500">{(item.price * item.quantity).toFixed(2)}</span> {/* Prețul total pentru produs */}
      </div>
    ))}
    <hr className="border-t border-gray-300 mx-4" />
    <p className="mb-4 m-4 font-bold text-size:18 ">Total: <span className={calculateShippingFee() === 'Gratis' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
  {(totalPrice )}</span> lei</p>

  </div>

        <div className="card w-100 bg-base-100 shadow-xl mb-8">
          <h4 className="text-lg font-semibold m-4">Sumar comandă</h4>
          <p className="mb-2 m-4">Subtotal: {totalPrice} lei</p>
          <p className="mb-2 m-4">Taxa de livrare: <span className={calculateShippingFee() === 'Gratis' ? 'text-green font-bold' : 'text-red font-bold'}>{calculateShippingFee()}</span></p>
          <hr className="border-t border-gray-300 mx-4" />
          <p className="mb-4 m-4 font-bold text-size:18 ">Total final: <span className={calculateShippingFee() === 'Gratis' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
  {(totalPrice + (calculateShippingFee() === 'Gratis' ? 0 : 25)).toFixed(2)}</span> lei</p>

        </div>
        <p className="text-sm text-gray-500 mt-2">Preturile sunt exprimate in lei si contin TVA.</p>
        <p className="text-sm text-gray-500 mt-2">Taxa de livrare este gratuită pentru comenzi de peste <b>50</b> sau daca pachetul se ridica din restaurant.</p>
      </div>


      {/* right side */}
      <div className="md:w-1/2 space-y-3">
        <div className="card w-full bg-base-100 shadow-xl mb-8" style={{ marginTop: '40px' }}>
          <div className="card-body">
          <div className="card-body">
  <h2 className="card-title">Date despre Comanda Dvs</h2>
  <p><strong>Nume:</strong> {formData.nume}</p>
  <p><strong>Prenume:</strong> {formData.prenume}</p>
  <p><strong>Email:</strong> {formData.email}</p>
  <p><strong>Nr_telefon:</strong> {formData.phone}</p>
  <p><strong>Tip Livrare:</strong> {formData.tipLivrare}</p>
  {livrareLaDomiciliu && (
    <>
      <p><strong>Adresa Livrare:</strong> {formData.adresaLivrare}</p>
      <p><strong>Oras:</strong> {formData.oras}</p>
      <p><strong>Cod Postal:</strong> {formData.codPostal}</p>
    </>
  )}
  <p><strong>Metoda De Plata:</strong> {formData.metodaDePlata}</p>
  <p><strong>Moment Primire Comanda:</strong> {formatDateTime(formData.momentPrimireComanda)}</p>
  <p><strong>Tacamuri:</strong> {formData.tacamuri}</p>
  <p><strong>Instructiuni Speciale:</strong> {formData.instructiuniSpeciale}</p>
</div>

            <Link to="/cart-details">
              <button className="btn bg-green text-white m-3">Inapoi la Completare Detalii Comanda </button>
            </Link>
            </div> 
            </div>
      <div className=' w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-120 px-4 py-8'> 
      <h4 className="text-lg font-semibold">Finalizeaza Plata Online!</h4>
      <h5 className='font-medium'>Introduceti datele cardului </h5>
      {/* stripe form */}
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe|| !clientSecret} className="btn btn-primary btn-sm mt-5 w-full">
        Plateste!
      </button>
    </form>

    {/* paypal optiuni */}
    {
    cardError ? <p className="text-red text-xs italic">{cardError}</p> : ''
    }
     
     {/* <div className="mt-5 text-center">
     <hr />
     <button
         type="submit"
         className="btn btn-sm mt-5 bg-orange-500 text-white"
       >
        <FaPaypal /> Pay with Paypal
       </button>


</div> */}

      </div>


    </div>
    </div>
    
  )
}

export default CheckoutForm