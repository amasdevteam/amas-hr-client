import { createTheme as createMuiTheme } from "@mui/material/styles";
import type { PaletteOptions } from "@mui/material/styles";

import { colorSchemes } from "./color-schemes";
import { components } from "./components/components";
import { shadows } from "./shadows";
import type { Direction, PrimaryColor, Theme } from "./types";
import { typography } from "./typography";

interface Config {
  primaryColor: PrimaryColor;
  direction?: Direction;
  useCustomColors?: boolean;
  useCustomTypography?: boolean;
}

function customCreateTheme(config: Config): Theme {
  // Create the base theme with existing structure
  const baseTheme = createMuiTheme({
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
    colorSchemes: colorSchemes({ primaryColor: config.primaryColor }),
    components,
    cssVariables: {
      colorSchemeSelector: "class",
    },
    direction: config.direction,
    shadows,
    shape: { borderRadius: 8 },
    typography,
  });

  // Apply custom overrides if requested
  if (config.useCustomColors || config.useCustomTypography) {
    // Define custom palette as PaletteOptions to match expected type
    const customPalette: PaletteOptions = config.useCustomColors 
      ? {
          primary: {
            main: '#66baff',
            dark: '#1E3A8A',
            contrastText: '#ffffff',
            // Add required properties for PaletteColor
            light: '#88ccff',
            // These properties match the structure in your color-schemes.ts
            activated: "rgba(102, 186, 255, 0.12)", // Using rgba for primary.main with opacity
            hovered: "rgba(102, 186, 255, 0.08)",
            selected: "rgba(102, 186, 255, 0.16)"
          },
          secondary: {
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#ffffff',
            light: '#ff79b0',
            activated: "rgba(255, 64, 129, 0.12)",
            hovered: "rgba(255, 64, 129, 0.08)",
            selected: "rgba(255, 64, 129, 0.16)"
          },
          success: {
            main: '#66baff',
            light: '#68d391',
            dark: '#2f855a',
            contrastText: '#ffffff',
            activated: "rgba(56, 161, 105, 0.12)",
            hovered: "rgba(56, 161, 105, 0.08)",
            selected: "rgba(56, 161, 105, 0.16)"
          },
          warning: {
            main: '#ED8936',
            light: '#fbd38d',
            dark: '#dd6b20',
            contrastText: '#ffffff',
            activated: "rgba(237, 137, 54, 0.12)",
            hovered: "rgba(237, 137, 54, 0.08)",
            selected: "rgba(237, 137, 54, 0.16)"
          },
          error: {
            main: '#E53E3E',
            light: '#fc8181',
            dark: '#c53030',
            contrastText: '#ffffff',
            activated: "rgba(229, 62, 62, 0.12)",
            hovered: "rgba(229, 62, 62, 0.08)",
            selected: "rgba(229, 62, 62, 0.16)"
          },
          info: {
            main: '#3182CE',
            light: '#63b3ed',
            dark: '#2c5282',
            contrastText: '#ffffff',
            activated: "rgba(49, 130, 206, 0.12)",
            hovered: "rgba(49, 130, 206, 0.08)",
            selected: "rgba(49, 130, 206, 0.16)"
          },
          text: {
            primary: '#2D3748',
            secondary: '#A0AEC0',
            disabled: '#CBD5E0'
          },
          background: {
            default: '#F5F7FA',
            paper: '#ffffff'
          },
          // Add these properties to match your extended palette structure
          divider: '#E2E8F0',
          mode: 'light'
        }
      : {};

    const customOverrides = {
      palette: customPalette,
      typography: config.useCustomTypography
        ? {
            fontFamily: 'Inter, Roboto, sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#1E3A8A'
            },
            h2: {
              fontSize: '2rem',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#2D3748'
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#2D3748'
            },
            h4: {
              fontSize: '1.25rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#2D3748'
            },
            h5: {
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#2D3748'
            },
            h6: {
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#2D3748'
            },
            subtitle1: {
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.57,
              color: '#718096'
            },
            subtitle2: {
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: 1.57,
              color: '#718096'
            },
            body1: {
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#2D3748'
            },
            body2: {
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: 1.57,
              color: '#2D3748'
            },
            caption: {
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: 1.66,
              color: '#A0AEC0'
            },
            button: {
              fontSize: '0.875rem',
              fontWeight: 600,
              lineHeight: 1.75,
              textTransform: 'uppercase',
              color: '#ffffff'
            },
            overline: {
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: 2.5,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: '#A0AEC0'
            }
          }
        : {}
    };

    // Merge the custom overrides with the base theme
    return createMuiTheme(baseTheme, customOverrides);
  }

  return baseTheme;
}

export { customCreateTheme as createTheme };