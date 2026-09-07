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
        content = <ContemporaryTemplate data={data} variant="gold" layout="classic" />;
        break;
      case "sunset-atelier":
        content = <ContemporaryTemplate data={data} variant="rose" layout="atelier" />;
        break;
      case "emerald-heritage":
        content = <ContemporaryTemplate data={data} variant="teal" layout="heritage" />;
        break;
      case "pearl-luxe":
        content = <ContemporaryTemplate data={data} variant="navy" layout="luxe" />;
        break;
      case "saffron-legacy":
        content = <ContemporaryTemplate data={data} variant="copper" layout="legacy" />;
        break;
      case "indigo-pavilion":
        content = <ContemporaryTemplate data={data} variant="indigo" layout="pavilion" />;
        break;
      case "terracotta-jharokha":
        content = <ContemporaryTemplate data={data} variant="terracotta" layout="jharokha" />;
        break;
      default:
        content = <TraditionalTemplate data={data} variant="wine" />;
    }

    return (
      <Box
        ref={setPreviewRef}
        sx={{
          width: "min(100%, 554px)",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          height: "100%",
          mx: "auto",
          overflow: "hidden",
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
      </Box>
    );
  }
);
export default TemplatePreview;
