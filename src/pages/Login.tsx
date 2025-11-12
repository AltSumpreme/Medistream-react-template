import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../services/api";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left section - login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-8 py-12 shadow-lg">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">
            Sign in to your MediStream account
          </p>

          <AuthForm type="login" onSubmit={handleLogin} loading={loading} />

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right section - branding */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400">
        {/* glowing overlay gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)]" />

        {/* faint grid lines for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* MediStream brand text */}
        <h2 className="relative text-white font-extrabold text-5xl tracking-wide drop-shadow-lg">
          Medi
          <span className="text-blue-200">Stream</span>
        </h2>

        {/* faint glowing circle accent */}
        <div className="absolute w-40 h-40 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );
}
