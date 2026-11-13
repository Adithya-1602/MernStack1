const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
            } else {
              res.send({ message: "Password does not match", token: null });
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

  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  console.log(token);

  req.token = token;
  next();
};

module.exports = { hashPasswordMiddlewar, passwordMiddleware, CreateToken };
