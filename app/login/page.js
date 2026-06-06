"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, KeyRound } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function Login() {
  const { loginWithGoogle, loginWithGithub, loginWithEmail, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to log in with email. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to log in with Google");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to log in with GitHub");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#FFFDF9" }} suppressHydrationWarning>
      <Navbar variant="landing" />
      <main className="auth-page" suppressHydrationWarning>
      <div className="auth-card">

        {/* Brand Header */}
        <div className="auth-header">
          <h2 className="auth-title">
            Welcome Back
          </h2>
          <p className="auth-subtitle">
            Sign in to continue to <span>DevConnect AI</span>
          </p>
        </div>

        {error && (
          <div className="auth-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleEmailLogin}>
          <div className="auth-form-group">
            <div className="auth-input-icon">
              <Mail className="h-5 w-5" />
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="auth-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-form-group">
            <div className="auth-input-icon">
              <KeyRound className="h-5 w-5" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-brutalist-primary"
              style={{
                width: "100%",
                padding: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                fontSize: "1rem"
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="auth-divider">
          <span>Or continue with</span>
        </div>

        <div className="auth-social-grid">
          <button
            onClick={handleGoogleLogin}
            className="btn-auth-social"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="btn-auth-social"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            GitHub
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
    </div>
  );
}