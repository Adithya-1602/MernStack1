import React, { useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const jwt_token = localStorage.getItem("login_token");
  console.log(jwt_token);

  const handleClick = () => {
    axios
      .post(apiUrl + "/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.token) {
          localStorage.setItem("login_token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          if (res.data.role == "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/shop";
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setpassword(e.target.value)}
      />

      <button onClick={handleClick}>Signin</button>
    </div>
  );
};

export default Login;
