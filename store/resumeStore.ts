import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultProfile } from "@/constants/defaultValues";
import { ResumeStore } from "@/constants/types";
const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      experiences: [],
      educations: [],
      skills: [],
      projects: [],
      languages: [],
      certifications: [],
      resumeId: null,
      setProfile: (profileFieldName, profileFieldValue) =>
        set((state) => ({
          profile: {
            ...state.profile,
            [profileFieldName]: profileFieldValue,
          } as ResumeStore["profile"],
        })),
      setResumeId: (newResumeId) => set({ resumeId: newResumeId }),
      setExperiences: (experience) =>
        set((state) => ({ experiences: [...state.experiences, experience] })),
      setEducations: (education) =>
        set((state) => ({ educations: [...state.educations, education] })),
      setSkills: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),
      setProjects: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      setLanguages: (language) =>
        set((state) => ({ languages: [...state.languages, language] })),

      setCertifications: (certification) =>
        set((state) => ({
          certifications: [...state.certifications, certification],
        })),

      deleteResumeId: () => set({ resumeId: null }),
      deleteEducation: (educationId) =>
        set((state) => ({
          educations: state.educations.filter(
            (edu) => edu.eduId !== educationId
          ),
        })),
      deleteExperience: (experienceId) =>
        set((state) => ({
          experiences: state.experiences.filter(
            (experience) => experience.expId !== experienceId
          ),
        })),
      deleteSkill: (skillId) =>
        set((state) => ({
          skills: state.skills.filter((skill) => skill.skillId !== skillId),
        })),
      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter(
            (project) => project.projectId !== projectId
          ),
        })),
      deleteLanguage: (languageId) =>
        set((state) => ({
          languages: state.languages.filter(
            (language) => language.languageId !== languageId
          ),
        })),

      deleteCertification: (certificationId) =>
        set((state) => ({
          certifications: state.certifications.filter(
            (certification) => certification.certificationId !== certificationId
          ),
        })),

      updateEducation: (educationId, education) =>
        set((state) => ({
          educations: state.educations.map((edu) =>
            edu.eduId === educationId ? education : edu
          ),
        })),
      updateExperience: (experienceId, experience) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.expId === experienceId ? experience : exp
          ),
        })),
      updateSkill: (skillId, skill) =>
        set((state) => ({
          skills: state.skills.map((sk) =>
            sk.skillId === skillId ? skill : sk
          ),
        })),
      updateProject: (projectId, project) =>
        set((state) => ({
          projects: state.projects.map((pro) =>
            pro.projectId === projectId ? project : pro
          ),
        })),
      updateLanguage: (languageId, language) =>
        set((state) => ({
          languages: state.languages.map((lan) =>
            lan.languageId === languageId ? language : lan
          ),
        })),
      updateCertification: (certificationId, certification) =>
        set((state) => ({
          certifications: state.certifications.map((cer) =>
            cer.certificationId === certificationId ? certification : cer
          ),
        })),
    }),
    { name: "salke" }
  )
);

export default useResumeStore;
