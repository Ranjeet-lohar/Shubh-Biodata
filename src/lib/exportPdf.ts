import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Renders a DOM node (the biodata preview card) to an A4 PDF and triggers download.
 * To improve print output we clone the node into an offscreen container, strip
 * visual chrome (shadows/background patterns), and render at a higher scale.
 */
export async function exportNodeToPdf(node: HTMLElement, filename: string) {
  // Clone the node so we can tweak styles for printing without affecting UI.
  const cloned = node.cloneNode(true) as HTMLElement;

  // Force print-friendly appearance on the clone.
  cloned.style.boxShadow = "none";
  cloned.style.margin = "0";
  cloned.style.background = "#ffffff";
  cloned.style.transform = "none";
  cloned.style.maxWidth = "none";

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-9999px";
  wrapper.style.top = "0";
  wrapper.style.width = `${node.offsetWidth}px`;
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

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the image and slice across pages if needed. Use a stable pagination
    // approach by drawing the same tall image at progressively shifted
    // vertical offsets.
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } finally {
    // Clean up the offscreen clone.
    document.body.removeChild(wrapper);
  }
}
