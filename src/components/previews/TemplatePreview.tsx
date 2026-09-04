"use client";

import { forwardRef } from "react";
import { Box } from "@mui/material";
import { BiodataFormData } from "@/lib/types";
import TraditionalTemplate from "./TraditionalTemplate";
import RoyalTemplate from "./RoyalTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ElegantTemplate from "./ElegantTemplate";
import MonogramTemplate from "./MonogramTemplate";
import ContemporaryTemplate from "./ContemporaryTemplate";

const TemplatePreview = forwardRef<HTMLDivElement, { templateId: string; data: BiodataFormData }>(
  function TemplatePreview({ templateId, data }, ref) {
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
      default:
        content = <TraditionalTemplate data={data} variant="wine" />;
    }

    return (
      <Box
        ref={ref}
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
      </Box>
    );
  }
);

export default TemplatePreview;
