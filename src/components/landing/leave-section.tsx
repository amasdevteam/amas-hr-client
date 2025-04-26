import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 6,
          alignItems: 'center',
        }}
      >
        {/* Left Text Section */}
        <Box>
          <Typography variant="subtitle1" color="primary" fontWeight={500} gutterBottom>
            Our Core Features
          </Typography>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '2.75rem' },
            }}
          >
            We Make It Effortless To Track All Employee Time-off
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Self service data analytic software that lets you create
            visually appealing data visualizations and insightful
            dashboards in minutes
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            {/* Card 1 */}
            <Card
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
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
                    }}
                  >
                    <BarChartIcon sx={{ color: theme.palette.primary.main }} />
                  </Box>
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Powerful dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Combine multiple reports into a single beautiful dashboard
                </Typography>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
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
                    }}
                  >
                    <DescriptionIcon sx={{ color: theme.palette.primary.main }} />
                  </Box>
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Always Best Organized
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Combine multiple reports into a single beautiful dashboard
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Right Image Section */}
        <Box
          sx={{
            width: '100%',
            height: { xs: '300px', sm: '400px', md: '500px' },
            backgroundColor: 'grey.100',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 3,
            backgroundImage: 'url(/assets/image-business-2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mt: { xs: 4, md: 0 },
          }}
        />
      </Box>
    </Container>
  );
};

export default EmployeeTimeoffComponent;
