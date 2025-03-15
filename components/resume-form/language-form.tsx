"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { LanguageSchema } from "@/constants/schema";
import { Language } from "@/constants/types";

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
import { usePathname } from "next/navigation";
import { getIdFromUrl } from "@/lib/utils";

type languageFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Language) => void;
  onEdit: (id: string, data: Language) => void;
  selectedLanguage: string | null;
  mode: "create" | "edit";
  defaultVal: Language | undefined;
};

const LanguageForm = ({
  selectedLanguage,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: languageFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);
  const form = useForm<Language>({
    resolver: zodResolver(LanguageSchema),
  });

  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  function onSubmit(data: Language) {
    if (selectedLanguage) {
      onEdit(data.languageId, {
        ...data,
      });
    } else {
      onCreate({ ...data, languageId: uuidv4(), resumeIdentifier: pathName });
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
                  name="languageName"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Language"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proficiency"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Proficiency</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          disabled={field.disabled}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Language Proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
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
      </Model>
    </div>
  );
};

export default LanguageForm;
