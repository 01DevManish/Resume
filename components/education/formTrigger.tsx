import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type FormTriggerProps = {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedEducation: Dispatch<SetStateAction<string | null>>;
};

const FormTrigger = ({
  setIsOpened,
  setSelectedEducation,
}: FormTriggerProps) => {
  return (
    <div
      className="flex justify-center items-center gap-2 border-[1.5px] border-dashed py-4 cursor-pointer"
      onClick={() => {
        setSelectedEducation(null);
        setIsOpened(true);
      }}
    >
      <Plus className="w-5 h-5" />
      <p>Add a new item</p>
    </div>
  );
};

export default FormTrigger;
