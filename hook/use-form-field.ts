"use client";

import useResumeStore from "@/store/resumeStore";
import { useEffect } from "react";
import { useController, UseControllerProps } from "react-hook-form";

const useFormField = <T extends {}>({
  name,
  control,
}: UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const setField = useResumeStore((state) => state.setProfile);

  useEffect(() => {
    setField(name, field.value);
  }, [field.value, name, setField]);

  return { field, error };
};

export default useFormField;
