import React, { useEffect, useState } from "react";
import AddCategory from "./add-category";
import { BsPencil } from "react-icons/bs";
import { BiPlus, BiTrash } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";
const cphImg =
  "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2pvYjE0MjgtZWxlbWVudC0xMDctdi5qcGc.jpg";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [message]);

  const handleEditCategory = (category) => {
    console.log(category);
  };

  const handleDeleteCategory = (id) => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Category Delete!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section>
      <div className="">
        <h2 className="text-3xl font-semibold">Product Category List</h2>
        <div className="flex gap-6">
          <button
            onClick={() => setAddCategoryModal(true)}
            className="flex mt-4 items-center gap-1.5 text-sm"
          >
            <BiPlus />
            Add Category
          </button>
          <Link
            to="/admin/product-list"
            className="flex mt-4 items-center gap-1.5 text-sm"
          >
            <MdOutlineCategory />
            Product List
          </Link>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <hr className=" border-b-none border-t border-t-black/5" />
        <div className="font-semibold flex items-center gap-8">
          <h2 className="flex-1">Category</h2>
          <h2 className="w-[120px]">Total Products</h2>
          <h2 className="flex-1">Description</h2>
          <div className="w-[180px]">Action</div>
        </div>
        <hr className="mb-2 border-b-none border-t border-t-black/5" />
        {categories?.map((c, i) => (
          <div key={i} className="flex items-center gap-8">
            <div className="flex-1 flex items-center gap-3">
              <img
                src={c?.image || cphImg}
                alt={c?.name}
                className="h-12 w-12 object-cover"
              />
              <h2 className="font-semibold">{c?.name}</h2>
            </div>
            <h2 className="w-[120px]">05</h2>
            <h2 className="flex-1">
              {c.description.slice(0, 100)}
              {c.description.length > 100 && "..."}
            </h2>
            <div className="w-[180px] text-xs flex items-center gap-3">
              <button
                onClick={() => handleEditCategory(c)}
                className="flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 bg-gray-100 hover:bg-blue-100 text-black/75 hover:text-blue-500 rounded transition-all duration-300"
              >
                <BsPencil />
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(c.id)}
                className="flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 bg-gray-100 hover:bg-red-100 text-black/75 hover:text-red-500 rounded transition-all duration-300"
              >
                <BiTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {addCategoryModal && (
        <AddCategory setOpen={setAddCategoryModal} setMessage={setMessage} />
      )}
    </section>
  );
};

export default ProductCategory;
