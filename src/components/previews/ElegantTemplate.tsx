"use client";

import { Box, Typography, Avatar, Grid } from "@mui/material";
import { BiodataFormData } from "@/lib/types";
import AdditionalDetailsSection from "./AdditionalDetailsSection";

// ---- Palette (unchanged mood, slightly deeper contrast for print) ------
const BG = "#2B1220";
const PANEL = "#4E1230";
const GOLD = "#E7C77C";
const GOLD_DIM = "#B69B6B";
const CREAM = "#FFF9F0";

// Compact field: label + value share a line where possible instead of
// stacking, and vertical margins are cut roughly in half from the previous
// version — this is most of where the page-height savings come from.
function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <Box sx={{ mb: 0.55, breakInside: "avoid" }}>
      <Typography
        component="span"
        sx={{ fontSize: 9.5, color: GOLD_DIM, display: "block", letterSpacing: 0.5, textTransform: "uppercase", lineHeight: 1.3 }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: CREAM, fontWeight: 500, lineHeight: 1.35 }}>{value}</Typography>
    </Box>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, mt: 1.6, breakAfter: "avoid" }}>
      <Box sx={{ width: 5, height: 5, transform: "rotate(45deg)", bgcolor: GOLD, flexShrink: 0 }} />
      <Typography
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: 12.5,
          letterSpacing: 0.8,
          textTransform: "uppercase",
          color: GOLD,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(231,199,124,0.3)" }} />
    </Box>
  );
}

