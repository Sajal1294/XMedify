// Home.jsx
import { Container, Box, Stack } from "@mui/material";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import FAQs from "../components/Sections/FAQs/FAQs";
import OurFamilies from "../components/Sections/OurFamilies/OurFamilies";
import Blogs from "../components/Sections/Blogs/Blogs";
import PatientCaring from "../components/Sections/PatientCaring/PatientCaring";
import Specialists from "../components/Sections/Specialists/Specialists";
import Specialization from "../components/Sections/Specialization/Specialization";
import Offers from "../components/Sections/Offers/Offers";
import NavBar from "../components/NavBar/NavBar";
import HeroServices from "../components/IconLayout/HeroServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [homeState, setHomeState] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const { state, city } = searchParams;
    if (state && city) {
      navigate(`/search?state=${state}&city=${city}`);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(#E7F0FF , rgba(232, 241, 255, 0.47) 90%, #fff 10%)",
        }}
        mb={4}
      >
        <NavBar />
        <Container maxWidth="xl">
          <HeroSlider />
          <Stack
            p={{ xs: 2.5, md: 8 }}
            mt={{ xs: -2, md: 0, lg: -6, xl: -10 }}
            position="relative"
            zIndex={99}
            bgcolor="#fff"
            borderRadius="15px"
            spacing={2}
            boxShadow="0 0 12px rgba(0,0,0,0.1)"
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ md: 'center' }}
          >
            <Box flex={1}>
              {/* This SearchHospital is for the overlay on the HeroSlider */}
              <SearchHospital
                selectedState={homeState}
                selectedCity={homeCity}
                setState={setHomeState}
                setCity={setHomeCity}
                setSearchParams={handleSearch}
              />
            </Box>
            <Box sx={{ mt: { xs: 2, md: 0 } }}>
              <HeroServices />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Offers />

      <Specialization />

      <Specialists />

      <PatientCaring />

      <Blogs />

      <OurFamilies />

      <FAQs />
    </Box>
  );
}