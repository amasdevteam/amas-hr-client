import * as React from "react";
import { 
  Box, 
  Stack
} from "@mui/material";
import type { IconWeight } from "@phosphor-icons/react";
import { useColorScheme } from "@mui/material/styles";
import { House as HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { FileText as FileTextIcon } from "@phosphor-icons/react/dist/ssr/FileText";
import { ChartBar as ChartBarIcon } from "@phosphor-icons/react/dist/ssr/ChartBar";

import type { NavItemConfig } from "@/types/nav";
import type { DashboardNavColor } from "@/types/settings";
import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";
import { usePathname } from "@/hooks/use-pathname";
import { RouterLink } from "@/components/core/link";
import { Logo } from "@/components/core/logo";
import type { ColorScheme } from "@/styles/theme/types";

import { navColorStyles } from "./styles";

const logoColors = {
  dark: { blend_in: "light", discrete: "light", evident: "light" },
  light: { blend_in: "dark", discrete: "dark", evident: "light" },
} as Record<ColorScheme, Record<DashboardNavColor, "dark" | "light">>;

export interface SideNavProps {
  color?: DashboardNavColor;
  items?: NavItemConfig[];
}

export function SideNav({ 
  color = "evident", 
  items = []
}: SideNavProps): React.JSX.Element {
  const pathname = usePathname();
  const { colorScheme = "light" } = useColorScheme();

  const styles = navColorStyles[colorScheme][color];
  const logoColor = logoColors[colorScheme][color];

  return (
    <Box
      sx={{
        ...styles,
        bgcolor: "var(--SideNav-background)",
        borderRight: "var(--SideNav-border)",
        color: "var(--SideNav-color)",
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        height: "100%",
        left: 0,
        position: "fixed",
        top: 0,
        width: "var(--SideNav-width)",
        zIndex: "var(--SideNav-zIndex)",
      }}
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: "inline-flex" }}>
          <Logo color={logoColor} height={32} width={122} />
        </Box>
      </Stack>
      <Box
        component="nav"
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
          p: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Stack component="ul" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.overview}
              sx={navItemStyles(paths.dashboard.overview, pathname)}
            >
              <HouseIcon {...iconProps(paths.dashboard.overview, pathname)} />
            </Box>
          </Box>
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.employees || '/employees'}
              sx={navItemStyles(paths.dashboard.employees || '/employees', pathname)}
            >
              <UserIcon {...iconProps(paths.dashboard.employees || '/employees', pathname)} />
            </Box>
          </Box>
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.documents || '/documents'}
              sx={navItemStyles(paths.dashboard.documents || '/documents', pathname)}
            >
              <FileTextIcon {...iconProps(paths.dashboard.documents || '/documents', pathname)} />
            </Box>
          </Box>
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.reports || '/reports'}
              sx={navItemStyles(paths.dashboard.reports || '/reports', pathname)}
            >
              <ChartBarIcon {...iconProps(paths.dashboard.reports || '/reports', pathname)} />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

function navItemStyles(href: string, pathname: string) {
  const active = isNavItemActive({ href, pathname });
  return {
    alignItems: "center",
    borderRadius: 1,
    color: "var(--NavItem-color)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 1,
    p: "10px 16px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...(active && {
      bgcolor: "var(--NavItem-active-background)",
      color: "var(--NavItem-active-color)",
    }),
    "&:hover": {
      bgcolor: "var(--NavItem-hover-background)",
      color: "var(--NavItem-hover-color)",
    },
  };
}

function iconProps(href: string, pathname: string) {
  const active = isNavItemActive({ href, pathname });
  return {
    fill: active ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)",
    fontSize: "var(--icon-fontSize-md)",
    weight: active ? "fill" as IconWeight : undefined,
  };
}
