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
    <div className="w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden leading-tight print:shadow-none font-sans">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="mb-6 border-b-2 border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">{profile?.name}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
            {profile?.phone && (
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <a href={`tel:${profile?.phone}`} className="text-blue-600 hover:underline">
                  {profile?.phone}
                </a>
              </p>
            )}
            {profile?.email && (
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <a href={`mailto:${profile?.email}`} className="text-blue-600 hover:underline">
                  {profile?.email}
                </a>
              </p>
            )}
            {profile?.linkedin && (
              <p className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4" />
                <a href={profile?.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </p>
            )}
            {profile?.github && (
              <p className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
                <a href={profile?.github} className="text-blue-600 hover:underline">
                  GitHub
                </a>
              </p>
            )}
            {profile?.website && (
              <p className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <a href={profile?.website} className="text-blue-600 hover:underline">
                  Website
                </a>
              </p>
            )}
            {profile?.address && <p>{profile?.address}</p>}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1">
          {/* Professional Experience */}
          {experiences.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase border-b border-gray-300">
                Professional Experience
              </h2>
              {experiences.map((experience) => (
                <div key={experience.expId} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-gray-900">{experience.company}</h3>
                    <span className="text-sm text-gray-600">
                      {experience.startDate} - {experience.endDate}
                    </span>
                  </div>
                  {experience.role && <p className="text-sm italic text-gray-700">{experience.role}</p>}
                  {experience.description && (
                    <ul className="list-disc pl-5 text-sm mt-1 text-gray-800">
                      {seperateDes(experience.description).map((item, idx) => (
                        <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase border-b border-gray-300">
                Projects
              </h2>
              {projects.map((project) => (
                <div key={project.projectId} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{project.projectName}</h3>
                  <p className="text-sm text-gray-600">
                    {project.deploymentLink && (
                      <a href={project.deploymentLink} className="text-blue-600 hover:underline">
                        Live Link
                      </a>
                    )}
                    {project.deploymentLink && project.repoLink && " | "}
                    {project.repoLink && (
                      <a href={project.repoLink} className="text-blue-600 hover:underline">
                        GitHub Link
                      </a>
                    )}
                  </p>
                  {project.projectDescription && (
                    <ul className="list-disc pl-5 text-sm mt-1 text-gray-800">
                      {seperateDes(project.projectDescription).map((item, idx) => (
                        <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase border-b border-gray-300">
                Education
              </h2>
              {educations.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.institutionName}</h3>
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {edu.degree} in {edu.fieldOfStudy} - CGPA: {edu.score}
                  </p>
                  {edu.description && (
                    <div className="text-sm mt-1 text-gray-800">
                      {parse(DOMPurify.sanitize(edu.description))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase border-b border-gray-300">
                Skills
              </h2>
              <ul className="text-sm text-gray-800 columns-2">
                {skills.map((skill) => (
                  <li key={skill.skillId} className="mb-1">
                    <span className="font-semibold">{skill.skillCategories}:</span> {skill.skillList}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 uppercase border-b border-gray-300">
                Certifications
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-800">
                {certifications.map((certification, index) => (
                  <li key={index} className="mb-1">
                    <a
                      href={certification.certificationProof}
                      className="text-blue-600 hover:underline"
                    >
                      {certification.certificationName}
                    </a>{" "}
                    - {certification.certificationAuthority}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export const renderToString = async (data: ResumeType): Promise<string> => {
  if (typeof window === "undefined") {
    const ReactDOMServer = (await import("react-dom/server")).default;
    return ReactDOMServer.renderToString(<ResumeComponent {...data} />);
  } else {
    const root = document.createElement("div");
    const ReactDOM = (await import("react-dom/client")).default;
    const { renderToString } = await import("react-dom/server");
    ReactDOM.createRoot(root).render(<ResumeComponent {...data} />);
    return renderToString(<ResumeComponent {...data} />);
  }
};