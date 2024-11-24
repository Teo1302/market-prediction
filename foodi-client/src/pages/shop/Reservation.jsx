import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure.jsx';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const reservationsEndpoint = '/vizualizare-rezervari'; 

  // Funcție pentru a prelua rezervările de la server
  const fetchReservations = async () => {
    try {
      const response = await axiosSecure.get(reservationsEndpoint);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setFetchError('Error fetching reservations. Please try again later.');
    }
  };

  // Efect pentru a apela funcția de fetchReservations la încărcarea componentei
  useEffect(() => {
    fetchReservations();
  }, [axiosSecure, reservationsEndpoint]);

  // Funcție pentru ștergerea unei rezervări
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
          fetchReservations(); // Reîncarcăm rezervările după ștergere
          Swal.fire({
            title: 'Sters!',
            text: 'Rezervarea a fost stearsa.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting reservation:', error);
          Swal.fire({
            title: 'Eroare!',
            text: 'O eroare a aparut la incercarea stergerii rezervarii.Te rog sa reincerci acest proces',
            icon: 'error',
          });
        }
      }
    });
  };

  // Funcție pentru sortarea rezervărilor după data cea mai apropiată de astăzi
  const sortReservationsByDate = () => {
    const sortedReservations = [...reservations].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
    setReservations(sortedReservations);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-20">
      <h2 className="text-2xl font-semibold my-4">Lista rezervarilor</h2>
      <button onClick={sortReservationsByDate} className="btn bg-green text-white mb-4">
        Sortează după data cea mai apropiată
      </button>
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
              <th>Acțiuni</th>
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
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.time}</td>
                <td>{reservation.numberOfPersons}</td>
                <td>{reservation.additionalDates ? reservation.additionalDates : '-'}</td>
                <td>
                  <button onClick={() => handleDelete(reservation._id)} className="btn btn-ghost btn-xs text-red">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nu există rezervări făcute de clienți</p>
      )}
    </div>
  );
};

export default Reservation;
