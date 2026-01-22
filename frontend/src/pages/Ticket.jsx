import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const getToken = () =>
  localStorage.getItem("token") ||
  localStorage.getItem("authToken") ||
  localStorage.getItem("accessToken");

export default function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = getToken();
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API_BASE}/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTicket(res.data.booking);
      } catch (err) {
        console.error(err);
        alert("Invalid or expired ticket");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <div>Loading ticket...</div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🎟️ Movie Ticket</h2>
      <p><b>Movie:</b> {ticket.movie?.title}</p>
      <p><b>Showtime:</b> {new Date(ticket.showtime).toLocaleString()}</p>
      <p><b>Auditorium:</b> {ticket.auditorium}</p>
      <p><b>Seats:</b> {ticket.seats.map(s => s.seatId).join(", ")}</p>
      <p><b>Amount:</b> ₹{ticket.amount}</p>
      <p><b>Status:</b> {ticket.paymentStatus}</p>
    </div>
  );
}
