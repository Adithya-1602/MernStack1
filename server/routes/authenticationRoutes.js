const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const hashPasswordMiddlewar = (req, res, next) => {
  const { password, passConfrim } = req.body;

  if (password !== passConfrim) {
    res.send("Password does not match");
  } else {
    bcrypt.hash(password, 10, (err, hashPassword) => {
      if (err) {
        console.log(err);
      } else {
        console.log(hashPassword);

        req.hashp = hashPassword;
        next();
      }
    });
  }
};

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

const passwordMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      console.log(user);

      req.user = user;
      console.log(req);

      if (user) {
        console.log(user.password, password);
        
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            console.log(result);
            if (result) {
              next();
            }else{
              res.send({message: "Password does not match", token: null})
            }
          } else {
            console.log(err);
          }
        });
      } else {
        res.send({ message: "User does not exist", token: null });
      }
    })
    .catch((er) => {
      console.log(er);
    });
};

const CreateToken = (req, res, next) => {
  const user = req.user;
  const email = user.email;

  const token = jwt.sign({ email }, "json123");
  console.log(token);

  req.token = token;
  next();
};

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
