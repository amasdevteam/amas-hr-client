"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { usePathname } from "@/hooks/use-pathname";

import { dashboardConfig } from "@/config/dashboard";
import { useSettings } from "@/components/core/settings/settings-context";

import { MainNav } from "./main-nav";
import { SideNav } from "./side-nav";
import { MainHeader } from "../../header/main-header"; // Import the MainHeader component

// Mock data for demonstration - you'll want to replace this with actual data
const mockUser = {
  name: "Emmanuel Muro",
  title: "Business Analyst",
  department: "Finance",
  location: "Tanzania",
  avatar: "/assets/avatar.png"
};

// Mapping of paths to tab indices
// const pathToTabIndex = {
// 	'/dashboard': 0,
// 	'/dashboard/performance': 0,
// 	'/dashboard/training': 1,
// 	'/dashboard/personal': 2,
// 	'/dashboard/job': 3,
// 	'/dashboard/time-off': 4,
// 	'/dashboard/emergency': 5,
// 	'/dashboard/benefits': 6,
// 	'/dashboard/documents': 7,
//   } as const;



export interface VerticalLayoutProps {
  children?: React.ReactNode;
}

export function VerticalLayout({ children }: VerticalLayoutProps): React.JSX.Element {
  const { settings } = useSettings();
  const navColor = settings.dashboardNavColor ?? dashboardConfig.navColor;
  const pathname = usePathname();
  
  // Get the selected tab based on the current path
  // const selectedTabIndex = pathToTabIndex[pathname as keyof typeof pathToTabIndex] ?? 0;
  
  // Define tab configuration for MainHeader
//   const userTabs = [
//     { key: 'performance', label: 'Performance', href: '/dashboard/performance' },
//     { key: 'training', label: 'Training', href: '/dashboard/training' },
//     { key: 'personal', label: 'Personal', href: '/dashboard/personal' },
//     { key: 'job', label: 'Job', href: '/dashboard/job' },
//     { key: 'time-off', label: 'Time Off', href: '/dashboard/time-off' },
//     { key: 'emergency', label: 'Emergency', href: '/dashboard/emergency' },
//     { key: 'benefits', label: 'Benefits', href: '/dashboard/benefits' },
//     { key: 'documents', label: 'Documents', href: '/dashboard/documents' },
//   ];
  
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
          userName={mockUser.name}
          userAvatar={mockUser.avatar}
        />
        <Box sx={{ 
          display: "flex", 
          flex: "1 1 auto", 
          flexDirection: "column", 
          pl: { lg: "var(--SideNav-width)" } 
        }}>
          <MainNav 
            items={dashboardConfig.navItems} 
            userName={mockUser.name}
            userTitle={mockUser.title}
            userAvatar={mockUser.avatar}
            onRequestTimeOff={() => console.log('Request time off clicked')}
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
            {/* BambooHR-style header for user profile pages */}
            {/* {showMainHeader && (
              <MainHeader
                user={mockUser}
                // tabs={userTabs}
                // selectedTabIndex={selectedTabIndex}
              />
            )} */}
            
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