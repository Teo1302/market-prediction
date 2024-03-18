
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const Pizza = () => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [filteredPizzaItems, setFilteredPizzaItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Numărul de elemente de afișat pe pagină
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        const pizzaData = data.filter((item) => item.category === "pizza");
        setPizzaItems(pizzaData);
        setFilteredPizzaItems(pizzaData);
      } catch (error) {
        console.error("Error fetching pizza data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredPizzaItems];

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

    setFilteredPizzaItems(sortedItems);
    setCurrentPage(1);
  };

  // Funcția de căutare
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    const filtered = pizzaItems.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPizzaItems(filtered);
    setCurrentPage(1);
  };

  // Logica de paginare
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPizzaItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Textul drăguț și spațiu între meniul de sus și cardurile cu mâncare */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-8 mb-4">
        <h2 className="text-3xl font-semibold text-center mt-40">
          Explore Our Delicious Pizzas
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enjoy a variety of mouthwatering pizzas. Find your favorite!
        </p>
      </div>

      {/* Bara de căutare */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mb-4">
        <input
          type="text"
          placeholder="Cauta Pizza..."
          value={searchInput}
          onChange={handleSearch}
          className="w-full bg-gray-100 rounded-md p-2 mb-4"
        />
      </div>
 {/* Sortare */}
 <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mb-4">
        <select
          id="sort"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOption}
          className="bg-black text-white px-2 py-1 rounded-sm"
        >
          <option value="default">Default</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>



      {/* Lista cu carduri de pizza */}
      <div className="section-container">
  {filteredPizzaItems.length > 0 ? (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {currentItems.map((item) => (
        <Cards key={item._id} item={item} />
      ))}
    </div>
  ) : (
    <p className="text-center mt-8">Nu avem acest tip de meniu, încercați altceva.</p>
  )}
</div>


      {/* Paginare */}
      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredPizzaItems.length / itemsPerPage) }).map((_, index) => (
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

export default Pizza;