export default function ElegantTemplate({ data }: { data: BiodataFormData }) {
  const name = data.personal.fullName || "Your Name Here";
  const tagline = [data.education?.occupation, data.contact?.city].filter(Boolean).join(" · ");

  return (
    <Box
      sx={{
        bgcolor: BG,
        backgroundImage: "radial-gradient(ellipse at top, rgba(231,199,124,0.08), transparent 60%)",
        border: `1px solid ${PANEL}`,
        fontFamily: "var(--font-body)",
        minHeight: 480,
        color: CREAM,
        overflow: "hidden",
        // --- Print: pinned to exactly one A4 page -----------------------
        // Fixed height (not minHeight) + hidden overflow is what actually
        // prevents a second blank page — a couple of extra millimetres of
        // content used to be enough to spill over before.
        "@media print": {
          bgcolor: `${BG} !important`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          border: "none",
          boxShadow: "none",
          width: "210mm",
          height: "297mm",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: PANEL,
          borderBottom: `2px solid ${GOLD}`,
          textAlign: "center",
          py: { xs: 2.25, sm: 2.75 },
          px: 3,
          position: "relative",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 8,
            width: 22,
            height: 22,
            border: `1px solid ${GOLD}`,
            borderRadius: "50%",
            opacity: 0.5,
          },
          "&::before": { left: 14 },
          "&::after": { right: 14 },
        }}
      >
        <Typography sx={{ fontSize: 9.5, letterSpacing: 2.5, color: GOLD, textTransform: "uppercase", mb: 0.5 }}>
          Biodata
        </Typography>
        <Typography sx={{ fontFamily: "var(--font-display)", fontSize: { xs: 21, sm: 26 }, color: CREAM, lineHeight: 1.15 }}>
          {name}
        </Typography>
        <Box sx={{ height: 1, width: 70, bgcolor: GOLD, mx: "auto", mt: 1, mb: 0.9, opacity: 0.6 }} />
        {tagline && <Typography sx={{ fontSize: 11.5, color: "#D8B98A", letterSpacing: 0.4 }}>{tagline}</Typography>}
      </Box>

      <Box sx={{ px: { xs: 2.5, sm: 3.5 }, py: { xs: 2, sm: 2.5 } }}>
        {/* Photo + Personal, side by side */}
        <Box sx={{ display: "flex", gap: 2.5, flexDirection: { xs: "column", sm: "row" } }}>
          <Box sx={{ width: { xs: "100%", sm: 108 }, flexShrink: 0, display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
            <Avatar
              src={data.photoDataUrl || undefined}
              variant="rounded"
              sx={{
                width: 108,
                height: 134,
                bgcolor: "rgba(231,199,124,0.08)",
                borderRadius: 1,
                border: `2px solid ${GOLD}`,
                fontSize: 12,
                color: "#D8B98A",
              }}
            >
              Photo
            </Avatar>
          </Box>

          <Box sx={{ flex: 1 }}>
            <SectionTitle>Personal Details</SectionTitle>
            <Grid container columnSpacing={2} rowSpacing={0}>
              <Grid item xs={4}><Field label="Date of Birth" value={data.personal.dob} /></Grid>
              <Grid item xs={4}><Field label="Time of Birth" value={data.personal.timeOfBirth} /></Grid>
              <Grid item xs={4}><Field label="Place of Birth" value={data.personal.placeOfBirth} /></Grid>
              <Grid item xs={4}><Field label="Height" value={data.personal.height} /></Grid>
              <Grid item xs={4}><Field label="Complexion" value={data.personal.complexion} /></Grid>
              <Grid item xs={4}><Field label="Marital Status" value={data.personal.maritalStatus} /></Grid>
              <Grid item xs={4}><Field label="Religion" value={data.personal.religion} /></Grid>
              <Grid item xs={4}><Field label="Caste / Gothra" value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")} /></Grid>
              <Grid item xs={4}><Field label="Rashi" value={data.personal.rashi} /></Grid>
              <Grid item xs={4}><Field label="Nakshatra" value={data.personal.nakshatra} /></Grid>
            </Grid>
          </Box>
        </Box>

        {/* Family */}
        <SectionTitle>Family Details</SectionTitle>
        <Grid container columnSpacing={2} rowSpacing={0}>
          <Grid item xs={4}><Field label="Father's Name" value={data.family?.fatherName} /></Grid>
          <Grid item xs={4}><Field label="Father's Occupation" value={data.family?.fatherOccupation} /></Grid>
          <Grid item xs={4}><Field label="Mother's Name" value={data.family?.motherName} /></Grid>
          <Grid item xs={4}><Field label="Mother's Occupation" value={data.family?.motherOccupation} /></Grid>
          <Grid item xs={4}><Field label="Siblings" value={data.family?.siblings} /></Grid>
          <Grid item xs={4}><Field label="Family Type" value={data.family?.familyType} /></Grid>
          <Grid item xs={4}><Field label="Family Status" value={data.family?.familyStatus} /></Grid>
          <Grid item xs={4}><Field label="Native Place" value={data.family?.nativePlace} /></Grid>
        </Grid>

        {/* Education & Career */}
        <SectionTitle>Education &amp; Career</SectionTitle>
        <Grid container columnSpacing={2} rowSpacing={0}>
          <Grid item xs={4}><Field label="Qualification" value={data.education.qualification} /></Grid>
          <Grid item xs={4}><Field label="Occupation" value={data.education.occupation} /></Grid>
          <Grid item xs={4}><Field label="Company / Organization" value={data.education?.company} /></Grid>
          <Grid item xs={4}><Field label="Annual Income" value={data.education?.income} /></Grid>
        </Grid>

        {/* Contact */}
        <SectionTitle>Contact Details</SectionTitle>
        <Grid container columnSpacing={2} rowSpacing={0}>
          <Grid item xs={4}><Field label="Mobile" value={data.contact.phone || data.contact.mobile} /></Grid>
          <Grid item xs={4}><Field label="Email" value={data.contact?.email} /></Grid>
          <Grid item xs={4}><Field label="City" value={data.contact?.city} /></Grid>
          <Grid item xs={4}><Field label="State" value={data.contact?.state} /></Grid>
          <Grid item xs={8}><Field label="Address" value={data.contact?.address} /></Grid>
        </Grid>

        {data.about && (
          <>
            <SectionTitle>About</SectionTitle>
            <Typography sx={{ fontSize: 12, color: CREAM, lineHeight: 1.5, opacity: 0.9 }}>
              {data.about}
            </Typography>
          </>
        )}

        <AdditionalDetailsSection data={data} accent={GOLD} text={CREAM} muted={GOLD_DIM} border={GOLD_DIM}  />
      </Box>

      {/* Footer rule */}
      <Box sx={{ borderTop: "1px solid rgba(231,199,124,0.3)", py: 0.9, textAlign: "center" }}>
        <Typography sx={{ fontSize: 9, letterSpacing: 1.6, color: GOLD_DIM, textTransform: "uppercase" }}>
          ॐ शुभ विवाह
        </Typography>
      </Box>
    </Box>
  );
}