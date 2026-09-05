"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fraunces, Manrope } from "next/font/google";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  Drawer,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdfOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHorizOutlined";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/TuneOutlined";
import Navbar from "@/components/Navbar";
import BiodataForm from "@/components/BiodataForm";
import TemplatePreview from "@/components/previews/TemplatePreview";
import { emptyBiodata } from "@/lib/types";
import { getTemplate, templates } from "@/lib/templates";
import { exportNodeToPdf } from "@/lib/exportPdf";
import { exportBiodataToDocx } from "@/lib/exportDocx";
import { DocumentLanguage } from "@/lib/language";

// ---- Design tokens -------------------------------------------------------
// A wedding-card palette: ivory card stock, deep sindoor maroon, marigold
// gold foil, mehendi green as the "live" accent. No cream+terracotta default.
const INK = "#241A14";
const PAPER = "#FBF6EC";
const MAROON = "#8C2A38";
const MAROON_DARK = "#6E1F2B";
const GOLD = "#C6952F";
const GOLD_SOFT = "#E7D3A6";
const LINE = "#E4D6BE";
const MEHENDI = "#52684A";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-body",
});

// A vertical "kalava" thread — the tied thread used in Indian ceremonies —
// standing in for a plain divider between the form and the live preview.
function KalavaThread() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 640"
      preserveAspectRatio="none"
      sx={{ width: 24, height: "100%", maxHeight: 500, flexShrink: 0, display: { xs: "none", md: "block" } }}
    >
      <path
        d="M12 0 C 22 40, 2 80, 12 120 C 22 160, 2 200, 12 240 C 22 280, 2 320, 12 360 C 22 400, 2 440, 12 480 C 22 520, 2 560, 12 600 L 12 640"
        fill="none"
        stroke={GOLD}
        strokeWidth={2}
        opacity={0.55}
      />
      {Array.from({ length: 11 }).map((_, i) => (
        <circle key={i} cx={12} cy={30 + i * 58} r={i % 3 === 0 ? 4.5 : 3} fill={i % 3 === 0 ? MAROON : GOLD} opacity={0.85} />
      ))}
    </Box>
  );
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: "var(--font-body)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: GOLD,
      }}
    >
      {children}
    </Typography>
  );
}

