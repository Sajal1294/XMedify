import {
  MenuItem,
  Select,
  Button,
  InputAdornment,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// Component to search the hospitals based on State and City selection.
export default function SearchHospital({
  selectedState,
  selectedCity,
  setState,
  setCity,
  setSearchParams,
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://meddata-backend.onrender.com/states"
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedState) return;
      try {
        const response = await axios.get(
          `https://meddata-backend.onrender.com/cities/${selectedState}`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedState]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setState(newState);
    setCity("");
    setSearchParams({ state: newState, city: "" });
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    setSearchParams({ state: selectedState, city: newCity });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      setSearchParams({ state: selectedState, city: selectedCity });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
      data-testid="search-hospital-form" // Added data-testid
    >
      <FormControl fullWidth>
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          id="state"
          name="state"
          value={selectedState}
          onChange={handleStateChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="State"
          data-testid="state-select"
          required
        >
          <MenuItem disabled value="">
            State
          </MenuItem>
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!selectedState}>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          id="city"
          name="city"
          value={selectedCity}
          onChange={handleCityChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="City"
          data-testid="city-select"
          required
        >
          <MenuItem disabled value="">
            City
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        size="large"
        startIcon={<SearchIcon />}
        sx={{ py: "15px", px: 8, flexShrink: 0 }}
        disableElevation
        data-testid="search-button" // Added data-testid
      >
        Search
      </Button>
    </Box>
  );
}