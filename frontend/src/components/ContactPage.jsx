import React, { useState } from "react";
import { contactStyles } from "../assets/dummyStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MessageCircle,
  Send,
  Ticket,
  Popcorn,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digits }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      toast.error("⚠️ Please enter a valid 10-digit phone number");
      return;
    }

    const message = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}
`;

    window.open(
      `https://wa.me/8056397525?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className={contactStyles.pageContainer}>
      <ToastContainer theme="dark" autoClose={2000} />

      {/* Background */}
      <div className={contactStyles.bgGradient}></div>
      <div className={contactStyles.bgBlob1}></div>
      <div className={contactStyles.bgBlob2}></div>

      {/* Film strips */}
      <div className={contactStyles.filmStripTop}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={contactStyles.filmStripSegment}></div>
        ))}
      </div>
      <div className={contactStyles.filmStripBottom}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={contactStyles.filmStripSegment}></div>
        ))}
      </div>

      {/* CONTENT */}
      <div className={contactStyles.contentContainer}>
        {/* HEADER */}
        <div className={contactStyles.headerContainer}>
          <h1 className={contactStyles.headerTitle}>
            <span className={contactStyles.headerTitleRed}>Contact</span>
            <span className={contactStyles.headerTitleWhite}>Us</span>
          </h1>
          <p className={contactStyles.headerSubtitle}>
            Have questions about movie bookings or special events? Our team is
            here to help you!
          </p>
        </div>

        <div className={contactStyles.gridContainer}>
          {/* LEFT – FORM */}
          <div className={contactStyles.cardRelative}>
            <div className={contactStyles.cardGradient}></div>

            <div className={contactStyles.cardContainer}>
              <div className={contactStyles.cardBadge}>
                <Ticket className={contactStyles.cardIcon} />
                BOOKING SUPPORT
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600/20 p-2 rounded-full">
                  <MessageCircle className="text-red-400 w-5 h-5" />
                </div>
                <h2 className={contactStyles.formTitle}>Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className={contactStyles.form}>
                <div className={contactStyles.formGrid}>
                  <div>
                    <label className={contactStyles.inputGroup}>
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={contactStyles.input}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className={contactStyles.inputGroup}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={contactStyles.input}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={contactStyles.inputGroup}>
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className={contactStyles.input}
                    placeholder="10 digit number"
                  />
                </div>

                <div>
                  <label className={contactStyles.inputGroup}>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={contactStyles.select}
                  >
                    <option value="">Select a subject</option>
                    <option>Ticket Booking</option>
                    <option>Group Events</option>
                    <option>Membership</option>
                    <option>Refund</option>
                    <option>Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className={contactStyles.inputGroup}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className={contactStyles.textarea}
                    placeholder="Please describe your inquiry..."
                  />
                </div>

                <button type="submit" className={contactStyles.submitButton}>
                  Send via WhatsApp
                  <Send className={contactStyles.buttonIcon} />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT – CINEMA INFO */}
          <div className="space-y-6">
            <div className={contactStyles.cardRelative}>
              <div className={contactStyles.cardGradient}></div>

              <div className={contactStyles.cardContainer}>
                <div className={contactStyles.cardBadge}>
                  <Popcorn className={contactStyles.cardIcon} />
                  CINEMA INFO
                </div>

                <div className={contactStyles.contactInfo}>
                  <div className={contactStyles.contactItem}>
                    <div className={contactStyles.contactIconContainer}>
                      <Phone className={contactStyles.contactIcon} />
                    </div>
                    <div>
                      <p className={contactStyles.contactText}>
                        Booking Hotline
                      </p>
                      <p className={contactStyles.contactDetail}>
                        +91 8056397525
                      </p>
                    </div>
                  </div>

                  <div className={contactStyles.contactItem}>
                    <div className={contactStyles.contactIconContainer}>
                      <Mail className={contactStyles.contactIcon} />
                    </div>
                    <div>
                      <p className={contactStyles.contactText}>Email Address</p>
                      <p className={contactStyles.contactDetail}>
                        bookings@cineplex.com
                      </p>
                      <p className={contactStyles.contactDetail}>
                        support@cineplex.com
                      </p>
                    </div>
                  </div>

                  <div className={contactStyles.contactItem}>
                    <div className={contactStyles.contactIconContainer}>
                      <MapPin className={contactStyles.contactIcon} />
                    </div>
                    <div>
                      <p className={contactStyles.contactText}>
                        Main Theater Location
                      </p>
                      <p className={contactStyles.contactDetail}>
                        123 Cinema Street, Film City, Mumbai
                      </p>
                      <p className={contactStyles.contactSubDetail}>
                        +4 other locations across the city
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Support Card */}
            <div className={contactStyles.cardRelative}>
              <div className={contactStyles.emergencyCardGradient}></div>
              <div className={contactStyles.emergencyCard}>
                <h3 className={contactStyles.emergencyTitle}>
                  <Phone className={contactStyles.emergencyIcon} />
                  Urgent Show-Related Issues
                </h3>
                <p className={contactStyles.emergencyText}>
                  For urgent issues during a movie screening (sound, projection,
                  etc.)
                </p>
                <div className="flex items-center">
                  <div className={contactStyles.emergencyHotline}>
                    HOTLINE: +91 8299431275
                  </div>
                  <span className={contactStyles.emergencyNote}>
                    Available during showtimes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
