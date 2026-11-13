import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import apiUrl from "../apiUrl";

const Cart = () => {
  const [cart, setcart] = useState(null);

  const getcart = () => {
    axios
      .get(apiUrl + "/cart/getcart")
      .then((res) => {
        setcart(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  console.log(cart);

  const handleDelete = (cart_id) => {
    axios
      .post(apiUrl + "/cart/deletecart", {
        cart_id,
      })
      .then((res) => {
        console.log(res.data);
        getcart();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    getcart();
  }, []);

  return (
    <div className="cart">
      <h1>Cart Items</h1>
      <div className="cart_text">Test Cart</div>
      {cart &&
        cart
          .filter((item) => item.user_id._id == user._id)
          .map((item) => (
            <div className="cart_item" key={item.id}>
              <img src={apiUrl + "/" + item.product_id.image} alt="" />
              <h1>{item.product_id.name}</h1>
              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
              >
                X
              </button>
            </div>
          ))}
    </div>
  );
};

export default Cart;
