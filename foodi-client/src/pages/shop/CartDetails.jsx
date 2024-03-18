
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRunning } from "react-icons/fa";
import { CiForkAndKnife } from "react-icons/ci";
import DateTimePicker from 'react-datetime-picker';
import { FaRegCalendarAlt } from "react-icons/fa";
import useAuth from '../../hooks/useAuth.jsx';

const CartDetails = () => {
  const [livrareLaDomiciliu, setLivrareLaDomiciliu] = useState(false);
  const [ridicareDinRestaurant, setRidicareDinRestaurant] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [plataOnlineCuCardul, setPlataOnlineCuCardul] = useState(false);
  const [plataNumerar,setPlataNumerar]=useState(false);
  const { register, reset, trigger, formState: { isSubmitting } } = useForm();
  const [detaliiCompletate, setDetaliiCompletate] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [metodaDeLivrareSelectata, setMetodaDeLivrareSelectata] = useState(false);
  const [metodaDePlataSelectata, setmetodaDePlataSelectata] = useState(false);
  const [tacamuriSelectate, setTacamuriSelectate] = useState('');
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    prenume: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    nume: '',
    email: '',
    prenume: '',
    phone: ''
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Previne comportamentul implicit de trimitere a formularului
    
    // Verifică dacă câmpurile obligatorii sunt goale
    if (
      formData.nume.trim() === '' ||
      formData.email.trim() === '' ||
      formData.prenume.trim() === '' ||
      formData.phone.trim() === '' 
     
    ) {
      // Actualizează starea de eroare pentru câmpurile goale
      setErrors(prevErrors => ({
        ...prevErrors,
        nume: formData.nume.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        email: formData.email.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        prenume: formData.prenume.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        phone: formData.phone.trim() === '' ? 'Acest câmp este obligatoriu' : '',
        
      }));
      // Afișează un mesaj de eroare folosind SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Eroare!',
        text: 'Vă rugăm să completați toate câmpurile de date personale, acestea sunt obligatorii.',
      });
      return;}
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
         // Opriți trimiterea formularului dacă numărul de telefon nu respectă restricțiile
      }
      // Adăugați aici logica pentru trimiterea formularului către server sau altă acțiune
      
      // Afișați un mesaj de succes folosind SweetAlert
      //Swal.fire({
       // icon: 'success',
       // title: 'Succes!',
       // text: 'Datele comenzii au fost trimise cu succes!',
      //}); // Opriți trimiterea formularului dacă unul dintre câmpurile obligatorii este gol
    }


 
  
  
  const handleGoToPayment = () => {
    handleSubmit()
    const isFormCompleted =
    !errors.nume &&
    !errors.prenume &&
    !errors.email &&
    !errors.phoneNumber &&
    metodaDeLivrareSelectata &&
    metodaDePlataSelectata &&
    tacamuriSelectate &&
    selectedDateTime;

    if (!isFormCompleted) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completează toate câmpurile personale pentru a merge spre plata online',
      });
    } else if (!metodaDeLivrareSelectata) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selectați o metodă de livrare pentru a continua',
      });
    } else if (livrareLaDomiciliu && (!register('adresaLivrare').value || !register('oras').value || !register('codPostal').value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completați datele necesare livrarii la domiciliu pentru a continua',
      });
    }
    else if (!tacamuriSelectate) {
      // Afișează mesajul de eroare dacă nu este selectată nicio opțiune pentru tacâmuri
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selectați dacă doriți sau nu tacâmuri pentru comanda dvs.',
      });
    }
    else if (showDateTimePicker && selectedDateTime < new Date()) {
      // Verificați dacă utilizatorul a selectat o dată și oră mai mică decât data și ora curentă
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selectați o dată și oră validă pentru livrare',
      });}
      else if (!showDateTimePicker) {
        // Afișați un mesaj de eroare specific atunci când utilizatorul nu a selectat nicio opțiune pentru data și ora livrării
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Selectați când doriți să primiți comanda',
        });
      } 
    else if (!metodaDePlataSelectata) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selectați o metodă de plata pentru a continua',
      });
    }
      if (plataOnlineCuCardul) {
        // Redirectează către plata online
        navigate('/process-checkout');
      } else if(plataNumerar){
        // Aici poți adăuga logica pentru altfel de plată (de exemplu, plata la livrare)
        // Poți adăuga și o altă condiție sau funcționalitate specifică pentru altfel de plată
        // De exemplu, dacă plata se face la livrare, poți afișa o altă pagină sau poți executa o altă acțiune
        // În lipsa unei specificații clare privind comportamentul dorit, nu pot oferi un exemplu specific
        navigate('/checkout-numerar');
      }
    }
  
  
  

  const handleTimeOptionChange = (event) => {
    const value = event.target.value;
    // Dacă utilizatorul selectează opțiunea "Mai traziu", arată câmpul de selectare a datei și orei
    setShowDateTimePicker(value === "Mai traziu");
  };
 
  const handleLivrareClick = () => {
    setLivrareLaDomiciliu(true);
    setRidicareDinRestaurant(false);
    setMetodaDeLivrareSelectata(true);
  };

  const handleRidicareClick = () => {
    setLivrareLaDomiciliu(false);
    setRidicareDinRestaurant(true);
    setMetodaDeLivrareSelectata(true);
  };
  const handlePlataOptionChange = (event) => {
    const value = event.target.value;
    if (value === "plataOnline") {
      setPlataOnlineCuCardul(true);
    } else {
      setPlataOnlineCuCardul(false);
    }
  };
  const handleTacamuriOptionChange = (event) => {
    const value = event.target.value;
    setTacamuriSelectate(value);
  };
  

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-20 text-center'>
    <ul className="timeline timeline-vertical lg:timeline-horizontal mt-30 mx-auto">
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
  </li>
