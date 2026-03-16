"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, CheckSquare, Zap, MessageSquare, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard",       icon: LayoutDashboard, label: "Dashboard"  },
  { href: "/dashboard/tasks", icon: CheckSquare,     label: "Tasks"      },
  { href: "/dashboard/focus", icon: Zap,             label: "Focus"      },
  { href: "/dashboard/ai",    icon: MessageSquare,   label: "AI Planner" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-20 flex-shrink-0 flex-col items-center border-r border-white/[0.08] bg-black/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.4)]">
        <span style={{ fontFamily: "var(--font-head)", fontSize: 18 }}>F</span>
      </div>

      {/* Nav */}
      <nav className="mt-10 flex flex-1 flex-col items-center gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} title={item.label} className="relative">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 340, damping: 24 }}
                className={clsx(
                  "relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-150",
                  isActive
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-white/40 hover:bg-white/[0.06] hover:text-white/75"
                )}
              >
                <Icon size={19} strokeWidth={isActive ? 2 : 1.75} />
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute -left-[18px] h-6 w-[3px] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className="h-px w-6 bg-white/[0.08]" />
        <Link href="/dashboard/settings" title="Settings">
          <motion.div whileHover={{ y: -1 }} className="flex h-9 w-9 items-center justify-center rounded-xl text-white/30 hover:bg-white/[0.06] hover:text-white/60 transition-colors">
            <Settings size={15} strokeWidth={1.75} />
          </motion.div>
        </Link>
        <motion.button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sign out"
          whileHover={{ y: -1 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/30 hover:bg-white/[0.06] hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer"
        >
          <LogOut size={15} strokeWidth={1.75} />
        </motion.button>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      </div>
    </aside>
  );
}