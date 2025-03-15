"use client";

import TextEditor from "@/components/TextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileSchema } from "@/constants/schema";
import { Profile } from "@/constants/types";
import useFormField from "@/hook/use-form-field";
import useFormStore from "@/store/resumeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { stripHtml } from "string-strip-html"; // Add this dependency to remove HTML tags

const ProfileFormField = ({
  name,
  control,
  placeholder,
  inputType,
  className,
}: {
  name: keyof Profile;
  control: any;
  placeholder: string;
  inputType?: "textarea" | "text";
  className?: string;
}) => {
  const { field, error } = useFormField({ name, control });

  // Function to handle text editor content and strip HTML
  const handleEditorChange = (htmlContent: string) => {
    const plainText = stripHtml(htmlContent).result; // Convert HTML to plain text
    field.onChange(plainText); // Update form field with plain text
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
          <FormControl>
            {
              {
                textarea: (
                  <TextEditor
                    fieldName={field.name}
                    value={field.value || ""} // Ensure value is a string
                    disabled={field.disabled}
                    onContentChange={handleEditorChange} // Use custom handler
                  />
                ),
                text: (
                  <Input
                    {...field}
                    placeholder={placeholder}
                    type="text"
                    className="w-full"
                  />
                ),
              }[inputType || "text"]
            }
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

const ProfileForm = () => {
  const profile = useFormStore((state) => state.profile);
  const form = useForm<Profile>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: profile,
  });

  function onSubmit(data: Profile) {
    console.log("data", data); // Check submitted data
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-y-6 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full"
      >
        <ProfileFormField
          name="name"
          control={form.control}
          placeholder="Sara"
        />
        <ProfileFormField
          name="email"
          control={form.control}
          placeholder="dhanush@gmail.com"
        />
        <ProfileFormField
          name="phone"
          control={form.control}
          placeholder="+91 9089908978"
        />
        <ProfileFormField
          name="linkedin"
          control={form.control}
          placeholder="https://linkedin.com/"
        />
        <ProfileFormField
          name="github"
          control={form.control}
          placeholder="https://github.com/"
        />
        <ProfileFormField
          name="website"
          control={form.control}
          placeholder="learnloner.com"
        />
        <ProfileFormField
          name="address"
          control={form.control}
          placeholder="No.1, 2nd Street, Haryana, India"
        />
        <ProfileFormField
          name="role"
          control={form.control}
          placeholder="Front End Developer"
        />
        <ProfileFormField
          name="summary"
          control={form.control}
          placeholder="Your summary here"
          inputType="textarea"
          className="col-span-1 sm:col-span-2 md:mb-0 md:col-span-1 lg:col-span-2"
        />
      </form>
    </Form>
  );
};

export default ProfileForm;