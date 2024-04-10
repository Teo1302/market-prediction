import React from 'react';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure.jsx';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Reservation = () => {

    const [reservations, setReservations] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const axiosSecure = useAxiosSecure();
    const reservationsEndpoint = '/vizualizare-rezervari'; 
  
    const fetchReservations = async () => {
        try {
          const response = await axiosSecure.get(reservationsEndpoint);
          setReservations(response.data);
        } catch (error) {
          console.error('Error fetching reservations:', error);
          setFetchError('Error fetching reservations. Please try again later.');
        }
      };
    
      useEffect(() => {
        fetchReservations();
      }, [axiosSecure, reservationsEndpoint]);

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
              // After successful delete, you may want to fetch reservations again
              fetchReservations();
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

      const handleAccept = async (reservationId) => {
        try {
          const response = await axiosSecure.put(`${reservationsEndpoint}/${reservationId}`);
          console.log(response.data);
          // After successful accept, you may want to fetch reservations again
          fetchReservations();
          // Show a success message
          Swal.fire({
            title: 'Accepted!',
            text: 'Reservation accepted successfully.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error accepting reservation:', error);
          // Show an error message
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while accepting the reservation. Please try again.',
            icon: 'error',
          });
        }
      };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-20">
    <h2 className="text-2xl font-semibold my-4">Lista rezervarilor</h2>
    {reservations.length > 0 ? (
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
            <th>Actiuni</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
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
              <td>
                  <button
                      onClick={() => handleDelete(reservation._id)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                    onClick={() => handleAccept(reservation._id)}
                    className="btn btn-ghost btn-xs text-green"
                  >
                    Accept
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Nu aveti rezervari facute</p>
    )}
  </div>
);
};
export default Reservation
