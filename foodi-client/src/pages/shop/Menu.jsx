import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 
  const [searchInput, setSearchInput] = useState("");

 // Efect pentru încărcarea datelor inițiale din backend
  useEffect(() => {
    // preia datele din backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        setMenu(data);// Setează starea meniu cu datele primite de la server
        setFilteredItems(data); // Setează inițial filtrul cu toate elementele
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 
 // Efect pentru filtrarea datelor când se schimbă căutarea
  useEffect(() => {
    filterBySearch();
  }, [searchInput]); 
 // Funcție pentru filtrarea după textul introdus în căutare
  const filterBySearch = () => {
    if (searchInput.trim() === "") {
      setFilteredItems(menu); // Dacă căutarea e goală, arată toate elementele
    } else {
      const filtered = menu.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredItems(filtered); // Filtrare după numele elementului
    }
    setCurrentPage(1); 
     // Resetează pagina curentă la 1 când se schimbă căutarea
  };

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu// Arată toate elementele
        : menu.filter((item) => item.category === category);// Filtrare după categorie

    setFilteredItems(filtered);// Setează elementele filtrate
    setSelectedCategory(category);// Setează categoria selectată
    setCurrentPage(1);// Resetează pagina curentă la 1 când se schimbă categoria
  };
 // Funcție pentru schimbarea opțiunii de sortare
  const handleSortChange = (option) => {
    setSortOption(option);// Setează opțiunea de sortare selectată

    // Logica pentru sortare
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
       
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Logica paginarii
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className="text-center px-4 space-y-7">
  <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
    Dragostea pentru <span className="text-green">mâncarea delicioasă</span> ne unește
  </h2>
  <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
    Vino alături de cei dragi și bucură-te de preparatele noastre savuroase, precum Pizza Carbonara, Salata Caesar, Tarta cu Brânză și multe altele, toate la prețuri accesibile.
  </p>
  <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
    Comandă Acum
  </button>
</div>

        </div>
      </div>

      {/* menu shop  */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Bara de căutare */}
          <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mb-4">
            <input
              type="text"
              placeholder="Cauta..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-gray-100 rounded-md p-2 mb-4"
            />
          </div>

          {/* all category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={() => filterItems("all")}
              className={selectedCategory === "all" ? "active" : ""}
            >
             Vezi tot meniul nostru
            </button>
            <button
              onClick={() => filterItems("salata")}
              className={selectedCategory === "salata" ? "active" : ""}
            >
              Salate
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("paste")}
              className={selectedCategory === "paste" ? "active" : ""}
            >
             Paste
            </button>
            <button
              onClick={() => filterItems("desert")}
              className={selectedCategory === "desert" ? "active" : ""}
            >
              Deserturi
            </button>
            <button
              onClick={() => filterItems("bauturi")}
              className={selectedCategory === "bauturi" ? "active" : ""}
            >
              Bauturi
            </button>
          </div>

          {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Implicit</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">De la Pret Mic la Mare</option>
              <option value="high-to-low">De la Pret Mare la Mic</option>
            </select>
          </div>
        </div>

        {/* Product card or message */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.length > 0 ? (
            currentItems.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="text-center mt-8">Nu avem acest tip de meniu, încercați altceva.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
