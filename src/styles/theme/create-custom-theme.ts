import { createTheme as createBaseTheme } from "./create-theme";
import type { Direction, PrimaryColor, Theme } from "./types";

interface CustomThemeConfig {
  primaryColor: PrimaryColor;
  direction?: Direction;
  customTypography?: boolean;
}

export function createCustomTheme(config: CustomThemeConfig): Theme {
  // Create base theme using your existing setup
  const baseTheme = createBaseTheme({
    primaryColor: config.primaryColor,
    direction: config.direction,
  });

  // Apply custom typography if requested
  if (config.customTypography) {
    // Override specific typography settings while keeping the rest
    baseTheme.typography = {
      ...baseTheme.typography,
      h1: {
        ...baseTheme.typography.h1,
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "#1E3A8A",
      },
      h2: {
        ...baseTheme.typography.h2,
        fontSize: "2rem",
        fontWeight: 600,
        color: "#2D3748",
      },
      h3: {
        ...baseTheme.typography.h3,
        fontSize: "1.5rem",
        fontWeight: 500,
        color: "#2D3748",
      },
      body1: {
        ...baseTheme.typography.body1,
        color: "#2D3748",
      },
      body2: {
        ...baseTheme.typography.body2,
        color: "#2D3748",
      },
      caption: {
        ...baseTheme.typography.caption,
        color: "#A0AEC0",
      },
      button: {
        ...baseTheme.typography.button,
        fontSize: "0.875rem",
        fontWeight: 600,
        textTransform: "uppercase",
        color: "#ffffff",
      },
    };
  }

  return baseTheme;
}
