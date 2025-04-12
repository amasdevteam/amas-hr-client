import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// Sample company data with temporary logos
const companies = [
  {
    id: 1,
    name: "Techflow",
    logo: "/assets/company-avatar-1.png",
    fallbackInitial: "T"
  },
  {
    id: 2,
    name: "Oceanic Ventures",
    logo: "/assets/company-avatar-2.png",
    fallbackInitial: "O"
  },
  {
    id: 3,
    name: "Globex Industries",
    logo: "/assets/company-avatar-3.png",
    fallbackInitial: "G"
  },
  {
    id: 4,
    name: "Nimbus Solutions",
    logo: "/assets/company-avatar-4.png",
    fallbackInitial: "N"
  },
  {
    id: 5,
    name: "Quantum Enterprises",
    logo: "/assets/company-avatar-5.png",
    fallbackInitial: "Q"
  }
];

export function TrustedBySection(): React.JSX.Element {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        py: { xs: 5, md: 6 }, 
        bgcolor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            fontWeight: 400,
            letterSpacing: 1,
            color: "text.secondary",
            mb: 4,
            textAlign: "center",
            //textTransform: "uppercase",
            fontSize: { xs: "0.85rem", md: "0.95rem" }
          }}
        >
          Trusted by a Growing Network of Businesses Everywhere for HR Excellence
        </Typography>
        
        <Grid 
          container 
          spacing={{ xs: 3, md: 4 }} 
          justifyContent="center"
          alignItems="center"
        >
          {companies.map((company) => (
            <Grid 
              item 
              key={company.id} 
              xs={6} 
              sm={4} 
              md={2.4}
              sx={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Box
                sx={{
                  height: 60,
                  width: "100%",
                  maxWidth: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
                  opacity: 0.7,
                  filter: theme.palette.mode === "dark" ? "brightness(1.5)" : "none",
                  "&:hover": {
                    transform: "scale(1.05)",
                    opacity: 1
                  }
                }}
              >
                {company.logo ? (
                  <Box
                    component="img"
                    src={company.logo}
                    alt={`${company.name} logo`}
                    sx={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 50,
                      width: 120,
                      bgcolor: 'background.level1',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: "text.secondary",
                        fontWeight: 500
                      }}
                    >
                      {company.fallbackInitial}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: 4 
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5
            }}
          >
            {/* Joining over
            <Typography
              component="span"
              variant="body2"
              color="primary"
              fontWeight={600}
            >
              2,500+
            </Typography> */}
            Connect with businesses enhancing their HR operations through amasHR.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default TrustedBySection;