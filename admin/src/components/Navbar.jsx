import React, { useCallback, useEffect, useState } from "react";
import { styles4 } from "../assets/dummyStyles";
import { Calendar, Film, List, Menu, Ticket, X, XIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]); // this function helps in close the menu for mobile view when click on escape btn

  const NavItem = ({ to, Icon, label, end = false, onClick }) => (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `${styles4.navLinkBase} ${
          isActive ? styles4.navLinkActive : styles4.navLinkInactive
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`${styles4.navLinkIconBase} ${
              isActive ? styles4.navLinkIconActive : styles4.navLinkIconInactive
            }`}
          />
          <span
            className={`${styles4.navLinkTextBase} ${
              isActive ? styles4.navLinkTextActive : styles4.navLinkTextInactive
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <nav className={styles4.navbar}>
        <div className={styles4.navbarContainer}>
          <div className={styles4.navbarFlex}>
            {/* logo*/}
            <div className={styles4.logoContainer}>
              <div className={styles4.logoIcon}>
                <Film className={styles4.logoIconInner} />
              </div>
              <span className={styles4.logoText}>CINEVERSE</span>
            </div>
            {/* Desktop Links (unchanged look) */}
            <div className={styles4.desktopNav}>
              <NavItem to="/" Icon={Film} label="ADD MOVIES" end />
              <NavItem to="/listmovies" Icon={List} label="LIST MOVIES" />
              {/* Dashboard */}
              <NavItem to="/dashboard" Icon={Calendar} label="DASHBOARD" />
              {/* Bookings (new) */}
              <NavItem to="/bookings" Icon={Ticket} label="BOOKINGS" />
            </div>
            {/* toggle */}
            <div className="flex items-center lg:hidden">
              <button onClick={toggleOpen} className={styles4.mobileMenuButton}>
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className={styles4.mobileMenuIcon} />
                ) : (
                  <Menu className={styles4.mobileMenuIcon} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles4.mobileMenuContainer}`}></div>
      </nav>
    </>
  );
}

export default Navbar;
