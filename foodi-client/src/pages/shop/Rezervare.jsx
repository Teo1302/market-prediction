import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic.jsx';
import useAxiosSecure from '../../hooks/useAxiosSecure.jsx';
import { Link } from 'react-router-dom';
import Reservation from './Reservation.jsx';



const Rezervare = () => {
  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Reservation API endpoint
  const reservationEndpoint = '/rezervare'; 

  const onSubmit = async (data) => {
    // Implement your reservation submission logic here
    try {
      const isValid = await trigger();
      if (isValid) {
        // Adăugați aici solicitarea Axios pentru a salva rezervarea în baza de date
        const response = await axiosSecure.post(reservationEndpoint, data);

        // Verificați răspunsul și acționați în consecință
        if (response.status === 200) {
          // Show success message
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rezervarea ta a fost facuta cu succes! Va multumim!',
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/vizualizare-rezervari');
        } else {
          // Show an error message if the request was not successful
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later.',
          });
        }
      }
      reset();
    } catch (error) {
      console.error('Error submitting reservation:', error);
      // Show an error message if there was an unexpected error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto ">
      <h2 className="text-2xl font-semibold my-4 mt-20">
       Rezervare <span className="text-green">Masa</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
           {/* nume */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Nume</b></span>
  </label>
  <input
    type="text"
    {...register('nume', {
      required: 'Acest câmp este obligatoriu',
      pattern: {
        value: /^[A-Za-z ]+$/,
        message: 'Nu poti scrie alte caractere decat litere',
      },
    })}
    placeholder="Introduceti numele"
    className={`input input-bordered w-full ${errors.nume ? 'input-error' : ''}`}
    onBlur={async () => {
      // Activează funcția de validare când utilizatorul părăsește câmpul
      await trigger('nume');
    }}
  />
  {errors.nume && <span className="error-message">{errors.nume.message}</span>}
</div>
{/* prenume */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Prenume</b></span>
  </label>
  <input
    type="text"
    {...register('prenume', {
      required: 'Acest câmp este obligatoriu',
      pattern: {
        value: /^[A-Za-z ]+$/,
        message: 'Nu poti scrie alte caractere decat litere',
      },
    })}
    placeholder="Introduceti prenumele"
    className={`input input-bordered w-full ${errors.prenume ? 'input-error' : ''}`}
    onBlur={async () => {
      // Activează funcția de validare când utilizatorul părăsește câmpul
      await trigger('prenume');
    }}
  />
  {errors.prenume && <span className="error-message">{errors.prenume.message}</span>}
</div>
{/* email */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>E-mail</b></span>
  </label>
  <input
    type="email" 
    {...register('email', {
      required: 'Acest câmp este obligatoriu',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Introduceți o adresă de email validă',
      },
    })}
    placeholder="Introduceti adresa de email"
    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
    onBlur={async () => {
      // Activează funcția de validare când utilizatorul părăsește câmpul
      await trigger('email');
    }}
  />
  {errors.email && <span className="error-message">{errors.email.message}</span>}
</div>
{/* numar_telefon */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Număr Telefon</b></span>  
  </label>
  <input
    type="tel" 
    {...register('phoneNumber', {
      required: 'Acest câmp este obligatoriu',
      pattern: {
        value: /^[0-9]+$/,
        message: 'Introduceți un număr de telefon valid',
      },
    })}
    placeholder="Introduceti numărul de telefon"
    className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : ''}`}
    onBlur={async () => {
      await trigger('phoneNumber');
    }}
  />
  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber.message}</span>}
</div>


{/* data */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Data</b></span>
  </label>
  <input
    type="date"
    {...register('date', { required: true })}
    className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
    onBlur={async () => {
      await trigger('date');
    }}
  />
  {errors.date && <span className="error-message">{errors.date.message}</span>}
</div>

{/* ora */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Ora</b></span>
  </label>
  <input
    type="time"
    {...register('time', { required: true })}
    className={`input input-bordered w-full ${errors.time ? 'input-error' : ''}`}
    onBlur={async () => {
      await trigger('time');
    }}
  />
  {errors.time && <span className="error-message">{errors.time.message}</span>}
</div>

{/* nr_persoane */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Numar Persoane</b></span>
  </label>
  <input
    type="number"
    {...register('numberOfPersons', {
      required: 'Acest câmp este obligatoriu',
      min: {
        value: 1,
        message: 'Introduceți un număr valid (minim 1 persoană)',
      },
    })}
    placeholder="Introduceti numarul de persoane"
    className={`input input-bordered w-full ${errors.numberOfPersons ? 'input-error' : ''}`}
    onBlur={async () => {
      await trigger('numberOfPersons');
    }}
  />
  {errors.numberOfPersons && <span className="error-message">{errors.numberOfPersons.message}</span>}
</div>

{/* date_aditionale */}
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"><b>Date Adiționale</b></span>  
  </label>
  <textarea
    {...register('additionalDates')}
    placeholder="Introduceti informații suplimentare sau cerințe speciale"
    className={`textarea textarea-bordered w-full `}
    onBlur={async () => {
      await trigger('additionalDates');
    }}
  />
  
</div>

<button type="submit" className="btn bg-green text-white px-6 mt-4">
            Rezerva masa <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rezervare;
