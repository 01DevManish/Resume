"use client";

import useResumeStore from "@/store/resumeStore";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // usePathname instead of useRouter

export const useDownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resumeData = useResumeStore();
  const pathname = usePathname(); // Get current pathname

  // Function to get the correct API URL based on the page
  const getApiUrl = () => {
    switch (pathname) {
      case "/resume/1/content":
        return "/api/generate-resume";

      case "/resume/2/content":
        return "/api/generate-resume1";

      case "/resume/3/content":
        return "/api/generate-resume2";

      case "/resume/4/content":
        return "/api/generate-resume3";

      case "/resume/5/content":
        return "/api/generate-resume4";
      default:
        return "/api/resume"; // Default API endpoint
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume_${pathname.replace("/", "")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDownload, isLoading };
};
