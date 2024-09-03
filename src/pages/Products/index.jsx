import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    // Fetch categories
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    // Fetch products with filters applied
    let query = `http://127.0.0.1:8000/api/products/?`;

    if (selectedCategory && selectedCategory !== "all") {
      query += `category=${selectedCategory}&`;
    }

    if (searchStr) {
      query += `search=${encodeURIComponent(searchStr)}&`;
    }

    fetch(query)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [selectedCategory, searchStr]);

  const navigate = useNavigate();

  const handleSeeProducts = (id, name) => {
    const slashedName = name.toLowerCase().split(" ").join("-");
    navigate(`/products/${slashedName}`, { state: { id } });
  };

  const handleAddToCart = (product) => {
    console.log(product);
  };

  let content;

  if (products.length === 0) {
    content = <div className="mt-10 text-black/50">No Product Found</div>;
  } else {
    content = (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-10">
        {products.map((p, i) => (
          <div key={i}>
            <img
              src={p.img}
              alt={p.name}
              className="h-72 w-full object-cover"
            />
            <p className="text-sm bg-green-100 text-green-600 font-medium w-fit py-1 px-2 mt-3 mb-2">
              {p.category_name}
            </p>
            <h2 className="text-2xl font-bold">{p.name}</h2>
            <h1 className="text-xl font-semibold mt-2">BDT {p.price}</h1>
            <div className="grid grid-cols-2 mt-5">
              <button
                onClick={() => handleSeeProducts(p.id, p.name)}
                className="border border-black/35 py-2 font-medium"
              >
                See Products
              </button>
              <button
                onClick={() => handleAddToCart(p)}
                className="border border-black/35 py-2 font-medium bg-black text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  console.log(categories);

  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold">Product List</h2>
        <div className="flex items-center gap-4">
          <div>
            <input
              className="border py-2 pl-3 min-w-[300px] outline-none"
              placeholder="Search Products"
              onChange={(e) => setSearchStr(e.target.value)}
            />
          </div>
          <div>
            <select
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value === "all" ? null : e.target.value
                )
              }
              className="border p-2 outline-none"
            >
              <option value="all">All Products</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default Products;
