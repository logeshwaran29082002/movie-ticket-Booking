import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyPaymentPage() {
  const [statusMsg, setStatusMsg] = useState("Verifying Payment...");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const session_id = params.get("session_id");
      const payment_status = params.get("payment_status");
      const token = localStorage.getItem("token");

      if (payment_status === "cancel") {
        navigate("/", { replace: true });
        return;
      }

      if (!session_id) {
        setStatusMsg("No session_id provided in the URL.");
        return;
      }

      try {
        setStatusMsg("Confirming Payment with server...");

        const API_BASE = import.meta.env.VITE_API_BASE;
        const res = await axios.get(
          `${API_BASE}/api/bookings/confirm-payment`,
          {
            params: { session_id },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (cancelled) return;

        if (res?.data?.success) {
          setStatusMsg("Payment confirmed. Redirecting...");
          navigate("/bookings", { replace: true }); // 🔥 immediate redirect
        } else {
          setStatusMsg(res?.data?.message || "Payment not completed.");
        }
      } catch (err) {
        console.error(err);
        setStatusMsg("Error confirming payment.");
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, []); // ✅ VERY IMPORTANT

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4">
      <div className="text-center max-w-lg">
        <p className="mb-2">{statusMsg}</p>
      </div>
    </div>
  );
}

export default VerifyPaymentPage;
