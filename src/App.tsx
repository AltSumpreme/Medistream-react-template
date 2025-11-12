import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, type ReactElement } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPatient from "./pages/patient/DashboardPatient";
import DashboardDoctor from "./pages/doctor/DashboardDoctor";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Prescriptions from "./pages/Prescriptions";
import Reports from "./pages/Reports";
import Vitals from "./pages/Vitals";
import Users from "./pages/Users";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const getRole = () => localStorage.getItem("role") || "PATIENT";

export default function App() {
  // Migrate access_token -> token for compatibility with existing PrivateRoute
  useEffect(() => {
    const access = localStorage.getItem("access_token");
    if (access && !localStorage.getItem("token")) {
      localStorage.setItem("token", access);
    }
  }, []);

  const role = getRole();
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Default redirect */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate
              to={
                role === "ADMIN"
                  ? "/admin"
                  : role === "DOCTOR"
                  ? "/doctor"
                  : "/patient"
              }
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* PATIENT */}
      <Route
        path="/patient"
        element={
          <PrivateRoute>
            <DashboardPatient />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/medical-records"
        element={
          <PrivateRoute>
            <MedicalRecords />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/prescriptions"
        element={
          <PrivateRoute>
            <Prescriptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/vitals"
        element={
          <PrivateRoute>
            <Vitals />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      {/* DOCTOR */}
      <Route
        path="/doctor"
        element={
          <PrivateRoute>
            <DashboardDoctor />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctor/records"
        element={
          <PrivateRoute>
            <MedicalRecords />
          </PrivateRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <DashboardAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
