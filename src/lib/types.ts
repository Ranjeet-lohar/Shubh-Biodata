import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

export type TemplateCategory =
  | "Traditional"
  | "Modern"
  | "Minimal"
  | "Royal"
  | "Floral";

export interface TemplateMeta {
  badge?: ReactNode;
  previewImage: string | StaticImport;
  id: string;
  name: string;
  category: TemplateCategory;
  blurb: string;
  swatch: string[]; // preview colors used to render the thumbnail without an image asset
}

export interface BiodataFormData {
  invocation: ReactNode;
  photoDataUrl: string;
  personal: {
    motherTongue: string;
    hobbies: string;
    nakshatra: string;
    rashi: string;
    birthPlace: string;
    birthTime: string;
    fullName: string;
    dob: string;
    timeOfBirth: string;
    placeOfBirth: string;
    height: string;
    weight: string;
    complexion: string;
    bloodGroup: string;
    maritalStatus: string;
    religion: string;
    caste: string;
    gothra: string;
    manglik: string;
    diet: string;
  };
  education: {
    qualification: string;
    occupation: string;
    company: string;
    income: string;
  };
  family: {
    familyStatus: string;
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    siblings: string;
    familyType: string;
    familyValues: string;
    nativePlace: string;
  };
  contact: {
    state: string;
    mobile: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    contactPerson: string;
  };
  about: string;
  extras?: {
    personal?: Array<{ label: string; value: string }>;
    education?: Array<{ label: string; value: string }>;
    family?: Array<{ label: string; value: string }>;
    contact?: Array<{ label: string; value: string }>;
  };
}

export const emptyBiodata: BiodataFormData = {
  photoDataUrl: "",
  personal: {
    fullName: "",
    dob: "",
    timeOfBirth: "",
    placeOfBirth: "",
    height: "",
    weight: "",
    complexion: "",
    bloodGroup: "",
    maritalStatus: "Never Married",
    religion: "",
    caste: "",
    gothra: "",
    manglik: "No",
    diet: "Vegetarian",
    nakshatra: "",
    rashi: "",
    birthPlace: "",
    birthTime: "",
    motherTongue: "",
    hobbies: ""
  },
  education: {
    qualification: "",
    occupation: "",
    company: "",
    income: "",
  },
  family: {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    familyType: "Nuclear",
    familyValues: "Moderate",
    nativePlace: "",
    familyStatus: ""
  },
  contact: {
    address: "",
    city: "",
    phone: "",
    email: "",
    contactPerson: "",
    state: "",
    mobile: ""
  },
  about: "",
  extras: {
    personal: [],
    education: [],
    family: [],
    contact: [],
  },
  invocation: undefined
};
