
import React from 'react';
import { Link } from 'react-router-dom';
const categoryItems=[
    {id:1, title:"Pizza",des:"(10 feluri)",route: "/pizza", image:"images/home/poza_pizza_categ.png"},
    {id:2, title:"Paste",des:"(8 feluri)",route: "/paste", image:"images/home/paste_categ.jpg"},
    {id:3, title:"Desert",des:"(6 feluri)",route: "/desert", image:"images/home/categ3.jpg"},
    {id:4, title:"Bauturi",des:"(11 feluri)",route: "/bauturi", image:"images/home/categ4.jpg"},
]
const Categories = () => {
  return (
    <div className='section-container py-20'>
      <div className='text-center'>
        <p className='subtitle'>Favoritele clientilor nostrii</p>
        <p className='text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug text-size-30px'>
          Categorii Populare
        </p>
      </div>

      {/* category cards */}
      <div className='flex fle-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
        {
            categoryItems.map((item,i)=>(
                <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:translate-y-4 duration-300 transition-all'>
                    <div className='flex w-full mx-auto items-center justify-center'>
                        <img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-30 h-30'/>
                    </div>
                    <div className='mt-5 space-y-1'>
                         <h5>{item.title}</h5>
                         <p>{item.des}</p>
                         
                         <Link to={item.route} className='btn bg-green px-4 py-2 text-white rounded-full'>
                Vezi Meniu
              </Link>

                    </div>


                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Categories;
