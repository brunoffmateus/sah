import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Dashboard() {
  const { role, id } = useParams();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:5000/dashboard/${role}/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, [role, id]);

  return (
    <div className="dashboard">
      <h1>
        {role === "doctor" ? `Welcome Doctor` : `Welcome Patient`}
      </h1>

      <ul>
        {appointments.map((a) => (
          <li key={a.id}>
            {a.date} — {a.time} &rarr; {a.name}
          </li>
        ))}
      </ul>

      {role === "patient" && (
        <button onClick={() => navigate(`/bookAppointment/`)}>
          Book Appointment
        </button>
      )}
    </div>
  );
}

export default Dashboard;
