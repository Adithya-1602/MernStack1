import React, { useState } from 'react';
import axios from "axios";
import apiUrl from "../apiUrl";


const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passConfrim, setpassConfrim] = useState("");
  const [role, setrole] = useState("user")


  const handleClick = () => {
    console.log({

      name,
      email,
      password,
      passConfrim,
      role,
    });

    axios.post( apiUrl + "/auth/register", {
      name,
      email,
      password,
      passConfrim,
      role,
    })
      .then((res) => {
        console.log(res);
        alert(res.data)

        window.location.href = "/login";

      })
      .catch((er) => {
        console.log(er);

      });
  };

  return (
    <div>
      <h1>Singup</h1>

      <input
        type="text"
        placeholder="name"
        onChange={(e) => setname(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confrim password"
        onChange={(e) => setpassConfrim(e.target.value)}
      />
      <select name="" id="" onChange={(e) => setrole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleClick}>SignUp</button>
    </div>
  );
};

export default Signup;