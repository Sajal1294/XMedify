// App.jsx
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Footer from "./components/Footer/Footer";
import DownloadApp from "./components/Sections/DownloadApp/DownloadApp";
// import { useState } from "react"; // Remove this import as state is no longer needed here

function App() {
  // const [appState, setAppState] = useState(''); // Remove
  // const [appCity, setAppCity] = useState(''); // Remove
  // const [searchParams, setSearchParams] = useState({}); // Remove

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