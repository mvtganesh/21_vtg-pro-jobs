import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./Home.css";
import Jobs from "../pages/Jobs";
import Filters from "../filters/Filters";
import Data from "../mainData/Data";
import { data } from "react-router-dom";

export default function Home() {
  // getting the final filtered array of obj from the filters.jsx via using stateuplifting b/w home.jsx and filters.jsx and job.jsx
  let [filteredData, setFilteredData] = useState(Data);
  let [searchField, SetsearchField] = useState("");
  // loding aimation 2 sec
  let [loading1, setloading1] = useState(false);

  useEffect(() => {
    if (Data) {
      setTimeout(() => {
        setloading1(true);
      }, 1000);
    }
  }, []);

  // console.log('search from home : ',searchField);

  // paginantion
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // change as needed
  // paginantion logic
  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading1) {
    return (
      <>
      <Header SetsearchField={SetsearchField} />
        <div className="mainContent">
          <div className="filters-con">
            <Filters
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              searchField={searchField}
            />
          </div>
          <div className="Job-content-con">
            {/* or belo line chnage to this   {<Jobs Data={filteredData} />} it disp all the cards ,, without pagenation then remove below line */}
            {<Jobs Data={currentJobs} />}

            {/* pagination buttons logic */}
            <div className="pagination-container text-center my-4">
              <button
                style={{
                  background: "linear-gradient(135deg, #4e73df, #1cc88a)",
                }}
                className="btn mx-1"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>

              {/* o/p create eampty array of elements Array(5) → [empty × 5][...Array(5)] → [undefined, undefined, undefined, undefined, undefined] */}
              {/* index 0 → page 1  
                   index 1 → page 2 */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn mx-1 ${
                    currentPage === index + 1
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                style={{
                  background: "linear-gradient(135deg, #4e73df, #1cc88a)",
                }}
                className="btn  mx-1"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* for small screens/mobiles disp the filters in Offcanvas formate  */}
        <button
          className="btn btn-success filter-btn d-md-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileFilters"
        >
          ☰ Filters
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileFilters"
        >
          <div className="offcanvas-header">
            <h5>Filters</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body pt-5">
            <Filters
              filteredData={filteredData}
              setFilteredData={setFilteredData}
              searchField={searchField}
            />
          </div>
        </div>
      </>
    );
  } 
  else {
    return (
      <>
      <div className="mainloader">
        <div class="loader">
        </div>
      </div>
        
      </>
    );
  }
}
