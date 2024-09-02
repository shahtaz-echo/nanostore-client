import React, { useEffect, useState } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { MdDone, MdOutlineCategory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { parseCookies } from "../../utiles/cookies";
import FeaturedModal from "./componets/featured-modal";
import { RxCross2 } from "react-icons/rx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [featuredModal, setFeaturedModal] = useState(null);

  const cookies = parseCookies();
  const accessToken = cookies["access_token"];

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
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Product Delete!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  console.log(products);
  return (
    <section>
      <div className="">
        <h2 className="text-3xl font-semibold">Product List</h2>
        <div className="flex gap-6">
          <Link
            to="/admin/product-list/add-new"
            className="flex mt-4 items-center gap-1.5 text-sm"
          >
            <BiPlus />
            Add New Product
          </Link>
          <Link
            to="/admin/product-list/category-list"
            className="flex mt-4 items-center gap-1.5 text-sm"
          >
            <MdOutlineCategory />
            Product Categories
          </Link>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <hr className=" border-b-none border-t border-t-black/5" />
        <div className="font-semibold flex items-center gap-8">
          <h2 className="flex-1">Product</h2>
          <h2 className="w-[120px]">Price</h2>
          <h2 className="w-[100px]">Stock</h2>
          <div className="flex-1 ">Category</div>
          <div className="w-[210px]">Action</div>
        </div>
        <hr className="mb-2 border-b-none border-t border-t-black/5" />
        {products?.map((p, i) => (
          <div key={i} className="flex items-center gap-8">
            <div
              onClick={() => handleSeeProducts(p.id, p.name)}
              className="flex-1 flex items-center gap-3 cursor-pointer"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-14 w-14 object-cover"
              />
              <div>
                <h2 className="font-semibold mb-1.5">{p.name}</h2>
                {p.featured && (
                  <span className="text-xs pt-0.5 pb-1 px-2 text-red-500 bg-red-100">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <h2 className="w-[120px] font-semibold">BDT {p.price}</h2>
            <h2 className="w-[100px]">{p.stock}</h2>
            <div className="flex-1 ">
              <span className="text-sm py-1 px-2 bg-green-100 text-green-600">
                {p.category_name}
              </span>
            </div>
            <div className="w-[210px] text-xs flex items-center gap-3">
              <button
                onClick={() =>
                  setFeaturedModal({ id: p.id, featured: p.featured })
                }
                className="flex items-center gap-1.5 py-1.5 pl-2 pr-2.5 bg-gray-100 hover:bg-green-100 text-black/75 hover:text-green-500 rounded transition-all duration-300"
              >
                {p.featured ? (
                  <>
                    <RxCross2 />
                    Remove
                  </>
                ) : (
                  <>
                    <MdDone />
                    Featured
                  </>
                )}
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
      {featuredModal && (
        <FeaturedModal
          data={featuredModal}
          setOpen={setFeaturedModal}
          setMessage={setMessage}
        />
      )}
    </section>
  );
};

export default ProductList;
