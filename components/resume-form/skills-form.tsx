"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SkillSchema } from "@/constants/schema";
import { Skill } from "@/constants/types";

import {
  Model,
  ModelBody,
  ModelContent,
  ModelFooter,
  ModelHeader,
} from "@/components/responsive-model";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { getIdFromUrl } from "@/lib/utils";

type SkillFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Skill) => void;
  onEdit: (id: string, data: Skill) => void;
  selectedSkill: string | null;
  mode: "create" | "edit";
  defaultVal: Skill | undefined;
};

const SkillForm = ({
  selectedSkill,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: SkillFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);
  const form = useForm<Skill>({
    resolver: zodResolver(SkillSchema),
    defaultValues: defaultVal,
  });

  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  function onSubmit(data: Skill) {
    if (selectedSkill) {
      console.log(data);

      onEdit(data.skillId, {
        ...data,
      });
    } else {
      onCreate({ ...data, skillId: uuidv4(), resumeIdentifier: pathName });
    }
    setIsOpened(false);
  }

  return (
    <div className="max-w-[550px]">
      <Model open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
        <ModelContent>
          <ModelHeader className="font-semibold text-xl">
            Skill Section
          </ModelHeader>
          <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:px-1 mb-2 md:mb-1 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="skillCategories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Programing Language"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skillList"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Skill List</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="C/C++, Python, Javascript, Typescript"
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

export default SkillForm;

{
  /* <Model open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
  <ModelContent>
    <ModelHeader className="font-semibold text-xl">Skill Section</ModelHeader>
    <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:px-1 mb-2 md:mb-1 flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="skillName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Name</FormLabel>
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
            name="level"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Skill Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="undefined">Hide Level</SelectItem>
                    </SelectContent>
                  </Select>
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
</Model>; */
}
