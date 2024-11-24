import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            alert("Înregistrare realizată cu succes!");
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          setError("email", {
            type: "manual",
            message: "Email-ul este deja înregistrat. Te rog folosește alt email.",
          });
        } else if (errorCode === "auth/weak-password") {
          setError("password", {
            type: "manual",
            message: "Parola trebuie să conțină cel puțin 6 caractere.",
          });
        } else {
          console.error("Eroare la înregistrare:", errorMessage);
        }
      });
  };

  // Validare custom pentru parolă: să conțină atât litere cât și cifre
  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
    return regex.test(value) || "Parola trebuie să conțină cel puțin o literă și o cifră.";
  };
// login with google
const handleRegister = () => {
  signUpWithGmail()
    .then((result) => {
      const user = result.user;
      const userInfor = {
        name: result?.user?.displayName,
        email: result?.user?.email,
      };
      axiosPublic
        .post("/users", userInfor)
        .then((response) => {
          // console.log(response);
          alert("Inregistrare realizata cu succes!");
          navigate("/");
        });
    })
    .catch((error) => console.log(error));
};
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Creare cont Utilizator nou</h3>

          {/* Nume */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nume</span>
            </label>
            <input
              type="text"
              placeholder="Introduceți numele dvs."
              className={`input input-bordered ${errors.name ? "input-error" : ""}`}
              {...register("name", {
                required: "Numele este obligatoriu.",
                validate: (value) => !/\d/.test(value) || "Numele nu poate conține cifre.",
              })}
            />
            {errors.name && <p className="text-xs text-red">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Introduceți email-ul dvs."
              className={`input input-bordered ${errors.email ? "input-error" : ""}`}
              {...register("email", { required: "Email-ul este obligatoriu." })}
            />
            {errors.email && <p className="text-xs text-red">{errors.email.message}</p>}
          </div>

          {/* Parolă */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Parolă</span>
            </label>
            <input
              type="password"
              placeholder="Introduceți parola"
              className={`input input-bordered ${errors.password ? "input-error" : ""}`}
              {...register("password", {
                required: "Parola este obligatorie.",
                minLength: { value: 6, message: "Parola trebuie să conțină cel puțin 6 caractere." },
                validate: validatePassword,
              })}
            />
            {errors.password && <p className="text-xs text-red">{errors.password.message}</p>}
          </div>

          {/* Buton de submit */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Înregistrează-te"
            />
          </div>

          {/* Link către autentificare */}
          <div className="text-center my-2">
            Ai deja cont?
            <Link to="/login">
              <button className="ml-2 underline">Autentifică-te aici</button>
            </Link>
          </div>
        </form>

        {/* Buton pentru înregistrare cu Google */}
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
