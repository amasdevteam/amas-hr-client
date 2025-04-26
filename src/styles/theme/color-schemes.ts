// src/styles/theme/color-schemes.ts

import { PaletteColorOptions, ColorSystemOptions } from "@mui/material";
import { logger } from "@/lib/default-logger"; // Optional for logging warnings

import {
  california,
  chateauGreen,
  kepple,
  neonBlue,
  nevada,
  redOrange,
  royalBlue,
  skyBlue,
  shakespeare,
  stormGrey,
  tomatoOrange,
} from "./colors";
import type { ColorScheme, PrimaryColor } from "./types";

// Custom function to build a palette with activated, hovered, and selected properties
function buildPaletteColor(
  ramp: Record<number, string>, // Color ramp for the color shades
  lightKey = 300,               // Default key for light color (300)
  mainKey = 400,                // Default key for main color (400)
  darkKey = 800,                // Default key for dark color (800)
  contrastText = "#ffffff"      // Default contrast text (usually white)
) {
  const baseColor = {
    light: ramp[lightKey],
    main: ramp[mainKey],
    dark: ramp[darkKey],
    contrastText,
  };

  const customColor = {
    activated: `rgba(${ramp[mainKey]}, 0.12)`, // Custom for activated
    hovered: `rgba(${ramp[mainKey]}, 0.08)`,   // Custom for hovered
    selected: `rgba(${ramp[mainKey]}, 0.16)`,  // Custom for selected
  };

  return { ...baseColor, ...customColor };
}

// Main color schemes object (includes dark and light versions for each primary color)
const primarySchemes: Record<PrimaryColor, Record<ColorScheme, any>> = {
  skyBlue: {
    dark: buildPaletteColor(skyBlue),
    light: buildPaletteColor(skyBlue),
  },
  chateauGreen: {
    dark: buildPaletteColor(chateauGreen),
    light: buildPaletteColor(chateauGreen),
  },
  neonBlue: {
    dark: buildPaletteColor(neonBlue),
    light: buildPaletteColor(neonBlue),
  },
  royalBlue: {
    dark: buildPaletteColor(royalBlue),
    light: buildPaletteColor(royalBlue),
  },
  tomatoOrange: {
    dark: buildPaletteColor(tomatoOrange),
    light: buildPaletteColor(tomatoOrange),
  },
};

// Config interface to define which primary color to use
interface Config {
  primaryColor: PrimaryColor;
}

// Main function that returns the custom color scheme
export function colorSchemes(config: Config): Partial<Record<ColorScheme, ColorSystemOptions>> {
  let primary = primarySchemes[config.primaryColor];

  // Log a warning if the primary color is not found and default to 'neonBlue'
  if (!primary) {
    logger?.warn?.(`No primary color found for ${config.primaryColor}. Falling back to 'neonBlue'.`);
    primary = primarySchemes.neonBlue;
  }

  return {
    dark: {
      palette: {
        mode: "dark",
        primary: primary.dark,
        secondary: buildPaletteColor(nevada, 100, 200, 300, '#000'),
        background: {
          default: "#090a0b",
          paper: "#121517",
        },
        text: {
          primary: "#F0F4F8",
          secondary: "#9FA6AD",
          disabled: "#636B74",
        },
        divider: "#636b74",
        error: buildPaletteColor(redOrange),
        info: buildPaletteColor(shakespeare),
        success: buildPaletteColor(kepple),
        warning: buildPaletteColor(california),
      },
    },
    light: {
      palette: {
        mode: "light",
        primary: primary.light,
        secondary: buildPaletteColor(nevada, 600, 700, 800, '#fff'),
        background: {
          default: "#F5F7FA",
          paper: "#ffffff",
        },
        text: {
          primary: "#212636",
          secondary: "#667085",
          disabled: "#8A94A6",
        },
        divider: "#E2E8F0",
        error: buildPaletteColor(redOrange),
        info: buildPaletteColor(shakespeare),
        success: buildPaletteColor(kepple),
        warning: buildPaletteColor(california),
      },
    },
  };
}
