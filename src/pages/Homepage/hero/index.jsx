import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero">
      <div className="container py-20">
        <h2>Shop Now</h2>
        <Link to="/products" className="block mt-10">
          See Products{" "}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
