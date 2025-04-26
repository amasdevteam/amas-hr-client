"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { usePathname } from "@/hooks/use-pathname";

import { dashboardConfig } from "@/config/dashboard";
import { useSettings } from "@/components/core/settings/settings-context";

import { MainNav } from "./main-nav";
import { SideNav } from "./side-nav";


export interface VerticalLayoutProps {
  children?: React.ReactNode;
}

export function VerticalLayout({ children }: VerticalLayoutProps): React.JSX.Element {
  const { settings } = useSettings();
  const navColor = settings.dashboardNavColor ?? dashboardConfig.navColor;
  const pathname = usePathname();

  // Determine if we should show the MainHeader based on the page
  const showMainHeader = pathname.startsWith('/dashboard/') && 
                        !pathname.includes('/dashboard/overview') &&
                        !pathname.includes('/dashboard/blank');

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "64px", // Increased height for BambooHR style
            "--MainNav-zIndex": 1000,
            "--SideNav-width": "80px", // Reduced width for the BambooHR narrow sidebar
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
            "--Content-maxWidth": "1440px", // BambooHR uses wider layouts
          },
        }}
      />
      <Box
        sx={{
          bgcolor: "var(--mui-palette-background-default)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100%",
        }}
      >
        <SideNav 
          color={navColor} 
          items={dashboardConfig.navItems} 
        />
        <Box sx={{ 
          display: "flex", 
          flex: "1 1 auto", 
          flexDirection: "column", 
          pl: { lg: "var(--SideNav-width)" } 
        }}>
          <MainNav 
            items={dashboardConfig.navItems} 
            userName="Emmanuel Muro"
            userTitle="Business Analyst"
            userAvatar="/assets/avatar.png"
          />
          
          <Box
            component="main"
            sx={{
              "--Content-margin": "0 auto",
              "--Content-maxWidth": "var(--maxWidth-xl)",
              "--Content-paddingX": { xs: "16px", md: "24px" },
              "--Content-paddingY": { xs: "16px", md: "24px" },
              "--Content-padding": "var(--Content-paddingY) var(--Content-paddingX)",
              "--Content-width": "100%",
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              px: { xs: 2, md: 3 },
            }}
          >            
            {/* Main content */}
            <Box sx={{ 
              pt: showMainHeader ? 0 : { xs: 2, md: 3 },
              pb: { xs: 2, md: 3 }
            }}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
