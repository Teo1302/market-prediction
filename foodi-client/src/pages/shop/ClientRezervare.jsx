import React, { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure.jsx';
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from '../../contexts/AuthProvider.jsx';
import axios from 'axios';

const ClientRezervare = () => {
  const { user } = useContext(AuthContext);
  const [clientReservations, setClientReservations] = useState([]);
  const axiosSecure = useAxiosSecure();
  const reservationsEndpoint = '/rezervare-client';

  useEffect(() => {
    const fetchClientReservations = async () => {
      try {
        const response = await axios.get('/');
        setClientReservations(response.data);
      } catch (error) {
        console.error('Error fetching client reservations:', error);
      }
    };
    fetchClientReservations(); // apelează funcția pentru a prelua rezervările la încărcarea componentei
  }, [user.email]);
  


  const handleDelete = async (reservationId) => {
    // Show a confirmation dialog using Swal
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`${reservationsEndpoint}/${reservationId}`);
          console.log(response.data);
          // Remove the deleted reservation from the list
          setClientReservations(clientReservations.filter(reservation => reservation._id !== reservationId));
          // Show a success message
          Swal.fire({
            title: 'Deleted!',
            text: 'Your reservation has been deleted.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting reservation:', error);
          // Show an error message
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the reservation. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };
  
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-20">
      <h2 className="text-2xl font-semibold my-4">Rezervările mele</h2>
      {Array.isArray(clientReservations) && clientReservations.length > 0 ? (
        <table className="table">
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Prenume</th>
              <th>E-mail</th>
              <th>Număr Telefon</th>
              <th>Data</th>
              <th>Ora</th>
              <th>Număr Persoane</th>
              <th>Date Adiționale</th>
              <th>Status Rezervare</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {clientReservations.map((reservation, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{reservation.nume}</td>
                <td>{reservation.prenume}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phoneNumber}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.numberOfPersons}</td>
                <td>{reservation.additionalDates}</td>
                <td>{reservation.status || 'În curs de validare'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(reservation._id)}
                    className="btn btn-ghost btn-xs text-red"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nu aveți rezervări făcute</p>
      )}
    </div>
  );
};

export default ClientRezervare;
