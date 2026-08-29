import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { BiodataFormData } from "./types";

const WINE = "7A2048";
const GOLD = "C99A3E";

function sectionHeading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } },
    children: [new TextRun({ text, color: WINE, bold: true })],
  });
}

function factRow(label: string, value: string) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 35, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, color: "6E5A61" })] })],
      }),
      new TableCell({
        width: { size: 65, type: WidthType.PERCENTAGE },
        children: [new Paragraph({ children: [new TextRun({ text: value || "-" })] })],
      }),
    ],
  });
}

function factTable(rows: [string, string][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "E7DCCB" },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    },
    rows: rows.map(([l, v]) => factRow(l, v)),
  });
}

export async function exportBiodataToDocx(data: BiodataFormData, filename: string) {
  const personalRows: [string, string][] = [
    ["Date of Birth", data.personal.dob],
    ["Time of Birth", data.personal.timeOfBirth],
    ["Place of Birth", data.personal.placeOfBirth],
    ["Height", data.personal.height],
    ["Weight", data.personal.weight],
    ["Complexion", data.personal.complexion],
    ["Blood Group", data.personal.bloodGroup],
    ["Marital Status", data.personal.maritalStatus],
    ["Religion", data.personal.religion],
    ["Caste", data.personal.caste],
    ["Gothra", data.personal.gothra],
    ["Manglik", data.personal.manglik],
    ["Diet", data.personal.diet],
    ...((data.extras?.personal || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const educationRows: [string, string][] = [
    ["Qualification", data.education.qualification],
    ["Occupation", data.education.occupation],
    ["Company / Organisation", data.education.company],
    ["Annual Income", data.education.income],
    ...((data.extras?.education || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const familyRows: [string, string][] = [
    ["Father's Name", data.family.fatherName],
    ["Father's Occupation", data.family.fatherOccupation],
    ["Mother's Name", data.family.motherName],
    ["Mother's Occupation", data.family.motherOccupation],
    ["Siblings", data.family.siblings],
    ["Family Type", data.family.familyType],
    ["Family Values", data.family.familyValues],
    ["Native Place", data.family.nativePlace],
    ...((data.extras?.family || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const contactRows: [string, string][] = [
    ["Address", data.contact.address],
    ["City", data.contact.city],
    ["Phone", data.contact.phone],
    ["Email", data.contact.email],
    ["Contact Person", data.contact.contactPerson],
    ...((data.extras?.contact || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: "center",
            spacing: { after: 100 },
            children: [
              new TextRun({ text: data.personal.fullName || "Marriage Biodata", bold: true, size: 40, color: WINE }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            spacing: { after: 300 },
            children: [new TextRun({ text: "Biodata for Marriage", italics: true, color: "6E5A61" })],
          }),

          sectionHeading("Personal Details"),
          factTable(personalRows),

          sectionHeading("Education & Career"),
          factTable(educationRows),

          sectionHeading("Family Details"),
          factTable(familyRows),

          sectionHeading("Contact Details"),
          factTable(contactRows),

          ...(data.about
            ? [
                sectionHeading("About Me"),
                new Paragraph({ children: [new TextRun({ text: data.about })] }),
              ]
            : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
