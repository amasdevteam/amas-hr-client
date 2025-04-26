import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Quotes as QuotesIcon, CaretLeft as CaretLeftIcon, CaretRight as CaretRightIcon } from "@phosphor-icons/react";

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  company?: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "amasHR has completely transformed how we manage our HR operations. The platform is intuitive, comprehensive, and has saved our team countless hours. The customer support is exceptional!",
    author: "Mbonny Maumba",
    role: "HR Director",
    company: "Eagle Destiny",
    avatar: "/assets/avatar-8.png",
  },
  {
    quote: "Moving to amasHR was the best decision we made last year. The onboarding process was smooth, and the automated workflows have reduced our paperwork by 70%. It's a game-changer for our growing team.",
    author: "Sofia Rivers",
    role: "People Operations Lead",
    company: "Novagraph",
    avatar: "/assets/avatar.png",
  },
  {
    quote: "The analytics and reporting features have given us insights we never had before. We can now make data-driven decisions about our workforce planning. The ROI has been incredible.",
    author: "Carson Darrin",
    role: "Chief People Officer",
    company: "TechForward",
    avatar: "/assets/avatar-3.png",
  },
  {
    quote: "The talent acquisition module streamlined our entire hiring process. What used to take weeks now takes days, and the candidate experience has improved dramatically.",
    author: "Iulia Albu",
    role: "Recruitment Manager",
    company: "Global Innovations",
    avatar: "/assets/avatar-6.png",
  },
  {
    quote: "amasHR's employee self-service portal has empowered our team to manage their information independently. Our HR team can now focus on strategic initiatives instead of administrative tasks.",
    author: "Jie Yan",
    role: "VP of Human Resources",
    company: "Oceanic Partners",
    avatar: "/assets/avatar-8.png",
  },
];

function TestimonialCard({ quote, author, role, avatar, company }: TestimonialProps): React.JSX.Element {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
        boxShadow: "0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 28px 0 rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -16,
          left: 20,
          color: "primary.main",
          opacity: 0.2,
          fontSize: "4rem",
          lineHeight: 1,
        }}
      >
        <QuotesIcon weight="fill" />
      </Box>

      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.95rem", md: "1rem" },
            fontStyle: "italic",
            mb: 3,
            position: "relative",
            zIndex: 1,
            flex: 1,
          }}
        >
          "{quote}"
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", position: "relative", zIndex: 1, mt: "auto" }}
        >
          <Avatar
            src={avatar}
            alt={author}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "primary.main",
            }}
          />
          <Box>
            <Typography variant="subtitle2">{author}</Typography>
            <Typography variant="caption" color="text.secondary">
              {role}{company ? `, ${company}` : ""}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function TestimonialCarousel(): React.JSX.Element {
  const [currentPage, setCurrentPage] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const itemsPerPage = isMobile ? 1 : (isTablet ? 2 : 3);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  const handleNext = () => setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

  const visibleTestimonials = React.useMemo(() => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <Box sx={{ py: 8, bgcolor: "background.level1" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 200,
            }}
          >
            What Our Customers Say
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handlePrevious}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "background.level2" },
              }}
            >
              <CaretLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "background.level2" },
              }}
            >
              <CaretRightIcon />
            </IconButton>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: itemsPerPage === 2 ? "repeat(2, 1fr)" : "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <Box key={`${testimonial.author}-${index}`}>
              <TestimonialCard {...testimonial} />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentPage(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                mx: 0.5,
                bgcolor: currentPage === index ? "primary.main" : "neutral.300",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: currentPage === index ? "primary.dark" : "neutral.400",
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default TestimonialCarousel;
