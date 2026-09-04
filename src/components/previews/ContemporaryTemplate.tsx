"use client";

import { useMemo } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

function Chip({ label, value, accent, scale }: { label: string; value: string; accent: string; scale: number }) {
  if (!value) return null;
  return (
    <Box
      sx={{
        px: 1.3 * scale,
        py: 0.7 * scale,
        borderRadius: 1.5,
        bgcolor: "rgba(17,24,39,0.03)",
        border: "1px solid rgba(17,24,39,0.08)",
        breakInside: "avoid",
      }}
    >
      <Typography
        sx={{
          fontSize: 7.8 * scale,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 800,
          color: accent,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ mt: 0.15, fontSize: 11.5 * scale, fontWeight: 600, color: "rgba(17,24,39,0.88)", lineHeight: 1.3 }}>
        {value}
      </Typography>
    </Box>
  );
}

function GroupLabel({ title, accent, scale }: { title: string; accent: string; scale: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.6 * scale, mt: 1.6 * scale }}>
      <Box
        sx={{
          width: 18 * scale,
          height: 18 * scale,
          borderRadius: "50%",
          border: `2px solid ${accent}`,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: 9.8 * scale,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontWeight: 800,
          color: "rgba(17,24,39,0.75)",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default function BadgeCertificateTemplate({
  data,
  variant = "gold",
}: {
  data: BiodataFormData;
  variant?: "gold" | "rose" | "teal" | "navy" | "copper";
}) {
  const paletteMap = {
    gold: { accent: "#8F6A3B", accent2: "#C7A96C", bg: "#FFFEFC", frame: "#D7C29B" },
    rose: { accent: "#A0526B", accent2: "#D993A9", bg: "#FFFCFD", frame: "#E9C4D0" },
    teal: { accent: "#1E5E52", accent2: "#4FA98C", bg: "#FBFFFD", frame: "#B9DDCF" },
    navy: { accent: "#28345A", accent2: "#5A6FB0", bg: "#FBFBFF", frame: "#C4CBE6" },
    copper: { accent: "#A76B1A", accent2: "#D89A3F", bg: "#FFFDF8", frame: "#EAD3A0" },
  } as const;

  const palette = paletteMap[variant] ?? paletteMap.gold;

  const fullName = data.personal.fullName || "Your Name Here";
  const intro = [data.education.occupation, data.contact.city].filter(Boolean).join("  ·  ");

  const scale = useMemo(() => {
    const allText = [
      data.personal.dob, data.personal.placeOfBirth, data.personal.height, data.personal.complexion,
      data.personal.religion, data.personal.caste, data.personal.gothra, data.personal.manglik,
      data.education.qualification, data.education.occupation, data.education.income,
      data.family.fatherName, data.family.motherName, data.family.siblings, data.family.nativePlace,
      data.contact.address, data.contact.city, data.contact.phone, data.contact.email, data.about,
    ].filter(Boolean).join(" ");
    const len = allText.length;
    if (len > 950) return 0.8;
    if (len > 750) return 0.88;
    if (len > 550) return 0.94;
    return 1;
  }, [data]);

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: palette.bg,
        overflow: "hidden",
        boxShadow: "0 18px 44px rgba(20,20,20,0.10)",
        width: "210mm",
        height: "297mm",
        display: "flex",
        flexDirection: "column",
        "@media print": {
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",
          overflow: "hidden",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        },
      }}
    >
      {/* Outer certificate-style frame */}
      <Box sx={{ position: "absolute", inset: 10, border: `1.5px solid ${palette.frame}`, borderRadius: 2, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", inset: 14, border: `1px solid ${palette.frame}`, borderRadius: 1.5, opacity: 0.6, pointerEvents: "none" }} />

      {/* Diagonal banner */}
      <Box
        sx={{
          position: "relative",
          height: 118 * scale,
          background: `linear-gradient(120deg, ${palette.accent} 0%, ${palette.accent2} 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, px: 5 * scale, pt: 3.4 * scale }}>
          <Typography
            sx={{
              fontSize: 9 * scale,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Marriage Biodata
          </Typography>
          <Typography
            sx={{
              mt: 0.6 * scale,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: 30 * scale,
              lineHeight: 1.1,
              color: "#fff",
            }}
          >
            {fullName}
          </Typography>
          {intro && (
            <Typography sx={{ mt: 0.3 * scale, fontSize: 11.5 * scale, color: "rgba(255,255,255,0.85)" }}>
              {intro}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Circular badge photo overlapping banner */}
      <Avatar
        src={data.photoDataUrl || undefined}
        sx={{
          position: "absolute",
          top: 74 * scale,
          right: 46 * scale,
          width: 104 * scale,
          height: 104 * scale,
          border: `4px solid ${palette.bg}`,
          boxShadow: `0 0 0 2px ${palette.accent2}`,
          fontSize: 11,
          zIndex: 3,
        }}
      >
        Photo
      </Avatar>

      {/* Content */}
      <Box sx={{ px: 5 * scale, pt: 3.6 * scale, pb: 3 * scale, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {data.about && (
          <Box sx={{ mb: 1.4 * scale, breakInside: "avoid" }}>
            <Typography sx={{ fontSize: 12.2 * scale, fontStyle: "italic", lineHeight: 1.55, color: "rgba(17,24,39,0.75)" }}>
              “{data.about}”
            </Typography>
          </Box>
        )}

        <GroupLabel title="Personal Details" accent={palette.accent} scale={scale} />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 * scale }}>
          <Chip label="Date of Birth" value={data.personal.dob} accent={palette.accent} scale={scale} />
          <Chip label="Place of Birth" value={data.personal.placeOfBirth} accent={palette.accent} scale={scale} />
          <Chip label="Height" value={data.personal.height} accent={palette.accent} scale={scale} />
          <Chip label="Complexion" value={data.personal.complexion} accent={palette.accent} scale={scale} />
          <Chip label="Religion" value={data.personal.religion} accent={palette.accent} scale={scale} />
          <Chip
            label="Caste / Gothra"
            value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")}
            accent={palette.accent}
            scale={scale}
          />
          <Chip label="Manglik" value={data.personal.manglik} accent={palette.accent} scale={scale} />
        </Box>

        <GroupLabel title="Education & Career" accent={palette.accent} scale={scale} />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 * scale }}>
          <Chip label="Qualification" value={data.education.qualification} accent={palette.accent} scale={scale} />
          <Chip label="Occupation" value={data.education.occupation} accent={palette.accent} scale={scale} />
          <Chip label="Annual Income" value={data.education.income} accent={palette.accent} scale={scale} />
        </Box>

        <GroupLabel title="Family Background" accent={palette.accent} scale={scale} />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 * scale }}>
          <Chip label="Father" value={data.family.fatherName} accent={palette.accent} scale={scale} />
          <Chip label="Mother" value={data.family.motherName} accent={palette.accent} scale={scale} />
          <Chip label="Siblings" value={data.family.siblings} accent={palette.accent} scale={scale} />
          <Chip label="Native Place" value={data.family.nativePlace} accent={palette.accent} scale={scale} />
        </Box>

        <GroupLabel title="Contact" accent={palette.accent} scale={scale} />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 * scale }}>
          <Chip
            label="Address"
            value={[data.contact.address, data.contact.city].filter(Boolean).join(", ")}
            accent={palette.accent}
            scale={scale}
          />
          <Chip label="Phone" value={data.contact.phone} accent={palette.accent} scale={scale} />
          <Chip label="Email" value={data.contact.email} accent={palette.accent} scale={scale} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Footer seal */}
        <Box sx={{ mt: "auto", pt: 2 * scale, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 30, height: 1, background: palette.accent2 }} />
          <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: palette.accent }} />
          <Typography sx={{ fontSize: 8 * scale, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(17,24,39,0.4)" }}>
            {fullName}
          </Typography>
          <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: palette.accent }} />
          <Box sx={{ width: 30, height: 1, background: palette.accent2 }} />
        </Box>
      </Box>
    </Box>
  );
}