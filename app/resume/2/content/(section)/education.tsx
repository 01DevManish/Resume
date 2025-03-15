"use client";
import { Separator } from "@/components/ui/separator";
import EducationForm from "@/components/resume-form/education-form";
import SectionHeading from "@/components/section-heading";
import useResumeStore from "@/store/resumeStore";
import SectionCard from "@/components/section-card";
import { useState } from "react";
import FormTrigger from "@/components/education/formTrigger";
import { Education as EducationType } from "@/constants/types";

const Education = () => {
  const education = useResumeStore((state) => state.educations);
  const deleteEducation = useResumeStore((state) => state.deleteEducation);
  const setEducation = useResumeStore((state) => state.setEducations);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<string | null>(
    null
  );
  let defaultVal: EducationType = {
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    score: 0,
    eduId: "",
    institutionName: "",
    description: "",
    resumeIdentifier: "",
  };

  if (selectedEducation) {
    defaultVal = education.find((edu) => edu.eduId === selectedEducation)!;
  }

  return (
    <section className="flex flex-col gap-6 w-full ">
      <SectionHeading title="Education" icon="education" />

      {education.length > 0 && (
        <div className="space-y-3">
          {education.map((edu) => (
            <div draggable={true} key={edu.eduId}>
              <SectionCard
                id={edu.eduId}
                onDelete={deleteEducation}
                primaryHeading={`${edu.degree} ${edu.fieldOfStudy}`}
                secondaryHeading={edu.institutionName}
                setIsEducationFormOpen={setIsEducationFormOpen}
                setSelectedEducation={setSelectedEducation}
              />
            </div>
          ))}
        </div>
      )}

      <EducationForm
        isOpened={isEducationFormOpen}
        setIsOpened={setIsEducationFormOpen}
        selectedEducation={selectedEducation}
        onCreate={setEducation}
        onEdit={updateEducation}
        mode={selectedEducation ? "edit" : "create"}
        defaultVal={defaultVal}
      />
      <FormTrigger
        setIsOpened={setIsEducationFormOpen}
        setSelectedEducation={setSelectedEducation}
      />
      <Separator />
    </section>
  );
};

export default Education;