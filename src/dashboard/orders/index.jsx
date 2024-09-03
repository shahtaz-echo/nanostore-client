import React, { useEffect, useRef, useState } from "react";
import { parseCookies } from "../../utiles/cookies";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { BiPencil, BiTrash } from "react-icons/bi";
import DeleteOrderModal from "./components/delete-order-modal";
import UpdateOrderModal from "./components/update-order-modal";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [message]);

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

  // DELETE ORDERS
  const [deleteOrderModal, setDeleteOrderModal] = useState(null);
  const [updateOrderModal, setUpdateOrderModal] = useState(null);

  return (
    <section>
      <div className="">
        <h2 className="text-3xl font-semibold">Order List</h2>
      </div>
      <div className="mt-10 flex flex-col">
        <div className="font-semibold flex items-center gap-8 border-t border-b h-14 bg-black/5 px-4">
          <h2 className="w-20">Order ID</h2>
          <h2 className="flex-1">Customer</h2>
          <h2 className="flex-1">Address</h2>
          <h2 className="flex-1 ">Order Items</h2>
          <h2 className="flex-1 ">Price</h2>
          <h2 className="flex-1 ">Status</h2>
          <h2 className="w-8"></h2>
        </div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex items-center gap-8 border-b py-3 px-4"
          >
            <p className="w-20">
              #{(order.id + "").length}
              {order.id}
            </p>
            <div className="flex-1 flex flex-col">
              <span className="font-medium">{order.user.fullname}</span>
              <span className="text-sm">{order.user.email}</span>
            </div>
            <div className="flex-1 flex flex-col">
              <span className="font-medium">{order.user.address}</span>
              <span className="text-sm">{order.user.phone}</span>
            </div>
            <div className="flex-1 ">
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm">{item.product_details.name}</span>
                  <span className="text-xs font-semibold">
                    Quantity: {item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col ">
              <span className="font-medium">BDT {order.total_price}</span>
              <span className="text-xs bg-red-100 text-red-600 pt-0.5 p-1 w-fit mt-1">
                {order.is_paid ? "Paid" : "Not Paid"}
              </span>
            </div>
            <h2 className="flex-1 ">
              <OrderStatus status={order.status} />
            </h2>
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
                      setUpdateOrderModal(order.id);
                      setSelectedItem(null);
                    }}
                    className="flex items-center gap-1 text-sm py-1 hover:bg-black/5 tr pl-3 pr-4 cursor-pointer"
                  >
                    <BiPencil className="text-black/50" />
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setDeleteOrderModal(order.id);
                      setSelectedItem(null);
                    }}
                    className="text-sm flex items-center gap-1 py-1 hover:bg-black/5 tr pl-3 pr-4 cursor-pointer"
                  >
                    <BiTrash className="text-black/50" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {deleteOrderModal && (
        <DeleteOrderModal
          id={deleteOrderModal}
          setOpen={setDeleteOrderModal}
          setMessage={setMessage}
        />
      )}
      {updateOrderModal && (
        <UpdateOrderModal
          id={updateOrderModal}
          setOpen={setUpdateOrderModal}
          setMessage={setMessage}
        />
      )}
    </section>
  );
};

export default OrderList;

const OrderStatus = ({ status }) => {
  const statusClasses = {
    pending: "border-orange-500 text-orange-500",
    accepted: "border-blue-500 text-blue-500",
    complete: "border-green-500 text-green-500",
    rejected: "border-red-500 text-red-500",
  };

  return (
    <span
      className={`capitalize w-fit border py-1 px-3 ${
        statusClasses[status] || "border-gray-500 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
};
