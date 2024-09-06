import React from "react";
import { Link } from "react-router-dom";
// const heroImg =
//   "https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg";

import heroImg from "../../../assets/images/hero-min.jpeg"  
const Hero = () => {
  return (
    <section id="hero">
      <div className="container">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-7xl leading-[80px] font-semibold capitalize">
              For the people who loves to collect antique pieces
            </h2>
            <div className="mt-20 flex gap-3">
              <Link to="/products" className="bg-black text-white px-8 py-2">
                See Products
              </Link>
              <Link to="/products" className="border px-8 py-2">
                See Collections
              </Link>
            </div>
          </div>
          <div>
            <img src={heroImg} className="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
