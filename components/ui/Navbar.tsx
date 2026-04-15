"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-navbar">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo" aria-label="LockerRoom Home">
            <img
              src="/logo.webp"
              alt="LockerRoom Logo"
              className="w-32 h-auto object-contain"
            />
          </Link>

          <div className="navbar-links">
            <Link href="/" className="navbar-link">Home</Link>
            <Link href="/#portfolio" className="navbar-link">Portfolio</Link>
            <Link href="/gallery" className="navbar-link">ALL DESIGN</Link>
            <Link href="/#lokasi" className="navbar-link">Lokasi</Link>
            <Link href="/configurator" className="navbar-link navbar-link-cta">
              Buat Desain
            </Link>
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            id="navbar-toggle"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {isOpen && (
        <div className="navbar-mobile-overlay" id="navbar-mobile-menu">
          <button
            className="navbar-mobile-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <Image
            src="/logo.webp"
            alt="LockerRoom Logo"
            width={180}
            height={60}
            style={{ objectFit: "contain", marginBottom: "2rem" }}
            priority
          />

          <Link href="/" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/#portfolio" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/gallery" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>ALL DESIGN</Link>
          <Link href="/#lokasi" className="navbar-mobile-link" onClick={() => setIsOpen(false)}>Lokasi</Link>
          <Link href="/configurator" className="navbar-mobile-link" onClick={() => setIsOpen(false)} style={{ color: "var(--gold)" }}>
            Buat Desain
          </Link>
        </div>
      )}
    </>
  );
}