</ul>


<h2 className="text-2xl font-semibold my-4 mt-20 text-center">
       Completati detalile <span className="text-green">Comenzii</span>
      </h2>

      <div>
        <form >
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
  {errors.nume && <span className="error-message">{errors.nume.message}</span>}
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
  {errors.prenume && <span className="error-message">{errors.prenume.message}</span>}
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
  {errors.email && <span className="error-message">{errors.email.message}</span>}
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
  {errors.phone && <span className="error-message">{errors.phone.message}</span>}
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
                  {...register('adresaLivrare', {
                    required: 'Acest câmp este obligatoriu',
                    // ... alte validări necesare
                  })}
                  placeholder="Introduceti adresa de livrare"
                  className={`input input-bordered w-full ${errors.adresaLivrare ? 'input-error' : ''}`}
                  onBlur={async () => {
                    // Activează funcția de validare când utilizatorul părăsește câmpul
                    await trigger('adresaLivrare');
                  }}
                />
                {errors.adresaLivrare && <span className="error-message">{errors.adresaLivrare.message}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text"><b>Oras</b></span>
                </label>
                <input
                  type="text"
                  {...register('oras', {
                    required: 'Acest câmp este obligatoriu',
                    // ... alte validări necesare
                  })}
                  placeholder="Introduceti orasul"
                  className={`input input-bordered w-full ${errors.oras ? 'input-error' : ''}`}
                  onBlur={async () => {
                    // Activează funcția de validare când utilizatorul părăsește câmpul
                    await trigger('oras');
                  }}
                />
                {errors.oras && <span className="error-message">{errors.oras.message}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text"><b>Cod Postal</b></span>
                </label>
                <input
                  type="number"
                  {...register('codPostal', {
                    required: 'Acest câmp este obligatoriu',
                    // ... alte validări necesare
                  })}
                  placeholder="Introduceti codul postal"
                  className={`input input-bordered w-full ${errors.codPostal ? 'input-error' : ''}`}
                  onBlur={async () => {
                    // Activează funcția de validare când utilizatorul părăsește câmpul
                    await trigger('codPostal');
                  }}
                />
                {errors.codPostal && <span className="error-message">{errors.codPostal.message}</span>}
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
        <input type="radio" {...register('metodaDePlata')} value="plataOnline" className="radio" onChange={handlePlataOptionChange} />
        <div className="label-text ml-2">Online cu cardul</div>
      </label>
      <label className="cursor-pointer label"> 
        <input type="radio" {...register('metodaDePlata')} value="plataNumerar" className="radio" onChange={handlePlataOptionChange} />
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
    <h2 className="card-title"><CiForkAndKnife />Doresti tacamuri?</h2>
    <div className="card-actions flex flex-col"> 
      <label className="cursor-pointer label mb-4"> 
        <input type="radio" value="da" name="tacamuri" className="radio" onChange={handleTacamuriOptionChange} />
        <div className="label-text ml-2">Da</div>
      </label>
      <label className="cursor-pointer label"> 
        <input type="radio"  value="nu"  name="tacamuri" className="radio" onChange={handleTacamuriOptionChange} />
        <div className="label-text ml-2">Nu </div>
      </label>
    </div>
  </div>
</div>


<div className="card w-96 bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title"><FaRegCalendarAlt />Când vrei să primești comanda?</h2>
          <div className="card-actions flex flex-col">
            <label className="cursor-pointer label mb-4">
              <input type="radio" value="acum" name="data" className="radio" onChange={handleTimeOptionChange} />
              <div className="label-text ml-2">Cât de repede</div>
            </label>
            <label className="cursor-pointer label">
              <input type="radio" value="Mai traziu" name="data" className="radio" onChange={handleTimeOptionChange} />
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
            />
          </div>
        </div>
      )}

<div className="card w-96 bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Instructiuni speciale</h2>
          <div className="card-actions flex flex-col">
            <label className="cursor-pointer label mb-4">
                <input
                  type="text"
                  placeholder="optional"
                  ></input>
            </label>

</div>
</div>
</div>

<button onClick={handleGoToPayment}>Mergi spre plata online</button>


</div>

  )
}



export default CartDetails