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
      .border-b { border-bottom: 1px solid #d1d5db; }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="w-[210mm] h-[297mm] mx-auto p-6 bg-white text-black">
      <!-- Header with Image -->
      <header class="mb-4 border-b-2 border-black pb-2 flex items-start">
        ${
          body.profileImage
            ? `<div class="w-24 h-24 mr-4 flex-shrink-0">
                <img src="${body.profileImage}" alt="Profile" class="w-full h-full object-cover rounded-full border border-gray-300" />
              </div>`
            : ""
        }
        <div class="flex-1">
          <h1 class="text-[20pt] font-bold uppercase tracking-wide">${body.profile.name}</h1>
          <div class="text-[10pt] mt-1">
            ${body.profile.email ? `<span>${body.profile.email} | </span>` : ""}
            ${body.profile.phone ? `<span>${body.profile.phone} | </span>` : ""}
            ${body.profile.address ? `<span>${body.profile.address}</span>` : ""}
          </div>
          <div class="text-[10pt] mt-1">
            ${body.profile.linkedin ? `<span>${body.profile.linkedin} | </span>` : ""}
            ${body.profile.github ? `<span>${body.profile.github} | </span>` : ""}
            ${body.profile.website ? `<span>${body.profile.website}</span>` : ""}
          </div>
        </div>
      </header>

      <!-- Summary -->
      ${
        body.profile.summary
          ? `<section class="mb-4">
              <h2 class="text-lg font-bold uppercase border-b mb-1">Summary</h2>
              <p class="text-sm">${body.profile.summary}</p>
            </section>`
          : ""
      }

      <!-- Skills -->
      ${
        body.skills.length > 0
          ? `<section class="mb-4">
              <h2 class="text-lg font-bold uppercase border-b mb-1">Skills</h2>
              <ul class="list-none columns-2">
                ${body.skills
                  .map(
                    (skill: any) =>
                      `<li class="text-sm"><strong>${skill.skillCategories}:</strong> ${skill.skillList}</li>`
                  )
                  .join("")}
              </ul>
            </section>`
          : ""
      }

      <!-- Experience -->
      ${
        body.experiences.length > 0
          ? `<section class="mb-4">
              <h2 class="text-lg font-bold uppercase border-b mb-1">Experience</h2>
              ${body.experiences
                .map(
                  (experience: any) =>
                    `<div class="mb-3">
                      <div class="flex justify-between">
                        <h3 class="text-[12pt] font-semibold">${experience.company}</h3>
                        <span class="text-sm">${experience.startDate} - ${experience.endDate}</span>
                      </div>
                      ${
                        experience.role
                          ? `<p class="text-sm italic">${experience.role}</p>`
                          : ""
                      }
                      ${
                        experience.description
                          ? `<ul class="list-disc pl-5 text-sm mt-1">
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

      <!-- Education -->
      ${
        body.educations.length > 0
          ? `<section class="mb-4">
              <h2 class="text-lg font-bold uppercase border-b mb-1">Education</h2>
              ${body.educations
                .map(
                  (edu: any, index: number) =>
                    `<div class="mb-2">
                      <div class="flex justify-between">
                        <h3 class="text-[12pt] font-semibold">${edu.institutionName}</h3>
                        <span class="text-sm">${edu.startDate} - ${edu.endDate}</span>
                      </div>
                      <p class="text-sm">${edu.degree} in ${edu.fieldOfStudy} - CGPA: ${edu.score}</p>
                      ${
                        edu.description
                          ? `<p class="text-sm">${edu.description}</p>`
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
              <h2 class="text-lg font-bold uppercase border-b mb-1">Projects</h2>
              ${body.projects
                .map(
                  (project: any) =>
                    `<div class="mb-2">
                      <h3 class="text-[12pt] font-semibold">${project.projectName}</h3>
                      <p class="text-sm">
                        ${
                          project.deploymentLink
                            ? `<span>Live: ${project.deploymentLink} | </span>`
                            : ""
                        }
                        ${
                          project.repoLink
                            ? `<span>Repo: ${project.repoLink}</span>`
                            : ""
                        }
                      </p>
                      ${
                        project.projectDescription
                          ? `<ul class="list-disc pl-5 text-sm mt-1">
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
              <h2 class="text-lg font-bold uppercase border-b mb-1">Certifications</h2>
              <ul class="list-disc pl-5 text-sm">
                ${body.certifications
                  .map(
                    (cert: any, index: number) =>
                      `<li key="${index}">
                        ${cert.certificationName} - ${cert.certificationAuthority}
                        ${
                          cert.certificationProof
                            ? `<span> (${cert.certificationProof})</span>`
                            : ""
                        }
                      </li>`
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