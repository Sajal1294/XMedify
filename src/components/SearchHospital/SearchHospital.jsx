import {
  MenuItem,
  Select,
  Button,
  InputAdornment,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// Component to search the hospitals based on State and City selection.
export default function SearchHospital({
  selectedState,
  selectedCity,
  onStateChange, // Use onStateChange callback
  onCityChange, // Use onCityChange callback
  onSearch, // Use onSearch callback
  states, // Receive states and cities as props
  cities,
  isStatesLoading, // Receive loading states as props
  isCitiesLoading,
}) {
  const handleStateChange = useCallback(
    (e) => {
      const newState = e.target.value;
      if (onStateChange) {
        onStateChange(newState);
      }
    },
    [onStateChange]
  );

  const handleCityChange = useCallback(
    (e) => {
      const newCity = e.target.value;
      if (onCityChange) {
        onCityChange(newCity);
      }
    },
    [onCityChange]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(selectedState, selectedCity);
      }
    },
    [onSearch, selectedState, selectedCity]
  );

  const formKey = useMemo(() => `${selectedState}-${selectedCity}`, [
    selectedState,
    selectedCity,
  ]);

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
      key={formKey}
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
          disabled={isStatesLoading}
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

      <FormControl fullWidth disabled={!selectedState || isCitiesLoading}>
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
      >
        Search
      </Button>
    </Box>
  );
}