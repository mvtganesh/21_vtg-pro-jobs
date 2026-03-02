import React, { useEffect, useState } from "react";
import Data from "../mainData/Data";
import Card from "../cards/Card";
import HeaderForSubPages from "./HeaderForSubPages";
import Footer from '../pages/Footer'
export default function WishList() {
  let [wishlistdata, setWishlistdata] = useState([]);
  // loding aimation 2 sec
  let [loading1, setloading1] = useState(false);

  useEffect(() => {
    function loadWishlist() {
      const f1 = JSON.parse(localStorage.getItem("loginuser"));
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const loginuserobj = users.find((i) => i.user === f1) || {
        wishListData: [],
      };

      const filtered = Data.filter((i) =>
        loginuserobj.wishListData.includes(parseInt(i.id)),
      );

      // here filtered is a wishlist array
      setWishlistdata(filtered);
    }

    // initial load
    loadWishlist();
    // listen for live updates
    window.addEventListener("wishlistUpdated", loadWishlist);

    // loading
    if (Data) {
      setTimeout(() => {
        setloading1(true);
      }, 500);
    }
  }, []);

  if (loading1) {
    return (
      <div>
        <HeaderForSubPages />
        <div style={{ paddingTop: "12vh" }}>
          <h3
            style={{
              textAlign: "center",
              color: "green",
              fontVariant: "small-caps",
            }}
          >
            Wish.💛.List
          </h3>
          {wishlistdata.length === 0 ? (
            <h4 style={{ textAlign: "center", marginTop: "40px" }}>
              No wishlist jobs yet 💔
            </h4>
          ) : (
            wishlistdata.map((cv) => (
              <Card
                key={cv.id}
                jobId={cv.id}
                jobTitle={cv.title}
                jobCompany={cv.company}
                jobLocation={cv.location}
                jobWorkPlace={cv.workplace}
                jobRequirements={cv.requirements}
                jobSalary={cv.salary.min}
                jobDeadline={cv.applicationDeadline}
              />
            ))
          )}
        </div>
        <Footer/>
      </div>
    );
  } else {
    return (
      <>
        <div className="mainloader">
          <div class="loader"></div>
        </div>
      </>
    );
  }
}
