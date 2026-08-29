"use client";

import { Box, Container, Typography, Grid, Link as MLink } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#2B1D22", color: "rgba(255,255,255,0.75)", pt: 6, pb: 4, mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Typography sx={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#fff", mb: 1 }}>
              शुभ Biodata
            </Typography>
            <Typography sx={{ fontSize: 13.5, maxWidth: 320 }}>
              A free online marriage biodata maker. Choose a template, fill your details once, and
              download a print-ready PDF or Word file — in English or Hindi.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3.5}>
            <Typography sx={{ fontSize: 12, letterSpacing: 1.5, color: "#C99A3E", fontWeight: 700, mb: 1.5 }}>
              EXPLORE
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MLink
                component={Link}
                href="/templates"
                underline="none"
                sx={{ color: "inherit", '&:hover': { color: '#C99A3E', textDecoration: 'none' } }}
              >
                <Typography sx={{ fontSize: 13.5 }}>All templates</Typography>
              </MLink>
              <MLink
                component={Link}
                href="/templates?category=Traditional"
                underline="none"
                sx={{ color: "inherit", '&:hover': { color: '#C99A3E', textDecoration: 'none' } }}
              >
                <Typography sx={{ fontSize: 13.5 }}>Traditional biodata</Typography>
              </MLink>
              <MLink
                component={Link}
                href="/templates?category=Modern"
                underline="none"
                sx={{ color: "inherit", '&:hover': { color: '#C99A3E', textDecoration: 'none' } }}
              >
                <Typography sx={{ fontSize: 13.5 }}>Modern biodata</Typography>
              </MLink>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3.5}>
            <Typography sx={{ fontSize: 12, letterSpacing: 1.5, color: "#C99A3E", fontWeight: 700, mb: 1.5 }}>
              FORMATS
            </Typography>
            <Typography sx={{ fontSize: 13.5 }}>PDF download</Typography>
            <Typography sx={{ fontSize: 13.5, mt: 1 }}>Word (.docx) download</Typography>
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: 12, mt: 5, opacity: 0.6 }}>
          © {new Date().getFullYear()} Shubh Biodata. Made for families finding the right match.
        </Typography>
      </Container>
    </Box>
  );
}
