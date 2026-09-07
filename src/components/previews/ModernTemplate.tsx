"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

// ---- Design tokens ---------------------------------------------------
const MODERN_VARIANTS = {
  slate: {
    ink: "#16302B",
    gold: "#B8923F",
    goldDeep: "#8C6B26",
    ivory: "#FBF6EC",
    line: "#E3D6B8",
  },
  teal: {
    ink: "#153F3C",
    gold: "#C79B4A",
    goldDeep: "#876326",
    ivory: "#F5F7F5",
    line: "#D7E2DB",
  },
} as const;

// Faint corner-only flourish instead of an all-over lattice — texture
// without competing with the copy. Data-URI so it survives print/PDF export.
function cornerMotif(gold: string) {
  const g = encodeURIComponent(gold);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>
    <g fill='none' stroke='${g}' stroke-width='1.1' opacity='0.55'>
      <path d='M2 24 Q2 2 24 2'/>
      <path d='M2 40 Q2 2 40 2'/>
      <circle cx='2' cy='2' r='3' fill='${g}' stroke='none' opacity='0.9'/>
    </g>
  </svg>`;
  return `url("data:image/svg+xml,${svg.replace(/\s+/g, " ")}")`;
}

function goldSoft(distanceFromCenter: number, gold: string) {
  return distanceFromCenter === 1 ? gold : "#D8C48F";
}

function DiamondRule({ gold, align = "center" }: { gold: string; align?: "center" | "left" }) {
  return (
    <Box sx={{ display: "flex", justifyContent: align === "left" ? "flex-start" : "center", gap: 1.1, my: 1.5 }}>
      {Array.from({ length: 7 }).map((_, i) => {
        const distance = Math.abs(i - 3);
        return (
          <Box
            key={i}
            sx={{
              width: i === 3 ? 8 : 5,
              height: i === 3 ? 8 : 5,
              bgcolor: i === 3 ? gold : goldSoft(distance, gold),
              transform: "rotate(45deg)",
            }}
          />
        );
      })}
    </Box>
  );
}

function SectionHeading({
  children,
  gold,
  goldDeep,
  line,
}: {
  children: React.ReactNode;
  gold: string;
  goldDeep: string;
  line: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <Box sx={{ width: 6, height: 6, bgcolor: gold, transform: "rotate(45deg)", flexShrink: 0 }} />
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: goldDeep,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: line }} />
    </Box>
  );
}

function Item({ label, value, ink, goldDeep }: { label: string; value: string; ink: string; goldDeep: string }) {
  if (!value) return null;
  return (
    <Box sx={{ py: 0.9, "@media print": { py: 0.55 } }}>
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: goldDeep,
          opacity: 0.85,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: ink, lineHeight: 1.45, mt: 0.25 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function ModernTemplate({
  data,
  variant = "slate",
}: {
  data: BiodataFormData;
  variant?: keyof typeof MODERN_VARIANTS;
}) {
  const palette = MODERN_VARIANTS[variant];
  const { ink: INK, gold: GOLD, goldDeep: GOLD_DEEP, ivory: IVORY, line: LINE } = palette;
  const isTeal = variant === "teal";

  const personalItems: [string, string][] = [
    ["Date of Birth", data.personal.dob],
    ["Place of Birth", data.personal.placeOfBirth],
    ["Height", data.personal.height],
    ["Religion / Caste", [data.personal.religion, data.personal.caste].filter(Boolean).join(" / ")],
    ["Manglik", data.personal.manglik],
    ["Diet", data.personal.diet],
    ["Mother Tongue", data.personal.motherTongue],
    ["Marital Status", data.personal.maritalStatus],
    ["Complexion", data.personal.complexion],
    ["Hobbies / Interests", data.personal.hobbies],
  ];

  const careerItems: [string, string][] = [
    ["Qualification", data.education.qualification],
    ["Occupation", data.education.occupation],
    ["Income", data.education.income],
    ["Father", data.family.fatherName],
    ["Mother", data.family.motherName],
    ["Siblings", data.family.siblings],
    ["Family Type", data.family.familyType],
    ["Native Place", data.family.nativePlace],
  ];

  const corner = cornerMotif(GOLD);

  return (
    <Box
      sx={{
        bgcolor: IVORY,
        fontFamily: "var(--font-body)",
        minHeight: 500,
        border: `1px solid ${LINE}`,
        borderRadius: 0,
        boxShadow: `0 18px 44px ${INK}1F`,
        overflow: "hidden",
        position: "relative",
        "@media print": {
          boxShadow: "none",
          border: "none",
          borderRadius: 0,
          width: "210mm",
          minHeight: "297mm",
          margin: "0 auto",
          pageBreakInside: "avoid",
          breakInside: "avoid",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
          colorAdjust: "exact",
        },
      }}
    >
      {/* Corner flourishes — four rotated copies of the same motif */}
      <Box sx={{ position: "absolute", top: 8, left: 8, width: 56, height: 56, backgroundImage: corner, backgroundRepeat: "no-repeat", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", top: 8, right: 8, width: 56, height: 56, backgroundImage: corner, backgroundRepeat: "no-repeat", transform: "scaleX(-1)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: 8, left: 8, width: 56, height: 56, backgroundImage: corner, backgroundRepeat: "no-repeat", transform: "scaleY(-1)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: 8, right: 8, width: 56, height: 56, backgroundImage: corner, backgroundRepeat: "no-repeat", transform: "scale(-1,-1)", pointerEvents: "none" }} />

      {/* Outer hairline frame */}
      <Box sx={{ position: "absolute", inset: 10, border: `1px solid ${LINE}`, pointerEvents: "none" }} />

      {/* Header */}
      <Box
        sx={{
          position: "relative",
          px: 4,
          pt: 4.5,
          pb: 3.5,
          display: "flex",
          alignItems: "center",
          gap: 3,
          textAlign: "left",
          background: isTeal ? `linear-gradient(135deg, ${INK} 0%, ${GOLD_DEEP} 100%)` : "transparent",
          borderBottom: isTeal ? `4px solid ${GOLD}` : `1px solid ${LINE}`,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: 108,
            height: 108,
            p: "5px",
            borderRadius: 0,
            border: `2px solid ${GOLD}`,
            outline: `1px solid ${isTeal ? "rgba(255,255,255,0.5)" : LINE}`,
            outlineOffset: "4px",
            bgcolor: isTeal ? "rgba(255,255,255,0.08)" : IVORY,
          }}
        >
          <Avatar
            src={data.photoDataUrl || undefined}
            variant="square"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 0,
              bgcolor: isTeal ? "rgba(255,255,255,0.12)" : `${INK}0D`,
              color: isTeal ? "#fff" : INK,
            }}
          >
            Photo
          </Avatar>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: isTeal ? "#fff" : INK,
              fontSize: 26,
              letterSpacing: "0.03em",
            }}
          >
            {data.personal.fullName || "Your Name Here"}
          </Typography>

          {/* <DiamondRule gold={GOLD} align="left" /> */}

          <Typography sx={{ fontSize: 12.5, color: isTeal ? "#F5E6B8" : GOLD_DEEP, letterSpacing: "0.06em" }}>
            {[data.education.occupation, data.contact.city].filter(Boolean).join("   •   ") ||
              "Occupation   •   City"}
          </Typography>

          {data.about && (
            <Typography
              sx={{
                fontSize: 13,
                fontStyle: "italic",
                textAlign: "left",
                color: isTeal ? "rgba(255,255,255,0.85)" : "#5B5142",
                mt: 1.5,
                lineHeight: 1.6,
                maxWidth: "100%",
                overflowWrap: "anywhere",
              }}
            >
              &ldquo;{data.about}&rdquo;
            </Typography>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ position: "relative", px: 4, py: 3.5 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1px 1fr" }, columnGap: 3 }}>
          <Box>
            <SectionHeading gold={GOLD} goldDeep={GOLD_DEEP} line={LINE}>Personal</SectionHeading>
            {personalItems.map(([label, value]) => (
              <Item key={label} label={label} value={value} ink={INK} goldDeep={GOLD_DEEP} />
            ))}
          </Box>

          <Box sx={{ bgcolor: LINE, display: { xs: "none", sm: "block" } }} />

          <Box>
            <SectionHeading gold={GOLD} goldDeep={GOLD_DEEP} line={LINE}>Career &amp; Family</SectionHeading>
            {careerItems.map(([label, value]) => (
              <Item key={label} label={label} value={value} ink={INK} goldDeep={GOLD_DEEP} />
            ))}
          </Box>
        </Box>

        {data.extras && Object.values(data.extras).some((items) => items.length > 0) && (
          <Box sx={{ mt: 2.5, pt: 2.5, borderTop: `1px solid ${LINE}` }}>
            <SectionHeading gold={GOLD} goldDeep={GOLD_DEEP} line={LINE}>Additional Details</SectionHeading>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, columnGap: 3 }}>
              {Object.values(data.extras).flat().map((item, index) => (
                <Item key={`${item.label}-${index}`} label={item.label} value={item.value} ink={INK} goldDeep={GOLD_DEEP} />
              ))}
            </Box>
          </Box>
        )}

        {/* Footer contact bar */}
        <Box
          sx={{
            mt: 3,
            pt: 2.5,
            borderTop: `1px solid ${LINE}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            {data.contact.phone && (
              <Typography sx={{ fontSize: 12, color: INK, fontWeight: 600 }}>{data.contact.phone}</Typography>
            )}
            {data.contact.phone && data.contact.email && (
              <Box sx={{ width: 4, height: 4, bgcolor: GOLD, transform: "rotate(45deg)" }} />
            )}
            {data.contact.email && (
              <Typography sx={{ fontSize: 12, color: INK, fontWeight: 600 }}>{data.contact.email}</Typography>
            )}
          </Box>
          {data.contact.address && (
            <Typography sx={{ fontSize: 11.5, color: "#5B5142", textAlign: "center" }}>
              {data.contact.address}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}