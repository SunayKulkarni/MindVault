import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      if (response.status === 200) {
        const jwt = response.data.message;
        console.log("Received JWT:", jwt);
        localStorage.setItem("token", jwt);

        navigate("/dashboard");
      } else {
        alert("Sign in failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      alert("Sign in failed. Please check your network or server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 w-80">
        <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>

        <input
          ref={usernameRef}
          type="text"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <button
          onClick={signin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 cursor-pointer"
          disabled={loading}
        >
          Sign In
        </button>

        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>

        {loading &&(
          <svg fill="hsla(228, 69%, 56%, 1.00)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle></svg>
        )}
      </div>
    </div>
  );
}
