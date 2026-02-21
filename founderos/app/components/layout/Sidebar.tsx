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
    href: "/dashboard/ai",
    icon: MessageSquare,
    label: "AI",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-20 flex-shrink-0 flex-col items-center border-r border-white/[0.08] bg-black/50 backdrop-blur-xl">
      
      {/* Logo */}
      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
        F
      </div>

      {/* Nav */}
      <nav className="mt-10 flex flex-1 flex-col items-center gap-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="relative">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={clsx(
                  "relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200",
                  isActive
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-white/40 hover:bg-white/[0.06] hover:text-white/80"
                )}
              >
                <Icon size={20} />

                {/* Active glow bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute -left-[18px] h-6 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom status dot */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="h-[1px] w-6 bg-white/[0.08]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      </div>
    </aside>
  );
}
