import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const AddCategory = ({ setOpen, setMessage }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyData = {
      name,
      description,
    };

    fetch("http://127.0.0.1:8000/api/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Category Created Successful!");
          setOpen(false);
        } else {
          setMessage("Category Created Faild!");
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-100 flex items-center justify-center">
      <div className="bg-white w-[600px] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Product Category</h2>
          <button onClick={() => setOpen(false)}>
            <FaXmark />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>

          <div className="mt-6">
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Category Description
            </label>
            <textarea
              placeholder="Category Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>
          <div className="mt-10 flex items-center gap-2 justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-center py-2 border border-black/30 w-32 font-medium text-black/75 hover:bg-gray-300 transition duration-300"
            >
              Discard
            </button>
            <button
              type="submit"
              className="py-2 border border-black/30 w-32 font-medium text-white bg-black/80 hover:bg-black transition duration-300"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
