"use client";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import useResumeStore from "@/store/resumeStore";

import { formatDate } from "@/lib/duration-gap-caluclator";
import { seperateDes } from "@/lib/seperate-des";
const Education = () => {
  const educations = useResumeStore((state) => state.educations);

  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold uppercase mb-2">Education</h3>
      <hr className="border-t border-gray-300 mb-2" />
      {educations.map((edu, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between">
            <span className="font-bold">
              {edu.degree} {edu.fieldOfStudy}
            </span>
            <span className="text-sm">
              {formatDate(edu.startDate!)} - {formatDate(edu.endDate!)}
            </span>
          </div>
          <p className="text-sm">{edu.institutionName}</p>
          {edu.description?.length! > 7 ? (
            <ul className="list-disc list-inside mt-2  text-sm">
              {seperateDes(edu.description!).map((item, idx) => (
                <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      ))}
    </section>
  );
};

export default Education;
