"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

// ---- Design tokens ---------------------------------------------------
// A different palette/mood from ModernTemplate on purpose: deep emerald +
// antique gold on warm ivory, Art-Deco symmetry instead of a sidebar split.
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

function Item({ label, value, ink, goldDeep }: { label: string; value: string; ink: string; goldDeep: string }) {
  if (!value) return null;
  return (
    <Box sx={{ py: 0.85 }}>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: goldDeep,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: ink, lineHeight: 1.45, mt: 0.2 }}>
        {value}
      </Typography>
    </Box>
  );
}

function SectionHeading({ children, gold, goldDeep, line }: { children: React.ReactNode; gold: string; goldDeep: string; line: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Box sx={{ width: 5, height: 5, bgcolor: gold, transform: "rotate(45deg)" }} />
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: goldDeep,
        }}
      >
        {children}
      </Typography>
      <Box sx={{ flex: 1, height: "1px", bgcolor: line }} />
    </Box>
  );
}

// A row of small diamonds, used above/below the header as the recurring
// Art-Deco motif instead of a single ornament in one corner.
function DiamondRule({ gold }: { gold: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1.1, my: 1.5 }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: i === 3 ? 8 : 5,
            height: i === 3 ? 8 : 5,
            bgcolor: i === 3 ? gold : GOLD_SOFT_COLOR(i, gold),
            transform: "rotate(45deg)",
          }}
        />
      ))}
    </Box>
  );
}

function GOLD_SOFT_COLOR(i: number, gold: string) {
  // fades outward from the centre diamond
  const distance = Math.abs(i - 3);
  return distance === 1 ? gold : "#D8C48F";
}

export default function DecoTemplate({
  data,
  variant = "slate",
}: {
  data: BiodataFormData;
  variant?: keyof typeof MODERN_VARIANTS;
}) {
  const palette = MODERN_VARIANTS[variant];
  const INK = palette.ink;
  const GOLD = palette.gold;
  const GOLD_DEEP = palette.goldDeep;
  const IVORY = palette.ivory;
  const LINE = palette.line;

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
        bgcolor: IVORY,
        fontFamily: "var(--font-body)",
        minHeight: 500,
        border: `1px solid ${LINE}`,
        borderRadius: "4px",
        boxShadow: `0 18px 44px ${INK}1A`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Outer deco frame — a second inset border is the signature device */}
      <Box
        sx={{
          position: "absolute",
          inset: 10,
          border: `1px solid ${LINE}`,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", px: 4, pt: 4, pb: 3.5, textAlign: "center" }}>
        <Box
          sx={{
            width: 108,
            height: 108,
            mx: "auto",
            p: "5px",
            borderRadius: "50%",
            border: `2px solid ${GOLD}`,
            outline: `1px solid ${LINE}`,
            outlineOffset: "4px",
          }}
        >
          <Avatar
            src={data.photoDataUrl || undefined}
            sx={{ width: "100%", height: "100%", bgcolor: `${INK}0D`, color: INK }}
          >
            Photo
          </Avatar>
        </Box>

        <Typography
          sx={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: INK,
            fontSize: 26,
            letterSpacing: "0.03em",
            mt: 2,
          }}
        >
          {data.personal.fullName || "Your Name Here"}
        </Typography>

        <DiamondRule gold={GOLD} />

        <Typography sx={{ fontSize: 12.5, color: GOLD_DEEP, letterSpacing: "0.06em" }}>
          {[data.education.occupation, data.contact.city].filter(Boolean).join("   •   ") ||
            "Occupation   •   City"}
        </Typography>

        {data.about && (
          <Typography
            sx={{
              fontSize: 13,
              fontStyle: "italic",
              color: "#5B5142",
              mt: 2,
              lineHeight: 1.6,
              maxWidth: 440,
              mx: "auto",
            }}
          >
            &ldquo;{data.about}&rdquo;
          </Typography>
        )}
      </Box>

      <Box sx={{ position: "relative", px: 4, pb: 4 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 4, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 4,
              bottom: 4,
              width: "1px",
              bgcolor: LINE,
              display: { xs: "none", sm: "block" },
            }}
          />
          <Box>
            <SectionHeading gold={GOLD} goldDeep={GOLD_DEEP} line={LINE}>Personal</SectionHeading>
            {personalItems.map(([label, value]) => (
              <Item key={label} label={label} value={value} ink={INK} goldDeep={GOLD_DEEP} />
            ))}
          </Box>
          <Box sx={{ pl: { sm: 2 } }}>
            <SectionHeading gold={GOLD} goldDeep={GOLD_DEEP} line={LINE}>Career &amp; Family</SectionHeading>
            {careerItems.map(([label, value]) => (
              <Item key={label} label={label} value={value} ink={INK} goldDeep={GOLD_DEEP} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${LINE}`,
            display: "flex",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Typography sx={{ fontSize: 12, color: INK }}>{data.contact.phone}</Typography>
          {data.contact.phone && data.contact.email && (
            <Box sx={{ width: 4, height: 4, bgcolor: GOLD, transform: "rotate(45deg)", alignSelf: "center" }} />
          )}
          <Typography sx={{ fontSize: 12, color: INK }}>{data.contact.email}</Typography>
        </Box>
      </Box>
    </Box>
  );
}