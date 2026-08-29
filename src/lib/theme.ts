"use client";

import { createTheme } from "@mui/material/styles";

// Design tokens — "Shubh Biodata"
// Palette drawn from wedding-invitation materials, not generic SaaS defaults:
// wine card-stock, marigold foil, ivory paper, deep ink.
export const tokens = {
  wine: "#7A2048",
  wineDark: "#4E1230",
  gold: "#C99A3E",
  goldSoft: "#E7C77C",
  ivory: "#FBF6EF",
  paper: "#FFFFFF",
  sage: "#5C7A5C",
  ink: "#2B1D22",
  inkSoft: "#6E5A61",
  line: "#E7DCCB",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: tokens.wine, dark: tokens.wineDark, contrastText: "#fff" },
    secondary: { main: tokens.gold, contrastText: tokens.ink },
    background: { default: tokens.ivory, paper: tokens.paper },
    text: { primary: tokens.ink, secondary: tokens.inkSoft },
    divider: tokens.line,
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: "var(--font-body), 'Work Sans', sans-serif",
    h1: { fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontWeight: 600 },
    h2: { fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontWeight: 600 },
    h3: { fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontWeight: 600 },
    h4: { fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontWeight: 600 },
    h5: { fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.2 },
    overline: { letterSpacing: 2.5, fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 2, paddingTop: 10, paddingBottom: 10 },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none", backgroundColor: tokens.wineDark },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 2, fontWeight: 600 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
  },
});

export default theme;
