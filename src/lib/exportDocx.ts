import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { BiodataFormData } from "./types";
import { DocumentLanguage, translate } from "./language";

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

export async function exportBiodataToDocx(data: BiodataFormData, filename: string, language: DocumentLanguage = "en") {
  const label = (text: string) => translate(text, language);
  const personalRows: [string, string][] = [
    [label("Date of Birth"), data.personal.dob],
    [label("Time of Birth"), data.personal.timeOfBirth],
    [label("Place of Birth"), data.personal.placeOfBirth],
    [label("Height"), data.personal.height],
    [label("Weight"), data.personal.weight],
    [label("Complexion"), data.personal.complexion],
    [label("Blood Group"), data.personal.bloodGroup],
    [label("Marital Status"), data.personal.maritalStatus],
    [label("Religion"), data.personal.religion],
    [label("Caste"), data.personal.caste],
    [label("Gothra"), data.personal.gothra],
    [label("Manglik"), data.personal.manglik],
    [label("Diet"), data.personal.diet],
    ...((data.extras?.personal || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const educationRows: [string, string][] = [
    [label("Qualification"), data.education.qualification],
    [label("Occupation"), data.education.occupation],
    [label("Company / Organisation"), data.education.company],
    [label("Annual Income"), data.education.income],
    ...((data.extras?.education || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const familyRows: [string, string][] = [
    [label("Father's Name"), data.family.fatherName],
    [label("Father's Occupation"), data.family.fatherOccupation],
    [label("Mother's Name"), data.family.motherName],
    [label("Mother's Occupation"), data.family.motherOccupation],
    [label("Siblings"), data.family.siblings],
    [label("Family Type"), data.family.familyType],
    [label("Family Values"), data.family.familyValues],
    [label("Native Place"), data.family.nativePlace],
    ...((data.extras?.family || []).map((e): [string, string] => [e.label || "", e.value || ""])),
  ];

  const contactRows: [string, string][] = [
    [label("Address"), data.contact.address],
    [label("City"), data.contact.city],
    [label("Phone"), data.contact.phone],
    [label("Email"), data.contact.email],
    [label("Contact Person"), data.contact.contactPerson],
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
              new TextRun({ text: data.personal.fullName || label("Marriage Biodata"), bold: true, size: 40, color: WINE }),
            ],
          }),
          new Paragraph({
            alignment: "center",
            spacing: { after: 300 },
              children: [new TextRun({ text: label("Biodata for Marriage"), italics: true, color: "6E5A61" })],
          }),

          sectionHeading(label("Personal Details")),
          factTable(personalRows),

          sectionHeading(label("Education & Career")),
          factTable(educationRows),

          sectionHeading(label("Family Details")),
          factTable(familyRows),

          sectionHeading(label("Contact Details")),
          factTable(contactRows),

          ...(data.about
            ? [
                sectionHeading(label("About Me")),
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
