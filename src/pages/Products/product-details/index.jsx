import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state?.id) {
    navigate("/products");
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${state?.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDecreaseItem = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncreaseItem = () => {
    setQuantity(quantity + 1);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { product } });
  };
  return (
    <section className="container py-20">
      {product ? (
        <div className="grid grid-cols-2 gap-16">
          <div>
            <img
              src={product.img}
              className="h-[580px] w-full object-cover"
              alt={product.name}
            />
          </div>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl">{product.category_name}</h2>
              <h2 className="text-4xl font-semibold mt-2">{product.name}</h2>
              <h2 className="text-3xl mt-6">BDT{product.price}</h2>
              <p className="mt-12 text-lg text-black/60">
                {product.description}
              </p>
            </div>
            <div>
              <div>
                <hr className="mb-2" />
                <p>Add Quantity</p>

                <div className="flex items-center my-3">
                  <button
                    onClick={handleDecreaseItem}
                    className="bg-black/5 h-10 w-10 flex items-center justify-center"
                  >
                    <BiMinus />
                  </button>
                  <div className="h-10 w-10 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button
                    onClick={handleIncreaseItem}
                    className="bg-black/5 h-10 w-10 flex items-center justify-center"
                  >
                    <BiPlus />
                  </button>
                </div>
                <hr />
              </div>
              <div className="flex gap-4 mt-6">
                <button className="border border-black/40 py-3 bg-transparent text-black w-52">
                  Add to Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="text-center border border-black/40 py-3 bg-black text-white w-52"
                >
                  Buy and Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No Product Found!</p>
      )}
    </section>
  );
};

export default ProductDetails;
