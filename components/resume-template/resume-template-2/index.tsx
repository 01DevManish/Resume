import React from "react";
import Header from "./header";
import Summary from "./summary";
import Skill from "./skill";
import Experience from "./experience";
import Education from "./education";
import Project from "./project";

const ResumeTemplate3 = () => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto text-black bg-white p-8 shadow-lg print:shadow-none">
      <Header />
      <Summary />
      <Skill />
      <Project />
      <Experience />
      <Education />
    </div>
  );
};

export default ResumeTemplate3;
