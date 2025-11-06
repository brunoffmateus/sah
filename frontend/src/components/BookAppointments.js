import React, { useEffect, useState } from "react";

function BookAppointments() {
  const [username, setUsername] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");


  // Fetch all doctors when component loads
  useEffect(() => {
    fetch("http://localhost:5000/appointments/doctors")
      .then(res => res.json())
      .then(setDoctors)
      .catch(console.error);
  }, []);

  // Generate 15-minute intervals (8:00–18:00)
  useEffect(() => {
    const times = [];
    for (let h = 8; h < 18; h++) {
      for (let m = 0; m < 60; m += 15) {
        const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        times.push(time);
      }
    }
    setAvailableTimes(times);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, doctorId: selectedDoctor, date: selectedDate, time: selectedTime }),
      });

      const data = await res.json();
      setMessage(data.message || "Something went wrong");
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      {/* Username input */}
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      {/* Doctor Dropdown */}
      <select onChange={e => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
        <option value="">Select Doctor</option>
        {doctors.map(doc => (
          <option key={doc.id} value={doc.id}>{doc.name}</option>
        ))}
      </select>

      {/* Date Picker */}
      <input
        type="date"
        onChange={e => setSelectedDate(e.target.value)}
        value={selectedDate}
      />

      {/* Time Dropdown */}
      <select
        onChange={e => setSelectedTime(e.target.value)}
        value={selectedTime}
        disabled={!selectedDoctor || !selectedDate}
      >
        <option value="">Select Time</option>
        {availableTimes.map(time => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>

      {/* Submit */}
      <button type="submit">Book Appointment</button>

      {/* Status Message */}
      {message && <p>{message}</p>}
    </form>
  );
}

export default BookAppointments;
