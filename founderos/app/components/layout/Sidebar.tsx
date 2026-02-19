"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Zap,
  MessageSquare,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/tasks",
    icon: CheckSquare,
    label: "Tasks",
  },
  {
    href: "/dashboard/focus",
    icon: Zap,
    label: "Focus",
  },
  {
    href: "/dashboard/notes",
    icon: MessageSquare,
    label: "Notes",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-20 flex-shrink-0 flex-col items-center border-r border-white/10 bg-black/40 backdrop-blur-xl">
      
      {/* Logo */}
      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white">
        F
      </div>

      {/* Nav */}
      <nav className="mt-10 flex flex-1 flex-col items-center gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="relative">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-blue-600/20 text-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.35)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={20} />

                {/* Active glow bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute -left-3 h-6 w-1 rounded-full bg-blue-500"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom status dot */}
      <div className="mb-6 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
    </aside>
  );
}
