"use client";

import { Box, Typography, Avatar, Grid } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

// ---- Design tokens (shared across all templates) -------------------------
const INK = "#241A14";
const MAROON = "#4E1230";
const MAROON_LIGHT = "#7A2048";
const GOLD = "#C6952F"; // deep enough for label text on white
const GOLD_PALE = "#E7C77C"; // light gold — only safe on the dark canopy
const LINE = "#EFE3CE";

// No CSS-selector color tricks: each Fact is told directly whether it sits
// on the dark canopy or the light page, so every label renders correctly
// regardless of how many facts came before it.
function Fact({ label, value, onDark = false }: { label: string; value: string; onDark?: boolean }) {
  if (!value) return null;
  return (
    <Box sx={{ mb: 0.65, breakInside: "avoid" }}>
      <Typography sx={{ fontSize: 9.5, letterSpacing: "0.09em", color: onDark ? GOLD_PALE : GOLD, fontWeight: 700 }}>
        {label.toUpperCase()}
      </Typography>
      <Typography sx={{ fontSize: 12, color: onDark ? "#fff" : INK, mt: 0.1, lineHeight: 1.35 }}>{value}</Typography>
    </Box>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mb: 0.85, breakAfter: "avoid" }}>
      <Typography sx={{ fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700, color: MAROON_LIGHT, whiteSpace: "nowrap" }}>
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: LINE }} />
    </Box>
  );
}

export default function RoyalTemplate({ data }: { data: BiodataFormData }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        fontFamily: "var(--font-body)",
        overflow: "hidden",
        // --- Print: pinned to exactly one A4 page -----------------------
        // Fixed height + overflow hidden is the hard boundary. The canopy
        // header keeps its own padding (it's the visual anchor), but body
        // padding switches to mm and every element below is compacted so
        // the whole thing lands inside 297mm instead of relying on luck.
        "@media print": {
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",
        },
      }}
    >
      {/* canopy header — the mandap-arch silhouette is the signature shape here */}
      <Box
        sx={{
          bgcolor: MAROON,
          backgroundImage: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_LIGHT} 100%)`,
          color: "#fff",
          p: 3,
          pb: 4.5,
          textAlign: "center",
          position: "relative",
          clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)",
          "@media print": {
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
            p: "8mm 10mm",
            pb: "12mm",
          },
        }}
      >
        <Typography sx={{ letterSpacing: "0.28em", fontSize: 10, color: GOLD_PALE, fontWeight: 700 }}>
          MARRIAGE BIODATA
        </Typography>
        <Avatar
          src={data.photoDataUrl || undefined}
          variant="rounded"
          sx={{
            width: 78,
            height: 78,
            mx: "auto",
            mt: 1.5,
            mb: 1.1,
            border: `3px solid ${GOLD_PALE}`,
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        >
          Photo
        </Avatar>
        <Typography
          sx={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: { xs: 22, sm: 27 },
            lineHeight: 1.15,
          }}
        >
          {data.personal.fullName || "Your Name Here"}
        </Typography>
        <Typography sx={{ fontSize: 12, color: GOLD_PALE, mt: 0.6, fontWeight: 600 }}>
          {[data.education.occupation, data.contact.city].filter(Boolean).join("   ·   ")}
        </Typography>
      </Box>

      <Box sx={{ px: 4, pt: 4, pb: 3, "@media print": { px: "10mm", pt: "10mm", pb: "6mm" } }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#FBF6EC",
                border: `1px solid ${LINE}`,
                borderRadius: "10px",
                p: 1.75,
                breakInside: "avoid",
              }}
            >
              <SectionHeading>Personal</SectionHeading>
              <Fact label="Date of Birth" value={data.personal.dob} />
              <Fact label="Birth Place" value={data.personal.placeOfBirth} />
              <Fact label="Height" value={data.personal.height} />
              <Fact label="Religion" value={data.personal.religion} />
              <Fact label="Caste / Gothra" value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")} />
              <Fact label="Manglik" value={data.personal.manglik} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <SectionHeading>Career</SectionHeading>
            <Fact label="Qualification" value={data.education.qualification} />
            <Fact label="Occupation" value={data.education.occupation} />
            <Fact label="Income" value={data.education.income} />

            <Box sx={{ mt: 1.5 }}>
              <SectionHeading>Family</SectionHeading>
              <Fact label="Father" value={data.family.fatherName} />
              <Fact label="Mother" value={data.family.motherName} />
              <Fact label="Siblings" value={data.family.siblings} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${LINE}`, breakInside: "avoid" }}>
          <SectionHeading>Contact</SectionHeading>
          <Typography sx={{ fontSize: 12, color: INK, lineHeight: 1.5 }}>
            {[data.contact.address, data.contact.city].filter(Boolean).join(", ")}
            {data.contact.phone ? `  ·  ${data.contact.phone}` : ""}
            {data.contact.email ? `  ·  ${data.contact.email}` : ""}
          </Typography>
        </Box>

        {data.about && (
          <Box sx={{ mt: 1.5, breakInside: "avoid" }}>
            <SectionHeading>About</SectionHeading>
            <Typography sx={{ fontSize: 12, color: INK, lineHeight: 1.5, fontStyle: "italic" }}>
              &ldquo;{data.about}&rdquo;
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}