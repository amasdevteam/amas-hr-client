import * as React from "react";
import { 
  Box, 
  Stack,
  Avatar,
  Typography,
  Divider,
  Chip
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { ArrowSquareOut as ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
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

import { icons } from "../nav-icons";
// import { WorkspacesSwitch } from "../workspaces-switch";
import { navColorStyles } from "./styles";

// New styled components for BambooHR-inspired design
const ProfileAvatar = ({ src, name, onClick }: { src?: string; name?: string; onClick?: () => void }): React.JSX.Element => (
  <Avatar
    src={src}
    alt={name}
    onClick={onClick}
    sx={{
      width: 40,
      height: 40,
      margin: '16px 0',
      cursor: 'pointer',
      border: '2px solid var(--NavItem-active-color)',
    }}
  >
    {!src && name ? name.charAt(0) : null}
  </Avatar>
);

const logoColors = {
  dark: { blend_in: "light", discrete: "light", evident: "light" },
  light: { blend_in: "dark", discrete: "dark", evident: "light" },
} as Record<ColorScheme, Record<DashboardNavColor, "dark" | "light">>;

export interface SideNavProps {
  color?: DashboardNavColor;
  items?: NavItemConfig[];
  userName?: string;
  userAvatar?: string;
}

export function SideNav({ 
  color = "evident", 
  items = [],
  userName,
  userAvatar
}: SideNavProps): React.JSX.Element {
  const pathname = usePathname();
  const { colorScheme = "light" } = useColorScheme();

  const styles = navColorStyles[colorScheme][color];
  const logoColor = logoColors[colorScheme][color];

  // Function to navigate to profile
  const handleProfileClick = (): void => {
    // Use your navigation method here
    window.location.href = paths.dashboard.profile || '/profile';
  };

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
        <div>
          <Box component={RouterLink} href={paths.home} sx={{ display: "inline-flex" }}>
            <Logo color={logoColor} height={32} width={122} />
          </Box>
        </div>
        
        {/* Profile Avatar - BambooHR Style */}
        <ProfileAvatar 
          src={userAvatar} 
          name={userName}
          onClick={handleProfileClick}
        />
        
        <Divider sx={{ width: '80%', mx: 'auto' }} />
        
        {/* <WorkspacesSwitch /> */}
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
        {/* For BambooHR-style simple navigation, we can add shortcuts here */}
        <Stack component="ul" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.overview}
              sx={{
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
                ...(isNavItemActive({ href: paths.dashboard.overview, pathname }) && {
                  bgcolor: "var(--NavItem-active-background)",
                  color: "var(--NavItem-active-color)",
                }),
                "&:hover": {
                  bgcolor: "var(--NavItem-hover-background)",
                  color: "var(--NavItem-hover-color)",
                },
              }}
            >
              <HouseIcon
                fill={isNavItemActive({ href: paths.dashboard.overview, pathname }) ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
                fontSize="var(--icon-fontSize-md)"
                weight={isNavItemActive({ href: paths.dashboard.overview, pathname }) ? "fill" : undefined}
              />
              {/* <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                Home 2
              </Typography> */}
            </Box>
          </Box>
          
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.employees || '/employees'}
              sx={{
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
                ...(isNavItemActive({ href: paths.dashboard.employees || '/employees', pathname }) && {
                  bgcolor: "var(--NavItem-active-background)",
                  color: "var(--NavItem-active-color)",
                }),
                "&:hover": {
                  bgcolor: "var(--NavItem-hover-background)",
                  color: "var(--NavItem-hover-color)",
                },
              }}
            >
              <UserIcon
                fill={isNavItemActive({ href: paths.dashboard.employees || '/employees', pathname }) ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
                fontSize="var(--icon-fontSize-md)"
                weight={isNavItemActive({ href: paths.dashboard.employees || '/employees', pathname }) ? "fill" : undefined}
              />
              {/* <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                Employees
              </Typography> */}
            </Box>
          </Box>
          
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.documents || '/documents'}
              sx={{
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
                ...(isNavItemActive({ href: paths.dashboard.documents || '/documents', pathname }) && {
                  bgcolor: "var(--NavItem-active-background)",
                  color: "var(--NavItem-active-color)",
                }),
                "&:hover": {
                  bgcolor: "var(--NavItem-hover-background)",
                  color: "var(--NavItem-hover-color)",
                },
              }}
            >
              <FileTextIcon
                fill={isNavItemActive({ href: paths.dashboard.documents || '/documents', pathname }) ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
                fontSize="var(--icon-fontSize-md)"
                weight={isNavItemActive({ href: paths.dashboard.documents || '/documents', pathname }) ? "fill" : undefined}
              />
              {/* <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                Documents
              </Typography> */}
            </Box>
          </Box>
          
          <Box component="li" sx={{ userSelect: "none" }}>
            <Box
              component={RouterLink}
              href={paths.dashboard.reports || '/reports'}
              sx={{
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
                ...(isNavItemActive({ href: paths.dashboard.reports || '/reports', pathname }) && {
                  bgcolor: "var(--NavItem-active-background)",
                  color: "var(--NavItem-active-color)",
                }),
                "&:hover": {
                  bgcolor: "var(--NavItem-hover-background)",
                  color: "var(--NavItem-hover-color)",
                },
              }}
            >
              <ChartBarIcon
                fill={isNavItemActive({ href: paths.dashboard.reports || '/reports', pathname }) ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
                fontSize="var(--icon-fontSize-md)"
                weight={isNavItemActive({ href: paths.dashboard.reports || '/reports', pathname }) ? "fill" : undefined}
              />
              {/* <Typography variant="caption" sx={{ fontSize: "0.75rem", fontWeight: 500 }}>
                Reports
              </Typography> */}
            </Box>
          </Box>
        </Stack>
        
        {/* Original Nav Items */}
        {/* {renderNavGroups({ items, pathname })} */}
      </Box>
    </Box>
  );
}



function renderNavItems({
  depth = 0,
  items = [],
  pathname,
}: {
  depth: number;
  items?: NavItemConfig[];
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? childItems.some((childItem) => childItem.href && pathname.startsWith(childItem.href))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={key} pathname={pathname} {...item}>
        {childItems ? renderNavItems({ depth: depth + 1, pathname, items: childItems }) : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" data-depth={depth} spacing={1} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, "items"> {
  children?: React.ReactNode;
  depth: number;
  forceOpen?: boolean;
  pathname: string;
}

function NavItem({
  children,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  icon,
  label,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(forceOpen);
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? icons[icon] : null;
  const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
  const isBranch = children && !href;
  const showChildren = Boolean(children && open);

  return (
    <Box component="li" data-depth={depth} sx={{ userSelect: "none" }}>
      <Box
        {...(isBranch
          ? {
              onClick: (): void => {
                setOpen(!open);
              },
              onKeyUp: (event: React.KeyboardEvent<HTMLDivElement>): void => {
                if (event.key === "Enter" || event.key === " ") {
                  setOpen(!open);
                }
              },
              role: "button",
            }
          : {
              ...(href
                ? {
                    component: external ? "a" : RouterLink,
                    href,
                    target: external ? "_blank" : undefined,
                    rel: external ? "noreferrer" : undefined,
                  }
                : { role: "button" }),
            })}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          color: "var(--NavItem-color)",
          cursor: "pointer",
          display: "flex",
          flex: "0 0 auto",
          gap: 1,
          p: "6px 16px",
          position: "relative",
          textDecoration: "none",
          whiteSpace: "nowrap",
          ...(disabled && {
            bgcolor: "var(--NavItem-disabled-background)",
            color: "var(--NavItem-disabled-color)",
            cursor: "not-allowed",
          }),
          ...(active && {
            bgcolor: "var(--NavItem-active-background)",
            color: "var(--NavItem-active-color)",
            ...(depth > 0 && {
              "&::before": {
                bgcolor: "var(--NavItem-children-indicator)",
                borderRadius: "2px",
                content: '" "',
                height: "20px",
                left: "-14px",
                position: "absolute",
                width: "3px",
              },
            }),
          }),
          ...(open && { color: "var(--NavItem-open-color)" }),
          "&:hover": {
            ...(!disabled &&
              !active && { bgcolor: "var(--NavItem-hover-background)", color: "var(--NavItem-hover-color)" }),
          },
        }}
        tabIndex={0}
      >
        <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", flex: "0 0 auto" }}>
          {Icon ? (
            <Icon
              fill={active ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
              fontSize="var(--icon-fontSize-md)"
              weight={forceOpen || active ? "fill" : undefined}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <Typography
            component="span"
            sx={{ color: "inherit", fontSize: "0.875rem", fontWeight: 500, lineHeight: "28px" }}
          >
            {title}
          </Typography>
        </Box>
        {label ? <Chip color="primary" label={label} size="small" /> : null}
        {external ? (
          <Box sx={{ alignItems: "center", display: "flex", flex: "0 0 auto" }}>
            <ArrowSquareOutIcon color="var(--NavItem-icon-color)" fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
        {isBranch ? (
          <Box sx={{ alignItems: "center", display: "flex", flex: "0 0 auto" }}>
            <ExpandIcon color="var(--NavItem-expand-color)" fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
      {showChildren ? (
        <Box sx={{ pl: "24px" }}>
          <Box sx={{ borderLeft: "1px solid var(--NavItem-children-border)", pl: "12px" }}>{children}</Box>
        </Box>
      ) : null}
    </Box>
  );
}