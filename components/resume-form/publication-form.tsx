"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PublicationSchema } from "@/constants/schema";
import { Publication } from "@/constants/types";

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
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { getIdFromUrl } from "@/lib/utils";

type PublicationFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Publication) => void;
  onEdit: (id: string, data: Publication) => void;
  selectedPublication: string | null;
  mode: "create" | "edit";
  defaultVal: Publication | undefined;
};

const PublicationForm = ({
  selectedPublication,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: PublicationFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);
  const form = useForm<Publication>({
    resolver: zodResolver(PublicationSchema),
    defaultValues: defaultVal,
  });

  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  function onSubmit(data: Publication) {
    if (selectedPublication) {
      console.log(data);

      onEdit(data.publicationId, {
        ...data,
      });
    } else {
      onCreate({
        ...data,
        publicationId: uuidv4(),
        resumeIdentifier: pathName,
      });
    }
    setIsOpened(false);
  }

  return (
    <div className="max-w-[550px]">
      <Model open={isOpened} onOpenChange={(val) => setIsOpened(val)}>
        <ModelContent>
          <ModelHeader className="font-semibold">
            Publication Section
          </ModelHeader>
          <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:px-1 mb-2 md:mb-1 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4"
              >
                <FormField
                  control={form.control}
                  name="publicationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Publication Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publicationPublisher"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Publisher</FormLabel>
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
                  name="publicationDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Published Date</FormLabel>
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
                  name="publicationLink"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Publication Proof</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          className="text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publicationDescription"
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
                  <Button type="submit" className="w-full mt-2 ">
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

export default PublicationForm;
