import React, { useEffect, useRef, useState } from "react";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { BsPencil, BsThreeDotsVertical } from "react-icons/bs";
import { MdDone, MdOutlineCategory } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { parseCookies } from "../../utiles/cookies";
import FeaturedModal from "./componets/featured-modal";
import { RxCross2 } from "react-icons/rx";
import DeleteProductModal from "./componets/delete-product-modal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [featuredModal, setFeaturedModal] = useState(null);

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

  // MENU ITEMS
  const [selectedItem, setSelectedItem] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedItem(null); // Close menu when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DELTE PRODUCT
  const [deleteProductModal, setDeleteProductModal] = useState(null);

  // EDIT PRODUCT
  const handleEditProduct = (product) => {
    navigate(`/admin/product-list/update-product`, { state: { product } });
  };

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
      <div className="mt-10 flex flex-col">
        <div className="font-semibold flex items-center gap-8 border-t border-b h-14 px-4">
          <h2 className="min-w-[400px] flex-1">Product</h2>
          <h2 className="flex-1">Price</h2>
          <h2 className="flex-1">Stock</h2>
          <div className="flex-1">Category</div>
          <div className="w-8"></div>
        </div>

        {products?.map((p, index) => (
          <div
            key={index}
            className="flex items-center gap-8 border-b border-b-black/5 py-4 px-4"
          >
            <div
              className="min-w-[400px] flex-1 flex items-center gap-3 cursor-pointer"
              onClick={() => handleSeeProducts(p.id, p.name)}
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-14 w-14 object-cover"
              />
              <div>
                <h2 className="font-semibold mb-1.5">{p.name}</h2>
                {p.featured && (
                  <span className="text-xs pt-0.5 pb-1 px-2 text-blue-500 bg-blue-100">
                    Featured
                  </span>
                )}
              </div>
            </div>
            <h2 className="flex-1 font-semibold">BDT {p.price}</h2>
            <h2 className="flex-1">{p.stock}</h2>
            <div className="flex-1 ">
              <span className="text-sm py-1 px-2 bg-green-100 text-green-600">
                {p.category_name}
              </span>
            </div>
            <div className="w-8 relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(index === selectedItem ? null : index);
                }}
                className="w-7 h-7 tr hover:bg-black/5 rounded-full center"
              >
                <BsThreeDotsVertical />
              </button>
              {selectedItem === index && (
                <div
                  ref={menuRef}
                  className="absolute bg-white z-10 flex flex-col py-1 border right-7 -mt-4 shadow-md"
                >
                  <button
                    onClick={() => {
                      setFeaturedModal({ id: p.id, featured: p.featured });
                      setSelectedItem(null);
                    }}
                    className="flex whitespace-nowrap items-center gap-1 text-sm py-1 hover:bg-black/5 tr pl-3 pr-4 cursor-pointer"
                  >
                    {p.featured ? (
                      <>
                        <RxCross2 />
                        Remove Featured
                      </>
                    ) : (
                      <>
                        <MdDone />
                        Make Featured
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleEditProduct(p.id);
                      setSelectedItem(null);
                    }}
                    className="flex whitespace-nowrap items-center gap-1 text-sm py-1 hover:bg-black/5 tr pl-3 pr-4 cursor-pointer"
                  >
                    <BiPencil className="text-black/50" />
                    Update Product
                  </button>
                  <button
                    onClick={() => {
                      setDeleteProductModal(p.id);
                      setSelectedItem(null);
                    }}
                    className="text-sm flex whitespace-nowrap items-center gap-1 py-1 hover:bg-black/5 tr pl-3 pr-4 cursor-pointer"
                  >
                    <BiTrash className="text-black/50" /> Delete Product
                  </button>
                </div>
              )}
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
      {deleteProductModal && (
        <DeleteProductModal
          id={deleteProductModal}
          setOpen={setDeleteProductModal}
          setMessage={setMessage}
        />
      )}
    </section>
  );
};

export default ProductList;
