import Header from "@/components/header";
import SelectDialog from "@/components/select-template-dialog";
import BlurText from "@/components/ui/blur-text";
import Image from "next/image";
import Link from "next/link";
import HeroSectionBackground from "./hero-section-background";
import ShinyButton from "@/components/ShinyButton";
import { ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <main className="">
      <div className="absolute top-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_60%_150%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <HeroSectionBackground />

      <Header />
      <BlurText>
        <div className="px-4 mt-10 flex flex-col items-center gap-6 w-full overflow-hidden mb-8 md:mb-12 flex-1">
          <h1 className="text-center font-space-grotesk font-semibold  leading-none tracking-tighter bg-gradient-to-br bg-clip-text text-transparent from-white from-5% to-white/40 text-3xl sm:text-5xl md:text-6xl">
            Create Your Professional <br /> Resume in Minutes
          </h1>
          <p className="text-center text-xs sm:text-base text-pretty text-secondary-foreground font-space-grotesk font-light">
            Say goodbye to formatting struggles. Our intuitive <br /> builder
            creates ATS-friendly resumes in minutes, not hours.
          </p>
          <SelectDialog />

          {/* <SelectDialog /> */}

          

          <div
            style={{
              perspective: "4000px",
              perspectiveOrigin: "100% 120%",
            }}
          >
            <Image
              alt="front image"
              src="/front-img.png"
              width={1000}
              height={1000}
              style={{
                transform:
                  "translateX(8%) scale(1.2) rotateX(45deg) rotateY(31deg) rotate(324deg)",
              }}
              className="w-full h-full object-cover object-center rounded-xl"
            />
            <div className="hero-image rounded-xl" />
          </div>
        </div>
      </BlurText>

      {/* <div className="mt-28">
        <KeyFeatures />
      </div> */}

      <footer className="relative py-6 md:py-0 ">
        <div className="absolute top-0 h-px w-full footer" />
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <span className="text-xs sm:text-base font-space-grotesk text-muted-foreground/85">
            designed and developed by{" "}
            <Link
              href=""
              className="text-muted-foreground underline underline-offset-4 font-medium"
            >
              Manish Yadav
            </Link>
          </span>
        </div>
      </footer>
      {/* <footer className="mt-auto h-20 flex flex-col items-center sm:items-start px-5 text-muted-foreground/80 gap-8">
        <span className="font-space-grotesk">
          designed and developed by{" "}
          <Link
            href=""
            className="text-muted-foreground underline underline-offset-4 font-medium"
          >
            dhansuh theijas
          </Link>
        </span>
      </footer> */}
    </main>
  );
};

export default Page;
