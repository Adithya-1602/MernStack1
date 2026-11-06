import React, { useState, useEffect } from "react";
import axios from "axios";

const Shop = () => {
  const [products, setproducts] = useState([]);

  console.log(products);

  const getAllProducts = () => {
    axios
      .get("http://localhost:5000/products/all_products")
      .then((res) => {
        console.log(res.data);
        setproducts(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleDelete = (id) => {
    axios
      .post("http://localhost:5000/products/delete", {
        _id: id,
      })
      .then((res) => {
        console.log(res.data);
        getAllProducts();
        alert(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1>Shop</h1>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <h1>{product.description}</h1>
            <img src={"http://localhost:5000/" + product.image} alt="" />
            <button
              onClick={() => {
                handleDelete(product._id);
              }}
            >
              Delete
            </button>
            <a
              href={
                "/productdetail/" +
                product._id +
                "/" +
                product.name +
                "/" +
                product.image
              }
            >
              Shop
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
