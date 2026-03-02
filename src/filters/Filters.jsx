import React, { useEffect, useState } from "react";
import Data from "../mainData/Data";
import "./Filters.css";
// final json filtered data is stored in home.jsx  filteredData from result.
export default function Filters({
  filteredData,
  setFilteredData,
  searchField,
}) {
  let [filtersState, setFiltersState] = useState({});
  // whenever filtersState changes or searchField changes, applyFilters() will run.camma work as a oroperator.
  useEffect(() => {
    applyFilters();
  }, [filtersState, searchField]);
  // basic code to print unique key values of experience level based
  // const experienceLevels = [...new Set(Data.map(job => job.experienceLevel))];
  // console.log(experienceLevels);

  //   what are the key fields available
  const fields = [
    "experienceLevel",
    "location",
    "employmentType",
    "company",
    "requirements",
    "benefits",
    "workplace",
  ];
  // check user seached for any product or not.
  console.log("search from filters  ;", searchField);

  //i   store field name and value in obj formate
  const uniqueData = {};

  // iii getting field key and data return unique values .
  // map() → keeps nested arrays
  // flatMap() → flattens one level automatically
  const getUniqueValues = (data, key) => {
    return [...new Set(data.flatMap((item) => item[key]))];
  };

  //ii   taking one by one field and pass to function to get the related field values unique and store in obj,for function pass field key and data
  fields.forEach((Eachfield) => {
    uniqueData[Eachfield] = getUniqueValues(Data, Eachfield);
  });

  //   disp the unique field name and value.
  // console.log('unique key-value : ',uniqueData);

  //   dispthe uniqueData on web page in filters formate

  //   ------------------------filtering functions
  function experienceLevel(e) {
    let checkedItem = e.target.value;
    setFiltersState({ ...filtersState, experienceLevel: checkedItem });
  }
  function location(e) {
    let checkedItem = e.target.value;
    setFiltersState({ ...filtersState, location: checkedItem });
  }
  function requirements(e) {
    // if checked
    if (e.target.checked) {
      // if the requirements key  is already exit in obj then use that, if not exist then create a empty array 1st time click the requirements on that time it uses the new array.
      let getObj = filtersState.requirements || [];
      getObj.push(e.target.value);
      let final = { ...filtersState, requirements: getObj };
      setFiltersState(final);
    }
    // if unchecked
    else {
      let getObj = filtersState.requirements;
      let final = {
        ...filtersState,
        requirements: getObj.filter((cv) => cv != e.target.value),
      };
      setFiltersState(final);
    }
  }
  function company(e) {
    let getVal = e.target.value;
    setFiltersState({ ...filtersState, company: getVal });
  }
  function employmentType(e) {
    let getVal = e.target.value;
    setFiltersState({ ...filtersState, employmentType: getVal });
  }
  function workplace(e) {
    if (e.target.checked) {
      let getObj = filtersState.workplace || [];
      getObj.push(e.target.value);
      let final = { ...filtersState, workplace: getObj };
      setFiltersState(final);
    } else {
      let getObj = filtersState.workplace;
      setFiltersState({
        ...filtersState,
        workplace: getObj.filter((cv) => cv !== e.target.value),
      });
    }
  }
  function benefits(e) {
    let getVal = e.target.value;
    setFiltersState({ ...filtersState, benefits: getVal });
  }
  function handleSalary() {
    let minimum = parseInt(document.getElementById("min").value);
    let maximum = parseInt(document.getElementById("max").value);
    if (minimum && maximum) {
      setFiltersState({ ...filtersState, min: minimum, max: maximum });
    } else {
      alert("Max/Min fields are required. Please fill them to continue...");
    }
  }
  function Sort(e) {
    let getVal = e.target.value;
    setFiltersState({ ...filtersState, sort: getVal });
  }
  function companySize(e) {
    let getObj = e.target.value;
    document.getElementById("companySize").innerText = getObj;
    setFiltersState({ ...filtersState, companySize: getObj });
  }
  function ApplicationStatus(e) {
    let getObj = e.target.value;
    setFiltersState({ ...filtersState, applicationStatus: getObj });
  }
  // ------filter reset function
  function handleReset(e) {
    let getObj = e.target.value;
    let final = { ...filtersState };
    if (getObj == "Salary") {
      delete final["min"];
      delete final["max"];

      //  clear salary inputs manually
      document.getElementById("min").value = "";
      document.getElementById("max").value = "";
    } else if (getObj == "companySize") {
      delete final["companySize"];
      document.getElementById("companySize").innerText = 0;
    }
    // total filters reset
    else if (getObj == "Reset") {
      final = {};
    } else {
      delete final[getObj];
    }
    setFiltersState(final);
    console.log("after reset -final data : ", final);
  }

  // --------filters the maindata to get the filtered obj only.based onfilters property name.
  // cv->main data obj's give one by one,,key-> filterarray keys give one by one.
  function applyFilters() {
    let result = Data.filter((cv) => {
      for (let key in filtersState) {
        // experienceLevel
        if (key == "experienceLevel") {
          if (filtersState[key] !== cv.experienceLevel) {
            return false;
          }
        }
        // location
        else if (key == "location") {
          if (filtersState[key] !== cv.location) {
            return false;
          }
        } else if (key == "employmentType") {
          if (filtersState[key] !== cv.employmentType) {
            return false;
          }
        } else if (key == "company") {
          if (filtersState[key] !== cv.company) {
            return false;
          }
        } else if (key == "requirements") {
          // comparing 2 arrays i.e;maindata obj array,filterarray data if 2 arrays contains atleast 1 element it returns true.
          // some method is used to return true / false based on cadition atleast one elemet is satisfied the condition it return true.some method iterate the one by one elemet and compare the condition
          // ex: arr1.some(item => arr2.includes(item));
          if (
            !filtersState.requirements.some((i) => cv.requirements.includes(i))
          ) {
            return false;
          }
        } else if (key == "benefits") {
          if (!cv.benefits.includes(filtersState[key])) {
            return false;
          }
        } else if (key == "workplace") {
          if (!filtersState.workplace.some((i) => cv.workplace.includes(i))) {
            return false;
          }
        } else if (key == "min" || key == "max") {
          if (
            !(
              cv.salary.min >= filtersState.min &&
              cv.salary.max <= filtersState.max
            )
          ) {
            return false;
          }
        } else if (key == "companySize") {
          if (!(filtersState.companySize >= cv.companySize)) {
            return false;
          }
        } else if (key == "applicationStatus") {
          if (filtersState.applicationStatus !== cv.applicationStatus) {
            return false;
          }
        }
      }
      // i/p field based search obj's
      if (
        searchField &&
        !(
          cv.title.toLowerCase().includes(searchField.toLowerCase()) ||
          cv.company.toLowerCase().includes(searchField.toLowerCase()) ||
          cv.location.toLowerCase().includes(searchField.toLowerCase()) ||
          cv.workplace.toLowerCase().includes(searchField.toLowerCase()) ||
          cv.AboutRoleAndUS.toLowerCase().includes(searchField.toLowerCase()) ||
          cv.requirements.some((skill) =>
            skill.toLowerCase().includes(searchField.toLowerCase()),
          )
        )
      ) {
        return false;
      }
      return true;
    });

    //sorting logic based on date wise
    if (filtersState.sort) {
      if (filtersState.sort == "NewToOld") {
        result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      } else {
        result.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
      }
    }

    // updating final filtered obj to setstate->usestate.
    console.log("Data/FilteredData : ", result);

    setFilteredData(result);
  }
  // console.clear()
  console.log("Filtered Obj Data : ", filtersState);

  return (
    <div className="filtersMainDiv">
      <div>
        <details>
          <summary>experience Level</summary>
          {uniqueData["experienceLevel"].map((cv, i) => (
            <div key={i}>
              <input
                onChange={experienceLevel}
                id={i}
                type="radio"
                checked={filtersState.experienceLevel == cv}
                value={cv}
                name="experienceLevelRadio"
              />
              <label htmlFor={i}>{cv}</label>
            </div>
          ))}
          <div id="reset1">
            <button
              id="reset2"
              type="button"
              value="experienceLevel"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div className="location">
        <details>
          <summary>Location</summary>
          <select
            onChange={location}
            value={
              filtersState.location == undefined
                ? "select"
                : filtersState.location
            }
          >
            <option value="select">Select Location</option>

            {uniqueData["location"].map((cv, i) => (
              <option key={i} value={cv}>
                {cv}
              </option>
            ))}
          </select>
          <button id="resetselect" value="location" onClick={handleReset}>
            Reset
          </button>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>requirements</summary>
          <div
            style={{
              height: "50vh",
              border: "2px inset green",
              overflowY: "scroll",
            }}
          >
            {uniqueData["requirements"].map((cv) => (
              <div key={cv}>
                <input
                  type="checkbox"
                  value={cv}
                  name=""
                  id={cv}
                  onChange={requirements}
                  // if requirements exist then ir check the .includes condition else it goes to OR statement and gole to false .(not include it return false)
                  checked={filtersState.requirements?.includes(cv) || false}
                />
                <label htmlFor={cv}>{cv}</label>
              </div>
            ))}
          </div>
          <div id="reset1">
            <button id="reset2" value="requirements" onClick={handleReset}>
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div id="companyName">
        <details>
          <summary>Company Name</summary>
          <input
            type="text"
            list="dataList1Company"
            placeholder="Enter Comapany Name"
            onChange={company}
            value={
              filtersState.company == undefined ? "" : filtersState.company
            }
          />
          <datalist id="dataList1Company">
            {uniqueData["company"].map((cv) => (
              <option key={cv} value={cv}>
                {cv}
              </option>
            ))}
          </datalist>
          <button value={"company"} onClick={handleReset}>
            Reset
          </button>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Employement Type</summary>

          {uniqueData["employmentType"].map((cv, i) => {
            return (
              <div key={i}>
                <input
                  onChange={employmentType}
                  id={cv}
                  type="radio"
                  value={cv}
                  checked={filtersState.employmentType == cv}
                  name="employmentType"
                />
                <label htmlFor={cv}>{cv}</label>
              </div>
            );
          })}
          <div id="reset1">
            <button id="reset2" value="employmentType" onClick={handleReset}>
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Mode Of Work</summary>
          {uniqueData["workplace"].map((cv) => (
            <div key={cv}>
              <input
                onChange={workplace}
                value={cv}
                checked={filtersState.workplace?.includes(cv) || false}
                type="checkbox"
                name="workplace"
                id={cv}
              />
              <label htmlFor={cv}>{cv}</label>
            </div>
          ))}
          <div id="reset1">
            <button id="reset2" value="workplace" onClick={handleReset}>
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Benefits</summary>
          <div id="benefit" style={{ height: "60vh", overflowY: "scroll" }}>
            {uniqueData["benefits"].map((cv) => (
              <div key={cv}>
                <button
                  className="benefitsButton"
                  onClick={benefits}
                  value={cv}
                  id={cv}
                >
                  {cv}
                </button>
              </div>
            ))}
          </div>
          <div id="reset1">
            <button id="reset2" value="benefits" onClick={handleReset}>
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Salary</summary>
          <div id="Salary">
            <input type="number" id="min" required placeholder="min : " />
            <input type="number" id="max" required placeholder="max : " />
            <input type="submit" onClick={handleSalary} />
            <button id="reset2" onClick={handleReset} value="Salary">
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Sort </summary>
          <div>
            <i style={{ marginLeft: "1vw" }}>Sort By Date : </i>
            <select onChange={Sort} value={filtersState.sort || ""}>
              <option value="">Select date</option>
              <option value="NewToOld">New To Old</option>
              <option value="OldToNew">Old To New</option>
            </select>
          </div>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Company Size</summary>
          <div>
            <i style={{ marginLeft: "2vw" }}>Scroll The Range Bar</i>
            <br />
            <br />
            <div style={{ marginLeft: "3vw" }}>
              <sub>10</sub>
              <input
                onInput={companySize}
                type="range"
                step={100}
                min="0"
                max="500000"
                value={filtersState.companySize || 0}
              />
              <sub>500000</sub>
            </div>
            <br />
            <b id="companySize"></b>
          </div>
          <div id="reset1">
            <button value="companySize" onClick={handleReset} id="handleReset">
              Reset
            </button>
          </div>
        </details>
      </div>
      <hr />
      <div>
        <details>
          <summary>Application Status</summary>
          <select
            style={{ marginBottom: "2vh" }}
            onChange={ApplicationStatus}
            value={
              filtersState.applicationStatus == undefined
                ? "select"
                : filtersState.applicationStatus
            }
          >
            <option value="">Select Status </option>
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
          <button
            id="resetselect"
            value="applicationStatus"
            onClick={handleReset}
          >
            Reset
          </button>
          <hr />
        </details>
      </div>
      <div id="TotalresetDiv">
        <button id="Totalreset" value="Reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
