import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (formData: { email: string; password: string }) => void;
  loading?: boolean;
}

export default function AuthForm({ type, onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="••••••••"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-medium transition ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Please wait..." : type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}
