import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";
export default function LoginRegister() {
  let navigate = useNavigate();
  let [loginUser, setLoginUser] = useState("");
  let [loding1, setloading1] = useState(false);
  useEffect(() => {
    setTimeout(() => setloading1(true), 500);
  });
  function handleRegister(e) {
    e.preventDefault();
    let registeruser = document.getElementById("registeruser").value;
    let registerpass = document.getElementById("registerpass").value;
    // creating new obj1 is a new user details  for to add in local storage array users list.
    let registerObj1 = {
      user: registeruser,
      userPass: registerpass,
      wishListData: [],
      appliedJobsData: [],
    };

    // adding all user detailss
    // it returns the array of data formate. access with .reg-field is a class name.
    let fields = document.querySelectorAll(".reg-field");

    // one by one i/p field adding to the registerobj1 with based on classname. i->i means single form field ,insterd of id we can give classname or name like.
    fields.forEach((i) => {
      registerObj1[i.id] = i.value;
    });

    // final obj
    let registerobj2 = JSON.parse(localStorage.getItem("users")) || [];
    // push new obj to older array only if older user not exist in array list.
    if (!registerobj2.find((i) => i.user == registeruser)) {
      registerobj2.push(registerObj1);
      localStorage.setItem("users", JSON.stringify(registerobj2));
      console.log("User registered:", registerObj1);
    } else {
      alert("user details is already exist - Please go & Login");
    }
  }

  // login
  function handleLogin(e) {
    e.preventDefault();
    let loginuser = document.getElementById("loginuser").value;
    let loginpass = document.getElementById("loginpass").value;
    var final = JSON.parse(localStorage.getItem("users")) || [];
    console.log("registred users list : ", final);
    // final users list from local storage.

    // comparing user credentials with the local storage details if exist then navigate to the home page.
    if (
      final &&
      final.find((i) => i.user == loginuser && i.userPass == loginpass)
    ) {
      // passing login particular user name to header part
      localStorage.setItem("loginuser", JSON.stringify(loginuser));
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
    // Clear inputs AFTER login attempt
    setLoginUser("");
  }

  if (loding1) {
    return (
      <div className="mainDivOfLogin">
        <div
          style={{
            height: "100vh",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form className="auth-form">
            <h3>Login...</h3>
            <input
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              type="text"
              id="loginuser"
              placeholder="User Name"
              className="auth-input"
            />
            <br />
            <input
              type="password"
              id="loginpass"
              placeholder="PassWord"
              className="auth-input"
            />
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>{" "}
            <br /> <br />
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Register
            </button>
          </form>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          // style={{height:"90vh",overflowY:"scroll"}}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New User Registration Form
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <label htmlFor="registeruser">User Name : </label>
                  <input
                    id="registeruser"
                    type="text"
                    placeholder="User Name"
                  />
                </div>
                <div>
                  <label htmlFor="registeremail">EMail ID : </label>
                  <input
                    id="registeremail"
                    type="email"
                    placeholder="abc@gmail.com"
                    className="reg-field"
                  />
                </div>
                <div>
                  <label htmlFor="registerph">Ph Number : </label>
                  <input
                    type="number"
                    id="registerph"
                    placeholder="123456789"
                    className="reg-field"
                  />
                </div>
                <div></div>
                <div>
                  <label htmlFor="registerpass">Password : </label>
                  <input
                    id="registerpass"
                    type="password"
                    placeholder="*******"
                    className="reg-field"
                  />
                </div>
                <div>
                  <label htmlFor="registercpass">Confirm Password : </label>
                  <input
                    id="registercpass"
                    type="password"
                    placeholder="*******"
                    className="reg-field"
                  />
                </div>
                <label htmlFor="registerresume">Upload Resume : </label>
                <input type="file" id="registerresume" className="reg-field" />

                <label htmlFor="registerphoto">Upload Photo : </label>
                <input type="file" id="registerphoto" className="reg-field" />

                <label htmlFor="registerlocation">Current Location : </label>
                <input
                  type="text"
                  id="registerlocation"
                  placeholder="----"
                  className="reg-field"
                />
                <label htmlFor="registergender">Gender</label>
                <input
                  type="text"
                  id="registergender"
                  placeholder="men/women/"
                  className="reg-field"
                />
                <label htmlFor="registerskills">Skills : </label>
                <input
                  type="text"
                  id="registerskills"
                  placeholder="html,css,js,bs,react,..."
                  className="reg-field"
                />

                <h5>Experience</h5>
                <label htmlFor="registercompany">Company Name</label>
                <input
                  type="text"
                  placeholder="--"
                  id="registercompany"
                  className="reg-field"
                />
                <label htmlFor="registerexp">Experience</label>
                <input
                  id="registerexp"
                  type="number"
                  placeholder="in digits"
                  className="reg-field"
                />

                <h5>Education</h5>
                <h6>Graduation</h6>
                <label htmlFor="registergraduation">Graduation</label>
                <input
                  type="text"
                  placeholder="btech,ba,..."
                  id="registergraduation"
                  className="reg-field"
                />
                <label htmlFor="registeruniversity">University Name</label>
                <input
                  type="text"
                  placeholder="university/college name"
                  id="registeruniversity"
                  className="reg-field"
                />
                <label htmlFor="registergraduatepercentage">Percentage</label>
                <input
                  type="number"
                  placeholder="ex:80%"
                  id="registergraduatepercentage"
                  className="reg-field"
                />
                <label htmlFor="graduatestream">Department</label>
                <input
                  type="text"
                  id="graduatestream"
                  placeholder="ECE/CSE/EEE/..."
                  className="reg-field"
                />
                <label htmlFor="registergraduateyear">Year Of PassedOut</label>
                <input
                  type="date"
                  placeholder="registergraduateyear"
                  className="reg-field"
                />
                <h6>Intermediate</h6>
                <label htmlFor="registercollege">College Name</label>
                <input
                  type="text"
                  placeholder="college name"
                  id="registercollege"
                  className="reg-field"
                />
                <label htmlFor="collegebranch">branch</label>
                <input
                  id="collegebranch"
                  type="text"
                  placeholder="mpc/bipc,.."
                  className="reg-field"
                />
                <label htmlFor="registercollegepercentage">marks</label>
                <input
                  type="number"
                  placeholder="ex:800/1000"
                  id="registercollegepercentage"
                  className="reg-field"
                />
                <label htmlFor="registerinteryear">Year Of PassedOut</label>
                <input
                  type="date"
                  id="registerinteryear"
                  placeholder="registerinteryear"
                  className="reg-field"
                />
                <h6>School</h6>
                <label htmlFor="school">School Name </label>
                <input
                  type="text"
                  id="school"
                  placeholder="name of the school"
                  className="reg-field"
                />
                <label htmlFor="schoolmarks">Percentage</label>
                <input
                  type="number"
                  placeholder="90%"
                  id="schoolmarks"
                  className="reg-field"
                />
                <label htmlFor="schoolyear">Year Of PassedOut</label>
                <input
                  type="date"
                  placeholder="schoolyear"
                  id="schoolyear"
                  className="reg-field"
                />

                <br />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRegister}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
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
