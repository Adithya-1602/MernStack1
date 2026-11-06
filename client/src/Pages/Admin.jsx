import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [product_name, setproduct_name] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [gallery, setgallery] = useState({});
  const [products, setproducts] = useState([]);

  console.log(products);

  console.log(gallery);

  const handleClick = () => {
    const formdata = new FormData();
    formdata.append("product_name", product_name);
    formdata.append("price", price);
    formdata.append("description", description);
    if(image) {
    formdata.append("image", image);
    }

    for(let i = 0; i < gallery.length; i++) {
      formdata.append("gallery", gallery[i]);
    }

    axios
      .post("http://localhost:5000/products/add_product", formdata)
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

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
      <h1>Admin Panel</h1>
      <div className="form">
        <input
          type="text"
          placeholder=""
          onChange={(e) => setproduct_name(e.target.value)}
        />
        <input
          type="number"
          placeholder=""
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="text"
          placeholder=""
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="file"
          placeholder=""
          onChange={(e) => setimage(e.target.files[0])}
        />
         <input
          type="file"
          multiple
          placeholder="gallery image"
          onChange={(e) => setgallery(e.target.files)}
        />

        <button onClick={handleClick}>Submit</button>
      </div>

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <h1>{product.description}</h1>
            <img src={"http://localhost:5000/" + product.image} alt="" />
            {product.gallery.map((image) => (
              <img src={"http://localhost:5000/" + image} alt="" />
            ))}
            <button
              onClick={() => {
                handleDelete(product._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
