import React, { useState } from 'react';
import { MdPermContactCalendar } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import Swal from 'sweetalert2';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prenume: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    prenume: '',
    phone: '',
    message: ''
  });
  const [clientMessages, setClientMessages] = useState([]);

  const sendFormDataToClientMessages = () => {
    if (
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.prenume.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.message.trim() === ''
    ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        name: formData.name.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        email: formData.email.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        prenume: formData.prenume.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        phone: formData.phone.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        message: formData.message.trim() === '' ? 'Acest câmp este obligatoriu' : ''
      }));
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Vă rugăm să completați toate câmpurile obligatorii.',
      });
      return;
    }
  
    if (formData.phone.length !== 10 || formData.phone.charAt(0) !== '0') {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: 'Numărul de telefon trebuie să aibă exact 10 caractere și să înceapă cu 0.'
      }));
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Vă rugăm să completati datele cu un numar de telefon valid.',
      });
      return;
    }

    let storedMessages = JSON.parse(localStorage.getItem('clientMessages')) || [];
    if (!Array.isArray(storedMessages)) {
      // Transformă obiectul într-un array
      storedMessages = [storedMessages];
    }
  
    const updatedMessages = [...storedMessages, formData];
    localStorage.setItem('clientMessages', JSON.stringify(updatedMessages));
    setClientMessages(updatedMessages);
  
    // Afișează un mesaj de succes folosind SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Succes!',
      text: 'Formularul a fost trimis cu succes!',
    });
  
    // Resetează starea formularului după trimiterea cu succes
    setFormData({
      name: '',
      email: '',
      prenume: '',
      phone: '',
      message: ''
    });
    // Setează starea de eroare la inițial după trimiterea cu succes
    setErrors({
      name: '',
      email: '',
      prenume: '',
      phone: '',
      message: ''
    });
  };
  


  const handleSubmit = (event) => {
    event.preventDefault();
  
    sendFormDataToClientMessages();
    
  };
  

  // Funcție pentru actualizarea valorii unui câmp în starea formularului
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if ((name === 'name' || name === 'prenume') && /[^a-zA-ZăâîșțĂÂÎȘȚ\s]/.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: 'Câmpul nu poate conține cifre sau caractere speciale.'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
  
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  
    if (name === 'phone') {
      // Verificăm dacă numărul de telefon conține doar cifre
      if (!/^\d*$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'Numărul de telefon poate conține doar cifre.'
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    }
  };
  

  return (
    <div className="container mx-auto xl:px-15 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-30 flex flex-col items-center justify-center space-y-7 md:space-y-0">
        <div className="text-center px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug mt-20 mb-10">
            Contacteaza-ne <span className="text-green">Acum</span>
          </h2>
        </div>
        
        <div className="flex justify-center md:justify-between md:w-full">
          {/* Cardul Restaurant Foodi */}
          <div className="md:w-1/2 space-y-3">
            <div className="card bg-base-100 shadow-xl mb-8 p-6 mr-5">
              <h4 className="text-lg font-semibold mb-4 text-xl">Restaurant Foodi</h4>
              <div>
                <p className='m-5'><strong>Adresă:</strong> Str. Teodor Mihali nr. 58-60</p>
                <p className='m-5'><strong>Program:</strong> Luni-Duminică, 12:00 – 23:30</p>
                <p className='m-5'><strong>Rezervări:</strong> <a href="tel:0754051231">0754 051 231</a></p>
                <p className='m-5 text-xl'><TbTruckDelivery /><strong>Foodi Delivery</strong></p>
                <p className='m-5'><strong>Pick-up & comenzi:</strong>Str. Teodor Mihali nr. 58-60 </p>
                <p className='m-5'><strong>Program:</strong> Luni-Duminică, 11:00 – 22:00</p>
                <p className='m-5'><strong>Email (pentru întrebări, recomandări sau pentru transmiterea feedback-ului):</strong> <a href="mailto:foodi@cluj.ro">foodi@cluj.ro</a></p>
                <p className='m-5 text-xl'><MdPermContactCalendar/><strong>Date de contact ale companiei:</strong></p>
                <p className='m-5'><strong>SC FOODI FOOD SRL, CUI:</strong> RO31304417</p>
                <p className='m-5'><strong>Adresă:</strong> Teodor Mihali nr. 58-60, Cluj-Napoca, jud. Cluj, 400029</p>
                <p className='m-5'><strong>Telefon:</strong> <a href="tel:0747057370">0747 057 370</a></p>
                <p className='m-5'><strong>Mail:</strong> <a href="mailto:hello@foodi.ro">hello@foodi.ro</a></p>
              </div>
            </div>

            <form className='mr-5'>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="name">
                Nume 
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                type="text" 
                placeholder="Introduceti numele dvs." 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required />
              {errors.name && <span className="text-red-500 text-xs italic">{errors.name}</span>}
              
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="email">
                Email 
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Introduceti adresa de email" 
                required />
              {errors.email && <span className="text-red-500 text-xs italic">{errors.email}</span>}
            </form>
          </div>
          
          {/* Harta */}
          <div className="md:w-1/2  ">
            <div className='map-section mb-10'>
              <div className='gmap-frame'>
              <iframe
  width="100%"
  height="700"
  frameBorder="0" // Schimbați frameborder în frameBorder
  scrolling="no"
  marginHeight="0" // Schimbați marginheight în marginHeight
  marginWidth="0" // Schimbați marginwidth în marginWidth
  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Strada%20Teodor%20Mihali%2058-60,%20Cluj-Napoca%20400591+(Restaurant%20Foodi)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
>
</iframe>

              </div>
            </div>
            <form className='mb-5' >
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="prenume">
                Prenume 
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                type="text" 
                placeholder="Introduceti prenumele dvs." 
                name="prenume" 
                value={formData.prenume} 
                onChange={handleInputChange} 
                required />
              {errors.prenume && <span className="text-red-500 text-xs italic">{errors.prenume}</span>}
              
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="phone">
                Nr. de telefon
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                name="phone" 
                type="tel" 
                value={formData.phone} 
                placeholder="Introduceti numarul de telefon" 
                onChange={handleInputChange}
                required/>
              {errors.phone && <span className="text-red-500 text-xs italic">{errors.phone}</span>}
            </form>
          </div>
        </div>
        
        {/* Formular */}
        <div className="md:w-full mx-auto mt-8">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2" htmlFor="message">
                Mesaj 
              </label>
              <textarea 
                className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" 
                name="message" 
                placeholder="Introduceti mesajul dvs." 
                value={formData.message} 
                onChange={handleInputChange} 
                required
              ></textarea>
              {errors.message && <span className="text-red-500 text-xs italic">{errors.message}</span>}
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button className="shadow bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded m" type="submit" onClick={handleSubmit}>
                Trimite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;