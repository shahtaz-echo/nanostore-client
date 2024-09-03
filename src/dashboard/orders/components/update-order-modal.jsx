import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { parseCookies } from "../../../utiles/cookies";

const UpdateOrderModal = ({ id, setOpen, setMessage }) => {
  const [selectedStatus, setSelectedStatus] = useState();
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];
  console.log(selectedStatus);
  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/api/orders/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: selectedStatus }),
    })
      .then((res) => {
        if (res.ok) {
          setMessage(`Order ${id} Updated!`);
          setOpen(null);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-100 flex items-center justify-center">
      <div className="bg-white w-[480px] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Update Order</h2>
          <button onClick={() => setOpen(null)}>
            <FaXmark />
          </button>
        </div>
        <div className="mt-5">
          <div>
            <p>Make sure you want to update this product</p>
            <select
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border p-2 min-w-[200px] outline-none mt-3 cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accept</option>
              <option value="complete">Complete</option>
              <option value="rejected">Reject</option>
            </select>
          </div>
          <div className="mt-10 flex items-center gap-2 justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-center py-2 border border-black/30 w-32 font-medium text-black/75 hover:bg-gray-300 transition duration-300"
            >
              Discard
            </button>
            <button
              onClick={handleUpdate}
              className="py-2 border border-black w-32 font-medium text-white bg-black hover:bg-black transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
