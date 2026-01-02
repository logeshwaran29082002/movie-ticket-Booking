import React, { useEffect, useState } from "react";
import {
  Clapperboard,
  Film,
  Star,
  Ticket,
  Popcorn,
  Facebook,
  Twitter,
  Instagram,
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

  const links = ["Home", "Movies", "Releases", "Contact", "Login"];
  const genreLinks = ["Horror", "Thriller", "Action", "Drama", "Comedy"];
  const floatingIcons = [Clapperboard, Film, Star, Ticket, Popcorn];

  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <footer className={footerStyles.footer}>
      <style>{footerStyles.customCSS}</style>

      {/* Floating Background Icons */}
      <div className={footerStyles.floatingIconsContainer}>
        {[...Array(12)].map((_, i) => {
          const Icon = floatingIcons[i % floatingIcons.length];
          return (
            <div
              key={i}
              className={footerStyles.floatingIcon}
              style={{
                left: `${(i * 22) % 100}%`,
                top: `${(i * 19) % 100}%`,
                animation: `float ${6 + (i % 4)}s infinite ease-in-out`,
                animationDelay: `${(i % 5) * 0.7}s`,
              }}
            >
              <Icon className="w-8 h-8" />
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className={footerStyles.mainContainer}>
        <div className={footerStyles.gridContainer}>

          {/* Brand Section */}
          <div className={footerStyles.brandContainer}>
            <div className={footerStyles.brandLogoContainer}>
              <span className="relative">
                <div className={footerStyles.logoGlow}></div>
                <div className={footerStyles.logoContainer}>
                  <Clapperboard className={footerStyles.logoIcon} />
                </div>
              </span>
              <span className={`${footerStyles.brandTitle}`}>
                Cine<span className={footerStyles.brandTitleWhite}>Verse</span>
              </span>
            </div>

            <p className={footerStyles.brandDescription}>
              Experience the dark side of cinema with the latest news, reviews,
              and exclusive content.
            </p>

            <div className={footerStyles.socialContainer}>
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className={footerStyles.socialLink}>
                  <Icon className={footerStyles.socialIcon} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <span className={footerStyles.sectionDot}></span>
              Explore
            </h3>
            <ul className={footerStyles.linksList}>
              {links.map((item, i) => (
                <li key={i} className={footerStyles.linkItem}>
                  <span className={footerStyles.linkDot}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <span className={footerStyles.sectionDot}></span>
              Genres
            </h3>
            <ul className={footerStyles.linksList}>
              {genreLinks.map((item, i) => (
                <li key={i} className={footerStyles.linkItem}>
                  <span className={footerStyles.linkDot}></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={footerStyles.sectionHeader}>
              <span className={footerStyles.sectionDot}></span>
              Contact Us
            </h3>
            <ul className={footerStyles.contactList}>

              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  contact@lrtechservices.com
                </span>
              </li>

              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  +91 8299431275
                </span>
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

        </div>

        {/* Divider */}
        <div className={footerStyles.divider}>
          <div className={footerStyles.dividerIconContainer}>
            <Clapperboard className={footerStyles.dividerIcon} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className={footerStyles.bottomBar}>
          <div className={footerStyles.designedBy}>
            <span className={footerStyles.designedByText}>Designed by</span>
            <a href="#" className={footerStyles.designedByLink}>
              Hexagon Digital Services
            </a>
          </div>

          <div className={footerStyles.policyLinks}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (policy, i) => (
                <a key={i} href="#" className={footerStyles.policyLink}>
                  {policy}
                </a>
              )
            )}
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button className={footerStyles.scrollTopButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
