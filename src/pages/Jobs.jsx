import React, { useContext } from "react";
import Card from "../cards/Card";
export default function Jobs({Data}) {
 
  return (
    <>
      {Data.map((cv, i) => {
        return (
            <div key={i}>
              {/* to pass the data of each card to the card file via props formate to craete cards */}
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
            </div>
        );
      })}
    </>
  );
}
