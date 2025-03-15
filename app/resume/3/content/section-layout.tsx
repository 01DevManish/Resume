import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/section-heading";

type SectionLayoutProps = {
  children: React.ReactNode;
  title: string;
  icon: keyof typeof Icons;
};

const SectionLayout = ({ children, icon, title }: SectionLayoutProps) => {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeading title={title} icon={icon} />
      {children}
      <Separator />
    </section>
  );
};

export default SectionLayout;