import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthProvider";

const Numerar = ({ clientDetails }) => {
  const [cart] = useCart();
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    prenume: '',
    phone: '',
    tipLivrare: '',
    adresaLivrare: '',
    oras: '',
    codPostal: '',
    metodaDePlata: 'Numerar',
    momentPrimireComanda: '',
    tacamuri: '',
    instructiuniSpeciale: ''
  });

  const [livrareLaDomiciliu, setLivrareLaDomiciliu] = useState(false);

  useEffect(() => {
    const fetchLastOrder = async () => {
        try {
            const response = await axios.get('http://localhost:6001/orders/last');

            if (!response.data) {
                console.error('Nu s-a primit niciun răspuns de la server.');
                return;
            }

            const { nume, email, prenume, phone, tipLivrare, adresaLivrare, oras, codPostal, momentPrimireComanda, tacamuri, instructiuniSpeciale } = response.data;

            setFormData({
                nume,
                email,
                prenume,
                phone,
                tipLivrare,
                adresaLivrare,
                oras,
                codPostal,
                metodaDePlata: 'Numerar',
                momentPrimireComanda,
                tacamuri,
                instructiuniSpeciale
            });

            if (tipLivrare === 'domiciliu') {
                setLivrareLaDomiciliu(true);
            }
        } catch (error) {
            console.error('Eroare la preluarea datelor ultimei comenzi:', error);
        }
    };

    fetchLastOrder();
}, []);

  // Funcția pentru a plasa comanda
  const placeOrder = () => {
    
    Swal.fire({
      icon: 'success',
      title: 'Comanda a fost plasată cu succes!',
      showConfirmButton: false,
      timer: 1500 
    });
  
  };
  const formatDateTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };
 
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 m-20 mb-10 mt-20">
      <div className="md:w-1/2 space-y-3">
        {/* Structura pentru afișarea coșului și a sumarului comenzii */}
        <div className="card w-full bg-base-100 shadow-xl mb-8" style={{ marginTop: '40px' }}>
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
          <p className="mb-4 m-4 font-bold text-size:18 ">Total: <span className="text-green-500 font-bold">
            {/* Afișează prețul total al coșului */}
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </span> lei</p>
        </div>

        {/* Structura pentru sumarul comenzii */}
        <div className="card w-full bg-base-100 shadow-xl mb-8">
          <h4 className="text-lg font-semibold m-4">Sumar comandă</h4>
          <p className="mb-2 m-4">Subtotal: {(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)} lei</p>
          <p className="mb-2 m-4">Taxa de livrare: <span className="text-green font-bold">Gratis</span></p> {/* Afișează taxa de livrare */}
          <hr className="border-t border-gray-300 mx-4" />
          <p className="mb-4 m-4 font-bold text-size:18 ">Total final: <span className="text-green-500 font-bold">
            {/* Afișează totalul final al comenzii */}
            {(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)}
            </span> lei</p>
        </div>
        <p className="text-sm text-gray-500 mt-2">Preturile sunt exprimate in lei si contin TVA.</p>
        <p className="text-sm text-gray-500 mt-2">Taxa de livrare este gratuită pentru comenzi de peste <b>50</b> de lei sau daca pachetul se ridica din restaurant.</p>

        {/* Butonul pentru a confirma și plasa comanda */}
        <div className="flex justify-center">
          <Link to="http://localhost:5173/">
            <button className="btn bg-green text-white m-3" onClick={placeOrder}>
              Confirma si Plaseaza Comanda 
            </button>
          </Link>
        </div>
      </div>

      {/* Structura pentru afișarea detaliilor despre comanda */}
      <div className="md:w-1/2 space-y-3">
        <div className="card w-full bg-base-100 shadow-xl mb-8" style={{ marginTop: '40px' }}>
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
            <p><strong>Metoda De Plata:</strong> Numerar</p>
            <p><strong>Moment Primire Comanda:</strong> {formatDateTime(formData.momentPrimireComanda)}</p>

            <p><strong>Tacamuri:</strong> {formData.tacamuri}</p>
            <p><strong>Instructiuni Speciale:</strong> {formData.instructiuniSpeciale}</p>
            <Link to="/cart-details">
              <button className="btn bg-green text-white m-3">Inapoi la Completare Detalii Comanda </button>
            </Link>
         

          </div>
        </div>
      </div>
    </div>
  );
};

export default Numerar;
