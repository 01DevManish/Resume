import { Resume as ResumeType } from "@/constants/types";
import { seperateDes } from "@/lib/seperate-des";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface ExtendedResumeType extends ResumeType {
  interests?: string[]; // Adding interests as an array of strings
  awards?: string[]; // Adding awards as an array of strings
}

export const ResumeComponent = ({
  profile,
  educations,
  projects,
  skills,
  experiences,
  certifications,
  interests,
  awards,
}: ExtendedResumeType) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white text-black font-sans text-[12pt] leading-[1.2] overflow-hidden">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-[24pt] font-bold uppercase">{profile?.name}</h1>
        <div className="text-[10pt] mb-2">
          {profile?.address && <span>{profile.address}</span>}
          {profile?.address && (profile?.email || profile?.website) && <span> | </span>}
          {profile?.email && <span>{profile.email}</span>}
          {profile?.email && profile?.website && <span> | </span>}
          {profile?.website && <span>{profile.website}</span>}
        </div>
        {profile?.summary && (
          <p className="text-[11pt] italic">{profile.summary}</p>
        )}
      </header>

      {/* Work Experience */}
      {experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Work Experience
          </h2>
          {experiences.map((experience) => (
            <div key={experience.expId} className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[12pt] font-semibold">
                  {experience.role} | {experience.company}
                </h3>
                <span className="text-[11pt]">
                  {experience.startDate} - {experience.endDate || "Present"}
                </span>
              </div>
              {experience.description && (
                <ul className="list-disc pl-5 text-[11pt] mt-1">
                  {seperateDes(experience.description).map((item, idx) => (
                    <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Skills
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-[11pt]">
            {skills.map((skill) =>
              skill.skillList.split(", ").map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))
            )}
          </ul>
        </section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Education
          </h2>
          {educations.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[12pt] font-semibold">
                  {edu.degree} {edu.fieldOfStudy} | {edu.institutionName}
                </h3>
                <span className="text-[11pt]">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {edu.description && (
                <ul className="list-disc pl-5 text-[11pt] mt-1">
                  {seperateDes(edu.description).map((item, idx) => (
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
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.projectId} className="mb-3">
              <h3 className="text-[12pt] font-semibold">{project.projectName}</h3>
              {project.deploymentLink || project.repoLink ? (
                <p className="text-[11pt]">
                  {project.deploymentLink && <span>Live: {project.deploymentLink}</span>}
                  {project.deploymentLink && project.repoLink && <span> | </span>}
                  {project.repoLink && <span>Repo: {project.repoLink}</span>}
                </p>
              ) : null}
              {project.projectDescription && (
                <ul className="list-disc pl-5 text-[11pt] mt-1">
                  {seperateDes(project.projectDescription).map((item, idx) => (
                    <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Certifications
          </h2>
          <ul className="list-disc pl-5 text-[11pt]">
            {certifications.map((certification, index) => (
              <li key={index}>
                {certification.certificationName} - {certification.certificationAuthority}
                {certification.certificationProof && (
                  <span> ({certification.certificationProof})</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Interests */}
      {interests && interests.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Interests
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-[11pt]">
            {interests.map((interest, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{interest}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
            Awards
          </h2>
          <ul className="list-disc pl-5 text-[11pt]">
            {awards.map((award, idx) => (
              <li key={idx}>{award}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export const renderToString = async (data: ExtendedResumeType): Promise<string> => {
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