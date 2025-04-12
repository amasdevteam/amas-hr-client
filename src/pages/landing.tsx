import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Helmet } from "react-helmet-async";

import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { TestimonialCarousel } from '@/components/landing/testimonial';
import TrustedBySection from "@/components/landing/trust-section";
import EmployeeTimeoffComponent from "@/components/landing/leave-section";
import EmployeePayrollComponent from "@/components/landing/payroll-section";
import CloudHrCta from "@/components/landing/signup-section"; // Adjust the path as necessary

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>amasHR | HR Software that Works for Everyone</title>
        <meta name="description" content="The all-in-one HRIS platform that streamlines your HR workflows, enhances employee experience, and provides actionable insights for better decisions." />
      </Helmet>
      <Box 
        component="main" 
        sx={{ 
          bgcolor: "#f7f7f7", // Off-white background color
          minHeight: "100vh",
          pb: 8 // Add padding at the bottom
        }}
      >
        <Header />

        {/* Hero Section */}
        <Box sx={{ mb: 10 }}>
          <HeroSection
            title="Revamp Your HR Workflow with Cutting-Edge Cloud Solutions"
            description="The best HR software for organizations across the spectrum, from startups to large enterprises, to manage employee records, payroll, time off, and attendance tracking within a single platform."
            primaryCtaText="Get started"
            secondaryCtaText="How it works"
            imageUrl="/assets/amashr_hero.png"
            // onPrimaryCtaClick={handleGetStartedClick}
            // onSecondaryCtaClick={handleHowItWorksClick}
          />
        </Box>

        {/* Trusted By Section */}
        <Box sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <TrustedBySection />
          </Container>
        </Box>

        {/* Leave section */}
        <Box sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <EmployeeTimeoffComponent />
          </Container>
        </Box>

        {/* Payroll section */}
        <Box sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <EmployeePayrollComponent />
          </Container>
        </Box>

        {/* Testimonial Section */}
        <Box sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <TestimonialCarousel />
          </Container>
        </Box>

        {/* Signup Section */}
        <Box sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <CloudHrCta />
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
}