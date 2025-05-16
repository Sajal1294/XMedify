import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import BookingModal from "../components/BookingModal/BookingModal";
import { Box, Typography, Button } from "@mui/material";

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = params.get("state");
  const city = params.get("city");

  const [hospitals, setHospitals] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      );
      setHospitals(res.data);
      setFetched(true);
    } catch (err) {
      console.error("Error fetching hospitals", err);
    }
  };

  useEffect(() => {
    if (state && city) {
      fetchHospitals();
    }
  }, [state, city]);

  const handleBooking = (details) => {
    setBookingDetails(details);
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      
      <SearchHospital />


      {fetched && (
        <>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {hospitals.length} medical centers available in {city.toLowerCase()}
          </Typography>
          {hospitals.map((hospital, index) => (
            <HospitalCard
              key={index}
              details={hospital}
              handleBooking={() => handleBooking(hospital)}
              booking={true}
            />
          ))}
        </>
      )}

      {isModalOpen && (
        <BookingModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          bookingDetails={bookingDetails}
          showSuccessMessage={() => {}}
        />
      )}
    </Box>
  );
};

export default Search;
