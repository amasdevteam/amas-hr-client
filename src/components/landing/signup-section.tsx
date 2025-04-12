import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';

const CloudHrCta: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        backgroundColor: '#1a1a2e', // Dark purple/navy background
        color: 'white',
        py: { xs: 6, md: 8 },
        borderRadius: 1
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 4
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                mb: 2,
                lineHeight: 1.2
              }}
            >
              Unlock The Power Of Cloud HR Solutions Today!
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                maxWidth: '90%'
              }}
            >
              Sign up now for a free trial and discover how our cloud HR solutions 
              can revolutionize the way you manage your workforce. Say goodbye 
              to manual processes and hello to seamless efficiency!
            </Typography>
          </Box>
          
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ 
              mt: { xs: 3, md: 0 },
              width: { xs: '100%', sm: 'auto' } 
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: '#7b5cfa',
                '&:hover': {
                  bgcolor: '#634bd8',
                },
                borderRadius: '50px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Get started
            </Button>
            
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                borderRadius: '50px',
                px: 3,
                py: 1,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Request Demo
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CloudHrCta;