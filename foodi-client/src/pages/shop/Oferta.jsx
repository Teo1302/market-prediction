
import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
const Oferta = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Number of items to display per page
  
    useEffect(() => {
      // Fetch data from the backend
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:6001/menu");
          const data = await response.json();
          setMenu(data);
          setFilteredItems(data); // Initially, display all items
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const filterItems = (category) => {
      const filtered =
        category === "all"
          ? menu
          : menu.filter((item) => item.category === category);
  
      setFilteredItems(filtered);
      setSelectedCategory(category);
      setCurrentPage(1);
    };
  
    const showAll = () => {
      setFilteredItems(menu);
      setSelectedCategory("all");
      setCurrentPage(1); 
    };

  
  return (
<div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Bucura-te de oferta noastra la cele mai grozave <span className="text-green">Meniuri</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
            Promotie valabila incepand cu ora 20:00 in fiecare zi!
            </p>
            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Profita Acum
            </button>
          </div>
        </div>
      </div>





</div>
  )}

export default Oferta