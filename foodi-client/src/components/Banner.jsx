import React from 'react';
import { Link } from 'react-router-dom';


function Banner() {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#f3f4f6] to-100%'>
      <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
        {/* text */}
        <div className='md:w-1/2 ml-32 space-y-7 px-4'>
          <h2 className='md:text-6xl text-4xl font-bold text-green-500 md:leading-snug leading-snug transition-all duration-300 hover:scale-105'>
            Bucurați-vă de o Explozie Gustativă{' '}
            <span className='text-green'>Unică</span>
          </h2>
          <p className='text-x1 text-[#4A4A4A]'>
          Delicatețe la Fiecare Pas
          </p>
          <Link to="/menu">
          <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>Comanda Acum</button>
          </Link>
          
        </div>
        {/* images */}
        <div className='md:w-1/2'>
           <img src="pozaPrincipala.jpg" alt="poza"></img> 
        </div>
      </div>
    </div>
  );
}

export default Banner;
