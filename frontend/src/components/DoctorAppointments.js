import { useState, useEffect } from "react";

function DoctorAppointments() {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientId: "", date: "" });

  useEffect(() => {
    fetch("http://localhost:5000/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setAppointments);
  }, [token]);

  const createAppointment = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={createAppointment}>
        <input placeholder="Patient ID" onChange={e => setForm({ ...form, patientId: e.target.value })} />
        <input type="datetime-local" onChange={e => setForm({ ...form, date: e.target.value })} />
        <button type="submit">Create</button>
      </form>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            Patient {a.patientId} — {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorAppointments;
