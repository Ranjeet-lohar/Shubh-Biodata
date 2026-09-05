"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  Chip,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { TemplateMeta } from "@/lib/types";

export default function TemplateCard({
  template,
  compact = false,
}: {
  template: TemplateMeta;
  compact?: boolean;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const openPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          width: compact ? 220 : "100%",
          flexShrink: 0,
          position: "relative",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
          transition: "transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease, border-color 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 20px 40px rgba(43,29,34,0.16)",
            borderColor: "transparent",
          },
          "&:hover .card-image": { transform: "scale(1.04)" },
          "&:hover .card-overlay": { opacity: 1 },
        }}
      >
        {/* Image area */}
        <Box
          sx={{
            height: compact ? 309 : 280,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(160deg, ${template.swatch[2]} 0%, ${template.swatch[1] ?? template.swatch[2]} 100%)`,
            p: 2,
          }}
        >
          <Box
            className="card-image"
            sx={{ position: "absolute", inset: 0, transition: "transform 0.4s ease" }}
          >
            <Image
              src={template.previewImage}
              alt={template.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>

          {template.badge && (
            <Chip
              label={template.badge}
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                fontWeight: 600,
                fontSize: 11,
                bgcolor: "background.paper",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
          )}

          {/* Hover overlay — pill is now clickable */}
          <Box
            className="card-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              pb: 2,
              opacity: 0,
              transition: "opacity 0.25s ease",
              background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)",
              pointerEvents: "none",
            }}
          >
            <Box
              component="button"
              onClick={openPreview}
              sx={{
                px: 1.5,
                py: 0.5,
                border: "none",
                borderRadius: 5,
                bgcolor: "rgba(255,255,255,0.92)",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: 12,
                fontWeight: 600,
                color: "text.primary",
                cursor: "pointer",
                pointerEvents: "auto",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              Quick preview <ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />
            </Box>
          </Box>
        </Box>

        {/* Content area */}
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>
            {template.name}
          </Typography>

          {!compact && (
            <Typography
              sx={{
                fontSize: 12.5,
                color: "text.secondary",
                mt: 0.5,
                mb: 1.5,
                minHeight: 32,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {template.blurb}
            </Typography>
          )}

          <Link href={`/editor/${template.id}`} style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                mt: compact ? 1.5 : 0,
                fontWeight: 600,
                borderRadius: 1.5,
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderColor: "primary.main",
                },
              }}
            >
              Use this template
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Preview modal */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              bgcolor: "rgba(255,255,255,0.85)",
              "&:hover": { bgcolor: "#fff" },
            }}
            size="small"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              position: "relative",
              height: 480,
              background: `linear-gradient(160deg, ${template.swatch[2]} 0%, ${template.swatch[1] ?? template.swatch[2]} 100%)`,
            }}
          >
            <Image
              src={template.previewImage}
              alt={template.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ p: 2.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 0.5 }}>
              {template.name}
            </Typography>
            {template.blurb && (
              <Typography sx={{ fontSize: 13.5, color: "text.secondary", mb: 2 }}>
                {template.blurb}
              </Typography>
            )}
            <Link href={`/editor/${template.id}`} style={{ textDecoration: "none" }}>
              <Button fullWidth variant="contained" sx={{ fontWeight: 600, borderRadius: 1.5 }}>
                Use this template
              </Button>
            </Link>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}