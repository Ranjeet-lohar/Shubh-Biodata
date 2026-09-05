"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Typography, Chip, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateSlider from "@/components/TemplateSlider";
import TemplateCard from "@/components/TemplateCard";
import { templates, categories } from "@/lib/templates";
import { TemplateMeta } from "@/lib/types";

function TemplatesInner() {
  const params = useSearchParams();
  const initialCategory = (params.get("category") as TemplateMeta["category"] | "All") || "All";

  const [category, setCategory] = useState<TemplateMeta["category"] | "All">(initialCategory);
  const [query, setQuery] = useState("");

  const featured = useMemo(() => templates, []);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      const matchesQuery = query.trim() === "" || t.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <Navbar />
      <Box sx={{ py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ color: "secondary.dark" }}>
            TEMPLATE GALLERY
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 30, md: 40 }, mb: 1.5 }}>
            Choose your biodata template
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: 560, mb: 5 }}>
            Slide through our editor&apos;s picks, or filter the full gallery by style. Every
            template supports a photo, and exports cleanly to both PDF and Word.
          </Typography>

          <Box sx={{ mb: 6 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 2 }}>Editor&apos;s picks</Typography>
            <TemplateSlider items={featured} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
           >
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {categories.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  onClick={() => setCategory(c)}
                  color={category === c ? "primary" : undefined}
                  variant={category === c ? "filled" : "outlined"}
                  size="small"
                />
              ))}
            </Box>
            <TextField
              size="small"
              placeholder="Search templates"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ width: 220 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {filtered.map((t) => (
              <Grid item xs={12} sm={6} md={4} key={t.id}>
                <TemplateCard template={t} />
              </Grid>
            ))}
            {filtered.length === 0 && (
              <Grid item xs={12}>
                <Typography sx={{ color: "text.secondary", textAlign: "center", py: 6 }}>
                  No templates match that search — try another keyword or category.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={null}>
      <TemplatesInner />
    </Suspense>
  );
}
