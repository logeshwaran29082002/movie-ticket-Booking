import React, { useState, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import {
  Calendar,
  Clapperboard,
  Film,
  Home,
  Mail,
  Ticket,
  Menu,
  X,
  LogIn,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "movies", label: "Movies", icon: Film, path: "/movies" },
    { id: "releases", label: "Releases", icon: Calendar, path: "/releases" },
    { id: "contact", label: "Contact", icon: Mail, path: "/contact" },
    { id: "bookings", label: "Bookings", icon: Ticket, path: "/bookings" },
  ];

  // scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${navbarStyles.nav.base} ${
        isScrolled ? navbarStyles.nav.scrolled : navbarStyles.nav.notScrolled
      }`}
    >
      <div className={navbarStyles.container}>
        {/* LOGO */}
        <div className={navbarStyles.logoContainer}>
          <div className={navbarStyles.logoIconContainer}>
            <Clapperboard className={navbarStyles.logoIcon} />
          </div>
          <div className={navbarStyles.logoText}>CineVerse</div>
        </div>

        {/* DESKTOP NAV */}
        <div className={navbarStyles.desktopNav}>
          <div className={navbarStyles.desktopNavItems}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `group relative ${navbarStyles.desktopNavLink.base} ${
                      isActive
                        ? navbarStyles.desktopNavLink.active
                        : navbarStyles.desktopNavLink.inactive
                    }`
                  }
                >
                  <Icon className={navbarStyles.desktopNavIcon} />
                  <span>{item.label}</span>

                  {/* ✅ Active always visible, hover = left → right */}
                  <span
                    className={`
          absolute bottom-2 left-6 h-[2px] w-8 bg-red-500 rounded-full
          origin-left transition-transform duration-500 ease-out
          scale-x-0 group-hover:scale-x-100
        `}
                    style={{
                      transform:
                        window.location.pathname === item.path
                          ? "scaleX(1)"
                          : undefined,
                    }}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className={navbarStyles.rightSection}>
          {/* DESKTOP AUTH */}
          <div
            className={`${navbarStyles.authSection} ${navbarStyles.desktopAuth}`}
          >
            {isLoggedIn ? (
              <button className={navbarStyles.logoutButton}>
                <LogOut className={navbarStyles.authIcon} /> Log out
              </button>
            ) : (
              <button className={navbarStyles.loginButton}>
                <LogIn className={navbarStyles.authIcon} /> Log in
              </button>
            )}
          </div>

          {/* HAMBURGER */}
          <div className={navbarStyles.mobileMenuToggle}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={navbarStyles.mobileMenuButton}
            >
              {isMenuOpen ? (
                <X className={navbarStyles.mobileMenuIcon} />
              ) : (
                <Menu className={navbarStyles.mobileMenuIcon} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className={navbarStyles.mobileMenuPanel}>
          <div className={navbarStyles.mobileMenuItems}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${navbarStyles.mobileNavLink.base} ${
                      isActive
                        ? navbarStyles.mobileNavLink.active
                        : navbarStyles.mobileNavLink.inactive
                    }`
                  }
                >
                  <Icon className={navbarStyles.mobileNavIcon} />
                  <span className={navbarStyles.mobileNavText}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}

            <div className={navbarStyles.mobileAuthSection}>
              {isLoggedIn ? (
                <button className={navbarStyles.mobileLogoutButton}>
                  <LogOut className={navbarStyles.mobileAuthIcon} />
                  Logout
                </button>
              ) : (
                <button className={navbarStyles.mobileLoginButton}>
                  <LogIn className={navbarStyles.mobileAuthIcon} />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
