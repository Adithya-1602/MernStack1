const express = require("express");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const router = express.Router();

router.post("/addtocart", (req, res) => {
  const { user_id, product_id } = req.body;

  const save_cart = new Cart({
    user_id,
    product_id,
  });

  save_cart
    .save()
    .then(() => {
      res.send("Product added to cart");
    })
    .catch((er) => {
      console.log(er);
    });
});

router.get("/getcart", (req, res) => {
  Cart.find()
    .populate("product_id user_id")
    .then((cart) => {
      // console.log(cart);
      res.send(cart);
    })
    .catch((er) => {
      console.log(er);
    });
});

router.post("/getcartproduct", (req, res) => {
  const { cart_ids } = req.body;
  console.log(cart_ids);

  const products = [];
  cart_ids?.map((id) => {
    console.log(id);

    Product.findById(id)
      .then((product) => {
        console.log(product);
        products.push(product);
      })
      .catch((er) => {
        console.log(er);
      });

    if (products.length > 0) {
      res.send(products);
    }
  });

  //   Cart.find({ product_id: { $in: cart_ids } })
  //     .then((cart) => {
  //       console.log(cart);
  //       res.send(cart);
  //     })
  //     .catch((er) => {
  //       console.log(er);
  //     });
});

router.post("/deletecart", (req, res) => {
  const { cart_id } = req.body;

  Cart.findByIdAndDelete(cart_id)
    .then(() => {
      res.send("cart deleted succefully");
    })
    .catch((er) => {
      console.log(er);
    });
});

module.exports = router;
