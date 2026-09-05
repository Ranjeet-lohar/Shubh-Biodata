"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { BiodataFormData } from "@/lib/types";
import TraditionalTemplate from "./TraditionalTemplate";
import RoyalTemplate from "./RoyalTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ElegantTemplate from "./ElegantTemplate";
import MonogramTemplate from "./MonogramTemplate";
import ContemporaryTemplate from "./ContemporaryTemplate";
import { DocumentLanguage, translate } from "@/lib/language";

function CustomDetailsPreview({ data, language }: { data: BiodataFormData; language: DocumentLanguage }) {
  const sections = [
    ...(data.extras?.personal || []),
    ...(data.extras?.education || []),
    ...(data.extras?.family || []),
    ...(data.extras?.contact || []),
  ];

  if (sections.length === 0) return null;

  return (
    <Box sx={{ mx: 3, mb: 3, p: 2.5, border: "1px solid #E4D6BE", bgcolor: "#FFFCF7", breakInside: "avoid" }}>
      <Box sx={{ mb: 1.5, pb: 0.8, borderBottom: "2px solid #C6952F" }}>
        <Typography sx={{ fontSize: 14, fontWeight: 800, color: "#7A2048", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {translate("Additional Details", language)}
        </Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1.5 }}>
        {sections.map((item, index) => (
          <Box key={`${item.label}-${index}`} sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 9, fontWeight: 800, color: "#8F6A3B", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {item.label}
            </Typography>
            <Typography sx={{ mt: 0.25, fontSize: 12, color: "#241A14", overflowWrap: "anywhere" }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const TemplatePreview = forwardRef<HTMLDivElement, { templateId: string; data: BiodataFormData; language?: DocumentLanguage }>(
  function TemplatePreview({ templateId, data, language = "en" }, ref) {
    const previewRootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (language !== "hi" || !previewRootRef.current) return;
      const walker = document.createTreeWalker(previewRootRef.current, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        const text = current.textContent?.trim() || "";
        if (text) current.textContent = current.textContent?.replace(text, translate(text, language)) || "";
        current = walker.nextNode();
      }
    }, [data, language, templateId]);

    const setPreviewRef = (node: HTMLDivElement | null) => {
      previewRootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    let content: React.ReactNode;

    switch (templateId) {
      case "traditional-wine":
        content = <TraditionalTemplate data={data} variant="wine" />;
        break;
      case "floral-pastel":
        content = <TraditionalTemplate data={data} variant="floral" />;
        break;
      case "elegant-serif":
        content = <ElegantTemplate data={data} />;
        break;
      case "monogram-crest":
        content = <MonogramTemplate data={data} />;
        break;
      case "royal-gold":
        content = <RoyalTemplate data={data} />;
        break;
      case "modern-minimal":
        content = <ModernTemplate data={data} variant="slate" />;
        break;
      case "modern-teal":
        content = <ModernTemplate data={data} variant="teal" />;
        break;
      case "minimal-ivory":
        content = <MinimalTemplate data={data} />;
        break;
      case "classic-contemporary":
        content = <ContemporaryTemplate data={data} variant="gold" />;
        break;
      case "sunset-atelier":
        content = <ContemporaryTemplate data={data} variant="rose" />;
        break;
      case "emerald-heritage":
        content = <ContemporaryTemplate data={data} variant="teal" />;
        break;
      case "pearl-luxe":
        content = <ContemporaryTemplate data={data} variant="navy" />;
        break;
      case "saffron-legacy":
        content = <ContemporaryTemplate data={data} variant="copper" />;
        break;
      case "indigo-pavilion":
        content = <ContemporaryTemplate data={data} variant="indigo" />;
        break;
      case "terracotta-jharokha":
        content = <ContemporaryTemplate data={data} variant="terracotta" />;
        break;
      default:
        content = <TraditionalTemplate data={data} variant="wine" />;
    }

    return (
      <Box
        ref={setPreviewRef}
        sx={{
          width: 554, // A4 @ 96dpi width for a larger, crisper live preview
          maxWidth: "554px",
          height: "100%",
          mx: "auto",
          boxShadow: "0 12px 40px rgba(43,29,34,0.14)",
          bgcolor: "transparent",
          // print-friendly tweaks: remove chrome in print/export
          "@media print": {
            boxShadow: "none",
            width: "100%",
          },
        }}
      >
        {content}
        <CustomDetailsPreview data={data} language={language} />
      </Box>
    );
  }
);

export default TemplatePreview;
