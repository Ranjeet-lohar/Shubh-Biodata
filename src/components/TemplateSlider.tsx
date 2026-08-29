"use client";

import { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TemplateMeta } from "@/lib/types";
import TemplateCard from "./TemplateCard";

export default function TemplateSlider({ items }: { items: TemplateMeta[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => scroll(-1)}
        sx={{
          position: "absolute",
          left: -18,
          top: "40%",
          zIndex: 2,
          bgcolor: "background.paper",
          boxShadow: "0 4px 14px rgba(43,29,34,0.18)",
          display: { xs: "none", sm: "flex" },
          "&:hover": { bgcolor: "background.paper" },
        }}
        size="small"
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          gap: 2.5,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          pb: 1,
          px: 0.5,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {items.map((t) => (
          <Box key={t.id} sx={{ scrollSnapAlign: "start" }}>
            <TemplateCard template={t} compact />
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll(1)}
        sx={{
          position: "absolute",
          right: -18,
          top: "40%",
          zIndex: 2,
          bgcolor: "background.paper",
          boxShadow: "0 4px 14px rgba(43,29,34,0.18)",
          display: { xs: "none", sm: "flex" },
          "&:hover": { bgcolor: "background.paper" },
        }}
        size="small"
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
