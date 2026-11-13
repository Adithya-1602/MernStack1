import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import apiUrl from "../../apiUrl";

const ProductDetail = () => {
  const { prod_id, prod_name, prod_imgloc, prod_imgname } = useParams();
  const [product, setproduct] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(prod_id, prod_name, prod_imgloc, prod_imgname);

  const getProduct = () => {
    axios
      .get(apiUrl + "/products/getproduct/" + prod_id)
      .then((res) => {
        console.log(res.data);
        setproduct(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleCart = () => {
    console.log(user._id);
    console.log(product._id);

    axios
      .post(apiUrl + "/cart/addtocart", {
        user_id: user._id,
        product_id: product._id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="product_detail">
      <div className="image">
        <img src={apiUrl + "/" + product?.image} alt="Product image" />
      </div>
      <div className="details">
        <div className="prod_name">{product?.name}</div>

        <div>{product?.price}</div>
        <div>{product?.description}</div>

        <button onClick={handleCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
