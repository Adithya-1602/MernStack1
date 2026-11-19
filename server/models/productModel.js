const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  image: String,
  cloudinaryPublicId: String,
  gallery: [String],
  galleryPublicIds: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
