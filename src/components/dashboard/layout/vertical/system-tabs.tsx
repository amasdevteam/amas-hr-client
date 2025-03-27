"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

import { TabItemConfig } from "./main-nav"; // Import the interface from main-nav

// Styled components (copied from main-nav.tsx)
const StyledTabs = styled(Tabs)({
  minHeight: '48px',
  backgroundColor: 'var(--mui-palette-primary-main)',
  borderRadius: '4px 4px 0 0',
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff',
    height: '3px',
  },
  '& .MuiTabs-flexContainer': {
    height: '48px',
  },
});

const StyledTab = styled(Tab)({
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 500,
  '&.Mui-selected': {
    color: '#fff',
    fontWeight: 600,
  },
  textTransform: 'none',
  minWidth: '100px',
  fontSize: '0.9rem',
  padding: '12px 16px',
  minHeight: '48px',
});

interface SystemTabsProps {
  selectedTabIndex: number;
  tabs: TabItemConfig[];
  onTabChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

export function SystemTabs({ selectedTabIndex, tabs, onTabChange }: SystemTabsProps): React.JSX.Element {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (onTabChange) {
      onTabChange(event, newValue);
    } else if (!tabs[newValue].disabled) {
      // Default navigation behavior
      window.location.href = tabs[newValue].href;
    }
  };

  return (
    <StyledTabs 
      value={selectedTabIndex}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="user profile tabs"
    >
      {tabs.map((tab) => (
        <StyledTab 
          key={tab.key}
          label={tab.label}
          disabled={tab.disabled}
        />
      ))}
    </StyledTabs>
  );
}