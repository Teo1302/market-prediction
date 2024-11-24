import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaRegUser } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRunning } from "react-icons/fa";
import { CiForkAndKnife } from "react-icons/ci";
import DateTimePicker from 'react-datetime-picker';
import { FaRegCalendarAlt } from "react-icons/fa";
import useAuth from '../../hooks/useAuth.jsx';
import Numerar from './Numerar';
import axios from 'axios';

const CartDetails = () => {
  const [livrareLaDomiciliu, setLivrareLaDomiciliu] = useState(false);
  const [ridicareDinRestaurant, setRidicareDinRestaurant] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [plataOnlineCuCardul, setPlataOnlineCuCardul] = useState(true);
  const [plataNumerar, setPlataNumerar] = useState(false);
  const [detaliiCompletate, setDetaliiCompletate] = useState(false);
  const { register, reset, trigger, formState: { isSubmitting } } = useForm();
  const [metodaDeLivrareSelectata, setMetodaDeLivrareSelectata] = useState(false);
  const [metodaDePlataSelectata, setMetodaDePlataSelectata] = useState(false);
  const [tacamuriSelectate, setTacamuriSelectate] = useState('da');
  const [deliveryTimeOption, setDeliveryTimeOption] = useState('catDeRepede');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientDetails, setClientDetails] = useState({});
  const minDate = new Date();

  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    prenume: '',
    phone: '',
    tipLivrare: '',
    adresaLivrare: '',
    oras: '',
    codPostal: '',
    metodaDePlata: '',
     momentPrimireComanda: '',
    tacamuri: '',
     instructiuniSpeciale: ''
  
  });

  const [errors, setErrors] = useState({
    nume: '',
    email: '',
    prenume: '',
    phone: '',
    tipLivrare: '',
    adresaLivrare: '',
    oras: '',
    codPostal: '',
    metodaDePlata: '',
    momentPrimireComanda: '',
    tacamuri: '',
    instructiuniSpeciale: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if ((name === 'nume' || name === 'prenume') && /[^a-zA-ZăâîșțĂÂÎȘȚ\s]/.test(value)) {
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

  const handleTimeOptionChange = (event) => {
    const value = event.target.value;
    setDeliveryTimeOption(value);
  
    if (value === 'alegeData') {
      setShowDateTimePicker(true); // Afișează DateTimePicker când se selectează "Mai târziu"
    } else {
      setShowDateTimePicker(false); // Ascunde DateTimePicker în alte cazuri
    }
  };
  

  const handleLivrareClick = () => {
    setLivrareLaDomiciliu(true);
    setRidicareDinRestaurant(false);
    setMetodaDeLivrareSelectata(true);
    setFormData(prevFormData => ({
      ...prevFormData,
      tipLivrare: 'domiciliu'
    }));
  };

  const handleRidicareClick = () => {
    setLivrareLaDomiciliu(false);
    setRidicareDinRestaurant(true);
    setFormData(prevFormData => ({
      ...prevFormData,
      tipLivrare: 'ridicare'
    }));
    
  };

  const handlePlataOptionChange = (event) => {
    const value = event.target.value;
    setPlataOnlineCuCardul(value === "plataOnline");
    setPlataNumerar(value === "numerar");
    setFormData(prevFormData => ({
      ...prevFormData,
      metodaDePlata: value
    }));
  };

  const handleTacamuriOptionChange = (event) => {
    const value = event.target.value;
    setTacamuriSelectate(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      'nume', 'prenume', 'email', 'phone', 'tipLivrare', 'metodaDePlata',
      'momentPrimireComanda', 'tacamuri'
    ];
  
    const isValid = requiredFields.every(field => formData[field].trim() !== '');
    
    
    if (!isValid ) {
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Vă rugăm să completați toate câmpurile obligatorii.',
      });
      return;
    }
  
    if (
      formData.nume.trim() === '' ||
      formData.email.trim() === '' ||
      formData.prenume.trim() === '' ||
      formData.phone.trim() === ''
    ) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nume: formData.nume.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        email: formData.email.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        prenume: formData.prenume.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        phone: formData.phone.trim() === '' ? 'Acest câmp este obligatoriu' : '',
      }));
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Vă rugăm să completați toate câmpurile de date personale, acestea sunt obligatorii.',
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
        text: 'Vă rugăm să completați datele cu un număr de telefon valid.',
      });
      return;
    }
  
    // Validarea metodei de livrare
  if (!formData.tipLivrare) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Selectați o metodă de livrare pentru a continua',
    });
    return;
  }

  // Validarea câmpurilor de adresă pentru livrarea la domiciliu
  if (formData.tipLivrare === 'domiciliu' && (!formData.adresaLivrare || !formData.oras || !formData.codPostal)) {
    Swal.fire({
      icon: 'error',
      title: 'Eroare!',
      text: 'Vă rugăm să completați toate câmpurile de adresă pentru livrarea la domiciliu.',
    });
    return;
  }

  // Resetarea erorilor dacă validarea trece
  setErrors({
    adresaLivrare: '',
    oras: '',
    codPostal: ''
  });

  // Validarea metodei de plată
  if (!formData.metodaDePlata) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Selectați o metodă de plată pentru a continua',
    });
    return;
  }

  // Validarea momentului de primire a comenzii
  if (!formData.momentPrimireComanda) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Selectați cand sa primiti comanda pentru a continua',
    });
    return;
  }

  // Validarea tacâmurilor
  if (!formData.tacamuri) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Selectați daca sa primti sau nu tacamuri pentru a continua',
    });
    return;
  }

  // Formatarea datelor înainte de trimiterea la server
  const formattedFormData = {
    ...formData,
    momentPrimireComanda: selectedDateTime.toISOString(),
    instructiuniSpeciale: formData.instructiuniSpeciale, // Convertim data la format ISO
     
  };

  try {
    const response = await axios.post('http://localhost:6001/orders', formattedFormData);

    // Verificăm statusul răspunsului
    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Succes!',
        text: 'Datele comenzii au fost trimise cu succes!',
      });

      // Navigare în funcție de metoda de plată selectată
      if (formData.metodaDePlata === 'online') {
        navigate('/process-checkout');
      } else if (formData.metodaDePlata === 'numerar') {
        navigate('/checkout-numerar');
      }
    } else {
      throw new Error('Failed to send order data');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'A apărut o eroare la trimiterea comenzii.',
    });
  }
};
  
 useEffect(() => {

  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    setFormData(JSON.parse(storedFormData));
  }
}, []);
  


  return (
    <div className='max-w-screen container mx-auto mt-20 text-center '>
    <ul className="timeline timeline-vertical lg:timeline-horizontal m-10 mx-auto flex justify-center items-center ">
  <li>
    
    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
    </div>
    <div className="timeline-end timeline-box">Date Personale</div>
    <hr/>
  </li>
  <li>
    <hr/>
 
    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
    </div>
    <div className="timeline-end timeline-box">Metoda de Livrare</div>
    <hr/>
  </li>
  <li>
    <hr/>

    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
    </div>
    <div className="timeline-end timeline-box">Metoda de Plata</div>
    <hr/>
  </li>
  <li>
    <hr/>

    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
    </div>
    <div className="timeline-end timeline-box">Date Aditionale</div>
    <hr/>
  </li>
  <li>
    <hr/>
    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
    </div>
    <div className="timeline-end timeline-box">Spre Plata</div>
    <hr/>
  </li>
  <li>
    <hr/>
  </li>
</ul>


<h2 className="text-2xl font-semibold my-4 mt-20 text-center">
       Completati detalile <span className="text-green">Comenzii</span>
      </h2>

      <div>
        <form  >
           {/* nume */}
           <h3 className='font-bold mt-10 mb-10 text-left'>Datele dumneavoastra</h3>
           
           <div className="card w-96 bg-base-100 shadow-xl mb-8 mx-auto my-auto ml-1">
            <div className="card-body">
              <h2 className="card-title"><FaRegUser />Date personale</h2>
              <div className="card-actions justify-end">
              </div>

<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Nume</b></span>
  </label>
  <input
    type="text"
    name="nume"
    {...register('nume')}
    value={formData.nume}
    placeholder="Introduceti numele"
    className={`input input-bordered w-full ${errors.nume ? 'input-error' : ''}`}
    onChange={handleInputChange}
  />
  {errors.nume && <span className="error-message">{errors.nume}</span>}
</div>
{/* prenume */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Prenume</b></span>
  </label>
  <input
    type="text"
    name="prenume"
    {...register('prenume')}
    value={formData.prenume}
    placeholder="Introduceti prenumele"
    className={`input input-bordered w-full ${errors.prenume ? 'input-error' : ''}`}
    onChange={handleInputChange}
  />
  {errors.prenume && <span className="error-message">{errors.prenume}</span>}
</div>
{/* email */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>E-mail</b></span>
  </label>
  <input
    type="email" 
    name="email"
    {...register('email', {
      required: 'Acest câmp este obligatoriu',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Introduceți o adresă de email validă',
      },
    })}
    value={formData.email}
    placeholder="Introduceti adresa de email"
    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
    onChange={handleInputChange}
  />
  {errors.email && <span className="error-message">{errors.email}</span>}
</div>
{/* numar_telefon */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Număr Telefon</b></span>  
  </label>
  <input
   className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
    type="tel" 
    name='phone'
    {...register('phone')}
    value={formData.phone}
    placeholder="Introduceti numărul de telefon"
    onChange={handleInputChange}
    required
  />
  {errors.phone && <span className="error-message">{errors.phone}</span>}
  </div>
  </div>
  </div>
</form>
<h3 className='font-bold mt-6 text-left'>Livrare</h3>
<div className="card w-96 bg-base-100 shadow-xl mb-8">
  <div className="card-body">
    <h2 className="card-title">Metoda de livrare</h2>
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <TbTruckDelivery className="mr-2" />
        <span>Livrare la domiciliu</span>
      </div>
      <button
        type="button"
        className="btn btn-green"
        onClick={() => handleLivrareClick()}
      >
        Salvează
      </button>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <FaRunning className="mr-2" />
        <span>Ridicare din restaurant</span>
      </div>
      <button
        type="button"
        className="btn btn-green"
        onClick={() => handleRidicareClick()}
      >
        Salvează
      </button>
    </div>
  </div>
</div>


{livrareLaDomiciliu && (
  <div>
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"><b>Adresa de livrare</b></span>
      </label>
      <input
        type="text"
        name="adresaLivrare"
        value={formData.adresaLivrare || ''}
        placeholder="Introduceti adresa de livrare"
        className={`input input-bordered w-full ${errors.adresaLivrare ? 'input-error' : ''}`}
        onChange={handleInputChange}
      />
      {errors.adresaLivrare && <span className="error-message">{errors.adresaLivrare}</span>}
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"><b>Oras</b></span>
      </label>
      <input
        type="text"
        name="oras"
        value={formData.oras || ''}
        placeholder="Introduceti orasul"
        className={`input input-bordered w-full ${errors.oras ? 'input-error' : ''}`}
        onChange={handleInputChange}
      />
      {errors.oras && <span className="error-message">{errors.oras}</span>}
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"><b>Cod Postal</b></span>
      </label>
      <input
        type="number"
        name="codPostal"
        value={formData.codPostal || ''}
        placeholder="Introduceti codul postal"
        className={`input input-bordered w-full ${errors.codPostal ? 'input-error' : ''}`}
        onChange={handleInputChange}
      />
      {errors.codPostal && <span className="error-message">{errors.codPostal}</span>}
    </div>
  </div>
)}
             {ridicareDinRestaurant && (
            <div>
              <h3 className='font-bold mt-6 text-left'>Informații Importante</h3>
              <div className="form-control w-full text-left ">
                <label className="label">
                  <span className="label-text"><b>Locație restaurant</b></span>
                </label>
                <p>Strada: Teodor Mihali, nr. 67</p>
                <p>Oras: Cluj-Napoca</p>
                <p>Numar Telefon:0754051231</p>
                <p>Email:foodi@yahoo.com</p>
              </div>
            </div>
          )}


    </div>
    <div className='font-bold mt-10 mb-10'>
  <h3 className='text-left'>Metode de plata</h3>
</div>
<div className="card w-96 bg-base-100 shadow-xl mb-8">
  <div className="card-body">
    <h2 className="card-title"><IoCardOutline />Plata</h2>
    <div className="card-actions flex flex-col"> 
      <label className="cursor-pointer label mb-4"> 
        <input type="radio" 
         {...register('metodaDePlata', { required: true })}
          name="metodaPlata" 
          value="plataOnline" 
          className="radio" 
          checked={plataOnlineCuCardul}
          onChange={handlePlataOptionChange} />
        <div className="label-text ml-2">Online cu cardul</div>
      </label>
      <label className="cursor-pointer label"> 
        <input type="radio"  {...register('metodaDePlata', { required: true })}
        name="metodaPlata" value="numerar" 
        checked={plataNumerar}
        className="radio" onChange={handlePlataOptionChange} />
        <div className="label-text ml-2">Numerar </div>
      </label>
    </div>
  </div>
</div>
{plataOnlineCuCardul && (
  <div className="form-control w-full">
    <label className="label">
      <span className="label-text text-red"><b>Detalile Cardului vor fi introduse in pasul urmator</b></span>
    </label>
  </div>
)}


<div className="card w-96 bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title"><CiForkAndKnife /> Doresti tacamuri?</h2>
        <div className="card-actions flex flex-col">
          <label className="cursor-pointer label mb-4">
            <input
              type="radio"
              {...register('tacamuri', { required: true })}
              value="da"
              name="tacamuri"
              className="radio"
              onChange={handleTacamuriOptionChange}
              checked={tacamuriSelectate === "da"}
            />
            <div className="label-text ml-2">Da</div>
          </label>
          <label className="cursor-pointer label">
            <input
              type="radio"
              {...register('tacamuri', { required: true })}
              value="nu"
              name="tacamuri"
              className="radio"
              onChange={handleTacamuriOptionChange}
              checked={tacamuriSelectate === "nu"}
            />
            <div className="label-text ml-2">Nu</div>
          </label>
        </div>
      </div>
    </div>

<div className="card w-96 bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title"><FaRegCalendarAlt />Când vrei să primești comanda?</h2>
          <div className="card-actions flex flex-col">
            <label className="cursor-pointer label mb-4">
            <input
              type="radio"
              {...register('momentPrimireComanda', { required: true })}
              value="catDeRepede"
              name="momentPrimireComanda"
              className="radio"
              onChange={handleTimeOptionChange}
              checked={deliveryTimeOption === 'catDeRepede'}
            />
              <div className="label-text ml-2">Cât de repede</div>
            </label>
            <label className="cursor-pointer label">
            <input
              type="radio"
              {...register('momentPrimireComanda', { required: true })}
              value="alegeData"
              name="momentPrimireComanda"
              className="radio"
              onChange={handleTimeOptionChange}
              checked={deliveryTimeOption === 'alegeData'}
            />
              <div className="label-text ml-2">Mai târziu</div>
            </label>
          </div>
        </div>
      </div>

      {/* Afișează câmpul de selectare a datei și orei doar dacă showDateTimePicker este true */}
      {showDateTimePicker && (
        <div className="card w-96 bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <label>Selectează data și ora:</label>
            {/* DateTimePicker pentru a selecta data și ora */}
            <DateTimePicker
              onChange={(date) => setSelectedDateTime(date)}
              value={selectedDateTime}
              minDate={minDate}
            />
          </div>
        </div>
      )}

<div className="card w-96 bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Instructiuni speciale</h2>
          <label className="label">

  </label>
  <textarea
    name="instructiuniSpeciale"
    value={formData.instructiuniSpeciale}
    placeholder="opțional"
    className="textarea textarea-bordered w-full"
    onChange={handleInputChange}
  />
</div>
</div>


<Link to="/cart-page"><button className="btn bg-green text-white m-3">Inapoi la cosul de cumparaturi</button></Link>
<button
  onClick={handleSubmit}
  className="btn bg-green text-white mt-3 mb-3"
>
Trimite Comanda
</button>


</div>
  )
}
export default CartDetails