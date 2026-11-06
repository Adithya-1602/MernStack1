const express = require("express");
const Product = require("../models/productModel");
const upload = require("../fileupload/uploadMiddlewar");

const router = express.Router();

router.post(
  "/add_product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  (req, res) => {
    console.log(req.body);
    console.log(Date.now());

    console.log("files", req.files);
    console.log("image file", req.files["image"]);
    console.log("gallery file", req.files["gallery"]);

    const { product_name, price, description } = req.body;
    const image = req.files["image"][0].path;

    const gallerypath = [];

    for (let i = 0; i < req.files["gallery"].length; i++) {
      gallerypath.push(req.files["gallery"][i].path);
    }

    console.log(gallerypath);

    const product = new Product({
      name: product_name,
      price,
      description,
      image,
      gallery: gallerypath,
    });

    product
      .save()
      .then(() => {
        res.send("Product added successfuly");
      })
      .catch((er) => {
        console.log(er);
      });
  },
);

router.get("/all_Products", (req, res) => {
  Product.find()
    .then((product) => {
      res.send(product);
    })
    .catch((er) => {
      console.log(er);
    });
});

router.post("/get/products/:product_name", (req, res) => {
  const { product_name } = req.params;
  const { price } = req.body;

  Product.findOne({ name: product_name, price })
    .then((product) => {
      res.send(product);
    })
    .catch((er) => {
      console.log(er);
    });
});

router.post("/delete", (req, res) => {
  Product.findByIdAndDelete(req.body._id)
    .then(() => {
      res.send("product deleted successfully");
    })
    .catch((er) => {
      console.log(er);
    });
});

router.get("/getproduct/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      console.log(product);
      res.send(product);
    })
    .catch((er) => {
      console.log(er);
    });
});

module.exports = router;
