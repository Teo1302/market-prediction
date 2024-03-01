
import React from 'react';
const categoryItems=[
    {id:1, title:"FastFood",des:"(20 feluri)", image:"images/home/categ1.jpg"},
    {id:2, title:"Mic dejun",des:"(10 feluri)", image:"images/home/categ2.jpg"},
    {id:3, title:"Desert",des:"(5 feluri)", image:"images/home/categ3.jpg"},
    {id:4, title:"Altele",des:"(30 feluri)", image:"images/home/categ4.jpg"},
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
                        <img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28'/>
                    </div>
                    <div className='mt-5 space-y-1'>
                         <h5>{item.title}</h5>
                         <p>{item.des}</p>
                    </div>


                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Categories;
