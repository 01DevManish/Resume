import { extractParagraphs } from "@/lib/utils"; // Assuming this utility splits description into paragraphs
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  let browser;
  const body = await req.json();

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(60000);

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${body.profile.name}</title>
    <style>
      body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.2; }
      .list-disc { list-style: disc; }
      .pl-5 { padding-left: 1.25rem; }
      .uppercase { text-transform: uppercase; }
      .font-bold { font-weight: bold; }
      .text-sm { font-size: 11pt; }
      .text-lg { font-size: 14pt; }
      .mt-1 { margin-top: 0.25rem; }
      .mb-4 { margin-bottom: 1rem; }
      .grid-cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
      .bg-gray-200 { background-color: #e5e7eb; }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="w-[210mm] h-[297mm] mx-auto p-6 bg-white text-black">
      <!-- Header -->
      <header class="mb-4">
        <h1 class="text-[24pt] font-bold uppercase">${body.profile.name}</h1>
        <div class="text-[10pt] mb-2">
          ${body.profile.address ? `<span>${body.profile.address}</span>` : ""}
          ${body.profile.address && (body.profile.email || body.profile.website) ? " | " : ""}
          ${body.profile.email ? `<span>${body.profile.email}</span>` : ""}
          ${body.profile.email && body.profile.website ? " | " : ""}
          ${body.profile.website ? `<span>${body.profile.website}</span>` : ""}
        </div>
        ${
          body.profile.summary
            ? `<p class="text-[11pt] italic">${body.profile.summary}</p>`
            : ""
        }
      </header>

      <!-- Work Experience -->
      ${
        body.experiences.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Work Experience
              </h2>
              ${body.experiences
                .map(
                  (experience: any) =>
                    `<div class="mb-3">
                      <div class="flex justify-between">
                        <h3 class="text-[12pt] font-semibold">
                          ${experience.role} | ${experience.company}
                        </h3>
                        <span class="text-[11pt]">
                          ${experience.startDate} - ${experience.endDate || "Present"}
                        </span>
                      </div>
                      ${
                        experience.description
                          ? `<ul class="list-disc pl-5 text-[11pt] mt-1">
                              ${extractParagraphs(experience.description)
                                .map(
                                  (para: any, idx: number) =>
                                    `<li key="${idx}">${para}</li>`
                                )
                                .join("")}
                            </ul>`
                          : ""
                      }
                    </div>`
                )
                .join("")}
            </section>`
          : ""
      }

      <!-- Skills -->
      ${
        body.skills.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Skills
              </h2>
              <ul class="grid grid-cols-2 gap-2 text-[11pt]">
                ${body.skills
                  .map((skill: any) =>
                    skill.skillList
                      .split(", ")
                      .map(
                        (item: string, idx: number) =>
                          `<li class="flex items-start"><span class="mr-2">•</span><span>${item}</span></li>`
                      )
                      .join("")
                  )
                  .join("")}
              </ul>
            </section>`
          : ""
      }

      <!-- Education -->
      ${
        body.educations.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Education
              </h2>
              ${body.educations
                .map(
                  (edu: any, index: number) =>
                    `<div class="mb-3">
                      <div class="flex justify-between">
                        <h3 class="text-[12pt] font-semibold">
                          ${edu.degree} ${edu.fieldOfStudy} | ${edu.institutionName}
                        </h3>
                        <span class="text-[11pt]">
                          ${edu.startDate} - ${edu.endDate}
                        </span>
                      </div>
                      ${
                        edu.description
                          ? `<ul class="list-disc pl-5 text-[11pt] mt-1">
                              ${extractParagraphs(edu.description)
                                .map(
                                  (para: any, idx: number) =>
                                    `<li key="${idx}">${para}</li>`
                                )
                                .join("")}
                            </ul>`
                          : ""
                      }
                    </div>`
                )
                .join("")}
            </section>`
          : ""
      }

      <!-- Projects -->
      ${
        body.projects.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Projects
              </h2>
              ${body.projects
                .map(
                  (project: any) =>
                    `<div class="mb-3">
                      <h3 class="text-[12pt] font-semibold">${project.projectName}</h3>
                      ${
                        (project.deploymentLink || project.repoLink)
                          ? `<p class="text-[11pt]">
                              ${project.deploymentLink ? `Live: ${project.deploymentLink}` : ""}
                              ${project.deploymentLink && project.repoLink ? " | " : ""}
                              ${project.repoLink ? `Repo: ${project.repoLink}` : ""}
                            </p>`
                          : ""
                      }
                      ${
                        project.projectDescription
                          ? `<ul class="list-disc pl-5 text-[11pt] mt-1">
                              ${extractParagraphs(project.projectDescription)
                                .map(
                                  (para: any, idx: number) =>
                                    `<li key="${idx}">${para}</li>`
                                )
                                .join("")}
                            </ul>`
                          : ""
                      }
                    </div>`
                )
                .join("")}
            </section>`
          : ""
      }

      <!-- Certifications -->
      ${
        body.certifications.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Certifications
              </h2>
              <ul class="list-disc pl-5 text-[11pt]">
                ${body.certifications
                  .map(
                    (cert: any, index: number) =>
                      `<li key="${index}">
                        ${cert.certificationName} - ${cert.certificationAuthority}
                        ${cert.certificationProof ? ` (${cert.certificationProof})` : ""}
                      </li>`
                  )
                  .join("")}
              </ul>
            </section>`
          : ""
      }

      <!-- Interests -->
      ${
        body.interests && body.interests.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Interests
              </h2>
              <ul class="grid grid-cols-2 gap-2 text-[11pt]">
                ${body.interests
                  .map(
                    (interest: string, idx: number) =>
                      `<li class="flex items-start"><span class="mr-2">•</span><span>${interest}</span></li>`
                  )
                  .join("")}
              </ul>
            </section>`
          : ""
      }

      <!-- Awards -->
      ${
        body.awards && body.awards.length > 0
          ? `<section class="mb-4">
              <h2 class="text-[14pt] font-bold uppercase bg-gray-200 px-4 py-1 mb-2">
                Awards
              </h2>
              <ul class="list-disc pl-5 text-[11pt]">
                ${body.awards
                  .map(
                    (award: string, idx: number) =>
                      `<li key="${idx}">${award}</li>`
                  )
                  .join("")}
              </ul>
            </section>`
          : ""
      }
    </div>
</body>
</html>`;

    await page.setContent(htmlContent, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
      timeout: 60000,
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        right: "10px",
        left: "10px",
        top: "10px",
        bottom: "10px",
      },
    });
    await browser.close();

    const response = new NextResponse(pdf);
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );

    return response;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}