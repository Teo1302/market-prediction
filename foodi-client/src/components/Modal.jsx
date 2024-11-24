import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        // Signed in successfully
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };

        axios
        .post("http://localhost:6001/users", userInfor)
        .then((response) => {
          setSuccessMessage("Autentificare reușită!");
          setTimeout(() => {
            setSuccessMessage("");
            document.getElementById("my_modal_5").close();
            navigate("/");
          }, 2000); 
        })
        .catch((error) => {
          if (error.response && error.response.status === 302) {
            setSuccessMessage("Autentificare reușită!"); 
            setTimeout(() => {
              setSuccessMessage("");
              document.getElementById("my_modal_5").close();
              navigate("/"); 
            }, 1000);
          }
        });
      }
      )} ;    

  // login with google
  const handleLoginWithGoogle = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };

        axios
          .post("http://localhost:6001/users", userInfor)
          .then((response) => {
            setSuccessMessage("Autentificare reușită!");
            setTimeout(() => {
              setSuccessMessage("");
              document.getElementById("my_modal_5").close();
              navigate("/");
            }, 2000); 
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Te rog, Logheaza-te!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* parola */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Parola</span>
              </label>
              <input
                type="password"
                placeholder="parola"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2"></a>
              </label>
            </div>

            {/* erori vizibile*/}
            {errorMessage && (
              <p className="text-red text-xs italic">{errorMessage}</p>
            )}

            {/* mesaj de succes */}
            {successMessage && (
              <p className="text-green text-xs italic">{successMessage}</p>
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green text-white"
                value="Login"
              />
            </div>

            {/* close btn */}
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>

            <p className="text-center my-2">
              Nu aveți cont?
              <Link to="/signup" className="underline text-red ml-1">
                Înregistrați-vă
              </Link>
            </p>
          </form>
          <div className="text-center space-x-3 mb-5">
            <button
              onClick={handleLoginWithGoogle}
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
