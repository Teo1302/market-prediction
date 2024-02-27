import React from "react";
const serviceLists = [
    {id:1, title: "Catering", des: "Încântați invitații cu aromele și prezentarea noastră", img: "/images/home/services/icon1.png"},
    {id:2, title: "Livrare rapidă", des: "Livram comanda ta prompt la ușa ta", img: "/images/home/services/icon2.png"},
    {id:3, title: "Comandă online", des: "Explorează meniul și comandă cu ușurință folosind platforma noastră de comandă online", img: "/images/home/services/icon3.png"},
    {id:4, title: "Carduri Cadou", des: "Oferă darul unei experiențe culinare excepționale cu Cardurile Cadou Foodi", img: "/images/home/services/icon4.png"},
];

const Services = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5 ml-20">
            <p className="subtitle">Povestea noastra si totul despre ce servicii oferim</p>
            <h2 className="title">Experienta noastra culianara si servicii </h2>
            <p className="my-5 text-secondary leading-[30px]">
            Înrădăcinată în pasiune, noi elaborăm experiențe culinare de neuitat și oferim servicii excepționale, îmbinând arta culinară cu ospitalitatea caldă.
            </p>

            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Exploreaza
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-[#90BD95]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;