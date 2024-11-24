import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();


  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Funcția de trimitere a formularului

const onSubmit = (data) => {
  const email = data.email;
  const password = data.password;
  login(email, password)
    .then((result) => {
      // Utilizator autentificat cu succes
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };
      // Trimite informațiile utilizatorului către server
      axiosPublic
        .post("/users", userInfo)
        .then((response) => {
          console.log(response.data);
          alert("Autentificare reușită!");
          navigate("/"); // Redirecționează către pagina de proveniență sau acasă
        })
        .catch((error) => {
          console.error("Eroare la trimiterea datelor către server:", error);
          // Afiseaza mesajul de eroare din partea serverului
          if (error.response) {
            console.error("Detalii eroare server:", error.response.data);
          }
        });
    })
    .catch((error) => {
      if (error.response && error.response.status === 302) {
        setErrorMessage("Autentificare reușită!");
        setTimeout(() => {
          setErrorMessage("");
          document.getElementById("my_modal_5").close();
          navigate("/"); // Navigăm către pagina principală
        }, 1000);
      } else {
        const errorMessage = error.message;
        setErrorMessage("Te rog introdu o adresă de email și o parolă valide!");
      }
      reset(); // Resetarea câmpurilor formularului după trimitere
    });
};

  // Funcția pentru autentificarea cu Google
  const handleLoginWithGoogle = () => {
    signUpWithGmail() // Autentifică utilizatorul cu Google
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        };
        axiosPublic
          .post("/users", userInfo) // Trimite informațiile utilizatorului la server pentru verificare
          .then((response) => {
            console.log(response.data);
            alert("Autentificare cu Google reușită!"); // Mesaj de succes
            navigate("/"); // Redirecționează utilizatorul către pagina principală
          })
          .catch((error) => {
            console.error("Eroare la trimiterea datelor către server:", error);
          });
      })
      .catch((error) => console.error("Eroare la autentificare cu Google:", error));
  };
  

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Te rog, Autentifică-te!!</h3>

          {/* Email */}
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

          {/* Parolă */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Parolă</span>
            </label>
            <input
              type="password"
              placeholder="parolă"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
               
              </a>
            </label>
          </div>

          {/* Afișare erori */}
          {errorMessage && (
            <p className="text-red text-xs italic">
              Introdu te rog un email și o parolă corectă.
            </p>
          )}

          {/* Buton de submit */}
          <div className="form-control mt-4">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Autentifică-te"
            />
          </div>

          {/* Buton de închidere */}
          <Link to="/">
            <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </div>
          </Link>

          {/* Link către pagina de înregistrare */}
          <p className="text-center my-2">
            Nu ai cont?
            <Link to="/signup" className="underline text-red ml-1">
              Înregistrează-te Acum!
            </Link>
          </p>
        </form>

        {/* Buton pentru autentificare cu Google */}
        <div className="text-center space-x-3">
          <button
            onClick={handleLoginWithGoogle}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
