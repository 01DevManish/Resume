import { Resume as ResumeType } from "@/constants/types";
import { seperateDes } from "@/lib/seperate-des";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react";

export const ResumeComponent = ({
  profile,
  educations,
  projects,
  skills,
  experiences,
  certifications,
}: ResumeType) => {
  return (
   
    <div className="w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden  leading-tight print:shadow-none">
      <div className="flex flex-col h-full ">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-1">{profile?.name}</h1>
          <p className="text-lg">{profile?.address}</p>
          <div className="flex justify-center items-center space-x-5 mt-1">
            {profile?.phone && (
              <a
                href={`tel:${profile?.phone}`}
                className="flex items-center text-blue-600 hover:underline"
              >
                <Phone className="mr-1 h-4 w-4" /> {profile?.phone}
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile?.email}`}
                className="flex items-center justify-center text-blue-600 hover:underline"
              >
                <Mail className="mr-1 h-4 w-4" /> {profile?.email}
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile?.linkedin}
                className="flex items-center text-blue-600 hover:underline"
              >
                <Linkedin className="mr-1 h-4 w-4" /> LinkedIn
              </a>
            )}
            {profile?.github && (
              <a
                href={profile?.github}
                className="flex items-center text-blue-600 hover:underline"
              >
                <Github className="mr-1 h-4 w-4" /> Github
              </a>
            )}
            {profile?.website && (
              <a
                href={profile?.website}
                className="flex items-center text-blue-600 hover:underline"
              >
                <Globe className="mr-1 h-4 w-4" /> Website
              </a>
            )}
          </div>
        </header>




        {/* Education */}
        {educations.length > 0 && (
          <section className="mb-3">
            <h2 className="text-xl font-bold border-b border-gray-300 mb-2 uppercase">
              Education
            </h2>
            {educations.map((edu, index) => (
              <div key={index} className="mb-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">
                    {edu.institutionName}
                  </h3>
                  <span className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-sm">
                  {edu.degree} - {edu.fieldOfStudy} - CGPA: {edu.score}
                </p>
                {/* {edu.description} */}
                {edu.description && parse(DOMPurify.sanitize(edu.description))}

                {/* <p>{edu.description}</p> */}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-3">
            <h2 className="text-xl font-bold border-b border-gray-300 mb-1 uppercase">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.projectId} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">
                    {project.projectName}
                  </h3>
                </div>
                <p className="italic text-sm">
                  {project.deploymentLink && (
                    <a
                      href={project.deploymentLink}
                      className="text-blue-600 hover:underline"
                    >
                      {" "}
                      Live Link{" "}
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      className="text-blue-600 hover:underline"
                    >
                      | Github Link{" "}
                    </a>
                  )}
                </p>
                {project.projectDescription && (
                  <ul className="list-disc pl-5 text-sm">
                    {seperateDes(project.projectDescription).map(
                      (item, idx) => (
                        <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <section className="mb-3">
            <h2 className="text-xl font-bold border-b border-gray-300 mb-1 uppercase">
              Experience
            </h2>
            {experiences.map((experience) => (
              <div key={experience.expId} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">
                    {experience.company}
                  </h3>
                  <span className="text-sm">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
                {experience.role && (
                  <p className="text-sm">{experience.role}</p>
                )}
                {experience.description && (
                  <ul className="list-disc pl-5 text-sm">
                    {seperateDes(experience.description).map((item, idx) => (
                      <li key={idx} className="">
                        {parse(DOMPurify.sanitize(item))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-2">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Skills
            </h2>
            <div>
              {skills.map((skill) => (
                <p key={skill.skillId} className="text-sm">
                  <span className="font-semibold">
                    {skill.skillCategories} :{" "}
                  </span>
                  {skill.skillList}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Certifications
            </h2>
            <ul className="mb-2 list-disc pl-3">
              {certifications.map((certification, index) => (
                <li key={index}>
                  <a
                    className="font-semibold text-blue-600 hover:underline"
                    href={certification.certificationProof}
                  >
                    {certification.certificationName}
                  </a>{" "}
                  by{" "}
                  <span className="capitalize">
                    {certification.certificationAuthority}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export const renderToString = async (data: ResumeType): Promise<string> => {
  if (typeof window === "undefined") {
    // Server-side rendering
    const ReactDOMServer = (await import("react-dom/server")).default;
    return ReactDOMServer.renderToString(<ResumeComponent {...data} />);
  } else {
    // Client-side rendering
    const root = document.createElement("div");
    const ReactDOM = (await import("react-dom/client")).default;
    const { renderToString } = await import("react-dom/server");
    ReactDOM.createRoot(root).render(<ResumeComponent {...data} />);
    console.log("server");

    return renderToString(<ResumeComponent {...data} />);
  }
};
