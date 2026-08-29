"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { templates } from "@/lib/templates";

const picks = [templates[2], templates[0], templates[1]]; // modern, traditional, royal
const rotations = [-9, 0, 9];
const offsets = [-40, 0, 40];

export default function HeroFan() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 340, md: 420 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {picks.map((t, i) => (
        <Box
          key={t.id}
          sx={{
            position: "absolute",
            width: 200,
            height: 280,
            border: `6px solid ${t.swatch[0]}`,
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: "0 20px 45px rgba(43,29,34,0.22)",
            transform: `rotate(${rotations[i]}deg) translateX(${offsets[i]}px)`,
            transition: "transform 0.4s ease",
            "&:hover": { transform: `rotate(${rotations[i]}deg) translateX(${offsets[i]}px) translateY(-10px)` },
            zIndex: i === 1 ? 3 : 1,
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={t.previewImage}
              alt={t.name}
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
              priority={i === 1}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(2px)",
              py: 0.8,
            }}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#fff", textAlign: "center" }}>
              {t.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}