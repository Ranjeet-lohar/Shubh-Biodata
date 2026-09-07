"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";
import AdditionalDetailsSection from "./AdditionalDetailsSection";

// Side-by-side label/value row, deco-flavored: wide-tracked uppercase
// labels instead of the softer sentence-case used in the other templates.
function Row({ label, value, ink, muted }: { label: string; value: string; ink: string; muted: string }) {
  if (!value) return null;
  return (
    <Box sx={{ display: "flex", py: 0.35, gap: 1.5, breakInside: "avoid" }}>
      <Typography sx={{ width: "42%", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography sx={{ width: "58%", fontSize: 11.5, color: ink, fontWeight: 500 }}>{value}</Typography>
    </Box>
  );
}

// Chevron + spaced caps — the recurring section marker, standing in for
// the "V" step motif deco borders are built from.
function Heading({ children, gold }: { children: React.ReactNode; gold: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, mb: 0.6, breakAfter: "avoid" }}>
      <Box component="svg" viewBox="0 0 10 10" sx={{ width: 9, height: 9, flexShrink: 0 }}>
        <path d="M0 0 L5 5 L0 10" fill="none" stroke={gold} strokeWidth="1.4" />
      </Box>
      <Typography sx={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, whiteSpace: "nowrap" }}>
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: gold, opacity: 0.4 }} />
    </Box>
  );
}

// Stair-step silhouette in each corner — the single most recognizable
// deco device (skyscraper setbacks), sized small and kept to the corners
// only so it reads as structure, not decoration.
function StepCorner({ gold, style }: { gold: string; style: React.CSSProperties }) {
  return (
    <Box component="svg" viewBox="0 0 40 40" sx={{ position: "absolute", width: 28, height: 28, ...style }}>
      <path d="M0 40 L0 26 L8 26 L8 18 L16 18 L16 10 L26 10 L26 0" fill="none" stroke={gold} strokeWidth="1.6" />
    </Box>
  );
}

// Radiating sunburst behind the name — a fan of unequal-length lines from
// a single point, the template's one bold gesture, everything else stays
// architectural and quiet.
function Sunburst({ gold }: { gold: string }) {
  const rays = 21;
  return (
    <Box component="svg" viewBox="0 0 300 90" sx={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 260, height: 78, opacity: 0.55, pointerEvents: "none" }}>
      {Array.from({ length: rays }).map((_, i) => {
        const t = i / (rays - 1);
        const angle = Math.PI * (0.12 + t * 0.76);
        const len = 34 + (i % 2 === 0 ? 20 : 8);
        const x2 = 150 + Math.cos(angle) * len;
        const y2 = 90 - Math.sin(angle) * len;
        return <line key={i} x1="150" y1="90" x2={x2} y2={y2} stroke={gold} strokeWidth="1" />;
      })}
    </Box>
  );
}

const CORNER_STYLES: React.CSSProperties[] = [
  { top: 8, left: 8 },
  { bottom: 8, left: 8, transform: "scaleY(-1)" },
  { top: 8, right: 8, transform: "scaleX(-1)" },
  { bottom: 8, right: 8, transform: "scale(-1,-1)" },
];

