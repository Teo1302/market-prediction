import React, { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure.jsx';
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from '../../../contexts/AuthProvider.jsx';

const ComenziClienti = () => {
  const { user } = useContext(AuthContext);
  const [clientOrders, setClientOrders] = useState([]);
  const axiosSecure = useAxiosSecure();
  const ordersEndpoint = '/orders';

  useEffect(() => {
    const fetchClientOrders = async () => {
      try {
        const response = await axiosSecure.get(ordersEndpoint);
        setClientOrders(response.data);
      } catch (error) {
        console.error('Error fetching client orders:', error);
      }
    };
    fetchClientOrders();
  }, [user.email, axiosSecure]); // Adăugăm axiosSecure în dependințele efectului pentru a evita warning-urile

  const handleDelete = async (orderId) => {
    Swal.fire({
      title: 'Esti sigur?',
      text: "Nu vei putea reveni asupra acestei acțiuni!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, sterge!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`${ordersEndpoint}/${orderId}`);
          setClientOrders(clientOrders.filter(order => order._id !== orderId));
          Swal.fire({
            title: 'Sters!',
            text: 'Comanda a fost stearsa',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting order:', error);
          Swal.fire({
            title: 'Eroare!',
            text: 'O eroare a intervenit in stergerea comenzii!Te rog sa mai incerci.',
            icon: 'error',
          });
        }
      }
    });
  };

  const formatDateTime = (dateTime) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateTime).toLocaleString('ro-RO', options);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-20">
      <h2 className="text-2xl font-semibold my-4">Comenzile Clientilor</h2>
      {Array.isArray(clientOrders) && clientOrders.length > 0 ? (
        <table className="table">
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Prenume</th>
              <th>Email</th>
              <th>Număr Telefon</th>
              <th>Tip Livrare</th>
              <th>Adresă Livrare</th>
              <th>Oraș</th>
              <th>Cod Postal</th>
              <th>Metodă de Plată</th>
              <th>Moment Primire Comandă</th>
              <th>Tacamuri</th>
              <th>Instrucțiuni Speciale</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {clientOrders.map((order, index) => {
              const isPickup = order.tipLivrare === 'ridicare';
              const adresaLivrare = isPickup ? 'Str. Teodor Mihali nr. 58-60' : (order.adresaLivrare || '-');
              const oras = isPickup ? 'Cluj-Napoca' : (order.oras || '-');
              const codPostal = isPickup ? '400029' : (order.codPostal || '-');

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.nume}</td>
                  <td>{order.prenume}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.tipLivrare}</td>
                  <td>{adresaLivrare}</td>
                  <td>{oras}</td>
                  <td>{codPostal}</td>
                  <td>{order.metodaDePlata}</td>
                  <td>{formatDateTime(order.momentPrimireComanda)}</td>
                  <td>{order.tacamuri}</td>
                  <td>{order.instructiuniSpeciale || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Nu aveți comenzi făcute</p>
      )}
    </div>
  );
};

export default ComenziClienti;
