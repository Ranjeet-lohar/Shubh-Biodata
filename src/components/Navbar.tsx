"use client";

import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar, Container, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "rgba(251,246,239,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Link href="/" style={{ textDecoration: "none", flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
              <Box sx={{ position: "relative", width: 34, height: 34, flexShrink: 0, borderRadius: "50%", overflow: "hidden" }}>
                <Image
                  fill
                  src="/favicon.png"
                  alt="Shubh Biodata logo"
                  sizes="34px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.7 }}>
                <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "primary.main" }}>
                 Biodata 
                </Typography>
                {/* <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "text.primary" }}>
                  Biodata
                </Typography> */}
              </Box>
            </Box>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3, mr: 3 }}>
            <Link href="/templates" style={{ textDecoration: "none" }}>
              <Typography sx={{ fontSize: 14.5, color: "text.primary", fontWeight: 500 }}>Templates</Typography>
            </Link>
            <Link href="/#how-it-works" style={{ textDecoration: "none" }}>
              <Typography sx={{ fontSize: 14.5, color: "text.primary", fontWeight: 500 }}>How it works</Typography>
            </Link>
          </Box>
          <Link href="/templates" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="medium">
              Start Free
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
