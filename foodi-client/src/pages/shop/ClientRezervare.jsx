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
        const response = await axiosSecure.get(reservationsEndpoint);
        // filtrare rezervari
        const filteredReservations = response.data.filter(reservation => reservation.email === user.email);
        setClientReservations(filteredReservations);
      } catch (error) {
        console.error('Error fetching client reservations:', error);
      }
    };
    fetchClientReservations();
  }, [user.email, axiosSecure, reservationsEndpoint]);

  const handleDelete = async (reservationId) => {
    Swal.fire({
      title: 'Esti sigur?',
      text: "Nu vei putea reveni asupra acestei acțiuni!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, sterge rezervarea!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`${reservationsEndpoint}/${reservationId}`);
          console.log(response.data);
          setClientReservations(clientReservations.filter(reservation => reservation._id !== reservationId));
          Swal.fire({
            title: 'Sters!',
            text: 'Rezervarea ta a fost stearsa',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting reservation:', error);
          Swal.fire({
            title: 'Eroare!',
            text: 'O eroare a aparut la stergerea rezervarii.Te rog sa reincerci stergerea.',
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
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.time}</td>
                <td>{reservation.numberOfPersons}</td>
                <td>{reservation.additionalDates ? reservation.additionalDates : '-'}</td>
             
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
