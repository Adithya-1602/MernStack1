const express = require("express");
const Product = require("../models/productModel");
const upload = require("../fileupload/uploadMiddleware");
const uploadToCloudinary = require("../fileupload/cloudinaryUpload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// ADD PRODUCT WITH CLOUDINARY IMAGES
// =====================================

router.post(
  "/add_product",
  uploadToCloudinary.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  async (req, res) => {
    let uploadedImages = [];

    try {
      const { product_name, price, description } = req.body;

      // Validate product details
      if (!product_name || !price || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide all product details",
        });
      }

      // Validate main image
      if (!req.files || !req.files.image || !req.files.image[0]) {
        return res.status(400).json({
          success: false,
          message: "Please upload a main product image",
        });
      }

      // Upload main image
      const mainImageResult = await uploadToCloudinary(
        req.files.image[0].buffer,
      );

      uploadedImages.push(mainImageResult.public_id);

      // Upload gallery images
      const galleryResults = [];

      if (req.files.gallery) {
        for (const file of req.files.gallery) {
          const result = await uploadToCloudinary(file.buffer);

          uploadedImages.push(result.public_id);

          galleryResults.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }

      // Create product
      const product = new Product({
        name: product_name,
        price: Number(price),
        description: description,

        // Main image
        image: mainImageResult.secure_url,
        cloudinaryPublicId: mainImageResult.public_id,

        // Gallery images
        gallery: galleryResults.map((item) => item.url),
        galleryPublicIds: galleryResults.map((item) => item.public_id),
      });

      await product.save();

      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: product,
      });
    } catch (error) {
      console.error("Product upload error:", error);

      // Remove uploaded Cloudinary images if saving fails
      await Promise.allSettled(
        uploadedImages.map((id) => cloudinary.uploader.destroy(id)),
      );

      res.status(500).json({
        success: false,
        message: "Product upload failed",
        error: error.message,
      });
    }
  },
);

// =====================================
// GET ALL PRODUCTS
// =====================================

router.get("/all_Products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch products",
    });
  }
});

// =====================================
// GET PRODUCT BY NAME AND PRICE
// =====================================

router.post("/get/products/:product_name", async (req, res) => {
  try {
    const { product_name } = req.params;
    const { price } = req.body;

    const product = await Product.findOne({
      name: product_name,
      price: price,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch product",
    });
  }
});

// =====================================
// DELETE PRODUCT AND CLOUDINARY IMAGES
// =====================================

router.post("/delete", async (req, res) => {
  try {
    const product = await Product.findById(req.body._id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete main image from Cloudinary
    if (product.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(product.cloudinaryPublicId);
    }

    // Delete gallery images from Cloudinary
    if (product.galleryPublicIds?.length) {
      await Promise.all(
        product.galleryPublicIds.map((id) => cloudinary.uploader.destroy(id)),
      );
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(req.body._id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);

    res.status(500).json({
      message: "Product deletion failed",
      error: error.message,
    });
  }
});

// =====================================
// GET PRODUCT BY ID
// =====================================

router.get("/getproduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch product",
    });
  }
});

module.exports = router;
