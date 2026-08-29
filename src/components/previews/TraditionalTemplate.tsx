"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

// Side-by-side label/value — safe for wide columns (Personal, Education,
// Contact) where 44%/56% leaves plenty of room for both.
function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Box sx={{ display: "flex", py: 0.55, gap: 1 }}>
      <Typography
        sx={{
          width: "44%",
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ width: "56%", fontSize: 13.5 }}>{value}</Typography>
    </Box>
  );
}

// Label above value — used in the narrow 130px photo/Family sidebar, where
// the old 44%/56% split left almost no room for the value and long entries
// (a full name, "Nuclear Family") wrapped into a mess. Stacking removes the
// width constraint entirely.
function StackedRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Box sx={{ py: 0.6 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 10.5,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12.5, lineHeight: 1.4 }}>{value}</Typography>
    </Box>
  );
}

// Small diamond glyph used to flank section headings and punctuate rules —
// a single recurring mark rather than a different ornament per spot, so it
// reads as a deliberate motif instead of clip-art.
function Diamond({ color, size = 5 }: { color: string; size?: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        bgcolor: color,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

function Heading({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2.75, mb: 1 }}>
      <Diamond color={color} />
      <Typography
        sx={{
          color,
          fontFamily: "var(--font-display)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: color, opacity: 0.35 }} />
    </Box>
  );
}

// Quarter-mandala corner flourish, built from concentric arcs and petal
// strokes rather than a plain ring, so the frame itself carries the
// template's identity instead of being a generic border.
function CornerMotif({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <Box component="svg" viewBox="0 0 60 60" sx={{ position: "absolute", width: 44, height: 44, opacity: 0.65, ...style }}>
      <path d="M2 22 Q2 2 22 2" fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M2 34 Q2 2 34 2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <circle cx="2" cy="2" r="3.2" fill="none" stroke={color} strokeWidth="1.2" />
      <path
        d="M14 2 Q18 8 14 14 Q8 18 2 14"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.8"
      />
      <circle cx="2" cy="2" r="9" fill="none" stroke={color} strokeWidth="0.6" opacity="0.35" />
    </Box>
  );
}

const CORNER_STYLES: React.CSSProperties[] = [
  { top: 10, left: 10 },
  { bottom: 10, left: 10, transform: "scaleY(-1)" },
  { top: 10, right: 10, transform: "scaleX(-1)" },
  { bottom: 10, right: 10, transform: "scale(-1,-1)" },
];

export default function TraditionalTemplate({
  data,
  variant = "wine",
}: {
  data: BiodataFormData;
  variant?: "wine" | "floral";
}) {
  const border = variant === "wine" ? "#6B1E3C" : "#B85C7D";
  const accent = variant === "wine" ? "#C9A227" : "#7A9B6E";
  const bg = variant === "wine" ? "#FFFCF6" : "#FFF9FA";
  const ink = variant === "wine" ? "#3A1224" : "#4A2E36";

  return (
    <Box
      sx={{
        bgcolor: bg,
        border: `1px solid ${accent}66`,
        outline: `8px solid ${bg}`,
        boxShadow: `0 0 0 1px ${border}, 0 0 0 11px ${bg}, 0 0 0 12px ${border}33`,
        p: { xs: 3, sm: 4.5 },
        pt: 3.5,
        fontFamily: "var(--font-body)",
        position: "relative",
        backgroundImage: `radial-gradient(${accent}22 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
      {CORNER_STYLES.map((style, i) => (
        <CornerMotif key={i} color={accent} style={style} />
      ))}

      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 1, position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.2, mb: 0.5 }}>
          <Box sx={{ width: 28, height: "1px", bgcolor: accent }} />
          <Typography
            sx={{
              color: accent,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              letterSpacing: "0.3em",
            }}
          >
            ॐ श्री गणेशाय नमः
          </Typography>
          <Box sx={{ width: 28, height: "1px", bgcolor: accent }} />
        </Box>

        <Typography
          sx={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            color: border,
            mt: 1.25,
            fontSize: { xs: 28, sm: 36 },
            lineHeight: 1.1,
          }}
        >
          {data.personal.fullName || "Your Name Here"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, my: 1.25 }}>
          <Box sx={{ width: 60, height: "1px", bgcolor: accent, opacity: 0.6 }} />
          <Diamond color={accent} size={6} />
          <Box sx={{ width: 60, height: "1px", bgcolor: accent, opacity: 0.6 }} />
        </Box>

        <Typography
          sx={{
            color: ink,
            opacity: 0.65,
            fontStyle: "italic",
            fontSize: 12.5,
            letterSpacing: "0.05em",
          }}
        >
          Biodata for Marriage
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3.5, mt: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Heading color={border}>Personal Details</Heading>
          <Row label="Date of Birth" value={data.personal.dob} />
          <Row label="Time of Birth" value={data.personal.timeOfBirth} />
          <Row label="Place of Birth" value={data.personal.placeOfBirth} />
          <Row label="Height" value={data.personal.height} />
          <Row label="Complexion" value={data.personal.complexion} />
          <Row label="Blood Group" value={data.personal.bloodGroup} />
          <Row label="Religion" value={data.personal.religion} />
          <Row label="Caste / Gothra" value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")} />
          <Row label="Manglik" value={data.personal.manglik} />
          <Row label="Diet" value={data.personal.diet} />

          <Heading color={border}>Education & Career</Heading>
          <Row label="Qualification" value={data.education.qualification} />
          <Row label="Occupation" value={data.education.occupation} />
          <Row label="Company" value={data.education.company} />
          <Row label="Annual Income" value={data.education.income} />
        </Box>

        <Box sx={{ width: 156, flexShrink: 0, textAlign: "center" }}>
          <Box
            sx={{
              p: "5px",
              border: `1px solid ${accent}`,
              display: "inline-block",
              bgcolor: bg,
            }}
          >
            <Avatar
              src={data.photoDataUrl || undefined}
              variant="rounded"
              sx={{
                width: 122,
                height: 152,
                border: `2px solid ${border}`,
                borderRadius: "2px",
                bgcolor: "#F1E7DC",
                fontSize: 12,
                color: border,
              }}
            >
              Photo
            </Avatar>
          </Box>

          <Heading color={border}>Family</Heading>
          <Box sx={{ textAlign: "left" }}>
            <StackedRow label="Father" value={data.family.fatherName} />
            <StackedRow label="Mother" value={data.family.motherName} />
            <StackedRow label="Siblings" value={data.family.siblings} />
            <StackedRow label="Family Type" value={data.family.familyType} />
            <StackedRow label="Native Place" value={data.family.nativePlace} />
          </Box>
        </Box>
      </Box>

      <Heading color={border}>Contact Details</Heading>
      <Row label="Address" value={[data.contact.address, data.contact.city].filter(Boolean).join(", ")} />
      <Row label="Phone" value={data.contact.phone} />
      <Row label="Email" value={data.contact.email} />
      <Row label="Contact Person" value={data.contact.contactPerson} />

      {data.about && (
        <>
          <Heading color={border}>About Me</Heading>
          <Typography sx={{ fontSize: 13, lineHeight: 1.7, fontStyle: "italic", color: ink }}>
            {data.about}
          </Typography>
        </>
      )}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 3 }}>
        <Box sx={{ width: 40, height: "1px", bgcolor: accent, opacity: 0.5 }} />
        <Diamond color={accent} size={4} />
        <Box sx={{ width: 40, height: "1px", bgcolor: accent, opacity: 0.5 }} />
      </Box>
    </Box>
  );
}