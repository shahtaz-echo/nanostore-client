import React, { useEffect, useState } from "react";
import { parseCookies } from "../../../utiles/cookies";
import { Link } from "react-router-dom";

const Collections = () => {
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const cookies = parseCookies();
  const accessToken = cookies["access_token"];

  useEffect(() => {
    fetch("http://localhost:8000/api/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [message]);
  return (
    <section id="collection" className="py-20">
      <div className="container">
        <h2 className="text-4xl font-medium">Explore Collections</h2>
        <div className="grid grid-cols-5 gap-4 mt-10">
          {categories?.map((category, index) => (
            <Link
              to={`/products?collection=${category.name
                .toLowerCase()
                .split(" ")
                .join("-")}`}
              key={index}
              className="flex items-center gap-3"
            >
              <img src={category?.image} className="h-12 w-12 object-cover" />
              <div>
                <h2 className="font-semibold">{category?.name}</h2>
                <p className="text-black/50 text-sm">
                  {category?.total_products < 9 && 0}
                  {category?.total_products} Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
