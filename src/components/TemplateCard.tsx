"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button, Chip } from "@mui/material";
import { TemplateMeta } from "@/lib/types";

export default function TemplateCard({ template, compact = false }: { template: TemplateMeta; compact?: boolean }) {
  return (
    <Box
      sx={{
        width: compact ? 220 : "100%",
        flexShrink: 0,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 32px rgba(43,29,34,0.14)" },
      }}
    >
      <Box sx={{ height: compact ? 309 : 280, position: "relative", bgcolor: template.swatch[2], p: 2 }}>
        <Box sx={{ position: "absolute", inset: 0 }}>
          <Image src={template.previewImage} alt={template.name} fill style={{ objectFit: "contain" }} />
        </Box>
        
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{template.name}</Typography>
        {!compact && (
          <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.5, mb: 1.5, minHeight: 32 }}>
            {template.blurb}
          </Typography>
        )}
        <Link href={`/editor/${template.id}`} style={{ textDecoration: "none" }}>
          <Button fullWidth variant="outlined" size="small" sx={{ mt: compact ? 1.5 : 0 }}>
            Use this template
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
