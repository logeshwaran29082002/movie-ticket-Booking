import React, { useEffect, useState } from "react";
import {
  Clapperboard,
  Film,
  Star,
  Ticket,
  Popcorn,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { footerStyles } from "../assets/dummyStyles";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Releases", href: "/releases" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" }
  ];

  const genreLinks = [
    { label: "Horror", href: "/movies" },
    { label: "Thriller", href: "/movies" },
    { label: "Action", href: "/movies" },
    { label: "Drama", href: "/movies" },
    { label: "Comedy", href: "/movies" }
  ];

  const floatingIcons = [Clapperboard, Film, Star, Ticket, Popcorn];

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className={footerStyles.footer}>
      <style>{footerStyles.customCSS}</style>

      {/* FLOATING ICONS */}
      <div className={footerStyles.floatingIconsContainer}>
        {[...Array(12)].map((_, i) => {
          const IconComponent = floatingIcons[i % floatingIcons.length];
          return (
            <div
              key={i}
              className={footerStyles.floatingIcon}
              style={{
                left: `${(i * 23) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animation: `float ${6 + (i % 5)}s infinite ease-in-out`,
                animationDelay: `${(i % 4) * 0.6}s`
              }}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className={footerStyles.mainContainer}>

        {/* GRID CONTENT */}
        <div className={footerStyles.gridContainer}>

          {/* Quick Links */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <div className={footerStyles.sectionDot} />
              Quick Links
            </h3>
            <ul className={footerStyles.linksList}>
              {links.map((item, index) => (
                <li key={index} className={footerStyles.linkItem}>
                  <span className={footerStyles.linkDot}></span>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Genre Links */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <div className={footerStyles.sectionDot} />
              Genres
            </h3>
            <ul className={footerStyles.linksList}>
              {genreLinks.map((g, index) => (
                <li key={index} className={footerStyles.linkItem}>
                  <span className={footerStyles.linkDot}></span>
                  <a href={g.href}>{g.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <div className={footerStyles.sectionDot} />
              Contact Us
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  contact@hexagonsservices.com
                </span>
              </li>

              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>+91 8299431275</span>
              </li>

              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  Lucknow, India
                </span>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <div className={footerStyles.sectionDot} />
              Follow Us
            </h3>

            <div className={footerStyles.socialContainer}>
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} className={footerStyles.socialLink} href="#">
                  <Icon className={footerStyles.socialIcon} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className={footerStyles.divider}>
          <div className={footerStyles.dividerIconContainer}>
            <Clapperboard className={footerStyles.dividerIcon} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={footerStyles.bottomBar}>
          <span className={footerStyles.designedByText}>
            © {currentYear} CineNews. All rights reserved.
          </span>

          <div className={footerStyles.policyLinks}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, i) => (
                <a key={i} href="#" className={footerStyles.policyLink}>
                  {item}
                </a>
              )
            )}
          </div>
        </div>

      </div>

      {/* SCROLL TO TOP BUTTON */}
      {isVisible && (
        <button className={footerStyles.scrollTopButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
