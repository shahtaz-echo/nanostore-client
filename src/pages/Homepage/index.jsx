import React from "react";
import Hero from "./hero";
import Features from "./features";
import FeaturedProducts from "./featured-products";
import Collections from "./collections";

const Homepage = () => {
  return (
    <React.Fragment>
      <Hero />
      <Collections />
      <FeaturedProducts />
      <Features />
    </React.Fragment>
  );
};

export default Homepage;
