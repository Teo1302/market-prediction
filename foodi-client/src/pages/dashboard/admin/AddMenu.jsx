import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import useMenu from "../../../hooks/useMenu";

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [menu, loading, refetch] = useMenu();

  // image hosting key
  const image_hosting_key = "143b13a4025084141797675ff34fd161";
  console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        // CA SA FIE NUMBERS PUNEM PARSEFLOAT
        price: parseFloat(data.price), 
        recipe: data.recipe,
        image: hostingImg.data.data.display_url
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.post('/menu', menuItem);
      if(postMenuItem){
        reset()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Meniu adaugat cu Succes!",
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Adauga un nou <span className="text-green">Element de Meniu</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Numele Preparatului</span>
            </label>
            <input
            // trebuie ca asta register("name" sa fie la fel ca ce avem in baza de date
              type="text"
              {...register("name", { required: true })}
              placeholder="Introduceti numele preparatului"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Categorie</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                 Selecteaza o Categorie
                  {/* same category ca cele din menu.json */}
                </option>
                <option value="salata">Salata</option>
                <option value="pizza">Pizza</option>
                <option value="paste">Paste</option>
                <option value="desert">Desert</option>
                <option value="bauturi">Bauturi</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pret</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Introduceti pretul"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ingredientele Preparatului</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Introduceti ingredientele utilizate si gramajul"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
         {/* buton final */}
          <button className="btn bg-green text-white px-6">
            Adauga Produsul <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;