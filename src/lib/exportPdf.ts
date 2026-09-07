import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DocumentLanguage, translate } from "./language";

/**
 * Renders a DOM node (the biodata preview card) to an A4 PDF and triggers download.
 * To improve print output we clone the node into an offscreen container, strip
 * visual chrome (shadows/background patterns), and render at a higher scale.
 */
export async function exportNodeToPdf(node: HTMLElement, filename: string, language: DocumentLanguage = "en") {
  // Clone the node so we can tweak styles for printing without affecting UI.
  const cloned = node.cloneNode(true) as HTMLElement;

  // Force print-friendly appearance on the clone.
  cloned.style.boxShadow = "none";
  cloned.style.margin = "0";
  cloned.style.background = "#ffffff";
  cloned.style.transform = "none";
  cloned.style.maxWidth = "none";

  // Export the complete document rather than the constrained live preview.
  // Several templates use fixed A4 print bounds and hidden overflow to keep
  // the editor card tidy; those bounds would otherwise clip long biodatas.
  const exportElements = [cloned, ...Array.from(cloned.querySelectorAll<HTMLElement>("*"))];
  exportElements.forEach((element) => {
    element.style.overflow = "visible";
    element.style.maxHeight = "none";
    element.style.aspectRatio = "auto";
  });
  cloned.style.height = "auto";
  cloned.style.minHeight = "0";

  if (language === "hi") {
    const walker = document.createTreeWalker(cloned, NodeFilter.SHOW_TEXT);
    let current = walker.nextNode();
    while (current) {
      current.textContent = current.textContent
        ?.split(/(Marriage Biodata|Personal Details|Education & Career|Family Details|Family Background|Contact Details|About Me|Date of Birth|Time of Birth|Place of Birth|Birth Place|Height|Weight|Complexion|Blood Group|Marital Status|Religion|Caste|Gothra|Caste \/ Gothra|Manglik|Diet|Qualification|Occupation|Company \/ Organisation|Annual Income|Father's Name|Father's Occupation|Mother's Name|Mother's Occupation|Siblings|Family Type|Family Values|Native Place|Father|Mother|Address|City|Phone|Email|Contact Person)/g)
        .map((part) => translate(part, language))
        .join("");
      current = walker.nextNode();
    }
  }

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-9999px";
  wrapper.style.top = "0";
  wrapper.style.width = "794px";
  wrapper.style.minHeight = "1123px";
  wrapper.style.background = "#ffffff";
  wrapper.style.overflow = "visible";
  cloned.classList.add("pdf-export");
  cloned.style.width = "794px";
  cloned.style.maxWidth = "794px";
  cloned.style.minHeight = "0";
  wrapper.appendChild(cloned);
  document.body.appendChild(wrapper);

  try {
    const scale = 3; // higher scale for crisper output on export
    const canvas = await html2canvas(cloned, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Fit the complete biodata to one A4 page. Scaling the finished bitmap
    // keeps text and custom fields together without splitting rows or causing
    // CSS overflow to overlap neighboring content.
    const fit = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * fit;
    const imgHeight = canvas.height * fit;
    const left = (pageWidth - imgWidth) / 2;
    const top = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", left, top, imgWidth, imgHeight);

    pdf.save(filename);
  } finally {
    // Clean up the offscreen clone.
    document.body.removeChild(wrapper);
  }
}
