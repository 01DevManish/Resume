"use client";
import { Separator } from "@/components/ui/separator";
import ExperienceForm from "@/components/resume-form/experience-form";
import SectionHeading from "@/components/section-heading";
import useResumeStore from "@/store/resumeStore";
import SectionCard from "@/components/section-card";
import { useState } from "react";
import FormTrigger from "@/components/education/formTrigger";
import { Experience as ExperienceType } from "@/constants/types";

const Experience = () => {
  const experience = useResumeStore((state) => state.experiences);
  const deleteExperience = useResumeStore((state) => state.deleteExperience);
  const setExperience = useResumeStore((state) => state.setExperiences);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  let defaultVal: ExperienceType = {
    company: "",
    endDate: "",
    startDate: "",
    role: "",
    description: "",
    location: "",
    expId: "",
    resumeIdentifier: "",
  };

  if (selectedExperience) {
    defaultVal = experience.find((exp) => exp.expId === selectedExperience)!;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <SectionHeading title="Experience" icon="experience" />

      {experience.length > 0 && (
        <div className="space-y-3">
          {experience.map((exp) => (
            <SectionCard
              key={exp.startDate!}
              id={exp.expId}
              onDelete={deleteExperience}
              primaryHeading={exp.role}
              secondaryHeading={exp.company}
              setIsEducationFormOpen={setIsExperienceFormOpen}
              setSelectedEducation={setSelectedExperience}
            />
          ))}
        </div>
      )}

      <ExperienceForm
        isOpened={isExperienceFormOpen}
        setIsOpened={setIsExperienceFormOpen}
        selectedExperience={selectedExperience}
        onCreate={setExperience}
        onEdit={updateExperience}
        mode={selectedExperience ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsExperienceFormOpen}
        setSelectedEducation={setSelectedExperience}
      />
      <Separator />
    </section>
  );
};

export default Experience;