import { Container, Stack, Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import icon from "../assets/tick.png";
import cta from "../assets/cta.png";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import BookingModal from "../components/BookingModal/BookingModal";
import AutohideSnackbar from "../components/AutohideSnackbar/AutohideSnackbar";
import NavBar from "../components/NavBar/NavBar";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [state, setState] = useState(searchParams.get("state") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const navigate = useNavigate();
  const [searchTriggered, setSearchTriggered] = useState(false); // New state

  const availableSlots = {
    morning: ["11:30 AM"],
    afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
    evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (newSearchParams) => {
    const { state: newState, city: newCity } = newSearchParams;
    setState(newState);
    setCity(newCity);
    setSearchTriggered(true); // Indicate search was triggered
    navigate(`/search?state=${newState}&city=${newCity}`);
  };

  useEffect(() => {
    const paramState = searchParams.get("state") || "";
    const paramCity = searchParams.get("city") || "";

    if (paramState !== state) setState(paramState);
    if (paramCity !== city) setCity(paramCity);
  }, [searchParams]);

  useEffect(() => {
    if (!state || !city) {
      setHospitals([]);
      return;
    }

    const fetchHospitals = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]);
      }
      setIsLoading(false);
    };

    if (searchTriggered) { // Only fetch if search was triggered
      fetchHospitals();
      setSearchTriggered(false); // Reset the trigger
    }
  }, [state, city, searchTriggered]);

  const handleBookingModal = (details) => {
    setBookingDetails(details);
    setIsModalOpen(true);
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          background: "linear-gradient(#EFF5FE, rgba(241,247,255,0.47))",
          width: "100%",
          pl: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            background: "linear-gradient(90deg, #2AA7FF, #0C8CE5)",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              background: "#fff",
              p: 3,
              borderRadius: 2,
              transform: "translateY(50px)",
              mb: "50px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <SearchHospital
              selectedState={state}
              selectedCity={city}
              setState={setState}
              setCity={setCity}
              setSearchParams={setSearchParams}
            />
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pt: 8, pb: 10, px: { xs: 0, md: 4 } }}>
          {hospitals.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                component="h1"
                fontSize={24}
                lineHeight={1.1}
                mb={2}
                fontWeight={500}
              >
                {`${hospitals.length} medical centers available in `}
                <span style={{ textTransform: "capitalize" }}>
                  {city.toLowerCase()}
                </span>
              </Typography>
              <Stack direction="row" spacing={2}>
                <img src={icon} height={24} width={24} alt="icon" />
                <Typography color="#787887" lineHeight={1.4}>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </Typography>
              </Stack>
            </Box>
          )}

          {isLoading && (
            <Typography
              variant="h4"
              bgcolor="#fff"
              p={3}
              borderRadius={2}
              textAlign="center"
              my={5}
            >
              Loading...
            </Typography>
          )}

          {!isLoading && hospitals.length === 0 && state && city && (
            <Typography
              variant="h5"
              bgcolor="#fff"
              p={3}
              borderRadius={2}
              textAlign="center"
              my={5}
            >
              No results found.
            </Typography>
          )}

          {!state && !city && (
            <Typography
              variant="h5"
              bgcolor="#fff"
              p={3}
              borderRadius={2}
              textAlign="center"
              my={5}
            >
              Please select a state and city to search.
            </Typography>
          )}

          <Stack
            alignItems="flex-start"
            direction={{ md: "row" }}
            spacing={3}
            mt={2}
          >
            <Stack
              spacing={3}
              width={{ xs: "100%", md: "calc(100% - 384px)" }}
              mr="24px"
              data-testid="hospital-list"
            >
              {hospitals.map((hospital) => (
                <HospitalCard
                  key={`${hospital["Hospital Name"]}-${hospital.City}`}
                  details={hospital}
                  availableSlots={availableSlots}
                  handleBooking={handleBookingModal}
                />
              ))}
            </Stack>

            <img src={cta} width={360} height="auto" alt="banner" />
          </Stack>
        </Container>

        <BookingModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          bookingDetails={bookingDetails}
          showSuccessMessage={setShowBookingSuccess}
        />

        <AutohideSnackbar
          open={showBookingSuccess}
          setOpen={setShowBookingSuccess}
          message="Booking Successful"
        />
      </Box>
    </>
  );
}