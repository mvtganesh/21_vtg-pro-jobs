import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Data from "../mainData/Data";
import "./MoreInfo.css";
import Card from "../cards/Card";
import "../cards/Card.css"
export default function MoreInfo() {
  //i) getting user triggered card id
  let { useParamJobId } = useParams();
  // console.log(useParamJobId);
  useEffect(() => {
  window.scrollTo(0, 0);
}, [useParamJobId]);

  // ii)getting the id based/related data from main data ,use filtering-->o/p we get related obj
  let job = Data.find((cv) => cv.id == useParamJobId);
  // console.log(idRelatedData);

  // // related jobs store
  let relatedJobs = Data.filter((cv) => {
    if (cv.id == job.id) return false; // exclude current job
    let count = 0;
    for (let i of cv.requirements) {
      if (job.requirements.includes(i)) {
        count++;
      }
    }
    return count >= 3;
  });
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);


  return (
    <>
      {/*iii) disp the id related data on web page */}
      <div className="container my-5">
        {/* Header basic info 1*/}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
          <div className="gradient-header p-4 ">
            {job.urgent && (
              <span className="urgent-badge">🔥 Urgent Hiring</span>
            )}

            <div className="row align-items-center text-white">
              <div className="col-md-2 text-center">
                <img
                title="manager"
                  src={job.companyLogo}
                  alt="logo"
                  className="rounded-circle border border-3 border-white"
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="col-md-7">
                <h3 className="fw-bold">{job.title}</h3>
                <p className="mb-2" style={{ fontVariant: "small-caps" }}>
                  {job.company}
                </p>

                <div className="d-flex flex-wrap gap-4">
                  <span className="badge bg-light text-dark">
                    📍 {job.location} ({job.locationType})
                  </span>
                  <span className="badge bg-light text-dark">
                    💼 {job.employmentType}
                  </span>
                  <span className="badge bg-light text-dark">
                    ⭐ {job.experienceLevel}
                  </span>
                  <span className="badge bg-light text-dark">
                    🏢 {job.workplace}
                  </span>

                  {job.remotePossible && (
                    <span className="badge bg-primary">Remote Possible</span>
                  )}

                  {job.visaSponsorship && (
                    <span className="badge bg-info">Visa Sponsorship</span>
                  )}

                  {job.relocationAssistance && (
                    <span className="badge bg-warning text-dark">
                      Relocation Assistance
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-3 text-md-end mt-3 mt-md-0">
                <h5 className="fw-bold" style={{ fontStyle: "italic" }}>
                  ₹{job.salary.min.toLocaleString()} - ₹
                  {job.salary.max.toLocaleString()}
                </h5>
                <div>
                  <b class="text-danger">Deadline : </b>
                  <big> {job.applicationDeadline}</big>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="row text-center p-3 bg-light">
            <div className="col">
              <h6 className="fw-bold">{job.views}</h6>
              <small>Views</small>
            </div>
            <div className="col">
              <h6 className="fw-bold">{job.applications}</h6>
              <small>Applications</small>
            </div>
            <div className="col">
              <h6 className="fw-bold">{job.companySize}</h6>
              <small>Company Size</small>
            </div>
          </div>

          {/* 3 */}
          <div className="row text-center bg-white py-2 border-top">
            <div className="col">
              <small>📅 Posted: {job.postedDate}</small>
            </div>
            <div className="col">
              <small>
                Status :
                <span
                  className={`fw-bold ${
                    job.applicationStatus === "open"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {job.applicationStatus.toUpperCase()}
                </span>
              </small>
            </div>
          </div>
        </div>

        {/*  ABOUT ROLE 4 */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 hover-card">
          <h5 className="fw-bold mb-3">About The Role</h5>
          <p className="text-muted">{job.AboutRoleAndUS}</p>
        </div>

        {/* RESPONSIBILITIES & REQUIREMENTS 5*/}

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100 hover-card">
              <h5 className="fw-bold mb-3">Responsibilities</h5>
              {job.responsibilities.map((res, index) => (
                <p>✔{res}</p>
              ))}
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100 hover-card">
              <h5 className="fw-bold mb-3">Requirements</h5>
              <div className="d-flex flex-wrap gap-2">
                {job.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="badge requirement-badge px-3 py-2"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*  BENEFITS 6 */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 hover-card">
          <h5 className="fw-bold mb-3">Benefits</h5>
          <div className="d-flex flex-wrap  column-gap-5 row-gap-3">
            {job.benefits.map((benefit, index) => (
              <span key={index} className="badge benefit-badge px-3 py-2">
                🎁 {benefit}
              </span>
            ))}
          </div>
        </div>

        {/*  COMPANY INFO 7 */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mb-5 hover-card">
          <h5 className="fw-bold mb-3">About Company</h5>
          <p className="text-muted">{job.aboutCompany}</p>
          <p>
            <strong>Contact Person:</strong> {job.contactPerson}
          </p>
          <p>
            <strong>Email:</strong> {job.contactEmail}
          </p>
        </div>

        {/* STICKY APPLY BUTTON 8 */}
        <div className="sticky-apply text-center">
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-lg apply-btn px-5 rounded-pill"
          >
            Apply Now 🚀
          </a>
        </div>
      </div>

      <div>
        <div
          class="text-center text-light fw-bold p-3 fs-5"
          style={{ background: "linear-gradient(135deg, #4e73df, #1cc88a)" }}
        >
          Related Jobs
        </div>
      </div>

      <div className="container my-4">
        <div className="row">
          {relatedJobs.length === 0 ? (
            <p className="text-center">No related jobs found.</p>
          ) : (
            relatedJobs.map((cv) => (
              <div className="col-md-6 mb-4" key={cv.id}>
                <Card
                  
                  jobId={cv.id}
                  jobTitle={cv.title}
                  jobCompany={cv.company}
                  jobLocation={cv.location}
                  jobWorkPlace={cv.workplace}
                  jobRequirements={cv.requirements}
                  jobSalary={cv.salary.min}
                  jobDeadline={cv.applicationDeadline}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
