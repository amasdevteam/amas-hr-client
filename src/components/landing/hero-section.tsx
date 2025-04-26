import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

interface HeroSectionProps {
  title: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  imageUrl: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  primaryCtaText,
  secondaryCtaText,
  imageUrl,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--mui-palette-background-default)',
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Text Section */}
          <Box>
            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Typography
                component="span"
                sx={{
                  backgroundColor: 'var(--mui-palette-primary-50)',
                  color: 'var(--mui-palette-primary-main)',
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.75,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                Recruit • Onboard • Manage
              </Typography>
            </Box>

            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontSize: { xs: '2.5rem', md: '2.9rem' },
                fontWeight: 500,
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                mb: 4,
                maxWidth: '560px',
              }}
            >
              {description}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 'auto' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={onPrimaryCtaClick}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                {primaryCtaText}
              </Button>

              <Button
                variant="outlined"
                size="large"
                color="secondary"
                onClick={onSecondaryCtaClick}
                endIcon={<ArrowRightIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                {secondaryCtaText}
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 4 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    mr: 0.5,
                  }}
                >
                  +200
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Companies Trusted
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    mr: 0.5,
                  }}
                >
                  +300
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  People have managed with ease
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt="HR Management Solution"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 3,
                zIndex: 2,
              }}
            />

            {/* Decorative Circles */}
            <Box
              sx={{
                position: 'absolute',
                top: '15%',
                right: '5%',
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'primary.light',
                opacity: 0.2,
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'secondary.light',
                opacity: 0.2,
                zIndex: 1,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
