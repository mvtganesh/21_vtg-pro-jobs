import React, { useEffect, useState } from "react";
import logo from "../assets/01.png";
import "./Header.css";
//importing to navigate to paricular page {app.jsx based } touse usenavigate
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  // getting searchField,SetsearchField from the home.jsx using stateuplifting
  let{SetsearchField}=props;
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
  //       return () => {
  //   window.removeEventListener("wishlistUpdated", loadUser);
  // window.removeEventListener("appliedUpdated", loadUser);
  // };
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
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Section - 80% of remaining space */}
          <form className="d-flex flex-grow-1 justify-content-center mx-lg-3 my-3 my-lg-0">
            <div className="input-group" style={{ width: "80%" }}>
              <input
                type="search"
                className="form-control rounded-start-pill"
                placeholder="Search the hiring..."
                id="searchInput"
              />
              <button
                className="btn btn-warning rounded-end-pill"
                type="submit"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </div>
          </form>

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
