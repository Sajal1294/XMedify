// App.jsx
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Footer from "./components/Footer/Footer";
import DownloadApp from "./components/Sections/DownloadApp/DownloadApp";
import { useState } from "react";
import Search from "./Search/Search"; // Assuming Search.jsx is in a 'pages' directory

function App() {
  const [appState, setAppState] = useState('');
  const [appCity, setAppCity] = useState('');
  const [searchParams, setSearchParams] = useState({});

  return (
    <div>
      <CssBaseline />
      {/* You need to render the Search component here, 
          passing down the state and setter functions */}
      <Search
        state={appState}
        setState={setAppState}
        city={appCity}
        setCity={setAppCity}
        setSearchParams={setSearchParams}
      />
      <Outlet /> {/* Outlet is for nested routes, keep it if you have them */}
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default App;