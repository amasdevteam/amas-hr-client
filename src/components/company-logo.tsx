// components/CompanyLogo.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";

interface CompanyLogoProps {
  companyName: string;
}

const companyLogos: Record<string, string> = {
  amasfreight: "/logos/amasfreight.png",
  bamboohr: "/logos/bamboohr.png",
  techco: "/logos/techco.svg",
  default: "/logos/default-logo.png",
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ companyName }) => {
  const logoSrc = companyLogos[companyName.toLowerCase()] || companyLogos["default"];

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box component="img" src={logoSrc} alt={`${companyName} logo`} sx={{ height: 40 }} />
    </Box>
  );
};
