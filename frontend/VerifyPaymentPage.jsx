
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE;

function VerifyPaymentPage() {
  const [statusMsg, setStatusMsg] = useState("Verifying Payment...");
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search || "";

  useEffect(() => {
    let cancelled = false;

    const verifyPayment = async () => {
      const params = new URLSearchParams(search);

      const rawSession = params.get("session_id");
      const session_id = rawSession ? rawSession.trim() : null;
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

        const res = await axios.get(
          `${API_BASE}/api/bookings/confirm-payment`,
          {
            params: { session_id },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            timeout: 15000,
          },
        );

        if (cancelled) return;

        if (res?.data?.success) {
          setStatusMsg("Payment confirmed. Redirecting...");
          setTimeout(() => {
            navigate("/bookings", { replace: true });
          }, 1500);
        } else {
          setStatusMsg(res?.data?.message || "Payment not completed.");
        }
      } catch (err) {
        console.error("Verification error:", err);

        const status = err?.response?.status;
        const serverMsg = err?.response?.data?.message;

        if (status === 404) {
          setStatusMsg(
            serverMsg ||
              "Payment session not found. Contact support if charged.",
          );
        } else if (status === 400) {
          setStatusMsg(
            serverMsg || "Payment not completed or invalid request.",
          );
        } else {
          setStatusMsg(
            serverMsg || "Error confirming payment. Please contact support.",
          );
        }
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4">
      <div className="text-center max-w-lg">
        <p className="mb-2">{statusMsg}</p>
        <p className="text-sm opacity-70">
          If this page show "Session not found", try copying the `Session_id`
          from your browser URL and verify it with your backend logs or contact
          support.
        </p>
      </div>
    </div>
  );
}

export default VerifyPaymentPage;
