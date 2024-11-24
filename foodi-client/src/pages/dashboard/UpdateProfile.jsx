import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
    const {updateUserProfile} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const location = useLocation();
      const navigate = useNavigate();
      const from = location.state?.from?.pathname || "/";

      
      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile(name, photoURL).then(() => {
           
            navigate(from, {replace: true})
          
          }).catch((error) => {
           
          });
      }


  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h3 className='font-bold'>Modifica Profilul</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nume</span>
          </label>
          <input {...register("name")} type="text" placeholder="Numele tau" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Incarca Poza</span>
          </label>

          <input type="text" {...register("photoURL")} placeholder="pozaURL" className="input input-bordered" required />
     
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-green text-white">Modifica</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UpdateProfile