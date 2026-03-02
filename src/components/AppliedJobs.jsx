import React, { useEffect, useState } from "react";
import Data from "../mainData/Data";
import Card from "../cards/Card";
import HeaderForSubPages from "./HeaderForSubPages";
import Footer from '../pages/Footer'
export default function AppliedJobs() {
  const [appliedData, setAppliedData] = useState([]);
  // loding aimation 2 sec
  let [loading1, setloading1] = useState(false);

  useEffect(() => {
    function loadAppliedJobs() {
      const f1 = JSON.parse(localStorage.getItem("loginuser"));
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const loginuserobj = users.find((i) => i.user === f1) || {
        appliedJobsData: [],
      };

      const filtered = Data.filter((i) =>
        (loginuserobj.appliedJobsData || []).includes(parseInt(i.id)),
      );

      // here filtered is a applied array
      setAppliedData(filtered);
    }
    //  initial load
    loadAppliedJobs();
    //  live updates from Card.jsx
    window.addEventListener("appliedUpdated", loadAppliedJobs);
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
            Applied Jobs
          </h3>

          {appliedData.length === 0 ? (
            <h4 style={{ textAlign: "center", marginTop: "40px" }}>
              No applied jobs yet 😴
            </h4>
          ) : (
            appliedData.map((cv) => (
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
