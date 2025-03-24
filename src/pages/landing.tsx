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
// import Testimonial from "@/components/landing/testimonial";


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
        

        {/* Trusted By Section */}
       

        {/* Features Section */}
      


        {/* CTA Section */}
      

    
      </Box>
    </React.Fragment>
  );
}