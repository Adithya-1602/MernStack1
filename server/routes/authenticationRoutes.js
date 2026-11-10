const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  hashPasswordMiddlewar,
  passwordMiddleware,
  CreateToken,
} = require("../middlewars/authMiddlewar");

const router = express.Router();

router.post("/register", hashPasswordMiddlewar, (req, res) => {
  const { name, email, role } = req.body;

  const hashPassword = req.hashp;

  User.findOne({ email })
    .then((user) => {
      console.log(user);

      if (user) {
        res.send("User already exist");
      } else {
        const save_user = new User({
          name,
          email,
          password: hashPassword,
          role,
        });

        save_user
          .save()
          .then(() => {
            res.send("User registeered successfully");
          })
          .catch((er) => {
            console.log(er);
          });
      }
    })
    .catch((er) => {
      console.log(er);
    });
});

router.post("/login", passwordMiddleware, CreateToken, (req, res) => {
  console.log("user", req.user);

  const user = req.user;
  const token = req.token;

  res.send({
    message: "User logged in successfully",
    token: token,
    role: user.role,
    user: user,
  });
});

module.exports = router;
