import React, { useEffect, useState } from "react";
import Footer from '../pages/Footer'
import HeaderForSubPages from "./HeaderForSubPages";
export default function About() {
  let [loading1, setloading1] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading1(true);
    }, 500);
  }, []);

  if (loading1) {
    return (
      <>
        <HeaderForSubPages />
        <div className="container-fluid w-75" style={{ paddingTop: "15vh" }}>
          <h3>About VTGProJob</h3>
          <p>
            <b>VTGProJob</b>is a smart and modern job portal dashboard designed
            to connect talented professionals with top companies across various
            industries. Our platform simplifies the job search experience by
            offering powerful filtering, real-time job updates, and a clean
            user-friendly interface.
          </p>
          <i>We aim to bridge the gap between opportunity and talent.</i>
          <hr />
          <h3>🎯 Our Mission</h3>
          <p>
            {" "}
            <b>Our mission is to:</b> <br />
            <ul>
              <li>Help job seekers find the right opportunity faster</li>
              <li>Provide companies with qualified and filtered candidates</li>
              <li>Deliver a smooth and transparent hiring experience</li>
              <li>Empower careers through technology-driven solutions</li>
            </ul>
          </p>
          <hr />
          <h3>💡 What Makes VTGProJob Different?</h3>
          <p>
            <b>VTGProJob Dashboard provides:</b>
            <ul typeof="square">
              <li>🔍 Advanced multi-level filtering system</li>
              <li>📍 Location-based job search</li>
              <li>🏢 Company-wise job categorization</li>
              <li>💼 Experience-level filtering</li>
              <li>💰 Salary range filtering</li>
              <li>🏠 Workplace mode (Remote / Hybrid / Onsite)</li>
              <li>📊 Sort by latest or oldest job postings</li>
              <li>⚡ Clean and responsive dashboard UI</li>
            </ul>
          </p>
          <hr />
          <h3>👨‍💻 Built With Modern Technologies</h3>
          <p>
            <b>VTGProJob Dashboard is developed using:</b>
            <ul typeof="circle">
              <li>React.js</li>
              <li>JavaScript (ES6+)</li>
              <li>CSS / Modern UI styling</li>
              <li>Component-based architecture</li>
              <li>State management & dynamic filtering logic</li>
            </ul>
            <i>Our system is optimized for performance and scalability.</i>
          </p>
          <hr />
          <h3>🌍 Our Vision</h3>
          <p>
            <b>We envision VTGProJob as a powerful career ecosystem where:</b>
            <ul>
              <li>Job seekers can explore opportunities confidently</li>
              <li>Employers can hire efficiently</li>
              <li>Recruitment becomes simple, transparent, and fast</li>
            </ul>
          </p>
          <hr />
          <h3>📈 Future Enhancements</h3>
          <p>
            <b>We are continuously working to add:</b>
            <ul>
              <li>User authentication & profile dashboard</li>
              <li>Resume upload system</li>
              <li>Application tracking system</li>
              <li>Real-time notifications</li>
              <li>Admin analytics panel</li>
              <li>AI-powered job recommendations</li>
            </ul>
          </p>
        </div>
        <Footer/>
      </>
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
