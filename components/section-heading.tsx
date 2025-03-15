import { Icons } from "./icons";
import SectionAction from "./section-action";
type SectionHeadingProps = {
  title: string;
  icon: keyof typeof Icons;
};

const SectionHeading = ({ title, icon }: SectionHeadingProps) => {
  const Icon = Icons[icon || "arrowRight"];

  return (
    <div className="flex  items-center">
      <Icon className="w-6 h-6 mr-3" />
      <h2 className="text-3xl flex-1">{title}</h2>

      <SectionAction />
    </div>
  );
};

export default SectionHeading;
