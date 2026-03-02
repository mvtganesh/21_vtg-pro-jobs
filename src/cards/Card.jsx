import React, { useEffect, useState } from "react";
// import Jobs from "../pages/jobs";
import "./Card.css";
import { useNavigate } from "react-router-dom";
// to create the auto matic cards based on the json data ,getting data from jobs.jsx file
export default function Card(props) {
  let [wisharray, setwisharray] = useState([]);
  let [appliedArray, setAppliedArray] = useState([]);
  useEffect(() => {
    let f1 = JSON.parse(localStorage.getItem("loginuser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let loginUser = users.find((i) => i.user === f1);

    if (loginUser) {
      setwisharray(loginUser.wishListData || []);
      setAppliedArray(loginUser.appliedJobsData || []);
    }
  }, []);
  let jobId = props.jobId;
  let jobTitle = props.jobTitle;
  let jobCompany = props.jobCompany;
  let jobLocation = props.jobLocation;
  let jobWorkPlace = props.jobWorkPlace;
  let jobRequirements = props.jobRequirements;
  let jobSalary = props.jobSalary;
  let jobDeadline = props.jobDeadline;
  // navigate more info page when user clcked on more info based on id will transfer via props formate.
  let navigate = useNavigate();
  function moreInfo(getJobId) {
    // get the user clicked card id and c.l and passed as params to the moreinfo.jsx page
    // console.log(getJobId);
    navigate(`/MoreInfo/${getJobId}`);
  }

  // handle wishlisthandleWishList
  function handleWishList(jobId) {
    jobId = parseInt(jobId);
    let f1 = JSON.parse(localStorage.getItem("loginuser"));
    if (!f1) {
      alert("Please login first");
      return;
    } else {
      console.log("getting login user name: ", f1);
    }

    // getting entire users list from local storage.(from me.jsx)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // getting login user obj from the entire local storage obj in obj array of obj formate
    let loginuserobj = users.find((i) => i.user == f1);
    if (!loginuserobj) return;
    //array of obj convert to obj formate.
    let wishlist = loginuserobj.wishListData || [];
    console.log("wishlist", wishlist);

    // if job id not include in user wish array then only add the id to array.->update array.
    let updatedWishlist;
    if (!wishlist.includes(jobId)) {
      updatedWishlist = [...wishlist, jobId];
      console.log("updatedWishlist :", updatedWishlist);
      alert("You have added this job to your wishlist...📥");
    } else {
      updatedWishlist = wishlist.filter((id) => id !== jobId);
      alert("You have removed this job to your wishlist...🚮");
    }
    // update state
    setwisharray(updatedWishlist);

    //  update users array
    let updatedUsers = users.map((i) =>
      i.user === f1 ? { ...i, wishListData: updatedWishlist } : i,
    );
    //  update local storage users array
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    //  notify header immediately ->then only update immediatly in header place count of jobs value.
    window.dispatchEvent(new Event("wishlistUpdated"));
  }

  // handle easy apply
  function handleEasyApply(jobId) {
    jobId = parseInt(jobId);

    let f1 = JSON.parse(localStorage.getItem("loginuser"));
    if (!f1) {
      alert("Please login first");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loginuserobj = users.find((i) => i.user == f1);
    if (!loginuserobj) return;

    let applied = loginuserobj.appliedJobsData || [];

    let updatedApplied;

    if (!applied.includes(jobId)) {
      updatedApplied = [...applied, jobId];
      alert("Application submitted successfully...✅");
    } 
    else {
      // if u want to remove the applied jobs then uncomment below 2lines and remove return button.
      // updatedApplied = applied.filter((id) => id !== jobId);
      // alert("Application removed...🚮");
       return
    }

    //  update state
    setAppliedArray(updatedApplied);

    //  update users
    let updatedUsers = users.map((i) =>
      i.user === f1 ? { ...i, appliedJobsData: updatedApplied } : i,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    //  notify header (if you show applied count)
    window.dispatchEvent(new Event("appliedUpdated"));
  }

  return (
    <>
      <div>
        <div className="container-fluid my-4">
          <div className="card modern-card border-0 p-4">
            <div className="row align-items-center">
              {/* LEFT SECTION */}
              <div className="col-lg-8 col-12">
                <h4 className="fw-bold text-dark mb-1">{jobTitle}</h4>

                <p
                  className="text-muted mb-2"
                  style={{ fontVariant: "small-caps" }}
                >
                  {jobCompany}
                </p>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  <span className="badge bg-light text-dark border px-3 py-2">
                    📍 {jobLocation}
                  </span>

                  <span className="badge bg-info-subtle text-info border px-3 py-2">
                    🏢 {jobWorkPlace}
                  </span>

                  <span className="badge bg-success-subtle text-success border px-3 py-2 fw-semibold">
                    💰 ₹{jobSalary}
                  </span>

                  <span className="badge bg-danger-subtle text-danger border px-3 py-2">
                    ⏳ {jobDeadline}
                  </span>
                </div>

                <button
                  className="btn btn-primary px-4 py-2 rounded-pill"
                  onClick={() => {
                    moreInfo(jobId);
                  }}
                >
                  More Info
                </button>
                <button id="styleWishButton" className="btn px-4 py-2 " onClick={() => handleWishList(jobId)}>
                  {wisharray.includes(parseInt(jobId)) ? "❤️" : "💛"}
                </button>
                <button
                  className="btn btn-primary px-4 py-2 rounded-pill"
                  onClick={() => handleEasyApply(jobId)}
                >
                  {appliedArray.includes(parseInt(jobId)) ? "Applied": "Easy Apply"}
                </button>
              </div>
              {/* RIGHT SECTION - REQUIREMENTS */}
              <div className="col-lg-4 col-12 mt-4 mt-lg-0">
                <h6 className="fw-bold mb-3 text-secondary">Requirements</h6>

                <div className="d-flex flex-wrap gap-3">
                  {jobRequirements.map((req, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary-subtle text-dark border px-3 py-2"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
