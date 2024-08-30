import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    state: { product = {} },
  } = useLocation();

  const navigate = useNavigate();
  if (!product?.id) {
    navigate("/products");
  }

  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating an object with the form data
    const formData = {
      name,
      email,
      contactNumber,
      address,
      product,
    };

    console.log("Form Data Submitted:", formData);
  };

  return (
    <section className="container py-20">
      <div className="grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-semibold">Checkout</h2>
          <h2 className="text-xl font-semibold mt-2">Order Items</h2>

          <div className="mt-10">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <img src={product.img} className="h-12 w-12 object-cover" />
                <div>
                  <h2 className="font-semibold">{product.name}</h2>
                  <h2 className="text-xs">{product.category_name}</h2>
                </div>
              </div>
              <h2 className="text-center flex-1">{product.price} x1</h2>
              <h2 className="font-bold">
                {parseFloat(product.price * 1).toFixed(2)}
              </h2>
            </div>
          </div>
          <hr className="mt-8 mb-2" />
          <div className="flex items-center justify-between">
            <h2>Subtotal</h2>
            <h2 className="text-lg font-semibold">{product.price}</h2>
          </div>
        </div>

        <div className="bg-gray-100 p-8">
          <h2 className="text-xl font-semibold">Fill Your Information</h2>
          <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-black/75 text-sm font-semibold mb-2 block">
                Customer Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-black/30 py-2 px-4 w-full outline-none"
              />
            </div>
            <div>
              <label className="text-black/75 text-sm font-semibold mb-2 block">
                Customer Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black/30 py-2 px-4 w-full outline-none"
              />
            </div>
            <div>
              <label className="text-black/75 text-sm font-semibold mb-2 block">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="Your Phone Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="border border-black/30 py-2 px-4 w-full outline-none"
              />
            </div>
            <div>
              <label className="text-black/75 text-sm font-semibold mb-2 block">
                Full Address
              </label>
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-black/30 py-2 px-4 w-full outline-none"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Link
                to="/products"
                className="text-center border border-black/40 py-3 bg-transparent text-black w-40"
              >
                Discard
              </Link>
              <button
                type="submit"
                className="text-center border border-black/40 py-3 bg-black text-white w-40"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
