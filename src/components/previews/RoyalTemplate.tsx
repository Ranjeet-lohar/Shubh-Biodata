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
    <Box sx={{ mb: 1.1 }}>
      <Typography sx={{ fontSize: 10.5, letterSpacing: "0.1em", color: onDark ? GOLD_PALE : GOLD, fontWeight: 700 }}>
        {label.toUpperCase()}
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: onDark ? "#fff" : INK, mt: 0.15 }}>{value}</Typography>
    </Box>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mb: 1.25 }}>
      <Typography sx={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 700, color: MAROON_LIGHT, whiteSpace: "nowrap" }}>
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: LINE }} />
    </Box>
  );
}

export default function RoyalTemplate({ data }: { data: BiodataFormData }) {
  return (
    <Box sx={{ bgcolor: "#fff", fontFamily: "var(--font-body)" }}>
      {/* canopy header — the mandap-arch silhouette is the signature shape here */}
      <Box
        sx={{
          bgcolor: MAROON,
          backgroundImage: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_LIGHT} 100%)`,
          color: "#fff",
          p: 4,
          pb: 6,
          textAlign: "center",
          position: "relative",
          clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)",
        }}
      >
        <Typography sx={{ letterSpacing: "0.3em", fontSize: 11, color: GOLD_PALE, fontWeight: 700 }}>
          MARRIAGE BIODATA
        </Typography>
        <Avatar
          src={data.photoDataUrl || undefined}
          variant="rounded"
          sx={{
            width: 96,
            height: 96,
            mx: "auto",
            mt: 2,
            mb: 1.5,
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
            fontSize: { xs: 26, sm: 32 },
            lineHeight: 1.15,
          }}
        >
          {data.personal.fullName || "Your Name Here"}
        </Typography>
        <Typography sx={{ fontSize: 13, color: GOLD_PALE, mt: 0.75, fontWeight: 600 }}>
          {[data.education.occupation, data.contact.city].filter(Boolean).join("   ·   ")}
        </Typography>
      </Box>

      <Box sx={{ px: 4, pt: 5, pb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#FBF6EC",
                border: `1px solid ${LINE}`,
                borderRadius: "10px",
                p: 2.25,
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

            <Box sx={{ mt: 2.5 }}>
              <SectionHeading>Family</SectionHeading>
              <Fact label="Father" value={data.family.fatherName} />
              <Fact label="Mother" value={data.family.motherName} />
              <Fact label="Siblings" value={data.family.siblings} />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${LINE}` }}>
          <SectionHeading>Contact</SectionHeading>
          <Typography sx={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>
            {[data.contact.address, data.contact.city].filter(Boolean).join(", ")}
            {data.contact.phone ? `  ·  ${data.contact.phone}` : ""}
            {data.contact.email ? `  ·  ${data.contact.email}` : ""}
          </Typography>
        </Box>

        {data.about && (
          <Box sx={{ mt: 2.5 }}>
            <SectionHeading>About</SectionHeading>
            <Typography sx={{ fontSize: 13, color: INK, lineHeight: 1.6, fontStyle: "italic" }}>
              &ldquo;{data.about}&rdquo;
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}