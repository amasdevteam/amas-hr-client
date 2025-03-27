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
import { Bell as BellIcon } from "@phosphor-icons/react/dist/ssr/Bell";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { Calendar as CalendarIcon } from "@phosphor-icons/react/dist/ssr/Calendar";
import { useTranslation } from "react-i18next";

import type { NavItemConfig } from "@/types/nav";
import { usePopover } from "@/hooks/use-popover";
import { usePathname } from "@/hooks/use-pathname";
import { RouterLink } from "@/components/core/link";
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
    onRequestTimeOff?: () => void;
}

export function MainNav({ 
    items, 
    userName = "Sofia Rivers",
    userTitle = "Business Analyst",
    userAvatar = "/assets/avatar.png",
}: MainNavProps): React.JSX.Element {
    const [openNav, setOpenNav] = React.useState<boolean>(false);
    const pathname = usePathname();
    
    // Define BambooHR tabs
    const tabs: TabItemConfig[] = [
      { key: 'performance', label: 'Performance', href: '/dashboard/performance' },
      { key: 'training', label: 'Training', href: '/dashboard/training' },
      { key: 'payroll', label: 'Payroll', href: '/dashboard/payroll' },
      { key: 'employee', label: 'Employee', href: '/dashboard/employees' },
      { key: 'job', label: 'Job', href: '/dashboard/job' },
      { key: 'time-off', label: 'Time Off', href: '/dashboard/time-off' },
      { key: 'personal', label: 'Personal', href: '/dashboard/personal' },
      { key: 'emergency', label: 'Emergency', href: '/dashboard/emergency' },
      { key: 'benefits', label: 'Benefits', href: '/dashboard/benefits' },
      { key: 'documents', label: 'Documents', href: '/dashboard/documents' },
    ];
    
    // Determine selected tab based on current pathname
    const selectedTabIndex = React.useMemo(() => {
      const index = tabs.findIndex(tab => pathname.includes(tab.key));
      return index !== -1 ? index : 0;
    }, [pathname, tabs]);
    
    // Temporarily force tabs to show for testing
    // const showTabs = true;
    
    // In production, use this condition instead:
    const showTabs = pathname.includes('dashboard/performance/index') ||
					 pathname.includes('dashboard/training/index') ||
					 pathname.includes('dashboard/payroll/index') ||
					 pathname.includes('dashboard/employees/index') ||
					 pathname.includes('dashboard/job/index') ||
					 pathname.includes('dashboard/time-off/index') ||
					 pathname.includes('dashboard/personal/index') ||
					 pathname.includes('dashboard/emergency/index') ||
					 pathname.includes('dashboard/benefits/index') ||
					 pathname.includes('dashboard/documents/index') ||
					 pathname.includes('/dashboard') ||
                	 pathname.includes('/dashboard/overview') ||
                	 pathname.includes('/dashboard/blank');
					 
                    
    // Handle tab change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      // You can add navigation logic here if needed
      console.log('Tab changed to:', tabs[newValue].key);
      
      // Navigate to the selected tab's URL
      if (!tabs[newValue].disabled) {
        window.location.href = tabs[newValue].href;
      }
    };

    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
                    "--MainNav-background": "var(--mui-palette-background-default)",
                    "--MainNav-divider": "var(--mui-palette-divider)",
                    bgcolor: "var(--MainNav-background)",
                    left: 0,
                    position: "sticky",
                    pt: { lg: "var(--Layout-gap)" },
                    top: 0,
                    width: "100%",
                    zIndex: "var(--MainNav-zIndex)",
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        borderBottom: showTabs ? "none" : "1px solid var(--MainNav-divider)",
                        display: "flex",
                        flex: "1 1 auto",
                        minHeight: "var(--MainNav-height)",
                        px: { xs: 2, lg: 3 },
                        py: 1,
                    }}
                >
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: "1 1 auto" }}>
                        <IconButton
                            onClick={(): void => {
                                setOpenNav(true);
                            }}
                            sx={{ display: { lg: "none" } }}
                        >
                            <ListIcon />
                        </IconButton> 
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center", flex: "1 1 auto", justifyContent: "flex-end" }}
                    >
                        {/* BambooHR-inspired available time display */}
                        {/* <Box 
                            sx={{ 
                                display: { xs: 'none', md: 'flex' }, 
                                alignItems: 'center',
                                mr: 2,
                                gap: 1
                            }}
                        >
                            <CalendarIcon />
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Available Time
                                </Typography>
                                <Typography variant="body2" fontWeight="medium">
                                    16 days
                                </Typography>
                            </Box>
                        </Box> */}

                        <NotificationsButton />
                        <ContactsButton />
                        <Divider
                            flexItem
                            orientation="vertical"
                            sx={{ borderColor: "var(--MainNav-divider)", display: { xs: "none", lg: "block" } }}
                        />
                        <LanguageSwitch />
                        
                        {/* BambooHR-inspired user display */}
                        <UserButton 
                            userName={userName}
                            userTitle={userTitle}
                            userAvatar={userAvatar}
                        />
                    </Stack>
                </Box>
                
                {/* BambooHR-style tabs using SystemTabs component */}
                {showTabs && (
                  <Box
                    sx={{
                      width: '100%',
                      px: { xs: 2, lg: 3 },
                      mt: 2, // Add margin to separate tabs from header
                      mb: 2, // Add margin below tabs
                    }}
                  >
                    <SystemTabs 
                      selectedTabIndex={selectedTabIndex} 
                      tabs={tabs} 
                      onTabChange={handleTabChange} 
                    />
                  </Box>
                )}
            </Box>
            <MobileNav
                items={items}
                onClose={() => {
                    setOpenNav(false);
                }}
                open={openNav}
            />
        </React.Fragment>
    );
}


