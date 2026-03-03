import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/01.png";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setToastMessage("🎉 Successfully subscribed to job alerts!");
      setShowToast(true);
      setEmail("");
      
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      setToastMessage("⚠️ Please enter a valid email address");
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  };

  return (
    <footer className="footer-main">
      {/* Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        <div className="toast-content">
          <i className={`bi ${toastMessage.includes('🎉') ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-warning'}`}></i>
          <span>{toastMessage}</span>
        </div>
      </div>

      <div className="footer-gradient">
        <div className="container-fluid">
          <div className="row footer-content">
            
            {/* Brand Section */}
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div 
                className="footer-brand d-flex align-items-center mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/logopage")}
              >
                <img
                  src={logo}
                  alt="VTGProJob Logo"
                  width="45"
                  height="45"
                  className="me-2 rounded-circle border border-2 border-white"
                />
                <span className="footer-brand-text">VTG Pro Jobs</span>
              </div>
              <p className="footer-description">
                Bridging the gap between opportunity and talent. 
                Find your dream job with our smart job portal dashboard.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a  target="_blank" href="https://x.com/maddali_ga21396" className="social-icon" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a target="_blank" href="https://www.instagram.com/m.v.t.ganesh?igsh=YmR3bjN2eDFydzl1" className="social-icon" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/m-v-t-ganesh-237726280/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bx8UvV86eSy6SRDgkF26obQ%3D%3D" className="social-icon" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a target="_blank" href="https://www.linkedin.com/redir/redirect/?url=https%3A%2F%2Fgithub.com%2Fmvtganesh&urlhash=e4HV&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BH0w1uNLFSPCySBsW7PO59w%3D%3D" className="social-icon" aria-label="GitHub">
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 className="footer-title">
                <i className="bi bi-link-45deg me-2"></i>
                Quick Links
              </h5>
              <ul className="footer-links">
                <li>
                  <button onClick={() => navigate("/home")}>
                    <i className="bi bi-house-door me-2"></i>
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/about")}>
                    <i className="bi bi-info-circle me-2"></i>
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/wishlist")}>
                    <i className="bi bi-heart me-2"></i>
                    Wishlist
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/appliedjobs")}>
                    <i className="bi bi-check2-circle me-2"></i>
                    Applied Jobs
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/profile")}>
                    <i className="bi bi-person-circle me-2"></i>
                    Profile
                  </button>
                </li>
              </ul>
            </div>

            {/* Job Categories */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h5 className="footer-title">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                Categories
              </h5>
              <ul className="footer-links">
                <li>
                  <button>
                    <i className="bi bi-laptop me-2"></i>
                    Technology
                  </button>
                </li>
                <li>
                  <button>
                    <i className="bi bi-megaphone me-2"></i>
                    Marketing
                  </button>
                </li>
                <li>
                  <button>
                    <i className="bi bi-currency-dollar me-2"></i>
                    Finance
                  </button>
                </li>
                <li>
                  <button>
                    <i className="bi bi-heart-pulse me-2"></i>
                    Healthcare
                  </button>
                </li>
                <li>
                  <button>
                    <i className="bi bi-book me-2"></i>
                    Education
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h5 className="footer-title">
                <i className="bi bi-envelope-paper me-2"></i>
                Get In Touch
              </h5>
              <ul className="footer-contact">
                <li>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  123 Job Street, Tech Park, Hyderabad
                </li>
                <li>
                  <i className="bi bi-telephone-fill me-2"></i>
                  +91 949 1234 205
                </li>
                <li>
                  <i className="bi bi-envelope-fill me-2"></i>
                  mvtganesh3@gmail.com
                </li>
                <li>
                  <i className="bi bi-clock-fill me-2"></i>
                  Mon - Fri, 9:00 AM - 6:00 PM
                </li>
              </ul>

              {/* Newsletter Signup */}
              <div className="footer-newsletter mt-3">
                <h6 className="text-white mb-2">
                  <i className="bi bi-bell-fill me-2"></i>
                  Subscribe to Job Alerts
                </h6>
                <form onSubmit={handleSubscribe}>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <i className="bi bi-envelope text-white"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control newsletter-input"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Email for newsletter"
                    />
                    <button
                      className="btn newsletter-btn"
                      type="submit"
                    >
                      <i className="bi bi-send-fill me-2"></i>
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="footer-divider" />

          {/* Bottom Bar */}
          <div className="row footer-bottom">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                <i className="bi bi-c-circle me-1"></i>
                {currentYear} VTGProJob. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <button className="footer-bottom-link">
                <i className="bi bi-shield-lock me-1"></i>
                Privacy Policy
              </button>
              <span className="footer-bottom-sep">|</span>
              <button className="footer-bottom-link">
                <i className="bi bi-file-text me-1"></i>
                Terms of Service
              </button>
              <span className="footer-bottom-sep">|</span>
              <button className="footer-bottom-link">
                <i className="bi bi-headset me-1"></i>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
