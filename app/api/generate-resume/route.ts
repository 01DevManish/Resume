import { extractParagraphs } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const svgIcons = {
  phone: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 h-4 w-4"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const browserlessApiKey = process.env.BROWSERLESS_API_KEY;
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${body.profile.name} - Resume</title>
  <style>
    .list-disk {
      list-style: disc;
    }
    .pl-5 {
      padding-left: 1.25rem;
    }
  </style>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="w-[210mm] h-[297mm] mx-auto p-8 bg-white text-black shadow-lg overflow-hidden text-base leading-tight print:shadow-none">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <header class="text-center mb-3.5">
        <h1 class="text-3xl font-bold mb-2">${body.profile.name}</h1>
        <p class="text-lg">${body.profile.address}</p>
        <div class="flex justify-center space-x-6 mt-2">
          ${
            body.profile.phone
              ? `<a href="tel:${body.profile.phone}" class="flex items-center text-blue-600 hover:underline"> ${svgIcons.phone} ${body.profile.phone}</a>`
              : ""
          }
          ${
            body.profile.email
              ? `<a href="mailto:${body.profile.email}" class="flex items-center text-blue-600 hover:underline"> ${svgIcons.mail} ${body.profile.email}</a>`
              : ""
          }
          ${
            body.profile.linkedin
              ? `<a href="${body.profile.linkedin}" class="flex items-center text-blue-600 hover:underline"> ${svgIcons.linkedin} LinkedIn</a>`
              : ""
          }
          ${
            body.profile.github
              ? `<a href="${body.profile.github}" class="flex items-center text-blue-600 hover:underline"> ${svgIcons.github} Github</a>`
              : ""
          }
          ${
            body.profile.website
              ? `<a href="${body.profile.website}" class="flex items-center text-blue-600 hover:underline"> ${svgIcons.globe} Website</a>`
              : ""
          }
        </div>
      </header>

      <!-- Education -->
      ${
        body.educations.length > 0
          ? `<section class="mb-3"><h2 class="text-xl font-bold border-b border-gray-300 mb-2 uppercase">Education</h2>${body.educations
              .map(
                (edu: any, index: number) =>
                  `<div key=${index} class="mb-3"><div class="flex justify-between"><h3 class="font-semibold text-lg">${edu.institutionName}</h3><span class="text-sm">${edu.startDate} - ${edu.endDate}</span></div><p class="text-sm">${edu.degree} - ${edu.fieldOfStudy} - CGPA: ${edu.score}</p><ul class="list-disc pl-5 text-sm">${edu.description}</ul></div>`
              )
              .join("")}</section>`
          : ""
      }

      <!-- Projects -->
      ${
        body.projects.length > 0
          ? `<section class="mb-3"><h2 class="text-xl font-bold border-b border-gray-300 mb-2 uppercase">Projects</h2>${body.projects
              .map(
                (project: any) =>
                  `<div key=${
                    project.projectId
                  } class="mb-3"><div class="flex justify-between"><h3 class="font-semibold text-lg">${
                    project.projectName
                  }</h3></div><p class="italic text-sm">${
                    project.deploymentLink
                      ? `<a href=${project.deploymentLink} class="text-blue-600 hover:underline">Live Link</a>`
                      : ""
                  } ${
                    project.repoLink
                      ? `<a href=${project.repoLink} class="text-blue-600 hover:underline">| Github Link</a>`
                      : ""
                  }</p><div class="pl-5 text-sm"><ul class="list-disc">${extractParagraphs(
                    project.projectDescription
                  )
                    .map(
                      (para: any, index: number) =>
                        `<li key=${index}>${para}</li>`
                    )
                    .join("")}</ul></div></div>`
              )
              .join("")}</section>`
          : ""
      }

      <!-- Experiences -->
      ${
        body.experiences.length > 0
          ? `<section class="mb-3"><h2 class="text-xl font-bold border-b border-gray-300 mb-2 uppercase">Experience</h2>${body.experiences
              .map(
                (experience: any) =>
                  `<div key=${
                    experience.expId
                  } class="mb-2"><div class="flex justify-between"><h3 class="font-semibold text-lg">${
                    experience.company
                  }</h3><span class="text-sm">${experience.startDate} - ${
                    experience.endDate
                  }</span></div>${
                    experience.role
                      ? `<p class="text-sm">${experience.role}</p>`
                      : ""
                  }<ul class="list-disc pl-5 text-sm">${extractParagraphs(
                    experience.description
                  )
                    .map(
                      (para: any, index: number) =>
                        `<li key=${index}>${para}</li>`
                    )
                    .join("")}</ul></div>`
              )
              .join("")}</section>`
          : ""
      }

      <!-- Skills -->
      ${
        body.skills.length > 0
          ? `<section class="mb-3"><h2 class="text-xl font-bold border-b border-gray-300 mb-2 uppercase">Skills</h2>${body.skills
              .map(
                (skill: any) =>
                  `<div key=${skill.skillId} class="text-sm"><span class="font-semibold">${skill.skillCategories} :</span> ${skill.skillList}</div>`
              )
              .join("")}</section>`
          : ""
      }

      <!-- Certifications -->
      ${
        body.certifications.length > 0
          ? `<section class="mb-3"><h2 class="text-xl font-bold border-b border-gray-300 mb-2 uppercase">Certifications</h2><ul class="mb-2 list-disc pl-3 text-sm">${body.certifications
              .map(
                (certification: any, index: number) =>
                  `<li key=${index}><a class="font-semibold text-blue-600 hover:underline" href=${certification.certificationProof}>${certification.certificationName}</a> by <span class="capitalize">${certification.certificationAuthority}</span></li>`
              )
              .join("")}</ul></section>`
          : ""
      }
    </div>
  </div>
</body>
</html>
`;

  try {
    // Request to Browserless API to generate PDF
    const response = await axios.post(
      `https://chrome.browserless.io/pdf?token=${browserlessApiKey}`,
      { html: htmlContent },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'arraybuffer',
      }
    );

    const pdf = response.data;
    const nextResponse = new NextResponse(pdf);
    nextResponse.headers.set("Content-Type", "application/pdf");
    nextResponse.headers.set(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );

    return nextResponse;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}