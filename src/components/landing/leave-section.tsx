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
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

const EmployeeTimeoffComponent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box>
            <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
              Our Core Features
            </Typography>
            
            <Typography variant="h3" component="h2" sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' }
            }}>
              We Make It Effortlessly To Track All Employee Time-off
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Self service data analytic software that lets you create
              visually appealing data visualizations and insightful
              dashboard in minutes
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box 
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1
                        }}
                      >
                        <BarChartIcon sx={{ color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Powerful dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Combine multiple report into a single beautiful dashboard
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box 
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          backgroundColor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1
                        }}
                      >
                        <DescriptionIcon sx={{ color: theme.palette.primary.main }} />
                      </Box>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Always in Best Organize
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Combine multiple report into a single beautiful dashboard
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mt: { xs: 4, md: 0 }
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
              backgroundImage: 'url(/assets/image-business-2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployeeTimeoffComponent;