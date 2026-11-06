//import express js
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModel");

const cors = require("cors")


//create express app using express()
const app = express();
app.use(cors({
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
  .connect(
    "mongodb://adithyavi113_db_user:6BA4hllx5OgAMKZy@ac-hqhbn0p-shard-00-00.ag93bja.mongodb.net:27017,ac-hqhbn0p-shard-00-01.ag93bja.mongodb.net:27017,ac-hqhbn0p-shard-00-02.ag93bja.mongodb.net:27017/?ssl=true&replicaSet=atlas-9s53jz-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//app deploy on localhost in port no.
app.listen(5000, () => {
  console.log("Server is running on port 5000");

});
