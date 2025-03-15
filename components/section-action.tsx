import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, EyeOff, Plus, Trash2 } from "lucide-react";

const SectionAction = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="hover:bg-accent focus:bg-accent rounded-[2px] p-1">
        <EllipsisVertical className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2 className="w-4 h-4 mr-2" />
          Remove All
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EyeOff className="w-4 h-4 mr-2" />
          Hide All
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SectionAction;
