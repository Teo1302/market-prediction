import React, { useState, useEffect } from 'react';
import { FaTrashAlt} from "react-icons/fa";

const MesajeClienti = () => {
  const [clientMessages, setClientMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('clientMessages')) || [];
    setClientMessages(storedMessages);
  }, []);

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...clientMessages];
    updatedMessages.splice(index, 1);
    localStorage.setItem('clientMessages', JSON.stringify(updatedMessages));
    setClientMessages(updatedMessages);
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.prenume}</td>
                  <td>{message.phone}</td>
                  <td>{message.message}</td>
                  <td>
                  <button onClick={() => handleDeleteMessage(index) } 
                  className="btn btn-xs bg-orange-500 text-white">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Nu există mesaje de la clienți</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MesajeClienti;
