import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return(
  <>
    <div>Profile</div>

    <div>{user && user.name}</div>
    <div>{user && user.email}</div>
    <div>{user && user.role}</div>
  </>
  )
};

export default Profile;
