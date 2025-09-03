"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { WizardForm } from "@/components/wizard-form"
import { UnifiedHeader } from "@/components/unified-header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function HomePage() {
  const [businessType, setBusinessType] = useState("")
  const [showWizard, setShowWizard] = useState(false)
  const [expandedCards, setExpandedCards] = useState({
    starter: false,
    growth: false,
    pro: false,
    enterprise: false,
  })

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (businessType.trim()) {
      setShowWizard(true)
    }
  }

  const toggleCardExpansion = (cardName: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }))
  }

  if (showWizard) {
    return <WizardForm businessType={businessType} onBack={() => setShowWizard(false)} />
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <UnifiedHeader />

        <main className="pt-38 py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 text-balance leading-tight">
              Wujudkan Website
              <br />
              Impian Anda
            </h1>

            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto text-pretty leading-relaxed">
              Platform profesional untuk membuat website bisnis yang stunning. Proses mudah, hasil berkualitas tinggi,
              website siap dalam 2x24 jam.
            </p>

            <Card className="max-w-5xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl">
              <CardHeader className="pb-0 pt-4">
                <CardTitle className="text-4xl font-bold text-white mb-2">Mulai Sekarang</CardTitle>
                <CardDescription className="text-lg text-gray-300 leading-relaxed">
                  Masukkan jenis bisnis atau usaha Anda untuk mendapatkan rekomendasi template terbaik
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6 px-12">
                <form onSubmit={handleBusinessSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Contoh: Restoran, Cafe, Toko Online, Jasa Konsultan, Klinik Kecantikan, Rental Kendaraan..."
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full h-14 text-xl border-2 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white text-gray-900 placeholder:text-gray-500 rounded-xl px-4 transition-all duration-200"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-64 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                    disabled={!businessType.trim()}
                  >
                    Lihat Template Terbaik
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-4">Populer:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Company Profile", "UMKM & Bisnis Lokal", "E-Commerce", "Restoran & Kuliner", "Jasa Profesional"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setBusinessType(suggestion)}
                      className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 border border-slate-600 hover:border-slate-500"
                    >
                      {suggestion}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-5xl mt-32 px-4">
            <div className="grid md:grid-cols-3 gap-12 mb-32">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Proses Cepat</h3>
                <p className="text-gray-300 leading-relaxed">
                  Website profesional siap dalam 2x24 jam dengan proses yang mudah dan efisien
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Kualitas Terjamin</h3>
                <p className="text-gray-300 leading-relaxed">
                  Template premium dan desain profesional yang sesuai dengan standar industri
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Support Lengkap</h3>
                <p className="text-gray-300 leading-relaxed">
                  Dukungan teknis dan panduan lengkap untuk memaksimalkan website Anda
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Paket Harga Terbaik</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Investasi terbaik untuk bisnis Anda. Dapatkan website profesional dengan harga yang kompetitif.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
              <Card className="bg-gray-900 border border-gray-700 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out hover:border-gray-500 hover:bg-gray-800/50 transform-gpu group h-fit">
                <CardHeader className="text-center pb-6 pt-12">
                  <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-500">
                    Starter
                  </CardTitle>
                  <div className="mb-6">
                    <div className="text-lg text-gray-400 line-through mb-1">Rp 1.000.000</div>
                    <div className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-500">
                      Rp 850.000
                    </div>
                    <div className="text-sm text-green-400 font-medium mt-1">Hemat 15%</div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex flex-col">
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>
                        Buat <b> 1 </b> situs website
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Domain .com</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>SSL Certificate</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Support 3 Bulan</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-white hover:bg-blue-500 hover:text-white text-black font-medium h-11 group-hover:scale-105 transition-all duration-300 mt-auto"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Mulai Sekarang
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-2 border-white shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out relative transform-gpu group hover:border-blue-300 h-fit">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium group-hover:bg-blue-100 transition-colors duration-500">
                    TERPOPULER
                  </span>
                </div>
                <CardHeader className="text-center pb-6 pt-12">
                  <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-500">
                    Growth
                  </CardTitle>
                  <div className="mb-6">
                    <div className="text-lg text-gray-400 line-through mb-1">Rp 1.750.000</div>
                    <div className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-500">
                      Rp 1.435.000
                    </div>
                    <div className="text-sm text-green-400 font-medium mt-1">Hemat 18%</div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex flex-col">
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>
                        {" "}
                        Buat <b> 3 </b> situs website{" "}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Domain .com</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>SSL Certificate</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Support 6 Bulan</span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${expandedCards.growth ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                        <span>SEO Optimization</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => toggleCardExpansion("growth")}
                      className="flex items-center justify-center w-full text-gray-400 hover:text-white transition-colors duration-200 mb-4 text-sm"
                    >
                      {expandedCards.growth ? (
                        <>
                          <span>Lihat Lebih Sedikit</span>
                          <ChevronUp className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Lihat Semua Fitur</span>
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                    <Button
                      className="w-full bg-white hover:bg-green-500 hover:text-white text-black font-medium h-11 group-hover:scale-105 transition-all duration-300"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      Mulai Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border border-gray-700 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out hover:border-gray-500 hover:bg-gray-800/50 transform-gpu group h-fit">
                <CardHeader className="text-center pb-6 pt-12">
                  <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-500">
                    Pro
                  </CardTitle>
                  <div className="mb-6">
                    <div className="text-lg text-gray-400 line-through mb-1">Rp 5.000.000</div>
                    <div className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-500">
                      Rp 4.250.000
                    </div>
                    <div className="text-sm text-green-400 font-medium mt-1">Hemat 15%</div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex flex-col">
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>
                        Buat <b> 10 </b> situs website
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Domain .com</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>SSL Certificate</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Support 1 Tahun</span>
                    </div>
                    <div
                      className={`space-y-4 overflow-hidden transition-all duration-300 ${expandedCards.pro ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                        <span>SEO Optimization</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                        <span>E-commerce Ready</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => toggleCardExpansion("pro")}
                      className="flex items-center justify-center w-full text-gray-400 hover:text-white transition-colors duration-200 mb-4 text-sm"
                    >
                      {expandedCards.pro ? (
                        <>
                          <span>Lihat Lebih Sedikit</span>
                          <ChevronUp className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Lihat Semua Fitur</span>
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                    <Button
                      className="w-full bg-white hover:bg-purple-500 hover:text-white text-black font-medium h-11 group-hover:scale-105 transition-all duration-300"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      Mulai Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border border-gray-700 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out hover:border-gray-500 hover:bg-gray-800/50 transform-gpu group h-fit">
                <CardHeader className="text-center pb-6 pt-12">
                  <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-500">
                    Enterprise
                  </CardTitle>
                  <div className="mb-6">
                    <div className="text-lg text-gray-400 line-through mb-1">Rp 12.000.000</div>
                    <div className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-500">
                      Rp 9.600.000
                    </div>
                    <div className="text-sm text-green-400 font-medium mt-1">Hemat 20%</div>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex flex-col">
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Unlimited Halaman</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Domain .com</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>SSL Certificate</span>
                    </div>
                    <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                      <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span>Support 2 Tahun</span>
                    </div>
                    <div
                      className={`space-y-4 overflow-hidden transition-all duration-300 ${expandedCards.enterprise ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                        <span>SEO Optimization</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                        <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                        <span>Custom Development</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => toggleCardExpansion("enterprise")}
                      className="flex items-center justify-center w-full text-gray-400 hover:text-white transition-colors duration-200 mb-4 text-sm"
                    >
                      {expandedCards.enterprise ? (
                        <>
                          <span>Lihat Lebih Sedikit</span>
                          <ChevronUp className="h-4 w-4 ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Lihat Semua Fitur</span>
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                    <Button
                      className="w-full bg-white hover:bg-orange-500 hover:text-white text-black font-medium h-11 group-hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        const message = encodeURIComponent(
                          "Halo! Saya tertarik dengan paket Enterprise untuk website bisnis saya. Bisa tolong berikan informasi lebih lanjut?",
                        )
                        const phoneNumber = "6281234567890" // Replace with actual WhatsApp number
                        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
                      }}
                    >
                      Hubungi Kami
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
