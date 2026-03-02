import React, { useEffect, useState } from "react";
import logo from "../assets/01.png";
import "./Header.css";
//importing to navigate to paricular page {app.jsx based } touse usenavigate
import { useNavigate } from "react-router-dom";

export default function Header() {
  // getting searchField,SetsearchField from the home.jsx using stateuplifting
  let [loginuserobj, setLoginuserobj] = useState({ wishListData: [],appliedJobsData: [] });
  let [username, setUsername] =useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    //load user + listen for wishlist updates
    function loadUser() {
      let f1 = JSON.parse(localStorage.getItem("loginuser"));
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let userObj = users.find((i) => i.user === f1) || { wishListData: [],appliedJobsData: [] };
      setUsername(f1);
      setLoginuserobj(userObj);
    }
    // initial load
    loadUser();
      //  listen for wishlist changes from cards.jsx.
      window.addEventListener("wishlistUpdated", loadUser);
      window.addEventListener("appliedUpdated", loadUser);
  }, []);

  // i/p search bar function
  function handleSearchSubmit(e){
    e.preventDefault();
    let search1=document.getElementById('searchInput').value;
    console.log('searchfield : ',search1);
    // passing user searched name ake to the home.jsx via stateup lifting.
    SetsearchField(search1)
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark  px-3 shadow"
      style={{
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <div
          className="navbar-brand d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={()=>{navigate("/logopage")}}
        >
          <img
            src={logo}
            alt="logo"
            width="40"
            height="40"
            className="me-2 rounded"
          />
          <span className="fw-bold">VTG Pro Jobs</span>
        </div>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Content */}
        <div className="collapse navbar-collapse" id="navbarContent" style={{ marginLeft: "30vw" }}>
          {/* Navigation */}
          <div className="d-flex flex-column flex-lg-row gap-2 text-center">
            <button
              className="btn btn-outline-light  border-2"
              onClick={() => navigate("/home")}
            >
              Home
            </button>

            <button
              className="btn btn-outline-light  border-2"
              onClick={() => navigate("/about")}
            >
              About
            </button>

            <button
              className="btn btn-outline-light border-2"
              onClick={() => navigate("/wishlist")}
            >
              WishList 🩷 {loginuserobj?.wishListData?.length || 0}
            </button>
            <button
              className="btn btn-outline-light border-2"
              onClick={() => navigate("/appliedjobs")}
            >
              Applied Jobs {loginuserobj?.appliedJobsData?.length || 0}
            </button>

            <button title={username ? username : "Login/Register"}
              className="btn btn-outline-light rounded-pill  border-2 fw-bold"
              onClick={() =>username ? navigate("/profile") : navigate("/loginregister")}
            >
              {username ? username.slice(0,10) : "Me"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
