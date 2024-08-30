import React, { useEffect, useState } from "react";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Initialize state for each form field
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyData = {
      name,
      category,
      price,
      stock,
      img,
      description,
    };

    fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/admin/product-list");
        } else {
          setMessage("Product Created Faild!");
        }
      })

      .catch((error) => console.error("Error fetching products:", error));
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Add New Product</h2>
      <Link
        to={"/admin/product-list"}
        className="flex items-center gap-2 mt-2 text-sm"
      >
        <BiSolidLeftArrowAlt className="text-xl mt-1" />
        Back to Product List
      </Link>
      <form onSubmit={handleSubmit} className="mt-10 bg-gray-100 p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            >
              {categories ? (
                <>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No Category Found!</option>
              )}
            </select>
          </div>
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Price
            </label>
            <input
              type="number"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Stock
            </label>
            <input
              type="number"
              placeholder="Product Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="text-black/75 text-sm font-semibold mb-2 block">
            Product Image
          </label>
          <input
            type="text"
            placeholder="Image Link"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="border border-black/30 py-2 px-4 w-full outline-none"
          />
        </div>
        <div className="mt-6">
          <label className="text-black/75 text-sm font-semibold mb-2 block">
            Product Description
          </label>
          <textarea
            placeholder="Product Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-black/30 py-2 px-4 w-full outline-none"
          />
        </div>
        <div className="mt-10 flex items-center gap-2 justify-end">
          <Link
            to="/admin/product-list"
            className="text-center py-2 border border-black/30 w-32 font-medium text-black/75 hover:bg-gray-300 transition duration-300"
          >
            Discard
          </Link>
          <button
            type="submit"
            className="py-2 border border-black/30 w-32 font-medium text-white bg-black/80 hover:bg-black transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
