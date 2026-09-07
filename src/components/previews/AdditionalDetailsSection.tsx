"use client";

import { Box, Typography } from "@mui/material";
import { BiodataFormData } from "@/lib/types";

type Props = {
  data: BiodataFormData;
  accent: string;
  text: string;
  muted: string;
  border: string;
  background?: string;
};

export default function AdditionalDetailsSection({ data, accent, text, muted, border, background = "transparent" }: Props) {
  const items = Object.values(data.extras || {}).flat();
  if (items.length === 0) return null;

  return (
    <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${border}`, breakInside: "avoid", bgcolor: background }}>
      <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: accent, mb: 1 }}>
        Additional Details
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: 2, rowGap: 0.8 }}>
        {items.map((item, index) => (
          <Box key={`${item.label}-${index}`} sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: muted }}>
              {item.label}
            </Typography>
            <Typography sx={{ fontSize: 11.5, lineHeight: 1.35, color: text, overflowWrap: "anywhere" }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
