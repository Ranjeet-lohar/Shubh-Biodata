export type DocumentLanguage = "en" | "hi";

type TranslationKey =
  | "Marriage Biodata"
  | "Biodata for Marriage"
  | "Personal Details"
  | "Additional Details"
  | "Personal"
  | "Education"
  | "Career"
  | "Family"
  | "Education & Career"
  | "Family Details"
  | "Family Background"
  | "Contact Details"
  | "About Me"
  | "Date of Birth"
  | "Time of Birth"
  | "Place of Birth"
  | "Birth Place"
  | "Height"
  | "Weight"
  | "Complexion"
  | "Blood Group"
  | "Marital Status"
  | "Religion"
  | "Caste"
  | "Gothra"
  | "Caste / Gothra"
  | "Manglik"
  | "Diet"
  | "Qualification"
  | "Occupation"
  | "Company / Organisation"
  | "Annual Income"
  | "Father's Name"
  | "Father's Occupation"
  | "Mother's Name"
  | "Mother's Occupation"
  | "Siblings"
  | "Family Type"
  | "Family Values"
  | "Native Place"
  | "Father"
  | "Mother"
  | "Address"
  | "City"
  | "Phone"
  | "Email"
  | "Contact Person";

const hindi: Record<TranslationKey, string> = {
  "Marriage Biodata": "विवाह बायोडाटा",
  "Biodata for Marriage": "विवाह हेतु बायोडाटा",
  "Personal Details": "व्यक्तिगत विवरण",
  "Additional Details": "अतिरिक्त विवरण",
  Personal: "व्यक्तिगत",
  Education: "शिक्षा",
  Career: "करियर",
  Family: "परिवार",
  "Education & Career": "शिक्षा और करियर",
  "Family Details": "पारिवारिक विवरण",
  "Family Background": "पारिवारिक पृष्ठभूमि",
  "Contact Details": "संपर्क विवरण",
  "About Me": "मेरे बारे में",
  "Date of Birth": "जन्म तिथि",
  "Time of Birth": "जन्म समय",
  "Place of Birth": "जन्म स्थान",
  "Birth Place": "जन्म स्थान",
  Height: "कद",
  Weight: "वजन",
  Complexion: "रंग",
  "Blood Group": "रक्त समूह",
  "Marital Status": "वैवाहिक स्थिति",
  Religion: "धर्म",
  Caste: "जाति",
  Gothra: "गोत्र",
  "Caste / Gothra": "जाति / गोत्र",
  Manglik: "मांगलिक",
  Diet: "आहार",
  Qualification: "शैक्षणिक योग्यता",
  Occupation: "व्यवसाय",
  "Company / Organisation": "कंपनी / संस्था",
  "Annual Income": "वार्षिक आय",
  "Father's Name": "पिता का नाम",
  "Father's Occupation": "पिता का व्यवसाय",
  "Mother's Name": "माता का नाम",
  "Mother's Occupation": "माता का व्यवसाय",
  Siblings: "भाई-बहन",
  "Family Type": "परिवार का प्रकार",
  "Family Values": "पारिवारिक मूल्य",
  "Native Place": "मूल निवास",
  Father: "पिता",
  Mother: "माता",
  Address: "पता",
  City: "शहर",
  Phone: "फोन",
  Email: "ईमेल",
  "Contact Person": "संपर्क व्यक्ति",
};

export function translate(text: string, language: DocumentLanguage): string {
  if (language === "en") return text;
  return hindi[text as TranslationKey] ?? text;
}
