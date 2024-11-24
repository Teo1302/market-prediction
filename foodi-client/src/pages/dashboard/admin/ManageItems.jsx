import React from "react";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
//   console.log(menu);


  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Esti sigur?",
      text: "Nu vei putea reveni asupra acestei acțiuni!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da, sterge!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        
       if(res) {
        refetch();
        Swal.fire({
          title: "Sters!",
          text: "Meniul a fost sters cu succes",
          icon: "success",
        });
       }
      }
    });
  };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
      Gestionează toate <span className="text-green">elementele din meniu</span>      
      </h2>
      {/* tabel cu elementele de meniu */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* cap de tabel */}
            <thead>
              <tr>
                <th>#</th>
                <th>Imagine</th>
                <th>Nume Meniu</th>
                <th>Pret</th>
                <th>Editeaza</th>
                <th>Sterge</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price} lei</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;