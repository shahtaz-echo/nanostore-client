import React, { useEffect, useState } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BsEye, BsPencil } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [message]);

  const navigate = useNavigate();
  const handleSeeProducts = (id, name) => {
    const slashedName = name.toLowerCase().split(" ").join("-");
    navigate(`/products/${slashedName}`, { state: { id } });
  };

  const handleEditProduct = (product) => {
    console.log(product);
    navigate(`/admin/product-list/update-product`, { state: { product } });
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Product Delete!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section>
      <div className="">
        <h2 className="text-3xl font-semibold">Product List</h2>
        <Link
          to="/admin/product-list/add-new"
          className="flex mt-4 items-center gap-2 text-sm"
        >
          <BiPlus />
          Add New Product
        </Link>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <hr className=" border-b-none border-t border-t-black/5" />
        <div className="font-semibold flex items-center gap-8">
          <h2 className="flex-1">Product</h2>
          <h2 className="flex-1">Price</h2>
          <h2 className="flex-1">Stock</h2>
          <div className="flex-1 ">Category</div>
          <div className="w-[210px]">Action</div>
        </div>
        <hr className="mb-2 border-b-none border-t border-t-black/5" />
        {products?.map((p, i) => (
          <div key={i} className="flex items-center gap-8">
            <div className="flex-1 flex items-center gap-3">
              <img
                src={p.img}
                alt={p.name}
                className="h-12 w-12 object-cover"
              />
              <h2 className="font-semibold">{p.name}</h2>
            </div>
            <h2 className="flex-1 font-semibold">BDT {p.price}</h2>
            <h2 className="flex-1">{p.stock}</h2>
            <div className="flex-1 ">
              <span className="text-sm py-1 px-2 bg-green-100 text-green-600">
                {p.category_name}
              </span>
            </div>
            <div className="w-[210px] text-xs flex items-center gap-3">
              <button
                onClick={() => handleSeeProducts(p.id, p.name)}
                className="flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 bg-gray-100 hover:bg-green-100 text-black/75 hover:text-green-500 rounded transition-all duration-300"
              >
                <BsEye />
                View
              </button>
              <button
                onClick={() => handleEditProduct(p)}
                className="flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 bg-gray-100 hover:bg-blue-100 text-black/75 hover:text-blue-500 rounded transition-all duration-300"
              >
                <BsPencil />
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(p.id)}
                className="flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 bg-gray-100 hover:bg-red-100 text-black/75 hover:text-red-500 rounded transition-all duration-300"
              >
                <BiTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
