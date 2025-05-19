// App.jsx
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Footer from "./components/Footer/Footer";
import DownloadApp from "./components/Sections/DownloadApp/DownloadApp";
import { useState } from "react";
// import Search from "./Search/Search"; // Remove this import

function App() {
  const [appState, setAppState] = useState('');
  const [appCity, setAppCity] = useState('');
  const [searchParams, setSearchParams] = useState({});

  return (
    <div>
      <CssBaseline />
      {/* Remove the direct rendering of the Search component */}
      <Outlet /> {/* Outlet is for nested routes, keep it if you have them */}
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default App;