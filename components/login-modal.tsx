"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)

      // Dummy credentials check
      if (email === "demo@zamanweb.com" && password === "demo123") {
        // Create dummy user session
        const dummyUser = {
          id: 1,
          name: "Demo User",
          email: "demo@zamanweb.com",
          plan: "Professional",
        }

        // Store user in localStorage (in real app, use proper auth)
        localStorage.setItem("user", JSON.stringify(dummyUser))

        onClose()
        router.push("/dashboard")
      } else {
        alert("Gunakan kredensial demo:\nEmail: demo@zamanweb.com\nPassword: demo123")
      }
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm">
        <Card className="shadow-xl border-2 border-white ring-4 ring-white/20 shadow-white/10 bg-navy-900/80 backdrop-blur-sm rounded-2xl relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 text-white/60 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <CardHeader className="space-y-3 pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-semibold text-center text-white">Masuk ke Akun Anda</CardTitle>
            <CardDescription className="text-center text-white/80 text-base">
              Silakan masuk untuk melanjutkan
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="mb-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <p className="text-sm text-blue-200 font-medium">Demo Account:</p>
              <p className="text-xs text-blue-100">Email: demo@zamanweb.com</p>
              <p className="text-xs text-blue-100">Password: demo123</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-400 focus:ring-blue-400/20 focus:ring-2"
                  />
                  <span className="text-sm text-white/80">Ingat saya</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="text-center pt-6 mt-6 border-t border-white/20">
              <p className="text-sm text-white/80">
                Belum punya akun?{" "}
                <button className="text-blue-300 hover:text-blue-200 font-medium transition-colors hover:underline">
                  Daftar sekarang
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
