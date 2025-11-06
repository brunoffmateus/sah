import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (res.ok && data.token) {
        const decoded = jwtDecode(data.token);
        if (decoded.role === "doctor") {
          navigate(`/dashboard/doctor/${decoded.doctorId}`);
        } else if (decoded.role === "patient") {
          navigate(`/dashboard/patient/${decoded.patientId}`);
        } else {
          navigate("/"); // TODO: fallback to where?
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
