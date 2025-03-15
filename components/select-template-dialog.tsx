'use client'
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import img1 from "@/public/resume-templates/001.png";
import img2 from "@/public/resume-templates/002.png";
import img3 from "@/public/resume-templates/003.png";
import img4 from "@/public/resume-templates/004.png";
import img5 from "@/public/resume-templates/005.png";
import useResumeStore from "@/store/resumeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Model,
  ModelContent,
  ModelFooter,
  ModelHeader,
  ModelTitle,
  ModelTrigger,
} from "./responsive-model";
import ShinyButton from "./ShinyButton";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const images = [
  { src: img1, id: 1 },
  { src: img2, id: 2 },
  { src: img3, id: 3 },
  { src: img4, id: 4 },
  { src: img5, id: 5 },
];

const SelectDialog = () => {
  const [resumeTemplateId, setResumeTemplateId] = useState<null | number>(null);
  const router = useRouter();

  // Define route mappings based on image ID
  const routeMapping: { [key: number]: string } = {
    1: "/resume/1/content",  // If id = 1, navigate to page1
    2: "/resume/2/content",  // If id = 2, navigate to page3
    3: "/resume/3/content",  // If id = 3, navigate to page9
    4: "/resume/4/content",  // If id = 4, navigate to page4
    5: "/resume/5/content",  // If id = 5, navigate to page5
  };

  const handleClick = (id: number) => {
    const route = routeMapping[id];
    if (route) {
      router.push(route); // Navigate to the mapped route
    }
  };

  const renderTemplate = images.map((image) => (
    <div
      className={cn(
        "rounded cursor-pointer",
        resumeTemplateId === image.id &&
          "ring-2 ring-ring ring-offset-[2.5px] ring-offset-background transition-colors outline-none"
      )}
      key={image.id}
      onClick={() => handleClick(image.id)} // Call the static route handler
    >
      <Image
        src={image.src}
        alt={`template ${image.id}`}
        className="object-cover object-center rounded"
      />
    </div>
  ));

  return (
    <Model>
      <ModelTrigger>
        <ShinyButton>
          Start Building
          <ArrowRight className="ml-2 h-5 w-5" />
        </ShinyButton>
      </ModelTrigger>
      <ModelContent className="md:max-w-[95vw] md:max-h-[95vh] p-1.5 xl:p-5">
        <ModelHeader className="space-y-2.5">
          <ModelTitle className="text-xl text-center">
            Choose Your Template
          </ModelTitle>
          <div className="sm:px-4">
            <Select disabled>
              <SelectTrigger className="text-base mx-auto sm:max-w-[280px] sm:mx-0">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent defaultValue={"all"}>
                <SelectItem
                  value="all"
                  defaultChecked={true}
                  className="text-base"
                >
                  All
                </SelectItem>
                <SelectItem value="frontend" className="text-base">
                  Frontend
                </SelectItem>
                <SelectItem value="backend" className="text-base">
                  Backend
                </SelectItem>
                <SelectItem value="fullstack" className="text-base">
                  Full Stack
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ModelHeader>

        <ScrollArea>
          <div className="h-[65vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-5 px-5 place-items-center">
            {renderTemplate}
          </div>
        </ScrollArea>

        <ModelFooter className="md:-translate-y-3.5 lg:-translate-y-2.5">
          <Button
            size="sm"
            disabled={!resumeTemplateId}
            onClick={() => resumeTemplateId && handleClick(resumeTemplateId)}
          >
            Continue
          </Button>
        </ModelFooter>
      </ModelContent>
    </Model>
  );
};

export default SelectDialog;
