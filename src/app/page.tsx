"use client";

import Link from "next/link";
import { Box, Container, Typography, Button, Grid, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroFan from "@/components/HeroFan";
import TemplateSlider from "@/components/TemplateSlider";
import { templates } from "@/lib/templates";

const steps = [
  {
    n: "01",
    title: "Choose a template",
    body: "Browse the slider or the full gallery and filter by style — traditional, modern, royal, minimal or floral.",
  },
  {
    n: "02",
    title: "Fill your details once",
    body: "Personal, education, family and contact details — organised into short tabs, with a live preview as you type.",
  },
  {
    n: "03",
    title: "Download & share",
    body: "Export a print-ready PDF or an editable Word file instantly. No sign-up, no watermark.",
  },
];

const features = [
  { title: "Truly free", body: "Every template, every download — no paywall, no watermark." },
  { title: "PDF & Word", body: "Get a print-ready PDF or an editable .docx you can tweak later." },
  { title: "Bilingual-ready", body: "Write your details in English or Hindi — the layout adapts either way." },
  { title: "Built for families", body: "Fields match what relatives and matchmakers actually ask for." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Box sx={{ bgcolor: "background.default", pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="100% free · no sign-up required"
                size="small"
                sx={{ bgcolor: "rgba(201,154,62,0.15)", color: "secondary.dark", fontWeight: 700, mb: 2 }}
              />
              <Typography variant="h1" sx={{ fontSize: { xs: 38, sm: 48, md: 54 }, lineHeight: 1.08, color: "text.primary" }}>
                Create your free marriage biodata online
              </Typography>
              <Typography sx={{ mt: 2.5, fontSize: 17, color: "text.secondary", maxWidth: 480 }}>
                Design a marriage biodata in minutes. Pick from elegant, print-ready templates,
                fill in your details, and download instantly as PDF or Word — the perfect first
                impression for your ideal match.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
                <Link href="/templates" style={{ textDecoration: "none" }}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                    Browse templates
                  </Button>
                </Link>
                <Link href="/editor/traditional-wine" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" size="large">
                    Start with a blank form
                  </Button>
                </Link>
              </Box>
              <Box sx={{ display: "flex", gap: 4, mt: 5 }}>
                {[["6+", "Templates"], ["2", "Export formats"], ["0₹", "Cost, always"]].map(([n, l]) => (
                  <Box key={l}>
                    <Typography sx={{ fontFamily: "var(--font-display)", fontSize: 28, color: "primary.main", fontWeight: 700 }}>
                      {n}
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>{l}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <HeroFan />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How it works */}
      <Box id="how-it-works" sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ color: "secondary.dark" }}>
            THE PROCESS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 34 }, mb: 5 }}>
            Three steps to a ready-to-send biodata
          </Typography>
          <Grid container spacing={4}>
            {steps.map((s) => (
              <Grid item xs={12} md={4} key={s.n}>
                <Typography sx={{ fontFamily: "var(--font-display)", fontSize: 42, color: "rgba(122,32,72,0.18)", fontWeight: 700 }}>
                  {s.n}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 20, mb: 1 }}>
                  {s.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{s.body}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Template slider teaser */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "#FFFDF9", borderTop: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="overline" sx={{ color: "secondary.dark" }}>
                PICK A STYLE
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: 26, md: 32 } }}>
                Slide through the templates
              </Typography>
            </Box>
            <Link href="/templates" style={{ textDecoration: "none" }}>
              <Button endIcon={<ArrowForwardIcon />}>See all templates</Button>
            </Link>
          </Box>
          <TemplateSlider items={templates} />
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((f) => (
              <Grid item xs={12} sm={6} md={3} key={f.title}>
                <Box sx={{ width: 34, height: 3, bgcolor: "secondary.main", mb: 1.5 }} />
                <Typography variant="h5" sx={{ fontSize: 17, mb: 0.5 }}>
                  {f.title}
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: "text.secondary" }}>{f.body}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: "primary.main",
              backgroundImage: "linear-gradient(135deg, #7A2048 0%, #4E1230 100%)",
              color: "#fff",
              borderRadius: 1,
              p: { xs: 4, md: 7 },
              textAlign: "center",
            }}
          >
            <Typography variant="h2" sx={{ fontSize: { xs: 26, md: 32 }, color: "#fff", mb: 1.5 }}>
              Your biodata, ready in under 10 minutes
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.85)", mb: 3.5, maxWidth: 480, mx: "auto" }}>
              Choose a template now and fill it in at your own pace — your progress stays right
              there in the editor.
            </Typography>
            <Link href="/templates" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large" sx={{ bgcolor: "secondary.main", color: "#2B1D22", "&:hover": { bgcolor: "#dbb567" } }}>
                Get started free
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
