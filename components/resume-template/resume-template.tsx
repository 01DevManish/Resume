import { seperateDes } from "@/lib/seperate-des";
import useResumeStore from "@/store/resumeStore";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react";
const MyResume = () => {
  const profile = useResumeStore((state) => state.profile);
  const educations = useResumeStore((state) => state.educations);
  const projects = useResumeStore((state) => state.projects);
  const skills = useResumeStore((state) => state.skills);
  const experiences = useResumeStore((state) => state.experiences);
  const certifications = useResumeStore((state) => state.certifications);

  return (
    <div className="w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden text-[11px] leading-tight print:shadow-none">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-1">{profile?.name}</h1>
          <p>{profile?.address}</p>
          <div className="flex justify-center space-x-5 mt-1">
            {profile?.phone && (
              <a href={`tel:${profile?.phone}`} className="flex items-center">
                <Phone className="mr-1 h-3 w-3" /> {profile?.phone}
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile?.email}`}
                className="flex items-center"
              >
                <Mail className="mr-1 h-3 w-3" /> {profile?.email}
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile?.linkedin} className="flex items-center">
                <Linkedin className="mr-1 h-3 w-3" /> LinkedIn
              </a>
            )}
            {profile?.github && (
              <a href={profile?.github} className="flex items-center">
                <Github className="mr-1 h-3 w-3" /> Github
              </a>
            )}
            {profile?.website && (
              <a href={profile?.website} className="flex items-center">
                <Globe className="mr-1 h-3 w-3" /> Github
              </a>
            )}
          </div>
        </header>
        

        {/* Education */}
        {educations.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Education
            </h2>
            {educations.map((edu, index) => (
              <div key={index} className="mb-1">
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.institutionName}</h3>
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p>
                  {edu.degree} - {edu.fieldOfStudy} - CGPA: {edu.score}
                </p>
                <p>{edu.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.projectId} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-bold">{project.projectName}</h3>
                </div>
                <p className="italic">
                  {project.deploymentLink && (
                    <a href={project.deploymentLink}> Live Link </a>
                  )}
                  {project.repoLink && (
                    <a href={project.repoLink}>| Github Link </a>
                  )}
                </p>

                <ul className="list-disc pl-5">
                  {seperateDes(project.projectDescription!).map((item, idx) => (
                    <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Experiences */}
        {experiences.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Experience
            </h2>
            {experiences.map((experience) => (
              <div key={experience.expId} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-bold">{experience.company}</h3>
                  <span>
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
                {experience.role && <p>{experience.role}</p>}
                <ul className="list-disc pl-5">
                  {seperateDes(experience.description!).map((item, idx) => (
                    <li key={idx}>{parse(DOMPurify.sanitize(item))}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold border-b border-gray-300 mb-1 uppercase">
              Skills
            </h2>
            <div className="">
              {skills.map((skill) => (
                <p key={skill.skillId}>
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
                <li className="" key={index}>
                  <a
                    className="font-semibold"
                    href={certification.certificationProof}
                  >
                    {certification.certificationName}
                  </a>{" "}
                  by
                  <span className="capitalize">
                    {" "}
                    {certification.certificationAuthority}{" "}
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
export default MyResume;
