"use client";

import { Box, Typography, Avatar } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

// ---- Design tokens (shared with the editor shell) ------------------------
const INK = "#241A14";
const MAROON = "#8C2A38";
const GOLD = "#C6952F";
const GOLD_SOFT = "#E7D3A6";
const LINE = "#EFE7DA";
const MEHENDI = "#52684A";
const PAPER = "#FFFEFC";

// A single restrained corner motif — a paisley curl, echoing mehndi work —
// rather than decorating every section. Keep it quiet: low opacity, one spot.
function CornerMotif() {
  return (
    <Box
      component="svg"
      viewBox="0 0 120 120"
      sx={{ position: "absolute", top: 0, right: 0, width: 92, height: 92, opacity: 0.14, pointerEvents: "none" }}
    >
      <path
        d="M10 110 C 10 60, 60 60, 60 20 C 60 45, 85 55, 110 40 C 90 60, 95 90, 60 90 C 35 90, 30 110, 10 110 Z"
        fill={MEHENDI}
      />
    </Box>
  );
}

// Oversized initial behind the name — a letterhead monogram, not a
// watermark across the page. Sized and cropped to sit in one place only.
function Monogram({ letter }: { letter: string }) {
  if (!letter) return null;
  return (
    <Typography
      aria-hidden
      sx={{
        position: "absolute",
        top: -18,
        right: 0,
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: 108,
        lineHeight: 1,
        color: GOLD_SOFT,
        opacity: 0.45,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {letter}
    </Typography>
  );
}

// Fixed label column + flexible, left-aligned value column: values that wrap
// to two lines stay left-aligned and never overlap the row below them.
function Line({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        columnGap: 1.5,
        py: 0.5,
        borderBottom: `1px solid ${LINE}`,
        breakInside: "avoid",
      }}
    >
      <Typography sx={{ fontSize: 10.5, color: "#8A7C6B" }}>{label}</Typography>
      <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: INK, lineHeight: 1.4 }}>{value}</Typography>
    </Box>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 1.75, breakInside: "avoid" }}>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, mb: 0.6 }}>
        <Typography
          sx={{
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: GOLD,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1, height: "1px", bgcolor: LINE }} />
      </Box>
      {children}
    </Box>
  );
}

export default function MinimalTemplate({ data }: { data: BiodataFormData }) {
  const initial = (data.personal.fullName || "").trim().charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: PAPER,
        border: `1px solid ${LINE}`,
        boxShadow: "0 18px 44px rgba(36,26,20,0.10)",
        p: { xs: 3.5, sm: 5 },
        fontFamily: "var(--font-body)",
        overflow: "hidden",
        // --- Print: pinned to exactly one A4 page -----------------------
        // Fixed height (not minHeight) + overflow hidden is the hard
        // boundary; padding switches to mm so margins stay predictable
        // regardless of how the on-screen `sx` padding scales.
        "@media print": {
          bgcolor: `${PAPER} !important`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
          border: "none",
          boxShadow: "none",
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",
          p: "12mm 14mm",
        },
      }}
    >
      {/* Foil rule, matching the editor chrome */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${MAROON}, ${GOLD} 55%, ${MAROON})`,
        }}
      />
      <CornerMotif />

      {/* Header — letterhead block: photo, name, monogram, a tightened
          rule underneath so it reads as a masthead rather than a banner. */}
      <Box sx={{ position: "relative", pt: 0.5, mb: 2 }}>
        <Monogram letter={initial} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, position: "relative" }}>
          <Box sx={{ p: "3px", borderRadius: "10px", border: `1px solid ${GOLD_SOFT}`, flexShrink: 0 }}>
            <Avatar
              src={data.photoDataUrl || undefined}
              variant="rounded"
              sx={{ width: 68, height: 84, bgcolor: "#F7F1E8", borderRadius: "8px", fontSize: 11, color: "#B4A48C" }}
            >
              Photo
            </Avatar>
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: 23,
                color: INK,
                lineHeight: 1.15,
              }}
            >
              {data.personal.fullName || "Your Name Here"}
            </Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.05em", mt: 0.4 }}>
              {[data.education.occupation, data.contact.city].filter(Boolean).join("   ·   ")}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: "1px", bgcolor: LINE, mt: 1.75 }} />
      </Box>

      {/* Two-column body — keeps the whole thing on one printed page
          instead of a long single-column scroll. About spans both. */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          columnGap: 4,
        }}
      >
        <Box>
          <Block title="Personal">
            <Line label="Date of Birth" value={data.personal.dob} />
            <Line label="Place of Birth" value={data.personal.placeOfBirth} />
            <Line label="Height" value={data.personal.height} />
            <Line label="Religion" value={data.personal.religion} />
            <Line label="Caste / Gothra" value={[data.personal.caste, data.personal.gothra].filter(Boolean).join(" / ")} />
            <Line label="Manglik" value={data.personal.manglik} />
          </Block>

          <Block title="Family">
            <Line label="Father" value={data.family.fatherName} />
            <Line label="Mother" value={data.family.motherName} />
            <Line label="Siblings" value={data.family.siblings} />
            <Line label="Native Place" value={data.family.nativePlace} />
          </Block>
        </Box>

        <Box>
          <Block title="Education & Career">
            <Line label="Qualification" value={data.education.qualification} />
            <Line label="Occupation" value={data.education.occupation} />
            <Line label="Income" value={data.education.income} />
          </Block>

          <Block title="Contact">
            <Line label="Address" value={[data.contact.address, data.contact.city].filter(Boolean).join(", ")} />
            <Line label="Phone" value={data.contact.phone} />
            <Line label="Email" value={data.contact.email} />
          </Block>
        </Box>

        {data.about && (
          <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
            <Block title="About">
              <Typography sx={{ fontSize: 11.5, lineHeight: 1.55, color: INK, fontStyle: "italic" }}>
                &ldquo;{data.about}&rdquo;
              </Typography>
            </Block>
          </Box>
        )}
      </Box>

      {/* Mirrored foil rule closes the letterhead the way it opened. */}
      <Box
        sx={{
          height: 2,
          mt: 0.5,
          background: `linear-gradient(90deg, ${MAROON}, ${GOLD} 55%, ${MAROON})`,
          opacity: 0.55,
        }}
      />
    </Box>
  );
}