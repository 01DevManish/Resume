import * as z from "zod";
import {
  CertificationSchema,
  EducationSchema,
  ExperienceSchema,
  LanguageSchema,
  ProfileSchema,
  ProjectSchema,
  PublicationSchema,
  SkillSchema,
} from "./schema";
export type Profile = z.infer<typeof ProfileSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Resume = {
  profile: Profile | undefined;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  // publications?: Publication[];
  resumeId: string | null;
};

export type ResumeStore = Resume & {
  setProfile: (
    profileFieldName: string,
    profileFieldValue: string | number
  ) => void;
  setExperiences: (experience: Experience) => void;
  setEducations: (education: Education) => void;
  setSkills: (skill: Skill) => void;
  setProjects: (project: Project) => void;
  setLanguages: (language: Language) => void;
  setCertifications: (certification: Certification) => void;
  // setPublications: (publication: Publication) => void;
  setResumeId: (resumeId: string) => void;
  //
  deleteExperience: (experienceId: string) => void;
  deleteEducation: (educationId: string) => void;
  deleteSkill: (skillId: string) => void;
  deleteProject: (projectId: string) => void;
  deleteLanguage: (languageId: string) => void;
  deleteCertification: (certificationId: string) => void;
  // deletePublication: (publicationId: string) => void;
  deleteResumeId: () => void;
  //
  updateExperience: (experienceId: string, experience: Experience) => void;
  updateEducation: (educationId: string, education: Education) => void;
  updateSkill: (skillId: string, skill: Skill) => void;
  updateProject: (projectId: string, project: Project) => void;
  updateLanguage: (languageId: string, language: Language) => void;
  updateCertification: (
    certificationId: string,
    certification: Certification
  ) => void;
  // updatePublication: (publicationId: string, publication: Publication) => void;
};
