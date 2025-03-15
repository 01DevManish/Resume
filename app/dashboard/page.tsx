import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="h-screen w-full">
      <h1 className="text-xl">Sample User</h1>

      <div className="">
        <div className="relative w-fit">
          <Image
            src="/resume-templates/001.png"
            height={250}
            width={250}
            alt="resume template"
            className="rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
