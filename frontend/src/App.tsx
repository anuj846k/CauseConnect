import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./shared/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./components/EventsComponents/Dashboard";
import CreateEventForm from "./components/EventsComponents/CreateEventForm";
import Footer from "./shared/Footer";
import VolunteerPage from "./pages/VolunterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./components/AboutUs";
import BackToTop from "./shared/BackToTop";
import LeaderBoard from "./pages/LeaderBoard";


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-event" element={<CreateEventForm />} />
          <Route path="/volunteer/:id" element={<VolunteerPage />} />
        </Routes>
      </div>
      <Footer />
      <BackToTop />
    </Router>
  );
};

export default App;
