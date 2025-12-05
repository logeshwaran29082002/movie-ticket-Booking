import React, { useState } from "react";
import { loginStyles } from "../assets/dummyStyles";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Film, Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email) {
      setIsLoading(false);
      toast.error("Please enter your email");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setIsLoading(false);
      toast.error("Password must be at least 6 characters long");
      return;
    }

    console.log("Login Data:", formData);

    // simulate API request
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful!");
    }, 1000);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={loginStyles.pageContainer}>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <div className="relative max-w-md z-10">
        <div className={loginStyles.backButtonContainer}>
          <button onClick={goBack} className={loginStyles.backButton}>
            <ArrowLeft size={20} className={loginStyles.backButtonIcon} />
            <span className={loginStyles.backButtonText}>Back to Home</span>
          </button>
        </div>

        <div className={loginStyles.cardContainer}>
          <div className={loginStyles.cardHeader}></div>

          <div className={loginStyles.cardContent}>
            <div className={loginStyles.headerContainer}>
              <div className={loginStyles.headerIconContainer}>
                <Film className={loginStyles.headerIcon} size={28} />
                <h2 className={loginStyles.headerTitle}>CINEMA ACCESS</h2>
              </div>
              <p className={loginStyles.headerSubtitle}>
                Enter your credentials to continue the experience
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className={loginStyles.inputGroup}>
                <label htmlFor="email" className={loginStyles.label}>
                  Email Address
                </label>
                <div className={loginStyles.inputContainer}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={loginStyles.input}
                    placeholder="Your Email Address"
                  />
                </div>
              </div>

              {/* Password */}
              <div className={loginStyles.inputGroup}>
                <label htmlFor="password" className={loginStyles.label}>
                  Password
                </label>
                <div className={loginStyles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={loginStyles.input}
                    placeholder="Your Password"
                  />

                  {/* Show/Hide */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={loginStyles.passwordToggle}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <div className={loginStyles.actions}>
                <button
                  type="submit"
                  className={loginStyles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
