import * as React from "react";
import { chipClasses } from "@mui/material/Chip";
import type { Components, Theme as MuiTheme } from "@mui/material/styles";
import { XCircle as XCircleIcon } from "@phosphor-icons/react/dist/ssr/XCircle";

import type { Theme } from "../types";
import { alpha } from "@mui/material/styles";

function getSoftVars(color: string, dark: boolean): Record<string, string> {
  if (dark) {
    return {
      "--Chip-softBg": `var(--mui-palette-${color}-800)`,
      "--Chip-softColor": `var(--mui-palette-${color}-200)`,
      "--Chip-softDisabledBg": `var(--mui-palette-${color}-800)`,
      "--Chip-softDisabledColor": `var(--mui-palette-${color}-500)`,
      "--Chip-softHoverBg": `var(--mui-palette-${color}-700)`,
      "--Chip-softDeleteIconColor": `var(--mui-palette-${color}-200)`,
      "--Chip-softDeleteIconHoverColor": `var(--mui-palette-${color}-50)`,
    };
  }

  return {
    "--Chip-softBg": `var(--mui-palette-${color}-100)`,
    "--Chip-softColor": `var(--mui-palette-${color}-700)`,
    "--Chip-softDisabledBg": `var(--mui-palette-${color}-50)`,
    "--Chip-softDisabledColor": `var(--mui-palette-${color}-400)`,
    "--Chip-softHoverBg": `var(--mui-palette-${color}-200)`,
    "--Chip-softDeleteIconColor": `var(--mui-palette-${color}-700)`,
    "--Chip-softDeleteIconHoverColor": `var(--mui-palette-${color}-800)`,
  };
}

export const MuiChip = {
  defaultProps: {
    color: "secondary",
    deleteIcon: <XCircleIcon />,
  },
  styleOverrides: {
    root: ({ theme }: { theme: MuiTheme }) => ({
      borderRadius: "12px",
      fontWeight: 500,
      ...(theme.palette.mode === "dark"
        ? { "--Chip-softBg": theme.palette.secondary.main && darken(theme.palette.secondary.main, 0.2) }
        : { "--Chip-softBg": theme.palette.secondary.light }),
    }),

    outlinedSecondary: ({ theme }: { theme: MuiTheme }) => ({
      borderColor: theme.palette.mode === "dark"
        ? "var(--mui-palette-secondary-700)"
        : "var(--mui-palette-secondary-200)",
      color: theme.palette.mode === "dark"
        ? "var(--mui-palette-secondary-50)"
        : "var(--mui-palette-secondary-900)",
    }),

    iconSmall: { fontSize: "var(--icon-fontSize-sm)" },
    iconMedium: { fontSize: "var(--icon-fontSize-md)" },
  },
} satisfies Components<Theme>["MuiChip"];
function darken(color: string, amount: number): string {
	const darkenFactor = Math.max(0, Math.min(1, amount));
	return alpha(color, 1 - darkenFactor);
}

