//import express js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModel");

require("dotenv").config();

const cors = require("cors");

//create express app using express()
const app = express();
app.use(
  cors({
    origin: true,
  }),
);

//permission to access json data
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/auth", require("./routes/authenticationRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  const PORT = process.env.PORT || 5000;
//app deploy on localhost in port no.
app.listen(PORT, () => {
  console.log("Server listen on port 5000");
});
