import React, { useContext } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
