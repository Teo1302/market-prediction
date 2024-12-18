import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { MdDashboard,MdDashboardCustomize} from "react-icons/md";
import { FaShoppingBag,FaPlusCircle,FaRegUser,FaEdit,FaLocationArrow,FaQuestionCircle, FaUsers} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import logo from "/logo.jpg";
import Login from "/src/components/Login"
import useAuth from "../hooks/useAuth"
import useAdmin from "../hooks/useAdmin"
import { LuMessageCircle } from "react-icons/lu";


const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
        <Link to="/menu"><FaCartShopping/> Meniu</Link>
    </li>

  </>
);

const DashboardLayout = () => {
  const {loading} = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <div>
    {
      isAdmin ?   <div className="drawer sm:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
        {/* continut pagina */}
        <div className="flex items-center justify-between mx-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <MdDashboardCustomize />
          </label>
          <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
            <FaRegUser /> Logout
          </button>
        </div>
        <div className="mt-5 md:mt-2 mx-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar continut */}
          <li>
        <Link to="/dashboard"className=' flex justify-start mb-3'>
         <img src={logo} alt="" className='w-20' />
         <span className="badge badge-primary">admin</span>
        </Link>
        </li>
          <hr />
          <li className="mt-3">
            <Link to="/dashboard">
              <MdDashboard /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/vizualizare-rezervari">
              <FaShoppingBag /> Gestiune Rezervari
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-menu">
              <FaPlusCircle />
              Adauga Meniu
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-items">
              <FaEdit /> Gestioneaza Meniuri
            </Link>
          </li>
          <li className="mb-1">
            <Link to="/dashboard/users">
              <FaUsers /> Vizualizare Utilizatori
            </Link>
          </li>
          <li >
            <Link to="/dashboard/mesaje-clienti">
            <LuMessageCircle />Mesaje Clienti
            </Link>
          </li>
          <li >
            <Link to="/dashboard/comenzi">
            <FaLocationArrow/> Comenzile Clientilor
            </Link>
    
          </li>
         
          <hr />
          {/* shared nav links */}
          {
              sharedLinks
          }
        </ul>
      </div>
    </div> : (loading ? <Login/> : <div className="h-screen flex justify-center items-center"><Link to="/"><button className="btn bg-green text-white">Inapoi la Pagina Principala</button></Link></div>)
}
    </div>
  );
};
export default DashboardLayout