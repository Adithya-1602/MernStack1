import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Shop from "./Pages/Products/Shop";
import Admin from "./Pages/Admin";
import ProductDetail from "./Pages/Products/ProductDetail";
import Navbar from "./Compoent/Navbar";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/productdetail/:prod_id/:prod_name/:prod_imgloc/:prod_imgname"
          element={<ProductDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