export default function EditorPage() {
  const params = useParams<{ templateId: string }>();
  const router = useRouter();
  const template = getTemplate(params.templateId);

  // Initialize with server-safe empty data; hydrate draft from sessionStorage on mount
  const [data, setData] = useState(emptyBiodata);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("biodata-draft");
      if (raw) setData(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [language, setLanguage] = useState<DocumentLanguage>("en");
  const previewRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width:900px)");

  const fileBase = useMemo(
    () => (data.personal.fullName ? data.personal.fullName.replace(/\s+/g, "_") : "Marriage_Biodata"),
    [data.personal.fullName]
  );

  const handlePdf = async () => {
    if (!previewRef.current) return;
    setExporting("pdf");
    try {
      await exportNodeToPdf(previewRef.current, `${fileBase}_${language}.pdf`, language);
      setToast("Your PDF is ready.");
    } catch {
      setToast("Couldn't generate the PDF — please try again.");
    } finally {
      setExporting(null);
    }
  };

  const handleDocx = async () => {
    setExporting("docx");
    try {
      await exportBiodataToDocx(data, `${fileBase}_${language}.docx`, language);
      setToast("Your Word file is ready.");
    } catch {
      setToast("Couldn't generate the Word file — please try again.");
    } finally {
      setExporting(null);
    }
  };

  const outlinedBtnSx = {
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: 13,
    textTransform: "none" as const,
    color: INK,
    borderColor: LINE,
    borderRadius: "2px",
    px: 1.75,
    "&:hover": { borderColor: GOLD, bgcolor: "rgba(198,149,47,0.08)" },
  };

  return (
    <Box
      className={`${display.variable} ${body.variable}`}
      sx={{ fontFamily: "var(--font-body)" }}
    >
      <Navbar />

      <Box
        sx={{
          bgcolor: PAPER,
          minHeight: "100vh",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(140,42,56,0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Foil rule under the top bar */}
        <Box sx={{ height: 3, background: `linear-gradient(90deg, ${MAROON}, ${GOLD} 55%, ${MAROON})` }} />

        <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mb: 3.5,
              flexWrap: "wrap",
              gap: 1.5,
              pb: 2,
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <Box>
              <EyebrowLabel>Editing template</EyebrowLabel>
              <Typography
                sx={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: { xs: 26, md: 32 },
                  color: INK,
                  lineHeight: 1.15,
                  mt: 0.25,
                }}
              >
                {template.name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Select
                size="small"
                value={language}
                onChange={(event) => setLanguage(event.target.value as DocumentLanguage)}
                sx={{ minWidth: 118, ...outlinedBtnSx }}
                aria-label="Document language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hi">हिन्दी</MenuItem>
              </Select>
              <Button size="small" variant="outlined" startIcon={<SwapHorizIcon />} onClick={() => setSwitcherOpen(true)} sx={outlinedBtnSx}>
                Change template
              </Button>
              {isMobile && (
                <Button size="small" variant="outlined" startIcon={<TuneIcon />} onClick={() => setMobilePreviewOpen(true)} sx={outlinedBtnSx}>
                  Preview
                </Button>
              )}
              <Button
                size="small"
                variant="outlined"
                startIcon={<DescriptionIcon />}
                onClick={handleDocx}
                disabled={exporting !== null}
                sx={outlinedBtnSx}
              >
                {exporting === "docx" ? "Preparing…" : "Download Word"}
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={handlePdf}
                disabled={exporting !== null}
                sx={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "none",
                  borderRadius: "2px",
                  px: 2,
                  bgcolor: MAROON,
                  boxShadow: "none",
                  "&:hover": { bgcolor: MAROON_DARK, boxShadow: "none" },
                }}
              >
                {exporting === "pdf" ? "Preparing…" : "Download PDF"}
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: { md: 1.5, lg: 3 }, alignItems: "flex-start" }}>
            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                p: { xs: 2, md: 3.5 },
                minWidth: 0,
                borderRadius: "14px",
                borderColor: LINE,
                bgcolor: "#FFFFFF",
              }}
            >
              <BiodataForm
                data={data}
                onChange={(next) => {
                  setData(next);
                  try {
                    window.sessionStorage.setItem("biodata-draft", JSON.stringify(next));
                  } catch {}
                }}
              />
            </Paper>

            {!isMobile && <KalavaThread />}

            {!isMobile && (
              <Box sx={{ width: 460, flexShrink: 0, position: "sticky", top: 95 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, mb: 1.5 }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: MEHENDI }} />
                  <EyebrowLabel>Live preview</EyebrowLabel>
                  <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: MEHENDI }} />
                </Box>
               
                  <Box sx={{ transform: "scale(0.78)", transformOrigin: "top left", width: 554, maxWidth: "554px" }}>
                    <TemplatePreview key={`${template.id}-${language}`} ref={previewRef} templateId={template.id} data={data} language={language} />
                  </Box>
                
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Hidden full-scale node for accurate PDF capture on mobile scaled/hidden */}
      {isMobile && (
        <Box sx={{ position: "fixed", left: -9999, top: 0 }}>
            <TemplatePreview key={`${template.id}-${language}`} ref={previewRef} templateId={template.id} data={data} language={language} />
        </Box>
      )}

      <Drawer anchor="bottom" open={mobilePreviewOpen} onClose={() => setMobilePreviewOpen(false)}>
        <Box sx={{ p: 2, maxHeight: "85vh", overflowY: "auto", bgcolor: PAPER }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setMobilePreviewOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
            <TemplatePreview key={`${template.id}-${language}`} templateId={template.id} data={data} language={language} />
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={switcherOpen} onClose={() => setSwitcherOpen(false)}>
        <Box sx={{ width: 300, p: 2.5, bgcolor: PAPER, height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
            <Typography sx={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, fontSize: 20, color: INK }}>
              Switch template
            </Typography>
            <IconButton size="small" onClick={() => setSwitcherOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography sx={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "text.secondary", mb: 2.5 }}>
            Your details carry over automatically.
          </Typography>
          {templates.map((t) => {
            const active = t.id === template.id;
            return (
              <Box
                key={t.id}
                onClick={() => {
                  setSwitcherOpen(false);
                  router.push(`/editor/${t.id}`);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1,
                  mb: 1,
                  borderRadius: "2px",
                  cursor: "pointer",
                  bgcolor: active ? "rgba(198,149,47,0.10)" : "#FFFFFF",
                  border: "1px solid",
                  borderColor: active ? GOLD : LINE,
                  transition: "border-color 120ms ease",
                  "&:hover": { borderColor: GOLD },
                }}
              >
                <Box sx={{ width: 32, height: 40, bgcolor: t.swatch[2], border: `3px solid ${t.swatch[0]}`, flexShrink: 0, borderRadius: "3px" }} />
                <Box>
                  <Typography sx={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, color: INK }}>{t.name}</Typography>
                  <Typography sx={{ fontFamily: "var(--font-body)", fontSize: 11, color: "text.secondary" }}>{t.category}</Typography>
                </Box>
              </Box>
            );
          })}
          <Link href="/templates" style={{ textDecoration: "none" }}>
            <Button fullWidth size="small" sx={{ ...outlinedBtnSx, mt: 1 }} variant="outlined">
              Browse full gallery
            </Button>
          </Link>
        </Box>
      </Drawer>

      <Snackbar open={!!toast} autoHideDuration={3500} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          severity="success"
          onClose={() => setToast(null)}
          sx={{ width: "100%", bgcolor: MEHENDI, color: "#fff", "& .MuiAlert-icon": { color: "#fff" } }}
        >
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}