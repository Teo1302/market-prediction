import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} este acum admin`);
      refetch();
    });
  };

  const handleDeleteUser = user => {
    axiosSecure.delete(`/users/${user._id}`).then(res => {
      alert(`${user.name} este sters din baza de date`);
      refetch();
    })
  }
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>Toti Utilizatorii</h5>
        <h5>Numar total de Utilizatori:<b>{users.length}</b> </h5>
      </div>

      {/* tabel */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
        
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Nume</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Actiune</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs btn-circle bg-indigo-500 text-white"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)} className="btn btn-xs bg-orange-500 text-white">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;