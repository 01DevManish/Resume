import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileForm from "@/components/resume-form/profile-form";
import Resume from "@/components/resume-template/resume";
import Education from "./(section)/education";
import Experience from "./(section)/experience";
import Project from "./(section)/project";
import Skill from "./(section)/skill";
import Language from "./(section)/language";
import Certification from "./(section)/certification";
import Resume1 from "@/components/resume-template/resume1";
// import Publication from "./(section)/publication";

const EditResume = ({}) => {
  return (
    <>
      <div className="flex w-full xl:max-w-5xl">
        <ScrollArea className="h-screen w-full ">
          <div className="space-y-6 p-4 md:w-[45vw] xl:w-full mb-24 md:mb-0">
            <ProfileForm />
            <Education />
            <Experience />
            <Project />
            <Skill />
            <Language />
            <Certification />
            {/* <Publication isLast /> */}
          </div>
        </ScrollArea>
      </div>
      <div className="max-w-full hidden md:block">
        <Resume1/>
      </div>
    </>
  );
};

export default EditResume;