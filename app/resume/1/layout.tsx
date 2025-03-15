import Footer from "./footer";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build Resume in a Minutes",
};

const EditResume = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex max-h-screen overflow-hidden w-full">
      {children}
      <Footer />
    </div>
  );
};

export default EditResume;
