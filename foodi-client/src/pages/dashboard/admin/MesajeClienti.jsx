import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MesajeClienti = () => {
  const [clientMessages, setClientMessages] = useState([]);

  useEffect(() => {
    // Funcție pentru a încărca mesajele de la clienți când se încarcă componenta
    const fetchClientMessages = async () => {
      try {
        const response = await axios.get('http://localhost:6001/messages');
        setClientMessages(response.data);
      } catch (error) {
        console.error('Error fetching client messages:', error);
      }
    };

    fetchClientMessages();
  }, []);

  const handleDeleteMessage = async (id, index) => {
    // Afișăm un dialog de confirmare folosind SweetAlert
    Swal.fire({
      title: 'Sunteți sigur?',
      text: 'Mesajul va fi șters definitiv!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, șterge-l!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:6001/messages/${id}`);
          console.log('Message deleted:', response.data);
          // Actualizăm lista de mesaje după ștergere
          const updatedMessages = [...clientMessages];
          updatedMessages.splice(index, 1);
          setClientMessages(updatedMessages);
          localStorage.setItem('clientMessages', JSON.stringify(updatedMessages));
          // Afișăm un mesaj de succes cu SweetAlert
          Swal.fire('Șters!', 'Mesajul a fost șters.', 'success');
        } catch (error) {
          console.error('Error deleting message:', error);
          // Afișăm un mesaj de eroare cu SweetAlert în caz de problemă
          Swal.fire('Eroare!', 'A apărut o eroare la ștergerea mesajului. Vă rugăm să încercați din nou.', 'error');
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mesaje de la clienți</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          <thead className="bg-green text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Email</th>
              <th>Prenume</th>
              <th>Telefon</th>
              <th>Mesaj</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clientMessages) && clientMessages.length > 0 ? (
              clientMessages.map((message, index) => (
                <tr key={message._id}>
                  <td>{index + 1}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.prenume}</td>
                  <td>{message.phone}</td>
                  <td>{message.message}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteMessage(message._id, index)}
                      className="btn btn-xs bg-orange-500 text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Nu există mesaje de la clienți
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MesajeClienti;
