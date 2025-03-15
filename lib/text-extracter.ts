// utils/extractTextFromHtml.ts
import { parse } from "node-html-parser";

export function extractTextFromHtml(htmlString: string): string[] {
  const root = parse(htmlString);
  const texts: string[] = [];
  function traverse(node: any) {
    if (node.nodeType === 3) {
      const text = node.text.trim();
      if (text) {
        texts.push(text);
      }
    }
    node.childNodes.forEach((child: any) => traverse(child));
  }
  traverse(root);
  return texts;
}

export default extractTextFromHtml;
