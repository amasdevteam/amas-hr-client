import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import FolderIcon from '@mui/icons-material/Folder';
import TuneIcon from '@mui/icons-material/Tune';
import ShieldIcon from '@mui/icons-material/Shield';

const EmployeePayrollComponent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Container maxWidth="lg" sx={{ 
      py: 6, 
      px: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#fafafa',
      borderRadius: '16px',
      //border: '1px solid #e0e0ff'
    }}>
      <Grid container spacing={4} direction={isMobile ? 'column-reverse' : 'row'}>
        {/* Image section - now on the left */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            order: { xs: 2, md: 1 }
          }}
        >
          <Box
            component="div"
            sx={{
              width: '100%',
              height: { xs: '300px', sm: '400px', md: '500px' },
              backgroundColor: 'grey.100',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 3,
              backgroundImage: 'url(/assets/image-business-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </Grid>
        
        {/* Content section - now on the right */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            order: { xs: 1, md: 2 }
          }}
        >
          <Box>
            <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
              Our Core Features
            </Typography>
            
            <Typography variant="h3" component="h2" sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' }
            }}>
              We Make It Effortlessly To Track All Employee Payroll
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Self service data analytic software that lets you create
              visually appealing data visualizations and insightful
              dashboard in minutes
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 3
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(103, 58, 183, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PaidIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                  Accurate Payroll Processing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Automate payroll runs, including taxes, bonuses, and deductions, with complete transparency
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 3
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FolderIcon sx={{ color: 'info.main' }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                  Centralized Pay Records
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Store and access employee pay history, tax forms, and salary breakdowns in one secure place
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 3
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(156, 39, 176, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TuneIcon sx={{ color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                  Easy to Configure
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Set up pay schedules, allowances, and compliance settings quickly with user-friendly controls
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 3
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShieldIcon sx={{ color: 'success.main' }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                  Secure & Compliant
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Protect employee financial data with robust encryption and stay compliant with local tax regulations
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeePayrollComponent;