import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 py-10 px-4 text-base-content bg-gray-100">
        <aside>
          <img src="/logo.jpg" alt="" />
          <p className="my-3 md:w-40">Oricand, la tine acasa</p>
        </aside>
        <nav>
          <header className="footer-title text-black">Linkuri utile</header>
          <a className="link link-hover">Despre noi</a>
  
      
        </nav>
        <nav>
          <header className="footer-title">Descopera</header>
          <a href="/"className="link link-hover">Pagina Principala</a>
          <a href="/signup"className="link link-hover">Inregistreaza-te</a>
          <a href="/rezervare"className="link link-hover">Rezerva Masa</a>
          <a href="/menu"className="link link-hover">Meniu</a>
   
        </nav>
        <nav>
          <header className="footer-title">Contact</header>
          <a  href="mailto:hello@foodi.ro" className="link link-hover">hello@foodi.ro</a>
          <a  href="tel:0747057370" className="link link-hover">0747 057 370</a>
        </nav>
        <nav>
          <header className="footer-title ">Social Media</header>
          <div >
          <a
              href="https://www.facebook.com/teodora.radu.52?locale=ro_RO"
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://github.com/Teo1302?tab=repositories"
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/teoradu02/"
              className="btn btn-circle hover:bg-green hover:text-white"
            >
              <FaInstagram />
            </a>
          </div>
        </nav>
      </footer>
      <hr />
      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2">
        <aside className="items-center grid-flow-col">
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
