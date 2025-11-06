import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import RegisterDoctor from "./components/RegisterDoctor";
import RegisterPatient from "./components/RegisterPatient";
import BookAppointments from "./components/BookAppointments";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/bookAppointment"
          element={
            <ProtectedRoute>
              <BookAppointments />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/:role/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
