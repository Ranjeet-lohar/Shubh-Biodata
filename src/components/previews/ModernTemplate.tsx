"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

// ---- Design tokens (shared with the editor shell + MinimalTemplate) ------
const INK = "#241A14";
const GOLD = "#C6952F";
const GOLD_SOFT = "#E7D3A6";
const LINE = "#EFE7DA";

// Each field is its own label-then-value block. Because label and value each
// get the full column width on their own line, a long value just wraps
// within itself — it can never squeeze into a narrow leftover flex slot the
// way it did in the old 3-column row, which is what caused the crowding.
function Item({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Box sx={{ py: 0.9, borderBottom: `1px solid ${LINE}` }}>
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A9967A" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: INK, lineHeight: 1.45, mt: 0.25 }}>{value}</Typography>
    </Box>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mb: 0.5 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD, whiteSpace: "nowrap" }}>
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: LINE }} />
    </Box>
  );
}

// A single slanted accent shape in the sidebar corner — the one geometric
// gesture in an otherwise plain panel, standing in for the ornament every
// other template in the set gets somewhere.
function AccentWedge() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 90,
        height: 90,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -45,
          right: -45,
          width: 90,
          height: 90,
          bgcolor: GOLD,
          opacity: 0.16,
          transform: "rotate(45deg)",
        }}
      />
    </Box>
  );
}

export default function ModernTemplate({
  data,
  variant = "slate",
}: {
  data: BiodataFormData;
  variant?: "slate" | "teal";
}) {
  // Two dark options within the shared palette, rather than an unrelated
  // green/teal accent — keeps this template feeling like the same product
  // as the editor and the Minimal template.
  const dark = variant === "slate" ? "#3B141C" : "#1F332B";

  const personalItems: [string, string][] = [
    ["Date of Birth", data.personal.dob],
    ["Place of Birth", data.personal.placeOfBirth],
    ["Height", data.personal.height],
    ["Religion / Caste", [data.personal.religion, data.personal.caste].filter(Boolean).join(" / ")],
    ["Manglik", data.personal.manglik],
    ["Diet", data.personal.diet],
  ];
  const careerItems: [string, string][] = [
    ["Qualification", data.education.qualification],
    ["Occupation", data.education.occupation],
    ["Income", data.education.income],
    ["Father", data.family.fatherName],
    ["Mother", data.family.motherName],
    ["Native Place", data.family.nativePlace],
  ];

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#fff",
        fontFamily: "var(--font-body)",
        minHeight: 500,
        border: `1px solid ${LINE}`,
        borderRadius: "14px",
        boxShadow: `0 18px 44px ${INK}14`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", width: "34%", bgcolor: dark, color: "#fff", p: 3, display: "flex", flexDirection: "column" }}>
        <AccentWedge />
        <Box sx={{ p: "3px", borderRadius: "10px", border: `1px solid rgba(255,255,255,0.25)`, mb: 2, alignSelf: "flex-start", width: "100%", position: "relative" }}>
          <Avatar
            src={data.photoDataUrl || undefined}
            variant="rounded"
            sx={{ width: "100%", height: 160, bgcolor: "rgba(255,255,255,0.08)", borderRadius: "8px" }}
          >
            Photo
          </Avatar>
        </Box>
        <Typography
          sx={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, color: "#fff", fontSize: 27, lineHeight: 1.16, position: "relative" }}
        >
          {data.personal.fullName || "Your Name Here"}
        </Typography>
        <Box sx={{ width: 40, height: 2, bgcolor: GOLD, my: 1.5 }} />
        <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em" }}>
          {[data.education.occupation, data.contact.city].filter(Boolean).join("   ·   ") || "Occupation   ·   City"}
        </Typography>

        <Box sx={{ mt: "auto", pt: 3, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          <Typography sx={{ fontSize: 10.5, color: GOLD, letterSpacing: "0.14em", fontWeight: 700, mb: 0.75 }}>
            CONTACT
          </Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.85)", py: 0.15 }}>{data.contact.phone}</Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.85)", py: 0.15 }}>{data.contact.email}</Typography>
        </Box>
      </Box>

      <Box sx={{ width: "66%", p: 3.5 }}>
        {data.about && (
          <Typography sx={{ fontSize: 13, fontStyle: "italic", color: "#6B5D4E", mb: 2.5, lineHeight: 1.6 }}>
            &ldquo;{data.about}&rdquo;
          </Typography>
        )}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 4, position: "relative" }}>
          <Box sx={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", bgcolor: LINE, display: { xs: "none", sm: "block" } }} />
          <Box>
            <SectionHeading>Personal</SectionHeading>
            {personalItems.map(([label, value]) => (
              <Item key={label} label={label} value={value} />
            ))}
          </Box>
          <Box sx={{ pl: { sm: 2 } }}>
            <SectionHeading>Career &amp; Family</SectionHeading>
            {careerItems.map(([label, value]) => (
              <Item key={label} label={label} value={value} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}