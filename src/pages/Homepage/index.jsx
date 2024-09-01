import React from "react";
import Hero from "./hero";
import Features from "./features";
import FeaturedProducts from "./featured-products";

const Homepage = () => {
  return (
    <React.Fragment>
      <Hero />
      <Features />
      <FeaturedProducts />
    </React.Fragment>
  );
};

export default Homepage;
