"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    {
      label: "OPERATOR NAME",
      type: "text",
      value: name,
      setter: setName,
      placeholder: "John Doe",
      required: false,
    },
    {
      label: "EMAIL COORDINATES",
      type: "email",
      value: email,
      setter: setEmail,
      placeholder: "founder@venture.com",
      required: true,
    },
    {
      label: "ACCESS KEY",
      type: "password",
      value: password,
      setter: setPassword,
      placeholder: "••••••••••",
      required: true,
    },
    {
      label: "CONFIRM ACCESS KEY",
      type: "password",
      value: confirm,
      setter: setConfirm,
      placeholder: "••••••••••",
      required: true,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(60,90,160,0.18),rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 text-xs tracking-wide text-white/70">
        <div className="flex items-center gap-2 font-semibold text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-xs">
            F
          </div>
          FOUNDEROS
        </div>
        <div className="text-green-400">STATUS: OPERATIONAL</div>
      </header>

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md">
          {/* Glow */}
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-14 rounded-full bg-blue-600/10 blur-[140px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-heading text-4xl tracking-wide">
                INITIALIZE
              </h1>
              <p className="mt-2 text-xs tracking-widest text-white/40">
                CREATE YOUR COMMAND ACCESS
              </p>
            </div>

            {/* Step indicator */}
            <div className="mb-8 flex items-center gap-2">
              <div className="h-px flex-1 bg-blue-600/40" />
              <span className="text-[10px] tracking-widest text-blue-400/70">
                NEW OPERATOR REGISTRATION
              </span>
              <div className="h-px flex-1 bg-blue-600/40" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <label className="mb-1.5 block text-[10px] tracking-widest text-white/50">
                    {field.label}
                    {!field.required && (
                      <span className="ml-2 text-white/25">OPTIONAL</span>
                    )}
                  </label>
                  <div className="rounded-md border border-white/10 bg-black/40 px-3 py-2.5 transition-colors focus-within:border-blue-500/50 focus-within:bg-black/60">
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                    />
                  </div>
                </motion.div>
              ))}

              {/* Password strength hint */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2"
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                        password.length >= (i + 1) * 3
                          ? i < 2
                            ? "bg-red-500"
                            : i === 2
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-white/30 shrink-0">
                    {password.length < 6
                      ? "WEAK"
                      : password.length < 10
                      ? "FAIR"
                      : "STRONG"}
                  </span>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-center text-xs text-red-400"
                >
                  ⚠ {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -4 } : {}}
                whileTap={!loading ? { y: -1, scale: 0.98 } : {}}
                transition={{
                  y: { type: "spring", stiffness: 160, damping: 18 },
                  scale: { type: "spring", stiffness: 220, damping: 20 },
                }}
                className="mt-2 w-full rounded-md bg-blue-600 py-3 text-sm font-semibold tracking-wide text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    INITIALIZING...
                  </span>
                ) : (
                  "DEPLOY ACCOUNT"
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-7 text-center text-xs text-white/40">
              Already initialized?{" "}
              <Link href="/login" className="text-white hover:underline">
                Access command center →
              </Link>
            </div>
          </motion.div>

          {/* Bottom label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-[10px] tracking-widest text-white/20"
          >
            SECURE REGISTRATION · ENCRYPTED STORAGE · v2.4.0
          </motion.p>
        </div>
      </section>
    </main>
  );
}