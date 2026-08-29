"use client";

import { Box, Typography, Avatar, Grid } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <Box sx={{ mb: 1.1, breakInside: "avoid" }}>
      <Typography
        component="span"
        sx={{ fontSize: 11, color: "#B69B6B", display: "block", letterSpacing: 0.6, textTransform: "uppercase" }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: "#FFF9F0", fontWeight: 500 }}>{value}</Typography>
    </Box>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.8, mt: 3.5, breakAfter: "avoid" }}>
      <Box sx={{ width: 6, height: 6, transform: "rotate(45deg)", bgcolor: "#E7C77C", flexShrink: 0 }} />
      <Typography
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: 15,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#E7C77C",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: "rgba(231,199,124,0.35)" }} />
    </Box>
  );
}

export default function RoyalTemplate({ data }: { data: BiodataFormData }) {
  const name = data.personal.fullName || "Your Name Here";
  const tagline = [data.education?.occupation, data.contact?.city].filter(Boolean).join(" · ");

  return (
    <Box
      sx={{
        bgcolor: "#2B1220",
        backgroundImage: "radial-gradient(ellipse at top, rgba(231,199,124,0.08), transparent 60%)",
        border: "1px solid #4E1230",
        p: 0,
        fontFamily: "var(--font-body)",
        minHeight: 480,
        color: "#FFF9F0",
        overflow: "hidden",
        "@media print": {
          bgcolor: "#2B1220 !important",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          border: "none",
          boxShadow: "none",
          width: "210mm",
          minHeight: "297mm",
        },
      }}
    >
      {/* Canopy header */}
      <Box
        sx={{
          bgcolor: "#4E1230",
          borderBottom: "3px solid #E7C77C",
          textAlign: "center",
          py: { xs: 3.5, sm: 4.5 },
          px: 3,
          position: "relative",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 8,
            width: 28,
            height: 28,
            border: "1px solid #E7C77C",
            borderRadius: "50%",
            opacity: 0.5,
          },
          "&::before": { left: 16 },
          "&::after": { right: 16 },
        }}
      >
        <Typography sx={{ fontSize: 10.5, letterSpacing: 3, color: "#E7C77C", textTransform: "uppercase", mb: 1 }}>
          Biodata
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: { xs: 24, sm: 32 },
            color: "#FFF9F0",
          }}
        >
          {name}
        </Typography>
        <Box sx={{ height: 1, width: 90, bgcolor: "#E7C77C", mx: "auto", mt: 1.5, mb: 1.2, opacity: 0.6 }} />
        {tagline && <Typography sx={{ fontSize: 12.5, color: "#D8B98A", letterSpacing: 0.5 }}>{tagline}</Typography>}
      </Box>

      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        {/* Photo + Personal */}
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <Box sx={{ width: { xs: "100%", sm: 130 }, flexShrink: 0, display: "flex", justifyContent: { xs: "center", sm: "flex-start" } }}>
            <Avatar
              src={data.photoDataUrl || undefined}
              variant="rounded"
              sx={{
                width: 130,
                height: 162,
                bgcolor: "rgba(231,199,124,0.08)",
                borderRadius: 1,
                border: "2px solid #E7C77C",
                fontSize: 13,
                color: "#D8B98A",
              }}
            >
              Photo
            </Avatar>
          </Box>

          <Box sx={{ flex: 1 }}>
            <SectionTitle>Personal Details</SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={6}><Field label="Date of Birth" value={data.personal.dob} /></Grid>
              <Grid item xs={6}><Field label="Time of Birth" value={data.personal.timeOfBirth} /></Grid>
              <Grid item xs={6}><Field label="Place of Birth" value={data.personal.placeOfBirth} /></Grid>
              <Grid item xs={6}><Field label="Height" value={data.personal.height} /></Grid>
              <Grid item xs={6}><Field label="Complexion" value={data.personal.complexion} /></Grid>
              <Grid item xs={6}><Field label="Marital Status" value={data.personal.maritalStatus} /></Grid>
              <Grid item xs={6}><Field label="Religion" value={data.personal.religion} /></Grid>
              <Grid item xs={6}><Field label="Caste / Gothra" value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")} /></Grid>
              <Grid item xs={6}><Field label="Rashi" value={data.personal.rashi} /></Grid>
              <Grid item xs={6}><Field label="Nakshatra" value={data.personal.nakshatra} /></Grid>
            </Grid>
          </Box>
        </Box>

        {/* Family */}
        <SectionTitle>Family Details</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}><Field label="Father's Name" value={data.family?.fatherName} /></Grid>
          <Grid item xs={6}><Field label="Father's Occupation" value={data.family?.fatherOccupation} /></Grid>
          <Grid item xs={6}><Field label="Mother's Name" value={data.family?.motherName} /></Grid>
          <Grid item xs={6}><Field label="Mother's Occupation" value={data.family?.motherOccupation} /></Grid>
          <Grid item xs={6}><Field label="Siblings" value={data.family?.siblings} /></Grid>
          <Grid item xs={6}><Field label="Family Type" value={data.family?.familyType} /></Grid>
          <Grid item xs={6}><Field label="Family Status" value={data.family?.familyStatus} /></Grid>
          <Grid item xs={6}><Field label="Native Place" value={data.family?.nativePlace} /></Grid>
        </Grid>

        {/* Education & Career */}
        <SectionTitle>Education & Career</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}><Field label="Qualification" value={data.education.qualification} /></Grid>
          <Grid item xs={6}><Field label="Occupation" value={data.education.occupation} /></Grid>
          <Grid item xs={6}><Field label="Company / Organization" value={data.education?.company} /></Grid>
          <Grid item xs={6}><Field label="Annual Income" value={data.education?.income} /></Grid>
        </Grid>

        {/* Contact */}
        <SectionTitle>Contact Details</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}><Field label="Mobile" value={data.contact.phone || data.contact.mobile} /></Grid>
          <Grid item xs={6}><Field label="Email" value={data.contact?.email} /></Grid>
          <Grid item xs={12}><Field label="Address" value={data.contact?.address} /></Grid>
          <Grid item xs={6}><Field label="City" value={data.contact?.city} /></Grid>
          <Grid item xs={6}><Field label="State" value={data.contact?.state} /></Grid>
        </Grid>

        {data.about && (
          <>
            <SectionTitle>About</SectionTitle>
            <Typography sx={{ fontSize: 13.25, color: "#FFF9F0", lineHeight: 1.7, opacity: 0.9 }}>
              {data.about}
            </Typography>
          </>
        )}
      </Box>

      {/* Footer rule */}
      <Box sx={{ borderTop: "1px solid rgba(231,199,124,0.3)", py: 1.5, textAlign: "center" }}>
        <Typography sx={{ fontSize: 9.5, letterSpacing: 2, color: "#B69B6B", textTransform: "uppercase" }}>
          ॐ शुभ विवाह
        </Typography>
      </Box>
    </Box>
  );
}