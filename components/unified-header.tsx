"use client"
import { Globe } from "lucide-react"
import { ModernMenuBar } from "@/components/modern-menu-bar"

export function UnifiedHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-white" />
            <h1 className="text-xl font-semibold text-white">Zaman Web</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ModernMenuBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
