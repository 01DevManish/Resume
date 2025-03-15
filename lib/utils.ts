import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatLink(url: string) {
  url = url.replace(/(^\w+:|^)\/\//, "");
  url = url.replace(/\/$/, "");
  return url.split("/")[0];
}

export function getCurrentPath(url: string) {
  if (url === "") return "";
  return url.split("/").at(-1);
}
export function getIdFromUrl(url: string) {
  if (url === "") return "";
  const urlArr = url.split("/");
  return urlArr[2];
}

export function extractParagraphs(htmlString: string) {
  const paragraphRegex = /<li>\s*<p>(.*?)<\/p>\s*<\/li>/g;

  let paragraphs = [];
  let match;

  while ((match = paragraphRegex.exec(htmlString)) !== null) {
    paragraphs.push(`<p>${match[1]}</p>`);
  }

  return paragraphs;
}