export default function MonogramTemplate({
  data,
  variant = "ivory",
}: {
  data: BiodataFormData;
  variant?: "ivory" | "noir";
}) {
  const isNoir = variant === "noir";
  const bg = isNoir ? "#14110F" : "#FBF7EF";
  const ink = isNoir ? "#F3E9D2" : "#211C14";
  const muted = isNoir ? "#B8A97C" : "#7A6A47";
  const gold = "#C9A24B";

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: bg,
        p: { xs: 3, sm: 3.5 },
        fontFamily: "var(--font-body)",
        boxShadow: `0 0 0 1px ${gold}, 0 0 0 6px ${bg}, 0 0 0 7px ${gold}`,
        overflow: "hidden",
        // --- Print: pinned to exactly one A4 page -----------------------
        // A fixed height + overflow hidden is what stops a stray extra
        // line of content from spilling a near-empty second page — the
        // ring "border" (box-shadow) is redrawn with mm-safe insets so it
        // doesn't get clipped by the page edge either.
        "@media print": {
          bgcolor: `${bg} !important`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",
          p: "10mm 12mm",
        },
      }}
    >
      {CORNER_STYLES.map((style, i) => (
        <StepCorner key={i} gold={gold} style={style} />
      ))}

      {/* Header */}
      <Box sx={{ position: "relative", textAlign: "center", pt: 3, mb: 0.5 }}>
        <Sunburst gold={gold} />
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: { xs: 21, sm: 25 },
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: ink,
              lineHeight: 1.2,
            }}
          >
            {data.personal.fullName || "Your Name Here"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, my: 0.85 }}>
            <Box sx={{ width: 44, height: "1px", bgcolor: gold }} />
            <Box sx={{ width: 5, height: 5, bgcolor: gold, transform: "rotate(45deg)" }} />
            <Box sx={{ width: 44, height: "1px", bgcolor: gold }} />
          </Box>
          <Typography sx={{ color: muted, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Biodata for Marriage
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Heading gold={gold}>Personal</Heading>
          <Row label="Date of Birth" value={data.personal.dob} ink={ink} muted={muted} />
          <Row label="Time of Birth" value={data.personal.timeOfBirth} ink={ink} muted={muted} />
          <Row label="Place of Birth" value={data.personal.placeOfBirth} ink={ink} muted={muted} />
          <Row label="Height" value={data.personal.height} ink={ink} muted={muted} />
          <Row label="Complexion" value={data.personal.complexion} ink={ink} muted={muted} />
          <Row label="Blood Group" value={data.personal.bloodGroup} ink={ink} muted={muted} />
          <Row label="Religion" value={data.personal.religion} ink={ink} muted={muted} />
          <Row label="Caste / Gothra" value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")} ink={ink} muted={muted} />
          <Row label="Manglik" value={data.personal.manglik} ink={ink} muted={muted} />
          <Row label="Diet" value={data.personal.diet} ink={ink} muted={muted} />

          <Heading gold={gold}>Education &amp; Career</Heading>
          <Row label="Qualification" value={data.education.qualification} ink={ink} muted={muted} />
          <Row label="Occupation" value={data.education.occupation} ink={ink} muted={muted} />
          <Row label="Company" value={data.education.company} ink={ink} muted={muted} />
          <Row label="Annual Income" value={data.education.income} ink={ink} muted={muted} />
        </Box>

        <Box sx={{ width: 130, flexShrink: 0, textAlign: "center" }}>
          <Box sx={{ p: "3px", border: `1px solid ${gold}`, display: "inline-block" }}>
            <Avatar
              src={data.photoDataUrl || undefined}
              variant="square"
              sx={{ width: 106, height: 132, bgcolor: isNoir ? "#241E17" : "#F1E7D3", fontSize: 11, color: muted }}
            >
              Photo
            </Avatar>
          </Box>

          <Heading gold={gold}>Family</Heading>
          <Box sx={{ textAlign: "left" }}>
            <Box sx={{ py: 0.3 }}>
              {[
                ["Father", data.family.fatherName],
                ["Mother", data.family.motherName],
                ["Siblings", data.family.siblings],
                ["Family Type", data.family.familyType],
                ["Native Place", data.family.nativePlace],
              ].map(([label, value]) =>
                value ? (
                  <Box key={label} sx={{ mb: 0.6, breakInside: "avoid" }}>
                    <Typography sx={{ fontSize: 9, letterSpacing: "0.07em", textTransform: "uppercase", color: muted, fontWeight: 700 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: ink, lineHeight: 1.3 }}>{value}</Typography>
                  </Box>
                ) : null
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Heading gold={gold}>Contact</Heading>
      <Row label="Address" value={[data.contact.address, data.contact.city].filter(Boolean).join(", ")} ink={ink} muted={muted} />
      <Row label="Phone" value={data.contact.phone} ink={ink} muted={muted} />
      <Row label="Email" value={data.contact.email} ink={ink} muted={muted} />
      <Row label="Contact Person" value={data.contact.contactPerson} ink={ink} muted={muted} />

      {data.about && (
        <>
          <Heading gold={gold}>About</Heading>
          <Typography sx={{ fontSize: 11.5, lineHeight: 1.5, color: ink, fontStyle: "italic" }}>{data.about}</Typography>
        </>
      )}

      <AdditionalDetailsSection data={data} accent={gold} text={ink} muted={muted} border={gold} />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1.5 }}>
        <Box sx={{ width: 36, height: "1px", bgcolor: gold, opacity: 0.5 }} />
        <Box sx={{ width: 5, height: 5, bgcolor: gold, transform: "rotate(45deg)" }} />
        <Box sx={{ width: 36, height: "1px", bgcolor: gold, opacity: 0.5 }} />
      </Box>
    </Box>
  );
}