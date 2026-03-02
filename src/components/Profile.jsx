import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Me() {
  const [loginUser, setLoginUser] = useState(null);
  let navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    wishListData: [],
    appliedJobsData: [],
  });

  useEffect(() => {
    const f1 = JSON.parse(localStorage.getItem("loginuser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (f1) {
      const foundUser = users.find((i) => i.user === f1);
      setLoginUser(f1);
      setUserObj(foundUser || { wishListData: [], appliedJobsData: [] });
    }
  }, []);

  //if no login user
  if (!loginUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Please login first 🔐</h3>
        <button onClick={() => navigate("/loginregister")}>LogIn</button>
        <button onClick={() => navigate("/loginregister")}>Register</button>
      </div>
    );
  }
  console.log(userObj);

  //  profile view
  return (
    <div className="container-fluid p-0">
      <div className="profile-page">
        <div className="profile-wrapper">
          {/* HEADER */}
          <div className="profile-header">
            <div className="avatar">
              {/* {userObj.registerphoto ? (
                <img src={userObj.registerphoto} alt="profile" />
              ) : (
                <div className="avatar-placeholder">
                  {loginUser?.charAt(0).toUpperCase()}
                </div>
              )} */}
              <div className="avatar-placeholder">
                  {loginUser?.charAt(0).toUpperCase()}
                </div>
              
            </div>

            <div className="header-info" style={{textAlign:"center"}}>
              <h3 style={{fontVariant:"small-caps"}}>{loginUser}</h3>
              <p>{userObj.registerskills}</p>
              <span className="location">
                📍 {userObj.registerlocation || "Location not set"}
              </span>
            </div>
            <div>
              <b>🩷 Wishlist Jobs: {userObj?.wishListData?.length || 0}</b>{" "}
              <br />
              <b>✅ Applied Jobs: {userObj?.appliedJobsData?.length || 0}</b>
            </div>
          </div>

          {/* BODY */}
          <div className="profile-body">
            {/* CONTACT */}
            <div className="profile-section">
              <h3>Contact Information</h3>
              <div className="info-grid">
                <p>
                  <strong>Email:</strong> {userObj.registeremail}
                </p>
                <p>
                  <strong>Phone:</strong> {userObj.registerph}
                </p>
                <p>
                  <strong>Gender:</strong> {userObj.registergender}
                </p>
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="profile-section">
              <h3>Professional Experience</h3>
              <div className="info-grid">
                <p>
                  <strong>Company:</strong> {userObj.registercompany}
                </p>
                <p>
                  <strong>Skills:</strong> {userObj.registerskills}
                </p>
                <p>
                  <strong>Experience:</strong> {userObj.registerexp} years
                </p>
              </div>
            </div>

            {/* EDUCATION */}
            <div className="profile-section">
              <h3>Education</h3>
              <h6>Graduation</h6>
              <div className="info-grid">
                <p>
                  <strong>Graduation:</strong> {userObj.registergraduation}
                </p>
                <p>
                  <strong>University:</strong> {userObj.registeruniversity}
                </p>
                <p>
                  <strong>Percentage %:</strong> {userObj.registergraduatepercentage}
                </p>
                <p>
                  <strong>Department:</strong> {userObj.graduatestream}
                </p>
                <p>
                  <strong>Year Of PassedOut :</strong>{" "}
                  {userObj.registergraduateyear}
                </p>{" "}
              </div>
              <hr />
              <h6>Intermediate</h6>
              <div className="info-grid">
                <p>
                  <strong>Inter College:</strong> {userObj.registercollege}
                </p>
                <p>
                  <strong>Branch :</strong> {userObj.collegebranch}
                </p>
                <p>
                  <strong>Inter Marks:</strong>{" "}
                  {userObj.registercollegepercentage}
                </p>
                <p>
                  <strong>Year Of Passed Out : </strong>{" "}
                  {userObj.registerinteryear}
                </p>{" "}
              </div>
            <hr />

            <h6>School</h6>
            <div className="info-grid">
              <p>
                <strong>School:</strong> {userObj.school}
              </p>
              <p>
                <strong>Percentage %:</strong> {userObj.schoolmarks}
              </p>
              
              <p>
                <strong>Year Of PassedOut : </strong> {userObj.schoolyear}
              </p>{" "}
            </div>
            </div>
            
            {/* RESUME */}
            <div className="profile-section pb-5">
              <h3>Resume</h3>
              <p className="resume-file">
                {userObj.registerresume || "No resume uploaded"}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="profile-actions">
            <button
              className="btn btn-outline-success border-2 fw-bold"
              onClick={() => navigate("/wishlist")}
            >
              🩷 Wish List
            </button>

            <button
              className="btn btn-outline-danger border-2 fw-bold"
              onClick={() => navigate("/appliedjobs")}
            >
              📄 Applied Jobs
            </button>

            <button
              className="btn btn-outline-danger border-2 fw-bold"
              onClick={() => navigate("/loginregister")}
            >
              🚪 Logout
            </button>

            <button
              className="btn btn-outline-success border-2 fw-bold"
              onClick={() => navigate("/loginregister")}
            >
              ➕ Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
