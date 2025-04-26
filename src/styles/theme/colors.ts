// src/styles/theme/colors.ts

// Define the PaletteRange interface with an index signature for numeric keys
export interface PaletteRange {
	[key: number]: string;  // This allows numeric keys (like 50, 100, etc.) to access the color values
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	950: string;
  }
  
  // Color ramp for Sky Blue
  export const skyBlue: PaletteRange = {
	50: "#f0f7ff",
	100: "#dceeff",
	200: "#bae0ff",
	300: "#8accff",
	400: "#66baff",
	500: "#3b9eff",
	600: "#227fff",
	700: "#1e68d0",
	800: "#1E3A8A",
	900: "#1a3c7d",
	950: "#0f2146",
  };
  
  // Color ramp for California
  export const california: PaletteRange = {
	50: "#fffaea",
	100: "#fff3c6",
	200: "#ffe587",
	300: "#ffd049",
	400: "#ffbb1f",
	500: "#fb9c0c",
	600: "#de7101",
	700: "#b84d05",
	800: "#953b0b",
	900: "#7b310c",
	950: "#471701",
  };
  
  // Color ramp for Chateau Green
  export const chateauGreen: PaletteRange = {
	50: "#edfcf2",
	100: "#d2f9de",
	200: "#aaf0c4",
	300: "#72e3a3",
	400: "#3acd7e",
	500: "#16b364",
	600: "#0a9150",
	700: "#087442",
	800: "#095c37",
	900: "#094b2f",
	950: "#032b1a",
  };
  
  // Color ramp for Kepple
  export const kepple: PaletteRange = {
	50: "#f0fdfa",
	100: "#ccfbef",
	200: "#9af5e1",
	300: "#5fe9ce",
	400: "#2ed3b8",
	500: "#15b79f",
	600: "#0e9382",
	700: "#107569",
	800: "#115e56",
	900: "#134e48",
	950: "#042f2c",
  };
  
  // Color ramp for Neon Blue
  export const neonBlue: PaletteRange = {
	50: "#ecf0ff",
	100: "#dde3ff",
	200: "#c2cbff",
	300: "#9ca7ff",
	400: "#7578ff",
	500: "#635bff",
	600: "#4e36f5",
	700: "#432ad8",
	800: "#3725ae",
	900: "#302689",
	950: "#1e1650",
  };
  
  // Color ramp for Nevada
  export const nevada: PaletteRange = {
	50: "#fbfcfe",
	100: "#f0f4f8",
	200: "#dde7ee",
	300: "#cdd7e1",
	400: "#9fa6ad",
	500: "#636b74",
	600: "#555e68",
	700: "#32383e",
	800: "#202427",
	900: "#121517",
	950: "#090a0b",
  };
  
  // Color ramp for Red Orange
  export const redOrange: PaletteRange = {
	50: "#fef3f2",
	100: "#fee4e2",
	200: "#ffcdc9",
	300: "#fdaaa4",
	400: "#f97970",
	500: "#f04438",
	600: "#de3024",
	700: "#bb241a",
	800: "#9a221a",
	900: "#80231c",
	950: "#460d09",
  };
  
  // Color ramp for Royal Blue
  export const royalBlue: PaletteRange = {
	50: "#ecf3ff",
	100: "#dce8ff",
	200: "#c0d4ff",
	300: "#9bb6ff",
	400: "#738dff",
	500: "#5265ff",
	600: "#3339f8",
	700: "#3739de",
	800: "#2225b1",
	900: "#24298b",
	950: "#151651",
  };
  
  // Color ramp for Shakespeare
  export const shakespeare: PaletteRange = {
	50: "#ecfdff",
	100: "#cff7fe",
	200: "#a4eefd",
	300: "#66e0fa",
	400: "#10bee8",
	500: "#04aad6",
	600: "#0787b3",
	700: "#0d6d91",
	800: "#145876",
	900: "#154964",
	950: "#082f44",
  };
  
  // Color ramp for Storm Grey
  export const stormGrey: PaletteRange = {
	50: "#f9fafb",
	100: "#f1f1f4",
	200: "#dcdfe4",
	300: "#b3b9c6",
	400: "#8a94a6",
	500: "#667085",
	600: "#565e73",
	700: "#434a60",
	800: "#313749",
	900: "#212636",
	950: "#121621",
  };
  
  // Color ramp for Tomato Orange
  export const tomatoOrange: PaletteRange = {
	50: "#fff3ed",
	100: "#ffe2d4",
	200: "#ffc1a8",
	300: "#ffa280",
	400: "#ff9771",
	500: "#ff6c47",
	600: "#fe4011",
	700: "#ed3507",
	800: "#9f2c0f",
	900: "#7e1110",
	950: "#440608",
  };
  
  // Now, your PaletteRange interface is fully compatible with TypeScript,
  // and your color definitions should work correctly in the theme.
  