function ContactsButton(): React.JSX.Element {
    const popover = usePopover<HTMLButtonElement>();

    return (
        <React.Fragment>
            <Tooltip title="Contacts">
                <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
                    <UsersIcon />
                </IconButton>
            </Tooltip>
            <ContactsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
        </React.Fragment>
    );
}


function NotificationsButton(): React.JSX.Element {
    const popover = usePopover<HTMLButtonElement>();

    return (
        <React.Fragment>
            <Tooltip title="Notifications">
                <Badge
                    color="error"
                    sx={{ "& .MuiBadge-dot": { borderRadius: "50%", height: "10px", right: "6px", top: "6px", width: "10px" } }}
                    variant="dot"
                >
                    <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
                        <BellIcon />
                    </IconButton>
                </Badge>
            </Tooltip>
            <NotificationsPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
        </React.Fragment>
    );
}

function LanguageSwitch(): React.JSX.Element {
    const { i18n } = useTranslation();
    const popover = usePopover<HTMLButtonElement>();
    const language = (i18n.language || "en") as Language;
    const flag = languageFlags[language];

    return (
        <React.Fragment>
            <Tooltip title="Language">
                <IconButton
                    onClick={popover.handleOpen}
                    ref={popover.anchorRef}
                    sx={{ display: { xs: "none", lg: "inline-flex" } }}
                >
                    <Box sx={{ height: "24px", width: "24px" }}>
                        <Box alt={language} component="img" src={flag} sx={{ height: "auto", width: "100%" }} />
                    </Box>
                </IconButton>
            </Tooltip>
            <LanguagePopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
        </React.Fragment>
    );
}

interface UserButtonProps {
    userName: string;
    userTitle?: string;
    userAvatar?: string;
}

function UserButton({ userName, userTitle, userAvatar }: UserButtonProps): React.JSX.Element {
    const popover = usePopover<HTMLButtonElement>();

    return (
        <React.Fragment>
            <Box
                component="button"
                onClick={popover.handleOpen}
                ref={popover.anchorRef}
                sx={{ 
                    border: "none", 
                    background: "transparent", 
                    cursor: "pointer", 
                    p: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}
            >
                {/* BambooHR-style user info with name and title */}
                <Box sx={{ 
                    display: { xs: 'none', md: 'block' },
                    textAlign: 'right'
                }}>
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
                    sx={{
                        "& .MuiBadge-dot": {
                            border: "2px solid var(--MainNav-background)",
                            borderRadius: "50%",
                            bottom: "6px",
                            height: "12px",
                            right: "6px",
                            width: "12px",
                        },
                    }}
                    variant="dot"
                >
                    <Avatar 
                        src={userAvatar} 
                        alt={userName}
                        sx={{ 
                            width: 40, 
                            height: 40,
                            border: '2px solid var(--mui-palette-primary-main)',
                        }}
                    >
                        {!userAvatar && userName ? userName.charAt(0) : null}
                    </Avatar>
                </Badge>
            </Box>
            <UserPopover anchorEl={popover.anchorRef.current} onClose={popover.handleClose} open={popover.open} />
        </React.Fragment>
    );
}