import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    const bodyData = { username, email, password };
    fetch(`http://localhost:8000/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/sign-in");
        } else {
          setMessage("Account Created Faild!");
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  };
  return (
    <section
      id="login"
      className="container h-screen flex items-center justify-center"
    >
      <div className="bg-gray-100 max-w-[420px] w-full mx-auto p-6">
        <h2 className="text-2xl font-semibold">Open a New Account</h2>
        <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Full Name
            </label>
            <input
              type="name"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>
          <div>
            <label className="text-black/75 text-sm font-semibold mb-2 block">
              Email
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
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black/30 py-2 px-4 w-full outline-none"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="text-center border border-black/40 py-3 bg-black text-white w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-5 text-black/60">
          Already have an Account?{" "}
          <Link to="/sign-in" className="text-green-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
