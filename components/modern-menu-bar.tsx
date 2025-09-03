"use client"

import type * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Home, BookOpen, HelpCircle, FileText, User } from "lucide-react"
import { LoginModal } from "./login-modal"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  gradient: string
  iconColor: string
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function ModernMenuBar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Beranda",
      href: "/",
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Tutorial",
      href: "/tutorial",
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-orange-500",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Pertanyaan",
      href: "/pertanyaan",
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Artikel",
      href: "/artikel",
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
      iconColor: "text-red-500",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Login",
      onClick: () => setIsLoginModalOpen(true),
      gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(107,33,168,0) 100%)",
      iconColor: "text-purple-500",
    },
  ]

  return (
    <>
      <motion.nav
        className="p-2 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 relative overflow-hidden"
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          className="absolute -inset-2 bg-gradient-radial from-transparent via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90% to-transparent rounded-3xl z-0 pointer-events-none"
          variants={navGlowVariants}
        />
        <ul className="flex items-center gap-2 relative z-10">
          {menuItems.map((item, index) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />
                {item.href ? (
                  <>
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-white/80 group-hover:text-white transition-colors rounded-xl"
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-white/80 group-hover:text-white transition-colors rounded-xl"
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  </>
                ) : (
                  <>
                    <motion.button
                      onClick={item.onClick}
                      className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-white/80 group-hover:text-white transition-colors rounded-xl"
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.button>
                    <motion.button
                      onClick={item.onClick}
                      className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-white/80 group-hover:text-white transition-colors rounded-xl"
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.button>
                  </>
                )}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
