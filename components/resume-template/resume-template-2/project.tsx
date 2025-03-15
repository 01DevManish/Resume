"use client";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import useResumeStore from "@/store/resumeStore";

import { seperateDes } from "@/lib/seperate-des";

const Project = () => {
  const projects = useResumeStore((state) => state.projects);

  return (
    <section className="mb-4">
      <h3 className="text-lg font-bold uppercase mb-2">Projects</h3>
      <hr className="border-t border-gray-300 mb-2" />
      {projects.map((project, index) => (
        <div key={project.projectId} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="font-bold">{project.projectName}</span>
          </div>
          <p className="text-sm font-thin flex gap-2">
            <a
              href={project.deploymentLink}
              className="text-blue-500 hover:underline"
            >
              Live Demo
            </a>
            |
            <a
              href={project.repoLink}
              className="text-blue-500 hover:underline"
            >
              Github
            </a>
          </p>
          <ul className="list-disc list-inside mt-2 text-sm">
            {seperateDes(project.projectDescription!).map((item, idx) => (
              <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Project;
