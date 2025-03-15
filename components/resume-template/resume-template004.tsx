import { Resume as ResumeType } from "@/constants/types";
import { seperateDes } from "@/lib/seperate-des";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface ExtendedResumeType extends ResumeType {
  interests?: string[];
  awards?: string[];
  additionalInfo?: {
    languages?: string;
    certifications?: string;
    awardsActivities?: string;
  };
  profileImage?: string; // Optional profile image URL or base64 string
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
  additionalInfo,
  profileImage,
}: ExtendedResumeType) => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-6 bg-white text-black font-sans text-[12pt] leading-[1.2] overflow-hidden">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-[24pt] font-bold uppercase">{profile?.name}</h1>
        <h2 className="text-[14pt] font-semibold uppercase">{profile?.role || "Professional"}</h2>
        <div className="text-[10pt] mb-2 border-b border-gray-400 pb-2">
          {profile?.address && <span>{profile.address}</span>}
          {profile?.address && (profile?.email || profile?.website) && <span> | </span>}
          {profile?.email && <span>{profile.email}</span>}
          {profile?.email && profile?.website && <span> | </span>}
          {profile?.website && <span>{profile.website}</span>}
        </div>
        {profile?.summary && (
          <p className="text-[11pt]">{profile.summary}</p>
        )}
      </header>

      {/* Area of Expertise (Skills) */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase border-b border-gray-400 mb-2">
            Area of Expertise
          </h2>
          <div className="grid grid-cols-3 gap-2 text-[11pt]">
            {skills.map((skill) =>
              skill.skillList.split(", ").map((item, idx) => (
                <span key={idx}>{item}</span>
              ))
            )}
          </div>
        </section>
      )}

      {/* Key Achievements */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase border-b border-gray-400 mb-2">
            Key Achievements
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

      {/* Professional Experience */}
      {experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase border-b border-gray-400 mb-2">
            Professional Experience
          </h2>
          {experiences.map((experience) => (
            <div key={experience.expId} className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[12pt] font-semibold">
                  {experience.company}, {experience.role}
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

      {/* Education */}
      {educations.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase border-b border-gray-400 mb-2">
            Education
          </h2>
          {educations.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[12pt] font-semibold">
                  {edu.degree} | {edu.institutionName}
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

      {/* Additional Information */}
      {additionalInfo && (
        <section className="mb-4">
          <h2 className="text-[14pt] font-bold uppercase border-b border-gray-400 mb-2">
            Additional Information
          </h2>
          <ul className="list-disc pl-5 text-[11pt]">
            {additionalInfo.languages && (
              <li>Languages: {additionalInfo.languages}</li>
            )}
            {additionalInfo.certifications && (
              <li>Certifications: {additionalInfo.certifications}</li>
            )}
            {additionalInfo.awardsActivities && (
              <li>Awards/Activities: {additionalInfo.awardsActivities}</li>
            )}
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