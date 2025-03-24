import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { List as ListIcon } from "@phosphor-icons/react/dist/ssr/List";

import { paths } from "@/paths";
import { RouterLink } from "@/components/core/link";

const navItems = [
  { name: "Platform", href: "#platform" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
  { name: "Customers", href: "#customers" },
];

export function Header(): React.JSX.Element {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const mobileMenuOpen = Boolean(mobileMenuAnchorEl);
  
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0} 
      sx={{ 
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 80 }}>
          {/* Logo */}
          <Typography
            variant="h4"
            noWrap
            component={RouterLink}
            href={paths.home}
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            amasHR
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Stack direction="row" spacing={4}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component="a"
                  href={item.href}
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 500,
                    textTransform: "none",
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <ListIcon />
            </IconButton>
          </Box>

          {/* Mobile menu */}
          <Menu
            id="menu-appbar"
            anchorEl={mobileMenuAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {navItems.map((item) => (
              <MenuItem key={item.name} onClick={handleMobileMenuClose}>
                <Typography textAlign="center">{item.name}</Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={handleMobileMenuClose}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Typography textAlign="center">Request Demo</Typography>
            </MenuItem>
          </Menu>

          {/* Action buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Button 
              variant="outlined" 
              color="primary"
              sx={{
                borderRadius: "50px",
                textTransform: "none",
                paddingX: "24px", // Adjust horizontal padding for better shape
                paddingY: "8px"   // Adjust vertical padding if needed
              }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              sx={{
                borderRadius: "50px",
                textTransform: "none",
                paddingX: "24px", // Adjust horizontal padding for better shape
                paddingY: "8px"   // Adjust vertical padding if needed
              }}
            >
              Request Demo
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}