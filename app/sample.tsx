// "use client";
// import React from "react";
// import { FileText, Zap, Layout, Globe, Shield, Clock } from "lucide-react";
// import { BentoCard, BentoGrid } from "@/components/features/quick-build";

// const KeyFeatures = () => {
//   const features = [
//     {
//       icon: Zap,
//       title: "Quick Builder",
//       description:
//         "Create a professional resume in minutes with our intuitive interface.",
//     },
//     {
//       icon: Shield,
//       title: "ATS-Optimized",
//       description:
//         "Ensure your resume passes Applicant Tracking Systems easily.",
//     },
//     {
//       icon: Clock,
//       title: "Real-Time Preview",
//       description: "See changes instantly as you build your perfect resume.",
//     },
//   ];

//   return (
//     <section className="mt-20">
//       <BentoGrid>
//         {features.map((feature, index) => (
//           <BentoCard
//             background={<p></p>}
//             className="bg-primary-50 dark:bg-primary-900"
//             key={index}
//             Icon={feature.icon}
//             name={feature.title}
//             description={feature.description}
//             href="/"
//             cta="Learn More"
//           />
//         ))}
//       </BentoGrid>
//     </section>
//   );
// };

// export default KeyFeatures;
"use client";
import { BentoCard, BentoGrid } from "@/components/features/bentoGrid";
import MultiFormatDownload from "@/components/features/download-icon";
import FlashIcon from "@/components/features/flash-icon";
import QuickBuild from "@/components/features/quick-build";
import { FileTextIcon, GlobeIcon, AArrowDownIcon } from "lucide-react";

const features = [
  {
    Icon: FileTextIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="h-56 linear-mask-2">
        <FlashIcon />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: AArrowDownIcon,
    name: "Quick Builder",
    description:
      "Create a professional resume in minutes with our intuitive interface.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
];

const KeyFeatures = () => {
  return (
    <section className="">
      <div className="grid">
        <QuickBuild />
        <MultiFormatDownload />
      </div>
    </section>
  );
};

export default KeyFeatures;
