import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure.jsx';
import { AuthContext } from "../../contexts/AuthProvider";

const Rezervare = () => {
  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const reservationEndpoint = '/rezervare'; 

  const onSubmit = async (data) => {
    try {
      const isValid = await trigger();
      if (isValid) {
        const response = await axiosSecure.post(reservationEndpoint, data);

        if (response.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rezervarea ta a fost facuta cu succes! Va multumim!',
            showConfirmButton: false,
            timer: 2000,
          });
          navigate('/rezervare-client');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message || 'Ceva nu s-a realizat corect.Te rugam sa reincerci.',
          });
        }
      }
      reset();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Capacitate maximă atinsă',
          text: error.response.data.message,
        });
      } else {
        console.error('Eroare la trimiterea rezervarii', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ceva nu s-a realizat corect.Te rugam sa reincerci.',
        });
      }
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
    onInput={(e) => {
      // Împiedică introducerea cifrelor
      e.target.value = e.target.value.replace(/[^A-Za-z ]/g, '');
    }}
    onBlur={async () => {
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
    onInput={(e) => {
      // Împiedică introducerea cifrelor
      e.target.value = e.target.value.replace(/[^A-Za-z ]/g, '');
    }}
    onBlur={async () => {
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
              defaultValue={user?.email} 
              readOnly  
              placeholder="Introduceti adresa de email"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              onBlur={async () => {
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
        value: /^[0-9]{10}$/,
        message: 'Introduceți un număr de telefon valid de 10 cifre',
      },
      maxLength: {
        value: 10,
        message: 'Numărul de telefon trebuie să aibă exact 10 cifre',
      },
      minLength: {
        value: 10,
        message: 'Numărul de telefon trebuie să aibă exact 10 cifre',
      },
    })}
    placeholder="Introduceti numărul de telefon"
    className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : ''}`}
    onInput={(e) => {
      // Împiedică introducerea literelor
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }}
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
    {...register('date', { required: 'Acest câmp este obligatoriu' })}
    className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
    min={new Date().toISOString().split('T')[0]} // Setează data minimă la ziua curentă
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
                max: {
                  value: 20,
                  message: 'Numărul maxim de persoane pentru o rezervare este 20',
                },
              })}
              placeholder="Introduceti numarul de persoane"
              className={`input input-bordered w-full ${errors.numberOfPersons ? 'input-error' : ''}`}
              onBlur={async () => {
                setNumberOfPersons(Number(event.target.value));
                await trigger('numberOfPersons');
              }}
            />
            {errors.numberOfPersons && <span className="error-message">{errors.numberOfPersons.message}</span>}
          </div>
          {numberOfPersons > 20 && (
            <div className="alert alert-warning mt-2">
              Pentru a rezerva o masa avand mai mult de 20 de persoane, vă rugăm să sunați la restaurant. 0754051231
            </div>
          )}
          {/* date_aditionale */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"><b>Date Adiționale</b></span>  
            </label>
            <textarea
              {...register('additionalDates')}
              placeholder="Introduceti informații suplimentare sau cerințe speciale"
              className="textarea textarea-bordered w-full"
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
