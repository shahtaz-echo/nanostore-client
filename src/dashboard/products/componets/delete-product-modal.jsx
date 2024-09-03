import React from "react";
import { FaXmark } from "react-icons/fa6";
import { parseCookies } from "../../../utiles/cookies";

const DeleteProductModal = ({ id, setOpen, setMessage }) => {
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];
  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setMessage(`Product ${id} Delete!`);
          setOpen(null);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-100 flex items-center justify-center">
      <div className="bg-white w-[480px] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Confrim Delete</h2>
          <button onClick={() => setOpen(null)}>
            <FaXmark />
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <p>Make sure you want to delete this product</p>
          <div className="mt-8 flex items-center gap-2 justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-center py-2 border border-black/30 w-32 font-medium text-black/75 hover:bg-gray-300 transition duration-300"
            >
              Discard
            </button>
            <button
              onClick={handleDelete}
              className="py-2 border border-red-500 w-32 font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
