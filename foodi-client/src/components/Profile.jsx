import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";


const Profile = ({ user }) => {
  const {logOut} = useContext(AuthContext);
  const navigate = useNavigate();

  //iesire din cont
  const handleLogout = () => {
    logOut()
    .then(() => {
      navigate("/")
      // iesire din cont cu succes
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Continut pag*/}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {
                user.photoURL ? <img
                alt="Tailwind CSS Navbar component"
                src={user.photoURL}
              /> : <img alt="poza" src="https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg" />
              }
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar continut */}
            <li>
              <a href="/update-profile">Profil</a>
            </li>
            <li>
              <a href="/order">Comenzile mele</a>
            </li>
            <li>
              <a href="/rezervare-client">Rezervarile mele</a>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Deconectare</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;