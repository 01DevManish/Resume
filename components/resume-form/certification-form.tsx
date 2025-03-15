"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CertificationSchema } from "@/constants/schema";
import { Certification } from "@/constants/types";

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

import { getIdFromUrl } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type CertificationFormProps = {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  onCreate: (data: Certification) => void;
  onEdit: (id: string, data: Certification) => void;
  selectedCertification: string | null;
  mode: "create" | "edit";
  defaultVal: Certification | undefined;
};

const CertificationForm = ({
  selectedCertification,
  onCreate,
  onEdit,
  isOpened,
  setIsOpened,
  mode,
  defaultVal,
}: CertificationFormProps) => {
  let pathName = usePathname();
  pathName = getIdFromUrl(pathName);
  const form = useForm<Certification>({
    resolver: zodResolver(CertificationSchema),
    defaultValues: defaultVal,
  });

  useEffect(() => {
    form.reset(defaultVal);
  }, [defaultVal, form]);

  function onSubmit(data: Certification) {
    if (selectedCertification) {
      console.log(data);

      onEdit(data.certificationId, {
        ...data,
      });
    } else {
      onCreate({
        ...data,
        certificationId: uuidv4(),
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
            Certification Section
          </ModelHeader>
          <ModelBody className="max-h-screen overflow-y-scroll scrollbar-none">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full md:px-1 mb-2 md:mb-1 grid gap-4 grid-cols-2"
              >
                <FormField
                  control={form.control}
                  name="certificationName"
                  render={({ field }) => (
                    <FormItem className="col-span-2 ">
                      <FormLabel>Certificate Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-base"
                          placeholder="Certificate Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certificationAuthority"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 md:col-span-1">
                      <FormLabel>Authority</FormLabel>
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

                {/* <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2">
                      <FormLabel>Issued Date</FormLabel>
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
                /> */}

                <FormField
                  control={form.control}
                  name="certificationProof"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-2 md:col-span-1">
                      <FormLabel>Certification Proof</FormLabel>
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

                {/* <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TextEditor
                          disabled={field.disabled!}
                          value={field.value!}
                          fieldName="description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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

export default CertificationForm;
