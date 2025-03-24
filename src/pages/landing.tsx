import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"; 
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
// import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet-async";


//import { paths } from "@/paths";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { TestimonialCarousel } from '@/components/landing/testimonial';
import TrustedBySection from "@/components/landing/trust-section";

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>amasHR | HR Software that Works for Everyone</title>
        <meta name="description" content="The all-in-one HRIS platform that streamlines your HR workflows, enhances employee experience, and provides actionable insights for better decisions." />
      </Helmet>
      <Box component="main" sx={{ bgcolor: "background.default" }}>

        <Header />

        {/* Hero Section */}
        <HeroSection
          title="Revamp Your HR Workflow with Cutting-Edge Cloud Solutions"
          description="The best HR software for organizations across the spectrum, from startups to large enterprises, to manage employee records, payroll, time off, and attendance tracking within a single platform."
          primaryCtaText="Get started"
          secondaryCtaText="How it works"
          imageUrl="/assets/amashr_hero.png"
         // onPrimaryCtaClick={handleGetStartedClick}
          //onSecondaryCtaClick={handleHowItWorksClick}
        />

        

        {/* Trusted By Section */}
        <TrustedBySection />

        {/* Features Section */}
      

        {/* Testimonial Section */}
        <TestimonialCarousel />




        {/* CTA Section */}
      

    
      </Box>
    </React.Fragment>
  );
}