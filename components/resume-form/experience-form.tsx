"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { ExperienceSchema } from "@/constants/schema";
import { Experience } from "@/constants/types";

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

interface TextEditor {
  value: string;
  fieldName: string;
  disabled?: boolean; // Add this if missing
}


type ExperienceFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Experience) => void;
  onEdit: (id: string, data: Experience) => void;
  selectedExperience: string | null;
  mode: "create" | "edit";
  defaultVal: Experience | undefined;
};

const ExperienceForm = ({
  selectedExperience,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: ExperienceFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);

  const form = useForm<Experience>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: defaultVal,
  });

  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  function onSubmit(data: Experience) {
    if (selectedExperience) {
      console.log(data);

      onEdit(data.expId, {
        ...data,
      });
    } else {
      onCreate({ ...data, expId: uuidv4() });
    }
    setIsOpened(false);
  }
  
  return (
    <div className="max-w-[550px]">
      <Model open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
        <ModelContent>
          <ModelHeader className="font-semibold text-xl">
            Experience Section
          </ModelHeader>
          <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:px-1 mb-2 md:mb-1 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-4 md:max-h-[80vh]"
              >
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Company Name</FormLabel>
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
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 md:col-span-1">
                      <FormLabel>Role</FormLabel>
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
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 md:col-span-1">
                      <FormLabel>Start Date</FormLabel>
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
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="w-full  col-span-2 md:col-span-1">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=""
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=""
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
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

export default ExperienceForm;
