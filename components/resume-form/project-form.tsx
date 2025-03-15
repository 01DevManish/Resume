"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { ProjectSchema } from "@/constants/schema";
import { Project } from "@/constants/types";

import {
  Model,
  ModelBody,
  ModelContent,
  ModelFooter,
  ModelHeader,
} from "@/components/responsive-model";
import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getIdFromUrl } from "@/lib/utils";

type ProjectFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Project) => void;
  onEdit: (id: string, data: Project) => void;
  selectedProject: string | null;
  mode: "create" | "edit";
  defaultVal: Project | undefined;
};
const ProjectForm = ({
  selectedProject,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: ProjectFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);

  const form = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: defaultVal,
  });
  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  // Resume Builder Applications
  // https://resume-builder-app.com
  // https://github.com/username/resume-builder
  // - Developed a web application to create and download professional resumes using Next.js 14, Tailwind CSS, PostgreSQL, Prisma, and React Redux.
  // - Implemented real-time resume preview functionality to allow users to see updates instantly as they enter their data.
  // - Integrated PDF generation using Puppeteer for users to download high-quality, print-ready resumes.
  function onSubmit(data: Project) {
    if (selectedProject) {
      onEdit(data.projectId, {
        ...data,
      });
    } else {
      onCreate({ ...data, projectId: uuidv4(), resumeIdentifier: pathName });
    }
    setIsOpened(false);
  }

  return (
    <div className="max-w-[550px]">
      <Model open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
        <ModelContent>
          <ModelHeader className="font-semibold text-xl">
            Project Section
          </ModelHeader>
          <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:px-1 mb-2 md:mb-1 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4"
              >
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Porject Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Company Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deploymentLink"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 md:col-span-1">
                      <FormLabel>Live Link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Frontend Developer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repoLink"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 md:col-span-1">
                      <FormLabel>Github Link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                      <TextEditor
                          // disabled={field.disabled!}
                          // value={field.value!}
                           fieldName={field.name}
                          extensions={[
                           
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "bulletList",
                            "orderedList",
                          ]}
                          onContentChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ModelFooter className="p-0 col-span-2">
                  <Button type="submit" className="w-full mt-2">
                    Save changes
                  </Button>
                </ModelFooter>
              </form>
            </Form>
          </ModelBody>
        </ModelContent>
      </Model>
    </div>
  );
};

export default ProjectForm;
