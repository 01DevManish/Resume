import React, { useState } from "react";

const PDFDownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://ai-store-eight.vercel.app/api/getData", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
};

export default PDFDownloadButton;
