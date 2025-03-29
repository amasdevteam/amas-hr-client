"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Bell as BellIcon } from "@phosphor-icons/react/dist/ssr/Bell";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { useTranslation } from "react-i18next";

import type { NavItemConfig } from "@/types/nav";
import { usePopover } from "@/hooks/use-popover";
import { usePathname } from "@/hooks/use-pathname";
import { SystemTabs } from "./system-tabs";

import { ContactsPopover } from "../contacts-popover";
import { languageFlags, LanguagePopover } from "../language-popover";
import type { Language } from "../language-popover";
import { MobileNav } from "../mobile-nav";
import { NotificationsPopover } from "../notifications-popover";
import { UserPopover } from "../user-popover/user-popover";

export interface TabItemConfig {
  key: string;
  label: string;
  href: string;
  disabled?: boolean;
}

export interface MainNavProps {
  items: NavItemConfig[];
  userName?: string;
  userTitle?: string;
  userAvatar?: string;
  companyLogoSrc?: string;
  onRequestTimeOff?: () => void;
}

export function MainNav({
  items,
  userName = "Sofia Rivers",
  userAvatar = "/assets/avatar.png",
  companyLogoSrc = "/logos/Sanku-Logo.png",
}: MainNavProps): React.JSX.Element {
  const theme = useTheme();
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const pathname = usePathname();

  const { t: tNav } = useTranslation("navigation");
  const { t: tUser } = useTranslation("user");
  const { t: tCommon } = useTranslation("common");

  const userTitle = tUser("businessAnalyst");

  const tabs: TabItemConfig[] = [
    { key: "performance", label: tNav("performance"), href: "/dashboard/performance" },
    { key: "training", label: tNav("training"), href: "/dashboard/training" },
    { key: "payroll", label: tNav("payroll"), href: "/dashboard/payroll" },
    { key: "employee", label: tNav("employee"), href: "/dashboard/employees" },
    { key: "job", label: tNav("job"), href: "/dashboard/job" },
    { key: "time-off", label: tNav("timeOff"), href: "/dashboard/time-off" },
    { key: "personal", label: tNav("personal"), href: "/dashboard/personal" },
    { key: "benefits", label: tNav("benefits"), href: "/dashboard/benefits" },
    { key: "documents", label: tNav("documents"), href: "/dashboard/documents" },
  ];

  const selectedTabIndex = React.useMemo(() => {
    const index = tabs.findIndex((tab) => pathname.includes(tab.key));
    return index !== -1 ? index : 0;
  }, [pathname, tabs]);

  const showTabs = pathname.includes("/dashboard");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (!tabs[newValue].disabled) {
      window.location.href = tabs[newValue].href;
    }
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          left: 0,
          position: "sticky",
          pt: { lg: "var(--Layout-gap)" },
          top: 0,
          width: "100%",
          zIndex: theme.zIndex.appBar,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "var(--MainNav-height)",
            px: { xs: 2, lg: 3 },
            py: 1,
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              component="img"
              src={companyLogoSrc}
              alt="Company Logo"
              sx={{
                height: 40,
                maxWidth: 160,
                objectFit: "contain",
                filter: theme.palette.mode === "dark" ? "brightness(0) invert(1)" : "none",
              }}
            />
            <IconButton onClick={() => setOpenNav(true)} sx={{ display: { lg: "none" } }}>
              <ListIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <NotificationsButton />
            <ContactsButton />
            <Divider
              flexItem
              orientation="vertical"
              sx={{
                borderColor: theme.palette.divider,
                display: { xs: "none", lg: "block" },
              }}
            />
            <LanguageSwitch />
            <UserButton userName={userName} userTitle={userTitle} userAvatar={userAvatar} />
          </Stack>
        </Box>

        {showTabs && (
          <Box sx={{ width: "100%", px: { xs: 2, lg: 3 }, mt: 2, mb: 2 }}>
            <SystemTabs
              selectedTabIndex={selectedTabIndex}
              tabs={tabs}
              onTabChange={handleTabChange}
            />
          </Box>
        )}
      </Box>

      <MobileNav items={items} onClose={() => setOpenNav(false)} open={openNav} />
    </>
  );
}

function ContactsButton(): React.JSX.Element {
  const { t } = useTranslation("common");
  const popover = usePopover<HTMLButtonElement>();
  return (
    <>
      <Tooltip title={t("contacts")}>
        <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
          <UsersIcon />
        </IconButton>
      </Tooltip>
      <ContactsPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
}

function NotificationsButton(): React.JSX.Element {
  const { t } = useTranslation("common");
  const popover = usePopover<HTMLButtonElement>();
  return (
    <>
      <Tooltip title={t("notifications")}>
        <Badge
          color="error"
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              borderRadius: "50%",
              height: "10px",
              right: "6px",
              top: "6px",
              width: "10px",
            },
          }}
        >
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <BellIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      <NotificationsPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
}

function LanguageSwitch(): React.JSX.Element {
  const { t, i18n } = useTranslation("common");
  const popover = usePopover<HTMLButtonElement>();
  const language = (i18n.language || "en") as Language;
  const flag = languageFlags[language];
  return (
    <>
      <Tooltip title={t("language")}>
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          sx={{ display: { xs: "none", lg: "inline-flex" } }}
        >
          <Box sx={{ height: "24px", width: "24px" }}>
            <Box
              alt={language}
              component="img"
              src={flag}
              sx={{ height: "auto", width: "100%" }}
            />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
}

interface UserButtonProps {
  userName: string;
  userTitle?: string;
  userAvatar?: string;
}

function UserButton({
  userName,
  userTitle,
  userAvatar,
}: UserButtonProps): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();
  return (
    <>
      <Box
        component="button"
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          p: 0,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
          <Typography variant="body2" fontWeight="medium" lineHeight={1.2}>
            {userName}
          </Typography>
          {userTitle && (
            <Typography variant="caption" color="text.secondary" lineHeight={1.2}>
              {userTitle}
            </Typography>
          )}
        </Box>
        <Badge
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          color="success"
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              border: "2px solid",
              borderColor: "background.paper",
              borderRadius: "50%",
              bottom: "6px",
              height: "12px",
              right: "6px",
              width: "12px",
            },
          }}
        >
          <Avatar
            src={userAvatar}
            alt={userName}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid",
              borderColor: "primary.main",
            }}
          >
            {!userAvatar && userName ? userName.charAt(0) : null}
          </Avatar>
        </Badge>
      </Box>
      <UserPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
}
