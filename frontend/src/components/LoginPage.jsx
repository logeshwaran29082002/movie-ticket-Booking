import React, { useState } from "react";
import { loginStyles } from "../assets/dummyStyles";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Film, Eye, EyeOff, Clapperboard, Popcorn } from "lucide-react";

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
      console.warn("Login Blocked");
      return;
    }

    console.log("Login Data:", formData);

    // simulate API request
    setTimeout(() => {
      setIsLoading(false);
      // Persist auth to localStorage so Navbar detects logged-in state
      try {
        const authObj = { isLoggedIn: true, email: formData.email };
        localStorage.setItem("cine_auth", JSON.stringify(authObj));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email || "");
        localStorage.setItem("cine_user_email", formData.email || "");
        console.log("Auth saved to localStorage:", authObj);
      } catch (err) {
        console.error("Failed to login:", err);
      }
      toast.success("Login successful! Redirecting to your cinima...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }, 1500);
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
                  <div className={loginStyles.inputIcon}>
                    <Clapperboard size={16} className="text-red-500" />
                  </div>
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
                    className={loginStyles.inputWithIcon}
                    placeholder="Enter Your Password"
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
             <button type="submit" disabled={isLoading} className={`${loginStyles.submitButton} ${
              isLoading ? loginStyles.submitButtonDisabled:""
             }`}>
               {isLoading ? (
                 <div className={loginStyles.buttonContent}>
                  <div className={loginStyles.loadingSpinner}></div>
                  <span className={loginStyles.buttonText}>SIGNING IN...</span>
                 </div>
               ):(
                  <div className={loginStyles.buttonContent}>
                  <Popcorn size={18} className={loginStyles.buttonIcon}/>
                  <span className={loginStyles.buttonText}>ACCESS YOUR ACCOUNT</span>
                 </div>
               )}
             </button>
            </form>
          </div>
        </div>
        <div className={loginStyles.footerContainer}>
          <p className={loginStyles.footerText}>
            Don't have an account ?{""}
            <a href="/signup" className={loginStyles.footerLink}>
          create one now  
           </a>
          </p>
        </div>
      </div>
      <style>{loginStyles.customCSS}</style>
    </div>
  );
}

export default LoginPage;
