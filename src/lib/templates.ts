import { TemplateMeta } from "./types";

const toHex = (c: string) => c.replace("#", "");

export const templates: TemplateMeta[] = [
  {
    id: "traditional-wine",
    name: "Vivaah Traditional",
    category: "Traditional",
    blurb: "Wine & gold border with a mandala corner motif — the classic shaadi.com look.",
    swatch: ["#7A2048", "#C99A3E", "#FBF6EF"],
    previewImage: `/My_Biodata1.png`,
  },
  {
    id: "royal-gold",
    name: "Rajwada Royal",
    category: "Royal",
    blurb: "Deep maroon canopy header with foil-gold rules, for a grand first impression.",
    swatch: ["#4E1230", "#E7C77C", "#2B1D22"],
    previewImage: `/My_Biodata2.png`,
  },
  {
    id: "modern-minimal",
    name: "Modern Slate",
    category: "Modern",
    blurb: "Left-rail photo, clean grid of facts — reads like a well-typeset resume.",
    swatch: ["#2B1D22", "#5C7A5C", "#FFFFFF"],
    previewImage: `/My_Biodata3.png`,
  },
  {
    id: "minimal-ivory",
    name: "Ivory Minimal",
    category: "Minimal",
    blurb: "Quiet, generous whitespace with a single hairline rule under each heading.",
    swatch: ["#FFFFFF", "#6E5A61", "#C99A3E"],
    previewImage: `/My_Biodata4.png`,
  },
  {
    id: "floral-pastel",
    name: "Pastel Bel Patra",
    category: "Floral",
    blurb: "Soft rose & sage leaf border for a gentle, garden-mandap feel.",
    swatch: ["#F3D9E0", "#5C7A5C", "#7A2048"],
    previewImage: `/My_Biodata5.png`,
  },
  {
    id: "modern-teal",
    name: "Modern Duotone",
    category: "Modern",
    blurb: "Split-panel duotone layout with bold section numerals for a contemporary read.",
    swatch: ["#1F3A3D", "#C99A3E", "#F4F1EA"],
    previewImage: `/My_Biodata6.png`,
  },
  {
    id: "elegant-serif",
    name: "Elegant Serif",
    category: "Minimal",
    blurb: "Classic serif typography, generous margins and refined spacing for a timeless look.",
    swatch: ["#2B1D22", "#C99A3E", "#FBF8F3"],
    previewImage: `/My_Biodata7.png`,
  },
  {
    id: "monogram-crest",
    name: "Monogram Crest",
    category: "Royal",
    blurb: "Centered monogram and crest header with stately rules and a premium feel.",
    swatch: ["#4E1230", "#E7C77C", "#FFF9F5"],
    previewImage: `/My_Biodata1.png`,
  },
];

export const categories: Array<TemplateMeta["category"] | "All"> = [
  "All",
  "Traditional",
  "Royal",
  "Modern",
  "Minimal",
  "Floral",
];

export function getTemplate(id: string): TemplateMeta {
  return templates.find((t) => t.id === id) ?? templates[0];
}