import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import RegisterDoctor from "./components/RegisterDoctor";
import RegisterPatient from "./components/RegisterPatient";
import DoctorAppointments from "./components/DoctorAppointments";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
