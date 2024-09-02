import React from "react";
import { FaXmark } from "react-icons/fa6";
import { parseCookies } from "../../../utiles/cookies";

const FeaturedModal = ({ data, setOpen, setMessage }) => {
  const { id, featured } = data;
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ featured: !featured }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Product updated successful!");
          setOpen(null);
        } else {
          setMessage("Product update Faild!");
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-100 flex items-center justify-center">
      <div className="bg-white w-[480px] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Confrim Action</h2>
          <button onClick={() => setOpen(null)}>
            <FaXmark />
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <p>Make this product featured</p>
          <div className="mt-8 flex items-center gap-2 justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-center py-2 border border-black/30 w-32 font-medium text-black/75 hover:bg-gray-300 transition duration-300"
            >
              Discard
            </button>
            <button
              onClick={handleUpdate}
              className="py-2 border border-black/30 w-32 font-medium text-white bg-black/80 hover:bg-black transition duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedModal;
