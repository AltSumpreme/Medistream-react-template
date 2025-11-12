import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../services/api";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      await api.post("/auth/signup", { email, password });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />
        <p className="text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
