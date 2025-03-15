"use client";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import useResumeStore from "@/store/resumeStore";

import { formatDate } from "@/lib/duration-gap-caluclator";
import { seperateDes } from "@/lib/seperate-des";

const Experience = () => {
  const experiences = useResumeStore((state) => state.experiences);

  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold uppercase mb-2">
        Professional Experience
      </h3>
      <hr className="border-t border-gray-300 mb-2" />
      {experiences.map((experience, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="font-bold">{experience.role}</span>
            <span className="text-sm">
              {formatDate(experience.startDate!)} -{" "}
              {formatDate(experience.endDate!)}
            </span>
          </div>
          <p className="text-sm">{experience.company}</p>
          <ul className="list-disc list-inside mt-2 text-sm">
            {seperateDes(experience.description!).map((item, idx) => (
              <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Experience;
