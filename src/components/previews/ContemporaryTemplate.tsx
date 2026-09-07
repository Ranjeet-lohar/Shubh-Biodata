"use client";

import { useMemo } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";
import AdditionalDetailsSection from "./AdditionalDetailsSection";

function Chip({ label, value, accent, scale, radius = 1.5, border = "rgba(17,24,39,0.08)" }: { label: string; value: string; accent: string; scale: number; radius?: number | string; border?: string }) {
  if (!value) return null;
  return (
    <Box
      sx={{
        px: 1.3 * scale,
        py: 0.7 * scale,
        borderRadius: radius,
        bgcolor: "transparent",
        border: `transparent`,
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

function GroupLabel({ title, accent, scale, compact = false }: { title: string; accent: string; scale: number; compact?: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: compact ? 0.5 : 0.8, mb: 0.6 * scale, mt: compact ? 1 * scale : 1.6 * scale }}>
      <Box
        sx={{
          width: (compact ? 8 : 18) * scale,
          height: (compact ? 8 : 18) * scale,
          borderRadius: compact ? 0 : "50%",
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

export default function ContemporaryTemplate({
  data,
  variant = "gold",
  layout = "classic",
}: {
  data: BiodataFormData;
  variant?: "gold" | "rose" | "teal" | "navy" | "copper" | "indigo" | "terracotta";
  layout?: "classic" | "atelier" | "heritage" | "luxe" | "legacy" | "pavilion" | "jharokha";
}) {
  const paletteMap = {
    gold: { accent: "#8F6A3B", accent2: "#C7A96C", bg: "#FFFEFC", frame: "#D7C29B" },
    rose: { accent: "#A0526B", accent2: "#D993A9", bg: "#FFFCFD", frame: "#E9C4D0" },
    teal: { accent: "#1E5E52", accent2: "#4FA98C", bg: "#FBFFFD", frame: "#B9DDCF" },
    navy: { accent: "#28345A", accent2: "#5A6FB0", bg: "#FBFBFF", frame: "#C4CBE6" },
    copper: { accent: "#A76B1A", accent2: "#D89A3F", bg: "#FFFDF8", frame: "#EAD3A0" },
    indigo: { accent: "#202B57", accent2: "#7185C5", bg: "#F8F9FF", frame: "#C5CDEA" },
    terracotta: { accent: "#713B2D", accent2: "#C77B58", bg: "#FFF8F2", frame: "#E7B9A4" },
  } as const;

  const palette = paletteMap[variant] ?? paletteMap.gold;

 const layoutMap = {
  classic: {
    frameRadius: 3,
    bannerHeight: 112,
    bannerClip: "polygon(0 0, 100% 0, 100% 86%, 0 100%)",
    contentPadding: 5.2,
    photoRadius: "50%",
    photoTop: 28,
    photoRight: 42,
    chipRadius: 2,
    chipBorder: "rgba(17,24,39,0.08)",
    contentColumns: "repeat(3, 1fr)",
    sectionBg: "transparent",
    compactLabels: false,
    bannerBackground: `linear-gradient(135deg, ${palette.accent} 0%, ${palette.accent2} 100%)`,
    bannerPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='1.4' fill='white' fill-opacity='0.16'/%3E%3C/svg%3E")`,
  },
  atelier: {
    frameRadius: 2.5,
    bannerHeight: 128,
    bannerClip: "polygon(0 0, 100% 0, 100% 92%, 0 100%)",
    contentPadding: 4.8,
    photoRadius: "14px",
    photoTop: 34,
    photoRight: 36,
    chipRadius: 1.8,
    chipBorder: "rgba(17,24,39,0.07)",
    contentColumns: "repeat(2, 1fr)",
    sectionBg: `${palette.accent2}0C`,
    compactLabels: true,
    bannerBackground: `linear-gradient(160deg, ${palette.accent2} 0%, #ffffff 140%)`,
    bannerPattern: `repeating-linear-gradient(135deg, rgba(17,24,39,0.05) 0px, rgba(17,24,39,0.05) 1px, transparent 1px, transparent 14px)`,
  },
  heritage: {
    frameRadius: 2,
    bannerHeight: 132,
    bannerClip: "none",
    contentPadding: 4.5,
    photoRadius: "10px",
    photoTop: 20,
    photoRight: 32,
    chipRadius: 1.2,
    chipBorder: `${palette.accent}38`,
    contentColumns: "repeat(2, 1fr)",
    sectionBg: `${palette.accent}08`,
    compactLabels: true,
    bannerBackground: `radial-gradient(circle at 15% 20%, ${palette.accent2}33 0%, transparent 55%), linear-gradient(120deg, ${palette.accent} 0%, ${palette.accent2} 100%)`,
    bannerPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 6c6 6 6 14 0 20-6-6-6-14 0-20zM30 34c6 6 6 14 0 20-6-6-6-14 0-20z' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E")`,
  },
  luxe: {
    frameRadius: 3.5,
    bannerHeight: 146,
    bannerClip: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
    contentPadding: 5.8,
    photoRadius: "50%",
    photoTop: 38,
    photoRight: 40,
    chipRadius: 2.2,
    chipBorder: "rgba(17,24,39,0.06)",
    contentColumns: "repeat(2, 1fr)",
    sectionBg: "transparent",
    compactLabels: false,
    bannerBackground: `linear-gradient(100deg, #1a1a1a 0%, ${palette.accent} 45%, #d4af37 70%, ${palette.accent} 100%)`,
    bannerPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 40h80M40 0v80' stroke='white' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E")`,
  },
  legacy: {
    frameRadius: 2.5,
    bannerHeight: 108,
    bannerClip: "none",
    contentPadding: 4.6,
    photoRadius: "10px",
    photoTop: 20,
    photoRight: 34,
    chipRadius: 1.5,
    chipBorder: `${palette.accent}30`,
    contentColumns: "repeat(3, 1fr)",
    sectionBg: `${palette.accent2}0A`,
    compactLabels: true,
    bannerBackground: `linear-gradient(180deg, ${palette.accent} 0%, ${palette.accent}CC 100%)`,
    bannerPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Crect x='23' y='0' width='4' height='50' fill='white' fill-opacity='0.06'/%3E%3Crect x='0' y='23' width='50' height='4' fill='white' fill-opacity='0.06'/%3E%3C/svg%3E")`,
  },
  pavilion: {
    frameRadius: 2.5,
    bannerHeight: 130,
    bannerClip: "polygon(0 0, 90% 0, 100% 88%, 0 100%)",
    contentPadding: 5,
    photoRadius: "12px",
    photoTop: 30,
    photoRight: 32,
    chipRadius: 1.6,
    chipBorder: `${palette.accent}32`,
    contentColumns: "repeat(2, 1fr)",
    sectionBg: `${palette.accent}09`,
    compactLabels: false,
    bannerBackground: `linear-gradient(200deg, ${palette.accent2} 0%, ${palette.accent} 80%)`,
    bannerPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70'%3E%3Cpath d='M35 5 L60 35 L35 65 L10 35 Z' fill='none' stroke='white' stroke-opacity='0.09' stroke-width='1.5'/%3E%3C/svg%3E")`,
  },
  jharokha: {
    frameRadius: 2.5,
    bannerHeight: 124,
    bannerClip: "polygon(0 0, 100% 0, 100% 82%, 0 100%)",
    contentPadding: 4.8,
    photoRadius: "12px",
    photoTop: 24,
    photoRight: 38,
    chipRadius: 1.6,
    chipBorder: `${palette.accent}42`,
    contentColumns: "repeat(2, 1fr)",
    sectionBg: `${palette.accent2}0C`,
    compactLabels: true,
    bannerBackground: `linear-gradient(135deg, ${palette.accent} 0%, ${palette.accent2} 55%, ${palette.accent} 100%)`,
    // jaali / lattice motif — classic jharokha window screen
    bannerPattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='10' fill='none' stroke='white' stroke-opacity='0.12' stroke-width='1.5'/%3E%3Ccircle cx='0' cy='0' r='10' fill='none' stroke='white' stroke-opacity='0.12' stroke-width='1.5'/%3E%3Ccircle cx='48' cy='0' r='10' fill='none' stroke='white' stroke-opacity='0.12' stroke-width='1.5'/%3E%3Ccircle cx='0' cy='48' r='10' fill='none' stroke='white' stroke-opacity='0.12' stroke-width='1.5'/%3E%3Ccircle cx='48' cy='48' r='10' fill='none' stroke='white' stroke-opacity='0.12' stroke-width='1.5'/%3E%3C/svg%3E")`,
  },
} as const;
  const design = layoutMap[layout] ?? layoutMap.classic;

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
        boxShadow: layout === "pavilion" ? `8px 0 0 ${palette.accent}, 0 18px 44px rgba(20,20,20,0.10)` : "0 18px 44px rgba(20,20,20,0.10)",
        width: "100%",
        maxWidth: "100%",
        minHeight: 560,
        aspectRatio: "210 / 297",
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
      <Box sx={{ position: "absolute", inset: layout === "heritage" ? 7 : 10, border: `1.5px solid ${palette.frame}`, borderRadius: design.frameRadius, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", inset: layout === "heritage" ? 12 : 14, border: `1px solid ${palette.frame}`, borderRadius: design.frameRadius, opacity: 0.6, pointerEvents: "none" }} />

      {/* Diagonal banner */}
      <Box
        className="biodata-banner"
        style={{
          height: `${design.bannerHeight * scale}px`,
          clipPath: design.bannerClip !== "none" ? design.bannerClip : undefined,
          backgroundImage: `${design.bannerPattern}, ${design.bannerBackground}`,
          backgroundBlendMode: "overlay",
          backgroundSize: "auto, cover",
        }}
        sx={{
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, px: design.contentPadding * scale, pt: 3.4 * scale }}>
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
          top: design.photoTop * scale,
          right: design.photoRight * scale,
          width: 104 * scale,
          height: 104 * scale,
          border: `4px solid ${palette.bg}`,
          borderRadius: design.photoRadius,
          boxShadow: `0 0 0 2px ${palette.accent2}`,
          fontSize: 11,
          zIndex: 3,
        }}
      >
        Photo
      </Avatar>

      {/* Content */}
      <Box sx={{ px: design.contentPadding * scale, pt: layout === "luxe" ? 4.8 * scale : 3.6 * scale, pb: 3 * scale, flexGrow: 1, display: "flex", flexDirection: "column", bgcolor: design.sectionBg, borderLeft: layout === "pavilion" ? `4px solid ${palette.accent}` : "none" }}>
        {data.about && (
          <Box sx={{ mb: 1.4 * scale, breakInside: "avoid" }}>
            <Typography sx={{ fontSize: 12.2 * scale, fontStyle: "italic", lineHeight: 1.55, color: "rgba(17,24,39,0.75)" }}>
              “{data.about}”
            </Typography>
          </Box>
        )}

        <GroupLabel title="Personal Details" accent={palette.accent} scale={scale} compact={design.compactLabels} />
        <Box sx={{ display: "grid", gridTemplateColumns: design.contentColumns, gap: 1 * scale }}>
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

        <GroupLabel title="Education & Career" accent={palette.accent} scale={scale} compact={design.compactLabels} />
        <Box sx={{ display: "grid", gridTemplateColumns: design.contentColumns, gap: 1 * scale }}>
          <Chip label="Qualification" value={data.education.qualification} accent={palette.accent} scale={scale} />
          <Chip label="Occupation" value={data.education.occupation} accent={palette.accent} scale={scale} />
          <Chip label="Annual Income" value={data.education.income} accent={palette.accent} scale={scale} />
        </Box>

        <GroupLabel title="Family Background" accent={palette.accent} scale={scale} compact={design.compactLabels} />
        <Box sx={{ display: "grid", gridTemplateColumns: design.contentColumns, gap: 1 * scale }}>
          <Chip label="Father" value={data.family.fatherName} accent={palette.accent} scale={scale} />
          <Chip label="Mother" value={data.family.motherName} accent={palette.accent} scale={scale} />
          <Chip label="Siblings" value={data.family.siblings} accent={palette.accent} scale={scale} />
          <Chip label="Native Place" value={data.family.nativePlace} accent={palette.accent} scale={scale} />
        </Box>

        <GroupLabel title="Contact" accent={palette.accent} scale={scale} compact={design.compactLabels} />
        <Box sx={{ display: "grid", gridTemplateColumns: design.contentColumns, gap: 1 * scale }}>
          <Chip
            label="Address"
            value={[data.contact.address, data.contact.city].filter(Boolean).join(", ")}
            accent={palette.accent}
            scale={scale}
          />
          <Chip label="Phone" value={data.contact.phone} accent={palette.accent} scale={scale} />
          <Chip label="Email" value={data.contact.email} accent={palette.accent} scale={scale} />
        </Box>

        <AdditionalDetailsSection data={data} accent={palette.accent} text="#111827" muted={palette.accent} border={palette.frame} background={`${palette.bg}CC`} />

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