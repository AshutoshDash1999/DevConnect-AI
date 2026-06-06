"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar({ variant = "landing" }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ─── Landing Page Navbar ───────────────────────────────────────────────────
  if (variant === "landing") {
    return (
      <nav id="landing-nav">
        <Link href="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <span>DevConnect AI</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`} id="nav-menu">
          <a href="/#features" onClick={() => setIsMenuOpen(false)}>AI Showcase</a>
          <a href="/#workflow" onClick={() => setIsMenuOpen(false)}>How It Works</a>
          <a href="/#stats" onClick={() => setIsMenuOpen(false)}>Stats</a>
          <a href="/#waitlist" onClick={() => setIsMenuOpen(false)}>Waitlist</a>
          <Link href="/dashboard" className="btn-brutalist-nav" onClick={() => setIsMenuOpen(false)}>
            Open Community App
          </Link>
        </div>
      </nav>
    );
  }

  // ─── Dashboard / App Navbar ────────────────────────────────────────────────
  return (
    <header className="navbar">
      <Link href="/" className="nav-brand" title="Back to Home">
        <span>DevConnect AI</span>
      </Link>

      <div className="nav-search">
        <span className="nav-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search discussions, tags, error codes..."
        />
      </div>

      <div className="nav-actions">
        <button className="btn-icon" title="AI Code Review Alerts">
          ✨
        </button>
        <button className="btn-icon" title="Notifications">
          🔔
        </button>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Profile Link */}
            <Link
              href="/profile"
              className="user-profile-menu"
              title="View Profile"
              style={{ textDecoration: "none" }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-full)",
                    border: "2px solid var(--border-color)",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="avatar online">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <span
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {user.displayName?.split(" ")[0] || "Profile"}
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="btn-icon"
              title="Logout"
              style={{ fontSize: "1rem" }}
            >
              🚪
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            style={{
              padding: "8px 16px",
              background: "var(--accent-primary)",
              color: "#000",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}