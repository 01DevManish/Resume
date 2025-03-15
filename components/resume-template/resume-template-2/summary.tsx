"use client";

import parse from "html-react-parser";
import useResumeStore from "@/store/resumeStore";

const Summary = () => {
  const summary = useResumeStore((state) => state.profile?.summary);
  if (!summary) return null;

  return (
    <section className="mb-4">
      <div className="text-sm text-wrap">{parse(summary)}</div>
    </section>
  );
};

export default Summary;
