"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Check,
  CreditCard,
  Eye,
  Users,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Search,
  ExternalLink,
  X,
} from "lucide-react"

import { Footer } from "./footer"

interface WizardFormProps {
  businessType: string
  onBack: () => void
}

const WizardForm = ({ businessType, onBack }: WizardFormProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [templatePage, setTemplatePage] = useState(0)
  const [templateSearch, setTemplateSearch] = useState("")
  const templatesPerPage = 6

  const [formData, setFormData] = useState({
    selectedTemplate: "",
    domain: "",
    package: "",
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  })

  const [domainStatus, setDomainStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")
  const [domainRecommendations, setDomainRecommendations] = useState<string[]>([])
  const [selectedExtension, setSelectedExtension] = useState(".com")

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)
  const [couponError, setCouponError] = useState("")
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)

  // Sample coupon codes - in real app, this would come from backend
  const validCoupons = [
    { code: "WELCOME10", discount: 10, type: "percentage" as const, description: "Diskon 10%" },
    { code: "NEWUSER", discount: 15, type: "percentage" as const, description: "Diskon 15%" },
    { code: "SAVE50K", discount: 50000, type: "fixed" as const, description: "Potongan Rp 50.000" },
    { code: "PROMO20", discount: 20, type: "percentage" as const, description: "Diskon 20%" },
  ]

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Masukkan kode kupon")
      return
    }

    setIsValidatingCoupon(true)
    setCouponError("")

    // Simulate API call
    setTimeout(() => {
      const coupon = validCoupons.find((c) => c.code.toLowerCase() === couponCode.toLowerCase())

      if (coupon) {
        setAppliedCoupon(coupon)
        setCouponError("")
      } else {
        setCouponError("Kode kupon tidak valid")
        setAppliedCoupon(null)
      }
      setIsValidatingCoupon(false)
    }, 1000)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  const calculateDiscount = (originalPrice: number) => {
    if (!appliedCoupon) return 0

    if (appliedCoupon.type === "percentage") {
      return Math.floor((originalPrice * appliedCoupon.discount) / 100)
    } else {
      return Math.min(appliedCoupon.discount, originalPrice)
    }
  }

  const formatPrice = (price: string) => {
    return Number.parseInt(price.replace(/[^\d]/g, ""))
  }

  const steps = [
    { id: 1, title: "Template", desc: "Pilih template" },
    { id: 2, title: "Domain", desc: "Pilih domain" },
    { id: 3, title: "Paket", desc: "Pilih paket" },
    { id: 4, title: "Data", desc: "Lengkapi data" },
    { id: 5, title: "Pembayaran", desc: "Metode bayar" },
    { id: 6, title: "Konfirmasi", desc: "Selesaikan" },
  ]

  const domainExtensions = [".com", ".co.id", ".id", ".net", ".org"]

  const checkDomainAvailability = async (domain: string, extension: string) => {
    if (!domain.trim()) {
      setDomainStatus("idle")
      setDomainRecommendations([])
      return
    }

    setDomainStatus("checking")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate domain availability (random for demo)
    const isAvailable = Math.random() > 0.3

    if (isAvailable) {
      setDomainStatus("available")
      setDomainRecommendations([])
    } else {
      setDomainStatus("taken")
      // Generate recommendations
      const recommendations = [
        `${domain}online${extension}`,
        `${domain}pro${extension}`,
        `${domain}biz${extension}`,
        `my${domain}${extension}`,
        `${domain}2024${extension}`,
      ]
      setDomainRecommendations(recommendations)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.domain) {
        checkDomainAvailability(formData.domain, selectedExtension)
      }
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [formData.domain, selectedExtension])

  const getTemplates = () => {
    const businessTypeLower = businessType.toLowerCase()

    // Company Profile templates
    if (
      businessTypeLower.includes("company profile") ||
      businessTypeLower.includes("kontraktor") ||
      businessTypeLower.includes("manufaktur") ||
      businessTypeLower.includes("konsultan")
    ) {
      return [
        {
          id: "company-profile-corporate",
          name: "Corporate Profile",
          preview: "/corporate-company-profile-website.png",
          description: "Template profesional untuk profil perusahaan dengan portofolio lengkap",
          usageCount: 2456,
          category: "Company Profile",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Portofolio", "Kontak"],
          tags: ["Korporat", "Profil Perusahaan", "Profesional", "Responsif"],
          styles: ["Desain Bersih", "Aksen Warna", "Tipografi Modern", "Mobile First"],
          features: ["SEO Optimized", "Fast Loading", "Formulir Kontak", "Integrasi Media Sosial"],
        },
        {
          id: "manufacturing-company",
          name: "Manufacturing Company",
          preview: "/manufacturing-industrial-company-website.png",
          description: "Template untuk perusahaan manufaktur dan industri",
          usageCount: 1876,
          category: "Company Profile",
          pages: ["Beranda", "Tentang Kami", "Produk", "Sertifikasi", "Kontak"],
          tags: ["Manufaktur", "Industri", "Produksi", "Teknologi"],
          styles: ["Desain Industri", "Tata Letak Teknis", "Warna Korporat", "Gambar Berkualitas"],
          features: ["Katalog Produk", "Sertifikasi", "Struktur Organisasi", "Formulir Kontak"],
        },
        {
          id: "contractor-business",
          name: "Contractor Business",
          preview: "/contractor-construction-business-website.png",
          description: "Template untuk kontraktor dan layanan konstruksi",
          usageCount: 1654,
          category: "Company Profile",
          pages: ["Beranda", "Tentang Kami", "Proyek", "Layanan", "Kontak"],
          tags: ["Kontraktor", "Konstruksi", "Bangunan", "Infrastruktur"],
          styles: ["Desain Kokoh", "Tata Letak Terstruktur", "Warna Solid", "Gambar Proyek"],
          features: ["Galeri Proyek", "Detail Layanan", "Testimoni Klien", "Formulir Kontak"],
        },
        {
          id: "consulting-firm",
          name: "Consulting Firm",
          preview: "/consulting-firm-professional-website.png",
          description: "Template untuk firma konsultan profesional",
          usageCount: 1432,
          category: "Company Profile",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Tim", "Blog", "Kontak"],
          tags: ["Konsultan", "Profesional", "Bisnis", "Strategi"],
          styles: ["Desain Elegan", "Tata Letak Profesional", "Warna Netral", "Gambar Tim"],
          features: ["Profil Tim", "Artikel Blog", "Studi Kasus", "Formulir Kontak"],
        },
      ]
    }

    // UMKM & Local Business templates
    if (
      businessTypeLower.includes("umkm") ||
      businessTypeLower.includes("bisnis lokal") ||
      businessTypeLower.includes("laundry") ||
      businessTypeLower.includes("toko kelontong") ||
      businessTypeLower.includes("percetakan")
    ) {
      return [
        {
          id: "local-business",
          name: "Local Business",
          preview: "/local-business-community-website.png",
          description: "Template untuk UMKM dan bisnis lokal dengan fitur WhatsApp dan maps",
          usageCount: 3421,
          category: "UMKM & Local Business",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Produk", "Kontak"],
          tags: ["UMKM", "Bisnis Lokal", "Komunitas", "WhatsApp"],
          styles: ["Desain Ramah", "Tata Letak Sederhana", "Warna Cerah", "Ikon Lokal"],
          features: ["Integrasi WhatsApp", "Peta Lokasi", "Galeri Produk", "Formulir Kontak"],
        },
        {
          id: "laundry-service",
          name: "Laundry Service",
          preview: "/laundry-service-local-business-website.png",
          description: "Template untuk layanan laundry dengan daftar harga dan kontak",
          usageCount: 1876,
          category: "UMKM & Local Business",
          pages: ["Beranda", "Tentang Kami", "Harga", "Testimoni", "Kontak"],
          tags: ["Laundry", "Layanan", "Bersih", "Cepat"],
          styles: ["Desain Segar", "Tata Letak Teratur", "Warna Bersih", "Gambar Pakaian"],
          features: ["Daftar Harga", "Formulir Pemesanan", "Testimoni Pelanggan", "Formulir Kontak"],
        },
        {
          id: "printing-service",
          name: "Printing Service",
          preview: "/printing-service-local-shop-website.png",
          description: "Template untuk percetakan dengan katalog layanan",
          usageCount: 1543,
          category: "UMKM & Local Business",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Portofolio", "Kontak"],
          tags: ["Percetakan", "Layanan", "Desain", "Kreatif"],
          styles: ["Desain Modern", "Tata Letak Kreatif", "Warna Kontras", "Gambar Produk"],
          features: ["Katalog Layanan", "Galeri Portofolio", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "grocery-store",
          name: "Grocery Store",
          preview: "/grocery-store-local-market-website.png",
          description: "Template untuk toko kelontong dan pasar lokal",
          usageCount: 1298,
          category: "UMKM & Local Business",
          pages: ["Beranda", "Produk", "Promo", "Tentang Kami", "Kontak"],
          tags: ["Toko Kelontong", "Pasar Lokal", "Produk", "Murah"],
          styles: ["Desain Sederhana", "Tata Letak Produk", "Warna Hangat", "Gambar Produk"],
          features: ["Katalog Produk", "Promo Terbaru", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Professional Services templates
    if (
      businessTypeLower.includes("jasa profesional") ||
      businessTypeLower.includes("notaris") ||
      businessTypeLower.includes("akuntan") ||
      businessTypeLower.includes("arsitek") ||
      businessTypeLower.includes("konsultan hr")
    ) {
      return [
        {
          id: "professional-services",
          name: "Professional Services",
          preview: "/professional-services-expert-website.png",
          description: "Template untuk jasa profesional dengan booking dan testimoni",
          usageCount: 2134,
          category: "Professional Services",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Testimoni", "Kontak"],
          tags: ["Jasa Profesional", "Booking", "Testimoni", "Expert"],
          styles: ["Desain Formal", "Tata Letak Terstruktur", "Warna Netral", "Gambar Profesional"],
          features: ["Sistem Booking", "Testimoni Klien", "Detail Layanan", "Formulir Kontak"],
        },
        {
          id: "notary-services",
          name: "Notary Services",
          preview: "/notary-legal-services-website.png",
          description: "Template untuk layanan notaris dan legal",
          usageCount: 1654,
          category: "Professional Services",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Tim", "Kontak"],
          tags: ["Notaris", "Layanan Legal", "Hukum", "Dokumen"],
          styles: ["Desain Klasik", "Tata Letak Resmi", "Warna Gelap", "Gambar Dokumen"],
          features: ["Detail Layanan", "Profil Tim", "Formulir Konsultasi", "Formulir Kontak"],
        },
        {
          id: "accounting-firm",
          name: "Accounting Firm",
          preview: "/accounting-financial-services-website.png",
          description: "Template untuk firma akuntansi dan konsultan keuangan",
          usageCount: 1432,
          category: "Professional Services",
          pages: ["Beranda", "Tentang Kami", "Layanan", "Blog", "Kontak"],
          tags: ["Akuntansi", "Konsultan Keuangan", "Audit", "Pajak"],
          styles: ["Desain Modern", "Tata Letak Rapi", "Warna Korporat", "Grafik Keuangan"],
          features: ["Artikel Blog", "Kalkulator Keuangan", "Detail Layanan", "Formulir Kontak"],
        },
        {
          id: "architect-portfolio",
          name: "Architect Portfolio",
          preview: "/architect-design-portfolio-website.png",
          description: "Template portfolio untuk arsitek dengan showcase proyek",
          usageCount: 1298,
          category: "Professional Services",
          pages: ["Beranda", "Tentang Kami", "Proyek", "Penghargaan", "Kontak"],
          tags: ["Arsitek", "Portofolio", "Desain", "Proyek"],
          styles: ["Desain Kreatif", "Tata Letak Visual", "Warna Minimalis", "Gambar Proyek"],
          features: ["Galeri Proyek", "Detail Proyek", "Penghargaan", "Formulir Kontak"],
        },
      ]
    }

    // Travel & Tourism templates
    if (
      businessTypeLower.includes("travel") ||
      businessTypeLower.includes("pariwisata") ||
      businessTypeLower.includes("agen tour") ||
      businessTypeLower.includes("hotel") ||
      businessTypeLower.includes("rental mobil")
    ) {
      return [
        {
          id: "travel-agency",
          name: "Travel Agency",
          preview: "/travel-agency-tourism-website.png",
          description: "Template untuk agen tour dengan paket wisata dan booking online",
          usageCount: 2456,
          category: "Travel & Tourism",
          pages: ["Beranda", "Paket Wisata", "Destinasi", "Tentang Kami", "Kontak"],
          tags: ["Agen Tour", "Paket Wisata", "Booking Online", "Destinasi"],
          styles: ["Desain Menarik", "Tata Letak Visual", "Warna Cerah", "Gambar Wisata"],
          features: ["Sistem Booking", "Galeri Destinasi", "Detail Paket", "Formulir Kontak"],
        },
        {
          id: "hotel-booking",
          name: "Hotel Booking",
          preview: "/hotel-booking-hospitality-website.png",
          description: "Template untuk hotel dengan sistem reservasi",
          usageCount: 1876,
          category: "Travel & Tourism",
          pages: ["Beranda", "Kamar", "Fasilitas", "Tentang Kami", "Kontak"],
          tags: ["Hotel", "Reservasi", "Kamar", "Fasilitas"],
          styles: ["Desain Mewah", "Tata Letak Kamar", "Warna Hangat", "Gambar Kamar"],
          features: ["Sistem Reservasi", "Galeri Kamar", "Detail Fasilitas", "Formulir Kontak"],
        },
        {
          id: "car-rental-premium",
          name: "Car Rental Premium",
          preview: "/modern-car-rental-website-with-luxury-cars-showcas.png",
          description: "Template premium untuk rental mobil dengan showcase kendaraan",
          usageCount: 1654,
          category: "Travel & Tourism",
          pages: ["Beranda", "Mobil", "Harga", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Premium", "Kendaraan", "Sewa"],
          styles: ["Desain Modern", "Tata Letak Mobil", "Warna Elegan", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Harga", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "tour-operator",
          name: "Tour Operator",
          preview: "/tour-operator-adventure-travel-website.png",
          description: "Template untuk operator tur dan petualangan",
          usageCount: 1432,
          category: "Travel & Tourism",
          pages: ["Beranda", "Tur", "Destinasi", "Tentang Kami", "Kontak"],
          tags: ["Operator Tur", "Petualangan", "Destinasi", "Wisata"],
          styles: ["Desain Petualang", "Tata Letak Dinamis", "Warna Cerah", "Gambar Petualangan"],
          features: ["Katalog Tur", "Detail Destinasi", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Portfolio & Personal templates
    if (
      businessTypeLower.includes("portofolio") ||
      businessTypeLower.includes("personal") ||
      businessTypeLower.includes("fotografer") ||
      businessTypeLower.includes("desainer") ||
      businessTypeLower.includes("influencer")
    ) {
      return [
        {
          id: "creative-portfolio",
          name: "Creative Portfolio",
          preview: "/creative-portfolio-artistic-website.png",
          description: "Template portfolio kreatif dengan galeri dan blog personal",
          usageCount: 2876,
          category: "Portfolio & Personal",
          pages: ["Beranda", "Tentang Saya", "Portofolio", "Blog", "Kontak"],
          tags: ["Portofolio", "Kreatif", "Galeri", "Blog"],
          styles: ["Desain Artistik", "Tata Letak Unik", "Warna Kreatif", "Gambar Personal"],
          features: ["Galeri Portofolio", "Artikel Blog", "Formulir Kontak", "Integrasi Media Sosial"],
        },
        {
          id: "photographer-portfolio",
          name: "Photographer Portfolio",
          preview: "/photographer-portfolio-gallery-website.png",
          description: "Template khusus fotografer dengan galeri foto profesional",
          usageCount: 2134,
          category: "Portfolio & Personal",
          pages: ["Beranda", "Galeri", "Tentang Saya", "Layanan", "Kontak"],
          tags: ["Fotografer", "Galeri Foto", "Profesional", "Layanan"],
          styles: ["Desain Minimalis", "Tata Letak Foto", "Warna Netral", "Gambar Berkualitas"],
          features: ["Galeri Foto", "Detail Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "designer-showcase",
          name: "Designer Showcase",
          preview: "/designer-showcase-creative-website.png",
          description: "Template untuk desainer dengan showcase karya",
          usageCount: 1876,
          category: "Portfolio & Personal",
          pages: ["Beranda", "Karya", "Tentang Saya", "Klien", "Kontak"],
          tags: ["Desainer", "Showcase", "Karya", "Klien"],
          styles: ["Desain Modern", "Tata Letak Kreatif", "Warna Kontras", "Gambar Karya"],
          features: ["Galeri Karya", "Profil Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "influencer-personal",
          name: "Influencer Personal",
          preview: "/influencer-personal-brand-website.png",
          description: "Template personal branding untuk influencer",
          usageCount: 1654,
          category: "Portfolio & Personal",
          pages: ["Beranda", "Tentang Saya", "Blog", "Media Sosial", "Kontak"],
          tags: ["Influencer", "Personal Branding", "Media Sosial", "Konten"],
          styles: ["Desain Trendy", "Tata Letak Dinamis", "Warna Cerah", "Gambar Personal"],
          features: ["Artikel Blog", "Feed Media Sosial", "Formulir Kolaborasi", "Formulir Kontak"],
        },
      ]
    }

    // Media & Entertainment templates
    if (
      businessTypeLower.includes("media") ||
      businessTypeLower.includes("entertainment") ||
      businessTypeLower.includes("portal berita") ||
      businessTypeLower.includes("blog") ||
      businessTypeLower.includes("podcast") ||
      businessTypeLower.includes("streaming")
    ) {
      return [
        {
          id: "news-portal",
          name: "News Portal",
          preview: "/news-portal-media-website.png",
          description: "Template portal berita dengan kategori artikel dan video player",
          usageCount: 2456,
          category: "Media & Entertainment",
          pages: ["Beranda", "Berita", "Video", "Kategori", "Kontak"],
          tags: ["Portal Berita", "Media", "Artikel", "Video"],
          styles: ["Desain Informatif", "Tata Letak Terstruktur", "Warna Netral", "Gambar Berita"],
          features: ["Kategori Artikel", "Video Player", "Formulir Berlangganan", "Formulir Kontak"],
        },
        {
          id: "podcast-platform",
          name: "Podcast Platform",
          preview: "/podcast-platform-audio-website.png",
          description: "Template untuk podcast dengan audio player dan episode",
          usageCount: 1876,
          category: "Media & Entertainment",
          pages: ["Beranda", "Episode", "Tentang Kami", "Jadwal", "Kontak"],
          tags: ["Podcast", "Audio", "Episode", "Jadwal"],
          styles: ["Desain Audio", "Tata Letak Episode", "Warna Gelap", "Gambar Podcast"],
          features: ["Audio Player", "Daftar Episode", "Formulir Berlangganan", "Formulir Kontak"],
        },
        {
          id: "streaming-service",
          name: "Streaming Service",
          preview: "/streaming-service-video-website.png",
          description: "Template untuk layanan streaming video",
          usageCount: 1654,
          category: "Media & Entertainment",
          pages: ["Beranda", "Film", "Serial", "Kategori", "Kontak"],
          tags: ["Streaming", "Video", "Film", "Serial"],
          styles: ["Desain Visual", "Tata Letak Film", "Warna Kontras", "Gambar Film"],
          features: ["Katalog Film", "Detail Film", "Formulir Berlangganan", "Formulir Kontak"],
        },
        {
          id: "blog-magazine",
          name: "Blog Magazine",
          preview: "/blog-magazine-content-website.png",
          description: "Template blog dan majalah online",
          usageCount: 1432,
          category: "Media & Entertainment",
          pages: ["Beranda", "Artikel", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Blog", "Majalah Online", "Artikel", "Konten"],
          styles: ["Desain Modern", "Tata Letak Artikel", "Warna Cerah", "Gambar Konten"],
          features: ["Kategori Artikel", "Formulir Berlangganan", "Formulir Penulis", "Formulir Kontak"],
        },
      ]
    }

    // Financial Services templates
    if (
      businessTypeLower.includes("keuangan") ||
      businessTypeLower.includes("bank") ||
      businessTypeLower.includes("koperasi") ||
      businessTypeLower.includes("fintech") ||
      businessTypeLower.includes("investasi")
    ) {
      return [
        {
          id: "financial-services",
          name: "Financial Services",
          preview: "/financial-services-banking-website.png",
          description: "Template untuk layanan keuangan dengan kalkulator dan simulasi",
          usageCount: 2134,
          category: "Financial Services",
          pages: ["Beranda", "Layanan", "Kalkulator", "Tentang Kami", "Kontak"],
          tags: ["Layanan Keuangan", "Kalkulator", "Simulasi", "Investasi"],
          styles: ["Desain Korporat", "Tata Letak Terstruktur", "Warna Netral", "Grafik Keuangan"],
          features: ["Kalkulator Keuangan", "Simulasi Investasi", "Detail Layanan", "Formulir Kontak"],
        },
        {
          id: "investment-platform",
          name: "Investment Platform",
          preview: "/investment-platform-finance-website.png",
          description: "Template untuk platform investasi dan trading",
          usageCount: 1876,
          category: "Financial Services",
          pages: ["Beranda", "Trading", "Analisis", "Tentang Kami", "Kontak"],
          tags: ["Platform Investasi", "Trading", "Analisis", "Keuangan"],
          styles: ["Desain Modern", "Tata Letak Trading", "Warna Kontras", "Grafik Trading"],
          features: ["Grafik Trading", "Analisis Pasar", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "cooperative-bank",
          name: "Cooperative Bank",
          preview: "/cooperative-bank-community-website.png",
          description: "Template untuk koperasi dan bank komunitas",
          usageCount: 1654,
          category: "Financial Services",
          pages: ["Beranda", "Layanan", "Anggota", "Tentang Kami", "Kontak"],
          tags: ["Koperasi", "Bank Komunitas", "Anggota", "Layanan"],
          styles: ["Desain Ramah", "Tata Letak Komunitas", "Warna Hangat", "Gambar Komunitas"],
          features: ["Daftar Anggota", "Detail Layanan", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "fintech-startup",
          name: "Fintech Startup",
          preview: "/fintech-startup-digital-finance-website.png",
          description: "Template modern untuk startup fintech",
          usageCount: 1432,
          category: "Financial Services",
          pages: ["Beranda", "Produk", "Fitur", "Tentang Kami", "Kontak"],
          tags: ["Fintech", "Startup", "Digital Finance", "Inovasi"],
          styles: ["Desain Modern", "Tata Letak Produk", "Warna Cerah", "Grafik Digital"],
          features: ["Katalog Produk", "Detail Fitur", "Formulir Pendaftaran", "Formulir Kontak"],
        },
      ]
    }

    // Automotive templates
    if (
      businessTypeLower.includes("otomotif") ||
      businessTypeLower.includes("dealer mobil") ||
      businessTypeLower.includes("dealer motor") ||
      businessTypeLower.includes("bengkel") ||
      businessTypeLower.includes("sparepart")
    ) {
      return [
        {
          id: "car-dealer",
          name: "Car Dealer",
          preview: "/car-dealer-automotive-website.png",
          description: "Template untuk dealer mobil dengan katalog kendaraan",
          usageCount: 2134,
          category: "Automotive",
          pages: ["Beranda", "Mobil", "Promo", "Tentang Kami", "Kontak"],
          tags: ["Dealer Mobil", "Katalog Kendaraan", "Promo", "Otomotif"],
          styles: ["Desain Modern", "Tata Letak Mobil", "Warna Elegan", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Promo", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "motorcycle-dealer",
          name: "Motorcycle Dealer",
          preview: "/motorcycle-dealer-bike-website.png",
          description: "Template untuk dealer motor dan sepeda motor",
          usageCount: 1876,
          category: "Automotive",
          pages: ["Beranda", "Motor", "Aksesoris", "Tentang Kami", "Kontak"],
          tags: ["Dealer Motor", "Sepeda Motor", "Aksesoris", "Otomotif"],
          styles: ["Desain Dinamis", "Tata Letak Motor", "Warna Cerah", "Gambar Motor"],
          features: ["Katalog Motor", "Detail Aksesoris", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "auto-repair",
          name: "Auto Repair",
          preview: "/auto-repair-garage-website.png",
          description: "Template untuk bengkel dengan booking service",
          usageCount: 1654,
          category: "Automotive",
          pages: ["Beranda", "Layanan", "Booking", "Tentang Kami", "Kontak"],
          tags: ["Bengkel", "Booking Service", "Perbaikan", "Otomotif"],
          styles: ["Desain Teknis", "Tata Letak Layanan", "Warna Solid", "Gambar Bengkel"],
          features: ["Sistem Booking", "Detail Layanan", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "auto-parts",
          name: "Auto Parts",
          preview: "/auto-parts-sparepart-website.png",
          description: "Template untuk toko sparepart online",
          usageCount: 1432,
          category: "Automotive",
          pages: ["Beranda", "Sparepart", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Sparepart", "Toko Online", "Otomotif", "Aksesoris"],
          styles: ["Desain Katalog", "Tata Letak Produk", "Warna Kontras", "Gambar Sparepart"],
          features: ["Katalog Sparepart", "Detail Produk", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Fashion & Lifestyle templates
    if (
      businessTypeLower.includes("fashion") ||
      businessTypeLower.includes("lifestyle") ||
      businessTypeLower.includes("butik") ||
      businessTypeLower.includes("sepatu") ||
      businessTypeLower.includes("tas") ||
      businessTypeLower.includes("perhiasan") ||
      businessTypeLower.includes("hijab")
    ) {
      return [
        {
          id: "fashion-boutique",
          name: "Fashion Boutique",
          preview: "/fashion-boutique-trendy-website.png",
          description: "Template trendy untuk butik fashion dengan katalog produk",
          usageCount: 2456,
          category: "Fashion & Lifestyle",
          pages: ["Beranda", "Produk", "Koleksi", "Tentang Kami", "Kontak"],
          tags: ["Butik Fashion", "Trendy", "Katalog Produk", "Gaya"],
          styles: ["Desain Trendy", "Tata Letak Produk", "Warna Cerah", "Gambar Fashion"],
          features: ["Katalog Produk", "Detail Koleksi", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "shoes-bags",
          name: "Shoes & Bags",
          preview: "/shoes-bags-accessories-website.png",
          description: "Template untuk toko sepatu dan tas",
          usageCount: 1876,
          category: "Fashion & Lifestyle",
          pages: ["Beranda", "Sepatu", "Tas", "Aksesoris", "Kontak"],
          tags: ["Toko Sepatu", "Toko Tas", "Aksesoris", "Fashion"],
          styles: ["Desain Modern", "Tata Letak Produk", "Warna Elegan", "Gambar Sepatu"],
          features: ["Katalog Sepatu", "Katalog Tas", "Detail Aksesoris", "Formulir Kontak"],
        },
        {
          id: "jewelry-store",
          name: "Jewelry Store",
          preview: "/jewelry-store-luxury-website.png",
          description: "Template mewah untuk toko perhiasan",
          usageCount: 1654,
          category: "Fashion & Lifestyle",
          pages: ["Beranda", "Perhiasan", "Koleksi", "Tentang Kami", "Kontak"],
          tags: ["Toko Perhiasan", "Mewah", "Koleksi", "Elegan"],
          styles: ["Desain Mewah", "Tata Letak Perhiasan", "Warna Gelap", "Gambar Perhiasan"],
          features: ["Katalog Perhiasan", "Detail Koleksi", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "hijab-fashion",
          name: "Hijab Fashion",
          preview: "/hijab-fashion-modest-website.png",
          description: "Template untuk toko hijab dan fashion muslim",
          usageCount: 1432,
          category: "Fashion & Lifestyle",
          pages: ["Beranda", "Hijab", "Busana Muslim", "Tentang Kami", "Kontak"],
          tags: ["Toko Hijab", "Busana Muslim", "Fashion", "Modest"],
          styles: ["Desain Islami", "Tata Letak Produk", "Warna Lembut", "Gambar Hijab"],
          features: ["Katalog Hijab", "Detail Busana", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Agriculture & Farming templates
    if (
      businessTypeLower.includes("pertanian") ||
      businessTypeLower.includes("perkebunan") ||
      businessTypeLower.includes("supplier sayur") ||
      businessTypeLower.includes("peternakan") ||
      businessTypeLower.includes("pupuk") ||
      businessTypeLower.includes("alat pertanian")
    ) {
      return [
        {
          id: "agriculture-farm",
          name: "Agriculture Farm",
          preview: "/agriculture-farm-organic-website.png",
          description: "Template untuk pertanian dengan katalog produk organik",
          usageCount: 1654,
          category: "Agriculture & Farming",
          pages: ["Beranda", "Produk", "Tentang Kami", "Galeri", "Kontak"],
          tags: ["Pertanian", "Produk Organik", "Farm", "Agriculture"],
          styles: ["Desain Alami", "Tata Letak Produk", "Warna Hijau", "Gambar Pertanian"],
          features: ["Katalog Produk", "Galeri Pertanian", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "vegetable-supplier",
          name: "Vegetable Supplier",
          preview: "/vegetable-supplier-fresh-website.png",
          description: "Template untuk supplier sayuran segar",
          usageCount: 1432,
          category: "Agriculture & Farming",
          pages: ["Beranda", "Produk", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Supplier Sayur", "Sayuran Segar", "Distributor", "Vegetables"],
          styles: ["Desain Segar", "Tata Letak Produk", "Warna Hijau", "Gambar Sayuran"],
          features: ["Katalog Produk", "Testimoni Pelanggan", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "livestock-farm",
          name: "Livestock Farm",
          preview: "/livestock-farm-animal-website.png",
          description: "Template untuk peternakan dan produk hewani",
          usageCount: 1298,
          category: "Agriculture & Farming",
          pages: ["Beranda", "Hewan", "Produk", "Tentang Kami", "Kontak"],
          tags: ["Peternakan", "Produk Hewani", "Livestock", "Animals"],
          styles: ["Desain Pedesaan", "Tata Letak Hewan", "Warna Coklat", "Gambar Hewan"],
          features: ["Katalog Hewan", "Katalog Produk", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "farm-equipment",
          name: "Farm Equipment",
          preview: "/farm-equipment-agricultural-website.png",
          description: "Template untuk alat pertanian dan pupuk",
          usageCount: 1087,
          category: "Agriculture & Farming",
          pages: ["Beranda", "Alat", "Pupuk", "Tentang Kami", "Kontak"],
          tags: ["Alat Pertanian", "Pupuk", "Equipment", "Farming"],
          styles: ["Desain Teknis", "Tata Letak Alat", "Warna Solid", "Gambar Alat"],
          features: ["Katalog Alat", "Katalog Pupuk", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    // Gaming & Esports templates
    if (
      businessTypeLower.includes("gaming") ||
      businessTypeLower.includes("esports") ||
      businessTypeLower.includes("komunitas gamers") ||
      businessTypeLower.includes("toko game") ||
      businessTypeLower.includes("esports team")
    ) {
      return [
        {
          id: "gaming-community",
          name: "Gaming Community",
          preview: "/gaming-community-esports-website.png",
          description: "Template untuk komunitas gamers dengan forum dan streaming",
          usageCount: 1876,
          category: "Gaming & Esports",
          pages: ["Beranda", "Forum", "Streaming", "Tentang Kami", "Kontak"],
          tags: ["Komunitas Gamers", "Forum", "Streaming", "Gaming"],
          styles: ["Desain Futuristik", "Tata Letak Dinamis", "Warna Neon", "Gambar Game"],
          features: ["Forum Komunitas", "Jadwal Streaming", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "esports-team",
          name: "Esports Team",
          preview: "/esports-team-competitive-website.png",
          description: "Template untuk tim esports dengan merchandise",
          usageCount: 1654,
          category: "Gaming & Esports",
          pages: ["Beranda", "Tim", "Merchandise", "Tentang Kami", "Kontak"],
          tags: ["Tim Esports", "Merchandise", "Kompetitif", "Esports"],
          styles: ["Desain Agresif", "Tata Letak Tim", "Warna Gelap", "Gambar Tim"],
          features: ["Profil Tim", "Katalog Merchandise", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "game-store",
          name: "Game Store",
          preview: "/game-store-digital-website.png",
          description: "Template untuk toko game digital",
          usageCount: 1432,
          category: "Gaming & Esports",
          pages: ["Beranda", "Game", "Promo", "Tentang Kami", "Kontak"],
          tags: ["Toko Game", "Game Digital", "Promo", "Gaming"],
          styles: ["Desain Digital", "Tata Letak Game", "Warna Kontras", "Gambar Game"],
          features: ["Katalog Game", "Detail Promo", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "gaming-cafe",
          name: "Gaming Cafe",
          preview: "/gaming-cafe-internet-website.png",
          description: "Template untuk warnet gaming dan cafe",
          usageCount: 1298,
          category: "Gaming & Esports",
          pages: ["Beranda", "Menu", "Event", "Tentang Kami", "Kontak"],
          tags: ["Warnet Gaming", "Cafe", "Menu", "Gaming"],
          styles: ["Desain Santai", "Tata Letak Menu", "Warna Hangat", "Gambar Cafe"],
          features: ["Daftar Menu", "Jadwal Event", "Formulir Reservasi", "Formulir Kontak"],
        },
      ]
    }

    // Arts & Culture templates
    if (
      businessTypeLower.includes("seni") ||
      businessTypeLower.includes("budaya") ||
      businessTypeLower.includes("galeri seni") ||
      businessTypeLower.includes("sanggar tari") ||
      businessTypeLower.includes("museum")
    ) {
      return [
        {
          id: "art-gallery",
          name: "Art Gallery",
          preview: "/art-gallery-cultural-website.png",
          description: "Template untuk galeri seni dengan pameran online",
          usageCount: 1543,
          category: "Arts & Culture",
          pages: ["Beranda", "Pameran", "Artis", "Tentang Kami", "Kontak"],
          tags: ["Galeri Seni", "Pameran Online", "Artis", "Seni"],
          styles: ["Desain Artistik", "Tata Letak Pameran", "Warna Minimalis", "Gambar Seni"],
          features: ["Katalog Pameran", "Profil Artis", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "dance-studio-cultural",
          name: "Cultural Dance Studio",
          preview: "/cultural-dance-studio-traditional-website.png",
          description: "Template untuk sanggar tari dan budaya",
          usageCount: 1298,
          category: "Arts & Culture",
          pages: ["Beranda", "Kelas", "Jadwal", "Tentang Kami", "Kontak"],
          tags: ["Sanggar Tari", "Budaya", "Kelas Tari", "Dance"],
          styles: ["Desain Tradisional", "Tata Letak Kelas", "Warna Hangat", "Gambar Tari"],
          features: ["Jadwal Kelas", "Detail Kelas", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "digital-museum",
          name: "Digital Museum",
          preview: "/digital-museum-cultural-website.png",
          description: "Template untuk museum digital dan virtual tour",
          usageCount: 1087,
          category: "Arts & Culture",
          pages: ["Beranda", "Koleksi", "Virtual Tour", "Tentang Kami", "Kontak"],
          tags: ["Museum Digital", "Virtual Tour", "Koleksi", "Budaya"],
          styles: ["Desain Modern", "Tata Letak Koleksi", "Warna Netral", "Gambar Museum"],
          features: ["Katalog Koleksi", "Virtual Tour", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "cultural-center",
          name: "Cultural Center",
          preview: "/cultural-center-community-website.png",
          description: "Template untuk pusat budaya dan event seni",
          usageCount: 987,
          category: "Arts & Culture",
          pages: ["Beranda", "Event", "Program", "Tentang Kami", "Kontak"],
          tags: ["Pusat Budaya", "Event Seni", "Program", "Budaya"],
          styles: ["Desain Komunitas", "Tata Letak Event", "Warna Cerah", "Gambar Event"],
          features: ["Jadwal Event", "Detail Program", "Formulir Pendaftaran", "Formulir Kontak"],
        },
      ]
    }

    // Car rental specific templates
    if (
      businessTypeLower.includes("rental mobil") ||
      businessTypeLower.includes("sewa mobil") ||
      businessTypeLower.includes("rental kendaraan")
    ) {
      return [
        {
          id: "car-rental-premium",
          name: "Car Rental Premium",
          preview: "/modern-car-rental-website-with-luxury-cars-showcas.png",
          description: "Template premium untuk rental mobil dengan showcase kendaraan mewah",
          usageCount: 1247,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Harga", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Premium", "Kendaraan", "Sewa"],
          styles: ["Desain Modern", "Tata Letak Mobil", "Warna Elegan", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Harga", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "car-rental-business",
          name: "Car Rental Business",
          preview: "/professional-car-rental-website-with-booking-syste.png",
          description: "Template bisnis rental mobil dengan sistem booking online",
          usageCount: 892,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Booking", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Booking Online", "Bisnis", "Sewa"],
          styles: ["Desain Profesional", "Tata Letak Mobil", "Warna Korporat", "Gambar Mobil"],
          features: ["Sistem Booking", "Katalog Mobil", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "car-rental-simple",
          name: "Car Rental Simple",
          preview: "/clean-simple-car-rental-website-design.png",
          description: "Template sederhana dan bersih untuk rental mobil",
          usageCount: 634,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Harga", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Sederhana", "Bersih", "Sewa"],
          styles: ["Desain Minimalis", "Tata Letak Mobil", "Warna Netral", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Harga", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "car-rental-luxury",
          name: "Luxury Car Rental",
          preview: "/luxury-car-rental-website-with-premium-vehicles.png",
          description: "Template mewah untuk rental mobil premium dan ekslusif",
          usageCount: 543,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Mewah", "Premium", "Sewa"],
          styles: ["Desain Mewah", "Tata Letak Mobil", "Warna Gelap", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "car-rental-budget",
          name: "Budget Car Rental",
          preview: "/budget-friendly-car-rental-website-design.png",
          description: "Template ekonomis untuk layanan rental mobil budget",
          usageCount: 421,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Harga", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Budget", "Ekonomis", "Sewa"],
          styles: ["Desain Sederhana", "Tata Letak Mobil", "Warna Cerah", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Harga", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "car-rental-fleet",
          name: "Fleet Management",
          preview: "/car-fleet-management-rental-website.png",
          description: "Template untuk manajemen armada rental mobil",
          usageCount: 387,
          category: "Car Rental",
          pages: ["Beranda", "Armada", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Manajemen Armada", "Fleet", "Sewa"],
          styles: ["Desain Korporat", "Tata Letak Armada", "Warna Netral", "Gambar Mobil"],
          features: ["Katalog Armada", "Detail Layanan", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "car-rental-corporate",
          name: "Corporate Car Rental",
          preview: "/corporate-car-rental-business-website.png",
          description: "Template profesional untuk layanan rental mobil korporat",
          usageCount: 298,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Korporat", "Bisnis", "Sewa"],
          styles: ["Desain Profesional", "Tata Letak Mobil", "Warna Gelap", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Layanan", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "car-rental-modern",
          name: "Modern Car Rental",
          preview: "/modern-minimalist-car-rental-website.png",
          description: "Template modern dan minimalis untuk rental mobil",
          usageCount: 267,
          category: "Car Rental",
          pages: ["Beranda", "Mobil", "Harga", "Tentang Kami", "Kontak"],
          tags: ["Rental Mobil", "Modern", "Minimalis", "Sewa"],
          styles: ["Desain Minimalis", "Tata Letak Mobil", "Warna Netral", "Gambar Mobil"],
          features: ["Katalog Mobil", "Detail Harga", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Restaurant templates
    if (
      businessTypeLower.includes("restoran") ||
      businessTypeLower.includes("restaurant") ||
      businessTypeLower.includes("cafe") ||
      businessTypeLower.includes("warung")
    ) {
      return [
        {
          id: "restaurant-elegant",
          name: "Restaurant Elegant",
          preview: "/elegant-restaurant-website-with-menu-showcase.png",
          description: "Template elegan untuk restoran dengan showcase menu",
          usageCount: 2156,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Tentang Kami", "Reservasi", "Galeri", "Kontak"],
          tags: ["Restoran", "Menu", "Elegan", "Makanan"],
          styles: ["Desain Mewah", "Tata Letak Menu", "Warna Gelap", "Gambar Makanan"],
          features: ["Katalog Menu", "Sistem Reservasi", "Galeri Foto", "Formulir Kontak"],
        },
        {
          id: "cafe-modern",
          name: "Cafe Modern",
          preview: "/modern-cafe-website-with-cozy-atmosphere.png",
          description: "Template modern untuk cafe dengan suasana hangat",
          usageCount: 1543,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Tentang Kami", "Event", "Kontak"],
          tags: ["Cafe", "Modern", "Hangat", "Kopi"],
          styles: ["Desain Santai", "Tata Letak Menu", "Warna Hangat", "Gambar Kopi"],
          features: ["Daftar Menu", "Jadwal Event", "Formulir Reservasi", "Formulir Kontak"],
        },
        {
          id: "food-business",
          name: "Food Business",
          preview: "/food-business-website-with-online-ordering.png",
          description: "Template bisnis makanan dengan sistem pemesanan online",
          usageCount: 987,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Pesan Online", "Tentang Kami", "Kontak"],
          tags: ["Bisnis Makanan", "Pesan Online", "Delivery", "Makanan"],
          styles: ["Desain Cepat", "Tata Letak Menu", "Warna Cerah", "Gambar Makanan"],
          features: ["Sistem Pemesanan", "Integrasi Delivery", "Pembayaran Online", "Formulir Kontak"],
        },
        {
          id: "fine-dining",
          name: "Fine Dining",
          preview: "/fine-dining-restaurant-elegant-website.png",
          description: "Template mewah untuk restoran fine dining",
          usageCount: 876,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Tentang Kami", "Reservasi", "Galeri", "Kontak"],
          tags: ["Restoran", "Fine Dining", "Mewah", "Makanan"],
          styles: ["Desain Elegan", "Tata Letak Menu", "Warna Gelap", "Gambar Makanan"],
          features: ["Katalog Menu", "Sistem Reservasi", "Galeri Foto", "Formulir Kontak"],
        },
        {
          id: "fast-food",
          name: "Fast Food",
          preview: "/fast-food-restaurant-colorful-website.png",
          description: "Template energik untuk restoran fast food",
          usageCount: 743,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Promo", "Tentang Kami", "Kontak"],
          tags: ["Restoran", "Fast Food", "Energi", "Makanan"],
          styles: ["Desain Cepat", "Tata Letak Menu", "Warna Cerah", "Gambar Makanan"],
          features: ["Katalog Menu", "Detail Promo", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "bakery-cafe",
          name: "Bakery & Cafe",
          preview: "/bakery-cafe-warm-cozy-website-design.png",
          description: "Template hangat untuk bakery dan cafe",
          usageCount: 654,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Tentang Kami", "Event", "Kontak"],
          tags: ["Bakery", "Cafe", "Hangat", "Kopi"],
          styles: ["Desain Santai", "Tata Letak Menu", "Warna Hangat", "Gambar Kopi"],
          features: ["Daftar Menu", "Jadwal Event", "Formulir Reservasi", "Formulir Kontak"],
        },
        {
          id: "pizza-restaurant",
          name: "Pizza Restaurant",
          preview: "/pizza-restaurant-italian-style-website.png",
          description: "Template khusus untuk restoran pizza",
          usageCount: 532,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Tentang Kami", "Reservasi", "Kontak"],
          tags: ["Restoran", "Pizza", "Italia", "Makanan"],
          styles: ["Desain Italia", "Tata Letak Menu", "Warna Hangat", "Gambar Pizza"],
          features: ["Katalog Menu", "Sistem Reservasi", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "asian-cuisine",
          name: "Asian Cuisine",
          preview: "/asian-restaurant-traditional-modern-website.png",
          description: "Template untuk restoran masakan Asia",
          usageCount: 487,
          category: "Restaurant",
          pages: ["Beranda", "Menu", "Tentang Kami", "Reservasi", "Kontak"],
          tags: ["Restoran", "Masakan Asia", "Tradisional", "Makanan"],
          styles: ["Desain Asia", "Tata Letak Menu", "Warna Cerah", "Gambar Makanan"],
          features: ["Katalog Menu", "Sistem Reservasi", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Online shop templates
    if (
      businessTypeLower.includes("toko online") ||
      businessTypeLower.includes("e-commerce") ||
      businessTypeLower.includes("online shop") ||
      businessTypeLower.includes("jualan online")
    ) {
      return [
        {
          id: "ecommerce-pro",
          name: "E-commerce Pro",
          preview: "/professional-ecommerce-website-with-product-catalo.png",
          description: "Template profesional untuk toko online dengan katalog produk",
          usageCount: 3421,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "E-commerce", "Katalog Produk", "Jualan"],
          styles: ["Desain Profesional", "Tata Letak Produk", "Warna Netral", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "online-store",
          name: "Online Store",
          preview: "/modern-online-store-website-design.png",
          description: "Template modern untuk toko online",
          usageCount: 2789,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Promo", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Modern", "Promo", "Jualan"],
          styles: ["Desain Modern", "Tata Letak Produk", "Warna Cerah", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Promo", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "marketplace-style",
          name: "Marketplace Style",
          preview: "/marketplace-style-website-for-online-business.png",
          description: "Template bergaya marketplace untuk bisnis online",
          usageCount: 1876,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Toko", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Marketplace", "Bisnis", "Jualan"],
          styles: ["Desain Marketplace", "Tata Letak Produk", "Warna Kontras", "Gambar Produk"],
          features: ["Katalog Produk", "Daftar Toko", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "fashion-store",
          name: "Fashion Store",
          preview: "/fashion-ecommerce-website-trendy-design.png",
          description: "Template trendy untuk toko fashion online",
          usageCount: 1654,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Koleksi", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Fashion", "Trendy", "Jualan"],
          styles: ["Desain Trendy", "Tata Letak Produk", "Warna Cerah", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Koleksi", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "electronics-shop",
          name: "Electronics Shop",
          preview: "/electronics-store-modern-tech-website.png",
          description: "Template modern untuk toko elektronik",
          usageCount: 1432,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Elektronik", "Modern", "Jualan"],
          styles: ["Desain Modern", "Tata Letak Produk", "Warna Netral", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "beauty-cosmetics",
          name: "Beauty & Cosmetics",
          preview: "/beauty-cosmetics-elegant-pink-website.png",
          description: "Template elegan untuk produk kecantikan",
          usageCount: 1298,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Kecantikan", "Elegan", "Jualan"],
          styles: ["Desain Elegan", "Tata Letak Produk", "Warna Pink", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "handmade-crafts",
          name: "Handmade Crafts",
          preview: "/handmade-crafts-artisan-website-design.png",
          description: "Template artistik untuk produk handmade",
          usageCount: 987,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Handmade", "Artistik", "Jualan"],
          styles: ["Desain Artistik", "Tata Letak Produk", "Warna Kreatif", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "sports-equipment",
          name: "Sports Equipment",
          preview: "/sports-equipment-dynamic-website-design.png",
          description: "Template dinamis untuk peralatan olahraga",
          usageCount: 876,
          category: "Online Shop",
          pages: ["Beranda", "Produk", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Toko Online", "Olahraga", "Dinamis", "Jualan"],
          styles: ["Desain Dinamis", "Tata Letak Produk", "Warna Cerah", "Gambar Produk"],
          features: ["Katalog Produk", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Healthcare & Medical templates
    if (
      businessTypeLower.includes("klinik") ||
      businessTypeLower.includes("dokter") ||
      businessTypeLower.includes("rumah sakit") ||
      businessTypeLower.includes("kesehatan") ||
      businessTypeLower.includes("medical") ||
      businessTypeLower.includes("healthcare")
    ) {
      return [
        {
          id: "medical-clinic",
          name: "Medical Clinic",
          preview: "/medical-clinic-professional-healthcare-website.png",
          description: "Template profesional untuk klinik dan layanan medis",
          usageCount: 1876,
          category: "Healthcare",
          pages: ["Beranda", "Layanan", "Dokter", "Tentang Kami", "Kontak"],
          tags: ["Klinik", "Layanan Medis", "Dokter", "Kesehatan"],
          styles: ["Desain Profesional", "Tata Letak Layanan", "Warna Netral", "Gambar Medis"],
          features: ["Daftar Layanan", "Profil Dokter", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "dental-practice",
          name: "Dental Practice",
          preview: "/dental-clinic-clean-modern-website.png",
          description: "Template bersih untuk praktek dokter gigi",
          usageCount: 1432,
          category: "Healthcare",
          pages: ["Beranda", "Layanan", "Dokter", "Tentang Kami", "Kontak"],
          tags: ["Dokter Gigi", "Praktek", "Bersih", "Kesehatan"],
          styles: ["Desain Bersih", "Tata Letak Layanan", "Warna Putih", "Gambar Gigi"],
          features: ["Daftar Layanan", "Profil Dokter", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "hospital-website",
          name: "Hospital Website",
          preview: "/hospital-comprehensive-healthcare-website.png",
          description: "Template lengkap untuk rumah sakit",
          usageCount: 1298,
          category: "Healthcare",
          pages: ["Beranda", "Layanan", "Dokter", "Departemen", "Kontak"],
          tags: ["Rumah Sakit", "Layanan Medis", "Dokter", "Kesehatan"],
          styles: ["Desain Lengkap", "Tata Letak Layanan", "Warna Netral", "Gambar Medis"],
          features: ["Daftar Layanan", "Profil Dokter", "Daftar Departemen", "Formulir Kontak"],
        },
        {
          id: "wellness-center",
          name: "Wellness Center",
          preview: "/wellness-center-holistic-health-website.png",
          description: "Template untuk pusat kesehatan holistik",
          usageCount: 987,
          category: "Healthcare",
          pages: ["Beranda", "Layanan", "Program", "Tentang Kami", "Kontak"],
          tags: ["Pusat Kesehatan", "Holistik", "Program", "Kesehatan"],
          styles: ["Desain Tenang", "Tata Letak Layanan", "Warna Lembut", "Gambar Kesehatan"],
          features: ["Daftar Layanan", "Detail Program", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "pharmacy-website",
          name: "Pharmacy Website",
          preview: "/pharmacy-online-medicine-store-website.png",
          description: "Template untuk apotek dan toko obat online",
          usageCount: 876,
          category: "Healthcare",
          pages: ["Beranda", "Obat", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Apotek", "Toko Obat", "Online", "Kesehatan"],
          styles: ["Desain Bersih", "Tata Letak Obat", "Warna Putih", "Gambar Obat"],
          features: ["Katalog Obat", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "physiotherapy",
          name: "Physiotherapy",
          preview: "/physiotherapy-rehabilitation-center-website.png",
          description: "Template untuk layanan fisioterapi",
          usageCount: 654,
          category: "Healthcare",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Fisioterapi", "Rehabilitasi", "Layanan", "Kesehatan"],
          styles: ["Desain Modern", "Tata Letak Layanan", "Warna Netral", "Gambar Fisioterapi"],
          features: ["Daftar Layanan", "Testimoni Pasien", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Education templates
    if (
      businessTypeLower.includes("sekolah") ||
      businessTypeLower.includes("universitas") ||
      businessTypeLower.includes("kursus") ||
      businessTypeLower.includes("pendidikan") ||
      businessTypeLower.includes("bimbel") ||
      businessTypeLower.includes("les")
    ) {
      return [
        {
          id: "school-website",
          name: "School Website",
          preview: "/school-educational-institution-website.png",
          description: "Template untuk sekolah dan institusi pendidikan",
          usageCount: 2134,
          category: "Education",
          pages: ["Beranda", "Tentang Kami", "Program", "Fasilitas", "Kontak"],
          tags: ["Sekolah", "Institusi Pendidikan", "Program", "Pendidikan"],
          styles: ["Desain Ceria", "Tata Letak Program", "Warna Cerah", "Gambar Sekolah"],
          features: ["Daftar Program", "Detail Fasilitas", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "online-course",
          name: "Online Course",
          preview: "/online-course-learning-platform-website.png",
          description: "Template untuk platform kursus online",
          usageCount: 1765,
          category: "Education",
          pages: ["Beranda", "Kursus", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Kursus Online", "Platform", "Kategori", "Pendidikan"],
          styles: ["Desain Modern", "Tata Letak Kursus", "Warna Netral", "Gambar Kursus"],
          features: ["Katalog Kursus", "Detail Kategori", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "tutoring-center",
          name: "Tutoring Center",
          preview: "/tutoring-center-academic-support-website.png",
          description: "Template untuk bimbingan belajar",
          usageCount: 1432,
          category: "Education",
          pages: ["Beranda", "Program", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Bimbingan Belajar", "Program", "Akademik", "Pendidikan"],
          styles: ["Desain Ramah", "Tata Letak Program", "Warna Hangat", "Gambar Belajar"],
          features: ["Daftar Program", "Testimoni Siswa", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "university-website",
          name: "University Website",
          preview: "/university-higher-education-website.png",
          description: "Template untuk universitas dan perguruan tinggi",
          usageCount: 1298,
          category: "Education",
          pages: ["Beranda", "Fakultas", "Jurusan", "Tentang Kami", "Kontak"],
          tags: ["Universitas", "Perguruan Tinggi", "Fakultas", "Pendidikan"],
          styles: ["Desain Modern", "Tata Letak Fakultas", "Warna Korporat", "Gambar Kampus"],
          features: ["Daftar Fakultas", "Detail Jurusan", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "language-school",
          name: "Language School",
          preview: "/language-school-multilingual-website.png",
          description: "Template untuk sekolah bahasa",
          usageCount: 987,
          category: "Education",
          pages: ["Beranda", "Kursus", "Bahasa", "Tentang Kami", "Kontak"],
          tags: ["Sekolah Bahasa", "Kursus", "Bahasa", "Pendidikan"],
          styles: ["Desain Global", "Tata Letak Kursus", "Warna Cerah", "Gambar Bahasa"],
          features: ["Katalog Kursus", "Daftar Bahasa", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "training-institute",
          name: "Training Institute",
          preview: "/training-institute-professional-development.png",
          description: "Template untuk lembaga pelatihan profesional",
          usageCount: 876,
          category: "Education",
          pages: ["Beranda", "Pelatihan", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Lembaga Pelatihan", "Profesional", "Kategori", "Pendidikan"],
          styles: ["Desain Korporat", "Tata Letak Pelatihan", "Warna Netral", "Gambar Pelatihan"],
          features: ["Katalog Pelatihan", "Detail Kategori", "Formulir Pendaftaran", "Formulir Kontak"],
        },
      ]
    }

    // Real Estate templates
    if (
      businessTypeLower.includes("properti") ||
      businessTypeLower.includes("real estate") ||
      businessTypeLower.includes("rumah") ||
      businessTypeLower.includes("apartemen") ||
      businessTypeLower.includes("tanah") ||
      businessTypeLower.includes("developer")
    ) {
      return [
        {
          id: "real-estate-agency",
          name: "Real Estate Agency",
          preview: "/real-estate-agency-property-listing-website.png",
          description: "Template untuk agen properti dengan listing lengkap",
          usageCount: 1987,
          category: "Real Estate",
          pages: ["Beranda", "Properti", "Listing", "Tentang Kami", "Kontak"],
          tags: ["Agen Properti", "Listing", "Rumah", "Real Estate"],
          styles: ["Desain Modern", "Tata Letak Properti", "Warna Netral", "Gambar Rumah"],
          features: ["Katalog Properti", "Detail Listing", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "property-developer",
          name: "Property Developer",
          preview: "/property-developer-luxury-projects-website.png",
          description: "Template untuk developer properti mewah",
          usageCount: 1654,
          category: "Real Estate",
          pages: ["Beranda", "Proyek", "Tentang Kami", "Galeri", "Kontak"],
          tags: ["Developer Properti", "Mewah", "Proyek", "Real Estate"],
          styles: ["Desain Mewah", "Tata Letak Proyek", "Warna Gelap", "Gambar Proyek"],
          features: ["Katalog Proyek", "Galeri Proyek", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "apartment-rental",
          name: "Apartment Rental",
          preview: "/apartment-rental-modern-living-website.png",
          description: "Template untuk sewa apartemen modern",
          usageCount: 1432,
          category: "Real Estate",
          pages: ["Beranda", "Apartemen", "Fasilitas", "Tentang Kami", "Kontak"],
          tags: ["Sewa Apartemen", "Modern", "Fasilitas", "Real Estate"],
          styles: ["Desain Modern", "Tata Letak Apartemen", "Warna Cerah", "Gambar Apartemen"],
          features: ["Katalog Apartemen", "Detail Fasilitas", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "commercial-property",
          name: "Commercial Property",
          preview: "/commercial-property-business-real-estate.png",
          description: "Template untuk properti komersial",
          usageCount: 1298,
          category: "Real Estate",
          pages: ["Beranda", "Properti", "Listing", "Tentang Kami", "Kontak"],
          tags: ["Properti Komersial", "Listing", "Bisnis", "Real Estate"],
          styles: ["Desain Korporat", "Tata Letak Properti", "Warna Netral", "Gambar Properti"],
          features: ["Katalog Properti", "Detail Listing", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "land-investment",
          name: "Land Investment",
          preview: "/land-investment-opportunity-website.png",
          description: "Template untuk investasi tanah",
          usageCount: 987,
          category: "Real Estate",
          pages: ["Beranda", "Tanah", "Investasi", "Tentang Kami", "Kontak"],
          tags: ["Investasi Tanah", "Peluang", "Tanah", "Real Estate"],
          styles: ["Desain Alami", "Tata Letak Tanah", "Warna Hijau", "Gambar Tanah"],
          features: ["Katalog Tanah", "Detail Investasi", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "home-builder",
          name: "Home Builder",
          preview: "/home-builder-construction-company-website.png",
          description: "Template untuk kontraktor rumah",
          usageCount: 876,
          category: "Real Estate",
          pages: ["Beranda", "Proyek", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Kontraktor Rumah", "Konstruksi", "Layanan", "Real Estate"],
          styles: ["Desain Solid", "Tata Letak Proyek", "Warna Netral", "Gambar Rumah"],
          features: ["Katalog Proyek", "Detail Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Beauty & Salon templates
    if (
      businessTypeLower.includes("salon") ||
      businessTypeLower.includes("spa") ||
      businessTypeLower.includes("kecantikan") ||
      businessTypeLower.includes("barbershop") ||
      businessTypeLower.includes("nail art") ||
      businessTypeLower.includes("beauty")
    ) {
      return [
        {
          id: "beauty-salon",
          name: "Beauty Salon",
          preview: "/beauty-salon-elegant-feminine-website.png",
          description: "Template elegan untuk salon kecantikan",
          usageCount: 1876,
          category: "Beauty & Salon",
          pages: ["Beranda", "Layanan", "Galeri", "Tentang Kami", "Kontak"],
          tags: ["Salon Kecantikan", "Layanan", "Galeri", "Beauty"],
          styles: ["Desain Elegan", "Tata Letak Layanan", "Warna Lembut", "Gambar Salon"],
          features: ["Daftar Layanan", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "spa-wellness",
          name: "Spa & Wellness",
          preview: "/spa-wellness-relaxation-center-website.png",
          description: "Template menenangkan untuk spa dan wellness",
          usageCount: 1543,
          category: "Beauty & Salon",
          pages: ["Beranda", "Layanan", "Paket", "Tentang Kami", "Kontak"],
          tags: ["Spa", "Wellness", "Relaksasi", "Beauty"],
          styles: ["Desain Tenang", "Tata Letak Layanan", "Warna Hijau", "Gambar Spa"],
          features: ["Daftar Layanan", "Detail Paket", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "barbershop-modern",
          name: "Modern Barbershop",
          preview: "/barbershop-modern-masculine-website.png",
          description: "Template maskulin untuk barbershop modern",
          usageCount: 1298,
          category: "Beauty & Salon",
          pages: ["Beranda", "Layanan", "Galeri", "Tentang Kami", "Kontak"],
          tags: ["Barbershop", "Modern", "Maskulin", "Beauty"],
          styles: ["Desain Maskulin", "Tata Letak Layanan", "Warna Gelap", "Gambar Barbershop"],
          features: ["Daftar Layanan", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "nail-studio",
          name: "Nail Studio",
          preview: "/nail-studio-artistic-beauty-website.png",
          description: "Template artistik untuk studio nail art",
          usageCount: 987,
          category: "Beauty & Salon",
          pages: ["Beranda", "Galeri", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Nail Studio", "Nail Art", "Artistik", "Beauty"],
          styles: ["Desain Kreatif", "Tata Letak Galeri", "Warna Cerah", "Gambar Nail Art"],
          features: ["Galeri Foto", "Daftar Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "makeup-artist",
          name: "Makeup Artist",
          preview: "/makeup-artist-portfolio-beauty-website.png",
          description: "Template portfolio untuk makeup artist",
          usageCount: 876,
          category: "Beauty & Salon",
          pages: ["Beranda", "Portofolio", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Makeup Artist", "Portofolio", "Layanan", "Beauty"],
          styles: ["Desain Elegan", "Tata Letak Portofolio", "Warna Lembut", "Gambar Makeup"],
          features: ["Galeri Portofolio", "Daftar Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "hair-salon",
          name: "Hair Salon",
          preview: "/hair-salon-trendy-styling-website.png",
          description: "Template trendy untuk salon rambut",
          usageCount: 765,
          category: "Beauty & Salon",
          pages: ["Beranda", "Layanan", "Galeri", "Tentang Kami", "Kontak"],
          tags: ["Salon Rambut", "Trendy", "Styling", "Beauty"],
          styles: ["Desain Trendy", "Tata Letak Layanan", "Warna Cerah", "Gambar Rambut"],
          features: ["Daftar Layanan", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    // Technology & IT templates
    if (
      businessTypeLower.includes("teknologi") ||
      businessTypeLower.includes("software") ||
      businessTypeLower.includes("it") ||
      businessTypeLower.includes("aplikasi") ||
      businessTypeLower.includes("web development") ||
      businessTypeLower.includes("startup")
    ) {
      return [
        {
          id: "tech-startup",
          name: "Tech Startup",
          preview: "/tech-startup-innovative-company-website.png",
          description: "Template inovatif untuk startup teknologi",
          usageCount: 2134,
          category: "Technology & IT",
          pages: ["Beranda", "Produk", "Fitur", "Tentang Kami", "Kontak"],
          tags: ["Tech Startup", "Inovatif", "Teknologi", "IT"],
          styles: ["Desain Modern", "Tata Letak Produk", "Warna Cerah", "Gambar Teknologi"],
          features: ["Katalog Produk", "Detail Fitur", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "software-company",
          name: "Software Company",
          preview: "/software-company-professional-tech-website.png",
          description: "Template profesional untuk perusahaan software",
          usageCount: 1876,
          category: "Technology & IT",
          pages: ["Beranda", "Layanan", "Produk", "Tentang Kami", "Kontak"],
          tags: ["Software Company", "Profesional", "Software", "IT"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Software"],
          features: ["Daftar Layanan", "Katalog Produk", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "app-landing",
          name: "App Landing Page",
          preview: "/app-landing-page-mobile-application-website.png",
          description: "Template landing page untuk aplikasi mobile",
          usageCount: 1654,
          category: "Technology & IT",
          pages: ["Beranda", "Fitur", "Testimoni", "Harga", "Kontak"],
          tags: ["App Landing Page", "Aplikasi Mobile", "Fitur", "IT"],
          styles: ["Desain Modern", "Tata Letak Fitur", "Warna Cerah", "Gambar Aplikasi"],
          features: ["Detail Fitur", "Testimoni Pengguna", "Daftar Harga", "Formulir Kontak"],
        },
        {
          id: "it-services",
          name: "IT Services",
          preview: "/it-services-technical-support-website.png",
          description: "Template untuk layanan IT dan support teknis",
          usageCount: 1432,
          category: "Technology & IT",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["IT Services", "Support Teknis", "Layanan", "IT"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar IT"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "web-agency",
          name: "Web Agency",
          preview: "/web-agency-creative-digital-website.png",
          description: "Template kreatif untuk agensi web",
          usageCount: 1298,
          category: "Technology & IT",
          pages: ["Beranda", "Layanan", "Portofolio", "Tentang Kami", "Kontak"],
          tags: ["Web Agency", "Kreatif", "Digital", "IT"],
          styles: ["Desain Kreatif", "Tata Letak Portofolio", "Warna Cerah", "Gambar Web"],
          features: ["Daftar Layanan", "Galeri Portofolio", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "saas-platform",
          name: "SaaS Platform",
          preview: "/saas-platform-cloud-service-website.png",
          description: "Template untuk platform SaaS",
          usageCount: 1087,
          category: "Technology & IT",
          pages: ["Beranda", "Fitur", "Harga", "Tentang Kami", "Kontak"],
          tags: ["SaaS Platform", "Cloud Service", "Fitur", "IT"],
          styles: ["Desain Modern", "Tata Letak Fitur", "Warna Cerah", "Gambar Cloud"],
          features: ["Detail Fitur", "Daftar Harga", "Formulir Pendaftaran", "Formulir Kontak"],
        },
      ]
    }

    // Consulting service templates
    if (
      businessTypeLower.includes("konsultan") ||
      businessTypeLower.includes("jasa konsultasi") ||
      businessTypeLower.includes("consulting")
    ) {
      return [
        {
          id: "consulting-professional",
          name: "Consulting Professional",
          preview: "/consulting-professional-business-advisor.png",
          description: "Template profesional untuk jasa konsultasi",
          usageCount: 756,
          category: "Consulting",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Jasa Konsultasi", "Profesional", "Bisnis", "Consulting"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Konsultan"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "business-advisor",
          name: "Business Advisor",
          preview: "/business-advisor-strategic-consulting-website.png",
          description: "Template untuk konsultan bisnis dengan showcase keahlian",
          usageCount: 543,
          category: "Consulting",
          pages: ["Beranda", "Keahlian", "Tentang Kami", "Klien", "Kontak"],
          tags: ["Konsultan Bisnis", "Keahlian", "Strategis", "Consulting"],
          styles: ["Desain Modern", "Tata Letak Keahlian", "Warna Netral", "Gambar Bisnis"],
          features: ["Daftar Keahlian", "Profil Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "expert-services",
          name: "Expert Services",
          preview: "/expert-services-specialized-consulting-website.png",
          description: "Template untuk layanan ahli dan konsultasi",
          usageCount: 432,
          category: "Consulting",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Layanan Ahli", "Konsultasi", "Spesialisasi", "Consulting"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Konsultan"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "financial-advisor",
          name: "Financial Advisor",
          preview: "/financial-advisor-investment-consulting-website.png",
          description: "Template untuk konsultan keuangan",
          usageCount: 398,
          category: "Consulting",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Konsultan Keuangan", "Investasi", "Keuangan", "Consulting"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Grafik Keuangan"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "legal-services",
          name: "Legal Services",
          preview: "/legal-services-law-firm-website.png",
          description: "Template untuk layanan hukum dan legal",
          usageCount: 367,
          category: "Consulting",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Layanan Hukum", "Legal", "Hukum", "Consulting"],
          styles: ["Desain Formal", "Tata Letak Layanan", "Warna Gelap", "Gambar Hukum"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "marketing-consultant",
          name: "Marketing Consultant",
          preview: "/marketing-consultant-digital-strategy-website.png",
          description: "Template kreatif untuk konsultan marketing",
          usageCount: 298,
          category: "Consulting",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Klien", "Kontak"],
          tags: ["Konsultan Marketing", "Digital Strategy", "Marketing", "Consulting"],
          styles: ["Desain Kreatif", "Tata Letak Layanan", "Warna Cerah", "Gambar Marketing"],
          features: ["Daftar Layanan", "Profil Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    // Fitness & Sports templates
    if (
      businessTypeLower.includes("gym") ||
      businessTypeLower.includes("fitness") ||
      businessTypeLower.includes("olahraga") ||
      businessTypeLower.includes("yoga") ||
      businessTypeLower.includes("personal trainer") ||
      businessTypeLower.includes("sports")
    ) {
      return [
        {
          id: "fitness-gym",
          name: "Fitness Gym",
          preview: "/fitness-gym-modern-workout-website.png",
          description: "Template energik untuk gym dan fitness center",
          usageCount: 1765,
          category: "Fitness & Sports",
          pages: ["Beranda", "Kelas", "Jadwal", "Tentang Kami", "Kontak"],
          tags: ["Fitness Gym", "Workout", "Energi", "Sports"],
          styles: ["Desain Dinamis", "Tata Letak Kelas", "Warna Cerah", "Gambar Fitness"],
          features: ["Jadwal Kelas", "Detail Kelas", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "yoga-studio",
          name: "Yoga Studio",
          preview: "/yoga-studio-peaceful-wellness-website.png",
          description: "Template tenang untuk studio yoga",
          usageCount: 1432,
          category: "Fitness & Sports",
          pages: ["Beranda", "Kelas", "Jadwal", "Tentang Kami", "Kontak"],
          tags: ["Yoga Studio", "Wellness", "Tenang", "Sports"],
          styles: ["Desain Tenang", "Tata Letak Kelas", "Warna Lembut", "Gambar Yoga"],
          features: ["Jadwal Kelas", "Detail Kelas", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "personal-trainer",
          name: "Personal Trainer",
          preview: "/personal-trainer-fitness-coach-website.png",
          description: "Template untuk personal trainer dan coach",
          usageCount: 1298,
          category: "Fitness & Sports",
          pages: ["Beranda", "Program", "Tentang Saya", "Testimoni", "Kontak"],
          tags: ["Personal Trainer", "Fitness Coach", "Program", "Sports"],
          styles: ["Desain Modern", "Tata Letak Program", "Warna Cerah", "Gambar Fitness"],
          features: ["Daftar Program", "Testimoni Klien", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "sports-club",
          name: "Sports Club",
          preview: "/sports-club-athletic-community-website.png",
          description: "Template untuk klub olahraga",
          usageCount: 987,
          category: "Fitness & Sports",
          pages: ["Beranda", "Event", "Tim", "Tentang Kami", "Kontak"],
          tags: ["Sports Club", "Athletic", "Community", "Sports"],
          styles: ["Desain Dinamis", "Tata Letak Event", "Warna Cerah", "Gambar Olahraga"],
          features: ["Jadwal Event", "Profil Tim", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "martial-arts",
          name: "Martial Arts",
          preview: "/martial-arts-dojo-training-website.png",
          description: "Template untuk dojo dan pelatihan bela diri",
          usageCount: 876,
          category: "Fitness & Sports",
          pages: ["Beranda", "Kelas", "Jadwal", "Tentang Kami", "Kontak"],
          tags: ["Martial Arts", "Dojo", "Pelatihan", "Sports"],
          styles: ["Desain Tradisional", "Tata Letak Kelas", "Warna Solid", "Gambar Bela Diri"],
          features: ["Jadwal Kelas", "Detail Kelas", "Formulir Pendaftaran", "Formulir Kontak"],
        },
        {
          id: "dance-studio",
          name: "Dance Studio",
          preview: "/dance-studio-creative-movement-website.png",
          description: "Template kreatif untuk studio dance",
          usageCount: 765,
          category: "Fitness & Sports",
          pages: ["Beranda", "Kelas", "Jadwal", "Tentang Kami", "Kontak"],
          tags: ["Dance Studio", "Creative Movement", "Kelas", "Sports"],
          styles: ["Desain Kreatif", "Tata Letak Kelas", "Warna Cerah", "Gambar Tari"],
          features: ["Jadwal Kelas", "Detail Kelas", "Formulir Pendaftaran", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("musik") ||
      businessTypeLower.includes("audio") ||
      businessTypeLower.includes("studio musik") ||
      businessTypeLower.includes("band") ||
      businessTypeLower.includes("musisi") ||
      businessTypeLower.includes("recording")
    ) {
      return [
        {
          id: "music-studio",
          name: "Music Studio",
          preview: "/music-studio-recording-website.png",
          description: "Template untuk studio musik dan recording",
          usageCount: 1543,
          category: "Music & Audio",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Galeri", "Kontak"],
          tags: ["Studio Musik", "Recording", "Layanan", "Musik"],
          styles: ["Desain Modern", "Tata Letak Layanan", "Warna Gelap", "Gambar Musik"],
          features: ["Daftar Layanan", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "band-portfolio",
          name: "Band Portfolio",
          preview: "/band-portfolio-music-website.png",
          description: "Template portfolio untuk band dan musisi",
          usageCount: 1298,
          category: "Music & Audio",
          pages: ["Beranda", "Musik", "Tentang Kami", "Event", "Kontak"],
          tags: ["Band", "Musisi", "Portofolio", "Musik"],
          styles: ["Desain Dinamis", "Tata Letak Musik", "Warna Cerah", "Gambar Band"],
          features: ["Katalog Musik", "Jadwal Event", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "music-producer",
          name: "Music Producer",
          preview: "/music-producer-professional-website.png",
          description: "Template untuk produser musik",
          usageCount: 987,
          category: "Music & Audio",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Klien", "Kontak"],
          tags: ["Produser Musik", "Layanan", "Klien", "Musik"],
          styles: ["Desain Modern", "Tata Letak Layanan", "Warna Netral", "Gambar Musik"],
          features: ["Daftar Layanan", "Profil Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "audio-services",
          name: "Audio Services",
          preview: "/audio-services-sound-engineering-website.png",
          description: "Template untuk layanan audio dan sound engineering",
          usageCount: 876,
          category: "Music & Audio",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Layanan Audio", "Sound Engineering", "Layanan", "Musik"],
          styles: ["Desain Teknis", "Tata Letak Layanan", "Warna Netral", "Gambar Audio"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("video production") ||
      businessTypeLower.includes("videografi") ||
      businessTypeLower.includes("film") ||
      businessTypeLower.includes("youtube") ||
      businessTypeLower.includes("content creator")
    ) {
      return [
        {
          id: "video-production",
          name: "Video Production",
          preview: "/video-production-creative-website.png",
          description: "Template untuk jasa produksi video profesional",
          usageCount: 1876,
          category: "Video Production",
          pages: ["Beranda", "Portofolio", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Jasa Produksi Video", "Profesional", "Video", "Film"],
          styles: ["Desain Kreatif", "Tata Letak Portofolio", "Warna Cerah", "Gambar Video"],
          features: ["Galeri Portofolio", "Daftar Layanan", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "wedding-videography",
          name: "Wedding Videography",
          preview: "/wedding-videography-romantic-website.png",
          description: "Template untuk videografi pernikahan",
          usageCount: 1432,
          category: "Video Production",
          pages: ["Beranda", "Portofolio", "Paket", "Tentang Kami", "Kontak"],
          tags: ["Videografi Pernikahan", "Romantis", "Video", "Film"],
          styles: ["Desain Elegan", "Tata Letak Portofolio", "Warna Lembut", "Gambar Pernikahan"],
          features: ["Galeri Portofolio", "Detail Paket", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "content-creator",
          name: "Content Creator",
          preview: "/content-creator-social-media-website.png",
          description: "Template untuk content creator dan YouTuber",
          usageCount: 1298,
          category: "Video Production",
          pages: ["Beranda", "Konten", "Tentang Saya", "Media Sosial", "Kontak"],
          tags: ["Content Creator", "YouTuber", "Media Sosial", "Video"],
          styles: ["Desain Trendy", "Tata Letak Konten", "Warna Cerah", "Gambar Video"],
          features: ["Katalog Konten", "Feed Media Sosial", "Formulir Kolaborasi", "Formulir Kontak"],
        },
        {
          id: "film-studio",
          name: "Film Studio",
          preview: "/film-studio-cinema-production-website.png",
          description: "Template untuk studio film dan produksi sinema",
          usageCount: 987,
          category: "Video Production",
          pages: ["Beranda", "Proyek", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Studio Film", "Produksi Sinema", "Film", "Video"],
          styles: ["Desain Klasik", "Tata Letak Proyek", "Warna Gelap", "Gambar Film"],
          features: ["Katalog Proyek", "Daftar Layanan", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("fotografi wedding") ||
      businessTypeLower.includes("wedding photographer") ||
      businessTypeLower.includes("foto pernikahan")
    ) {
      return [
        {
          id: "wedding-photography",
          name: "Wedding Photography",
          preview: "/wedding-photography-romantic-elegant-website.png",
          description: "Template elegan untuk fotografer pernikahan",
          usageCount: 2134,
          category: "Wedding Photography",
          pages: ["Beranda", "Portofolio", "Paket", "Tentang Kami", "Kontak"],
          tags: ["Fotografer Pernikahan", "Romantis", "Elegan", "Foto"],
          styles: ["Desain Elegan", "Tata Letak Portofolio", "Warna Lembut", "Gambar Pernikahan"],
          features: ["Galeri Portofolio", "Detail Paket", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "bridal-portrait",
          name: "Bridal Portrait",
          preview: "/bridal-portrait-photography-website.png",
          description: "Template untuk foto portrait pengantin",
          usageCount: 1654,
          category: "Wedding Photography",
          pages: ["Beranda", "Portofolio", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Foto Portrait", "Pengantin", "Layanan", "Foto"],
          styles: ["Desain Klasik", "Tata Letak Portofolio", "Warna Lembut", "Gambar Pengantin"],
          features: ["Galeri Portofolio", "Daftar Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "engagement-photos",
          name: "Engagement Photos",
          preview: "/engagement-photography-couple-website.png",
          description: "Template untuk foto engagement dan couple",
          usageCount: 1432,
          category: "Wedding Photography",
          pages: ["Beranda", "Portofolio", "Paket", "Tentang Kami", "Kontak"],
          tags: ["Foto Engagement", "Couple", "Romantis", "Foto"],
          styles: ["Desain Romantis", "Tata Letak Portofolio", "Warna Lembut", "Gambar Couple"],
          features: ["Galeri Portofolio", "Detail Paket", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "wedding-package",
          name: "Wedding Package",
          preview: "/wedding-photography-package-website.png",
          description: "Template paket lengkap fotografi pernikahan",
          usageCount: 1298,
          category: "Wedding Photography",
          pages: ["Beranda", "Paket", "Layanan", "Tentang Kami", "Kontak"],
          tags: ["Paket Fotografi", "Pernikahan", "Lengkap", "Foto"],
          styles: ["Desain Elegan", "Tata Letak Paket", "Warna Lembut", "Gambar Pernikahan"],
          features: ["Detail Paket", "Daftar Layanan", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("catering") ||
      businessTypeLower.includes("event") ||
      businessTypeLower.includes("katering") ||
      businessTypeLower.includes("wedding organizer")
    ) {
      return [
        {
          id: "catering-service",
          name: "Catering Service",
          preview: "/catering-service-food-event-website.png",
          description: "Template untuk layanan catering dan event",
          usageCount: 1876,
          category: "Catering & Event",
          pages: ["Beranda", "Menu", "Event", "Tentang Kami", "Kontak"],
          tags: ["Layanan Catering", "Event", "Makanan", "Katering"],
          styles: ["Desain Modern", "Tata Letak Menu", "Warna Cerah", "Gambar Makanan"],
          features: ["Katalog Menu", "Jadwal Event", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "wedding-organizer",
          name: "Wedding Organizer",
          preview: "/wedding-organizer-event-planner-website.png",
          description: "Template untuk wedding organizer",
          usageCount: 1654,
          category: "Catering & Event",
          pages: ["Beranda", "Layanan", "Portofolio", "Tentang Kami", "Kontak"],
          tags: ["Wedding Organizer", "Event Planner", "Pernikahan", "Event"],
          styles: ["Desain Elegan", "Tata Letak Layanan", "Warna Lembut", "Gambar Pernikahan"],
          features: ["Daftar Layanan", "Galeri Portofolio", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "event-planner",
          name: "Event Planner",
          preview: "/event-planner-party-organizer-website.png",
          description: "Template untuk event planner profesional",
          usageCount: 1432,
          category: "Catering & Event",
          pages: ["Beranda", "Layanan", "Portofolio", "Tentang Kami", "Kontak"],
          tags: ["Event Planner", "Party Organizer", "Profesional", "Event"],
          styles: ["Desain Kreatif", "Tata Letak Layanan", "Warna Cerah", "Gambar Event"],
          features: ["Daftar Layanan", "Galeri Portofolio", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("pet care") ||
      businessTypeLower.includes("veteriner") ||
      businessTypeLower.includes("hewan") ||
      businessTypeLower.includes("pet shop") ||
      businessTypeLower.includes("grooming")
    ) {
      return [
        {
          id: "veterinary-clinic",
          name: "Veterinary Clinic",
          preview: "/veterinary-clinic-animal-care-website.png",
          description: "Template untuk klinik hewan dan veteriner",
          usageCount: 1543,
          category: "Pet Care & Veterinary",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Galeri", "Kontak"],
          tags: ["Klinik Hewan", "Veteriner", "Layanan", "Hewan"],
          styles: ["Desain Ramah", "Tata Letak Layanan", "Warna Lembut", "Gambar Hewan"],
          features: ["Daftar Layanan", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "pet-grooming",
          name: "Pet Grooming",
          preview: "/pet-grooming-salon-animal-website.png",
          description: "Template untuk salon grooming hewan",
          usageCount: 1298,
          category: "Pet Care & Veterinary",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Galeri", "Kontak"],
          tags: ["Pet Grooming", "Salon", "Layanan", "Hewan"],
          styles: ["Desain Modern", "Tata Letak Layanan", "Warna Cerah", "Gambar Hewan"],
          features: ["Daftar Layanan", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "pet-shop",
          name: "Pet Shop",
          preview: "/pet-shop-animal-store-website.png",
          description: "Template untuk toko hewan peliharaan",
          usageCount: 1087,
          category: "Pet Care & Veterinary",
          pages: ["Beranda", "Produk", "Kategori", "Tentang Kami", "Kontak"],
          tags: ["Toko Hewan", "Peliharaan", "Produk", "Hewan"],
          styles: ["Desain Ramah", "Tata Letak Produk", "Warna Cerah", "Gambar Hewan"],
          features: ["Katalog Produk", "Detail Kategori", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "animal-hospital",
          name: "Animal Hospital",
          preview: "/animal-hospital-veterinary-website.png",
          description: "Template untuk rumah sakit hewan",
          usageCount: 987,
          category: "Pet Care & Veterinary",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Dokter", "Kontak"],
          tags: ["Rumah Sakit Hewan", "Veteriner", "Layanan", "Hewan"],
          styles: ["Desain Profesional", "Tata Letak Layanan", "Warna Netral", "Gambar Hewan"],
          features: ["Daftar Layanan", "Profil Dokter", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("home services") ||
      businessTypeLower.includes("jasa rumah") ||
      businessTypeLower.includes("perbaikan rumah") ||
      businessTypeLower.includes("maintenance")
    ) {
      return [
        {
          id: "home-repair",
          name: "Home Repair",
          preview: "/home-repair-maintenance-service-website.png",
          description: "Template untuk jasa perbaikan rumah",
          usageCount: 1654,
          category: "Home Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Jasa Perbaikan", "Rumah", "Maintenance", "Layanan"],
          styles: ["Desain Solid", "Tata Letak Layanan", "Warna Netral", "Gambar Rumah"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "plumbing-service",
          name: "Plumbing Service",
          preview: "/plumbing-service-home-repair-website.png",
          description: "Template untuk jasa tukang ledeng",
          usageCount: 1432,
          category: "Home Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Tukang Ledeng", "Plumbing", "Perbaikan", "Layanan"],
          styles: ["Desain Teknis", "Tata Letak Layanan", "Warna Biru", "Gambar Plumbing"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "electrical-service",
          name: "Electrical Service",
          preview: "/electrical-service-home-maintenance-website.png",
          description: "Template untuk jasa listrik rumah",
          usageCount: 1298,
          category: "Home Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Jasa Listrik", "Electrical", "Perbaikan", "Layanan"],
          styles: ["Desain Teknis", "Tata Letak Layanan", "Warna Kuning", "Gambar Listrik"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "handyman-service",
          name: "Handyman Service",
          preview: "/handyman-service-home-improvement-website.png",
          description: "Template untuk jasa tukang serba bisa",
          usageCount: 1087,
          category: "Home Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Tukang Serba Bisa", "Handyman", "Perbaikan", "Layanan"],
          styles: ["Desain Sederhana", "Tata Letak Layanan", "Warna Netral", "Gambar Alat"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("cleaning services") ||
      businessTypeLower.includes("jasa kebersihan") ||
      businessTypeLower.includes("cleaning") ||
      businessTypeLower.includes("housekeeping")
    ) {
      return [
        {
          id: "cleaning-service",
          name: "Cleaning Service",
          preview: "/cleaning-service-professional-website.png",
          description: "Template untuk jasa kebersihan profesional",
          usageCount: 1765,
          category: "Cleaning Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Jasa Kebersihan", "Profesional", "Cleaning", "Layanan"],
          styles: ["Desain Bersih", "Tata Letak Layanan", "Warna Putih", "Gambar Cleaning"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "office-cleaning",
          name: "Office Cleaning",
          preview: "/office-cleaning-commercial-website.png",
          description: "Template untuk jasa kebersihan kantor",
          usageCount: 1432,
          category: "Cleaning Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Kebersihan Kantor", "Commercial", "Cleaning", "Layanan"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Cleaning"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "house-cleaning",
          name: "House Cleaning",
          preview: "/house-cleaning-residential-website.png",
          description: "Template untuk jasa kebersihan rumah",
          usageCount: 1298,
          category: "Cleaning Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Kebersihan Rumah", "Residential", "Cleaning", "Layanan"],
          styles: ["Desain Ramah", "Tata Letak Layanan", "Warna Cerah", "Gambar Cleaning"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "carpet-cleaning",
          name: "Carpet Cleaning",
          preview: "/carpet-cleaning-specialized-website.png",
          description: "Template untuk jasa cuci karpet",
          usageCount: 987,
          category: "Cleaning Services",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Cuci Karpet", "Specialized", "Cleaning", "Layanan"],
          styles: ["Desain Bersih", "Tata Letak Layanan", "Warna Netral", "Gambar Cleaning"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("insurance") ||
      businessTypeLower.includes("asuransi") ||
      businessTypeLower.includes("agen asuransi")
    ) {
      return [
        {
          id: "insurance-agency",
          name: "Insurance Agency",
          preview: "/insurance-agency-protection-website.png",
          description: "Template untuk agen asuransi profesional",
          usageCount: 1654,
          category: "Insurance",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Agen Asuransi", "Profesional", "Insurance", "Layanan"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Asuransi"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "life-insurance",
          name: "Life Insurance",
          preview: "/life-insurance-family-protection-website.png",
          description: "Template untuk asuransi jiwa",
          usageCount: 1432,
          category: "Insurance",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Asuransi Jiwa", "Family Protection", "Insurance", "Layanan"],
          styles: ["Desain Tenang", "Tata Letak Layanan", "Warna Lembut", "Gambar Keluarga"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "car-insurance",
          name: "Car Insurance",
          preview: "/car-insurance-vehicle-protection-website.png",
          description: "Template untuk asuransi kendaraan",
          usageCount: 1298,
          category: "Insurance",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          tags: ["Asuransi Kendaraan", "Vehicle Protection", "Insurance", "Layanan"],
          styles: ["Desain Modern", "Tata Letak Layanan", "Warna Cerah", "Gambar Mobil"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "health-insurance",
          name: "Health Insurance",
          preview: "/health-insurance-medical-coverage-website.png",
          description: "Template untuk asuransi kesehatan",
          usageCount: 1087,
          category: "Insurance",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Testimoni", "Kontak"],
          styles: ["Desain Profesional", "Tata Letak Layanan", "Warna Hijau", "Gambar Kesehatan"],
          features: ["Daftar Layanan", "Testimoni Klien", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("coworking") ||
      businessTypeLower.includes("shared office") ||
      businessTypeLower.includes("workspace")
    ) {
      return [
        {
          id: "coworking-space",
          name: "Coworking Space",
          preview: "/coworking-space-modern-office-website.png",
          description: "Template untuk coworking space modern",
          usageCount: 1543,
          category: "Coworking Space",
          pages: ["Beranda", "Fasilitas", "Tentang Kami", "Galeri", "Kontak"],
          tags: ["Coworking Space", "Modern", "Office", "Workspace"],
          styles: ["Desain Modern", "Tata Letak Fasilitas", "Warna Cerah", "Gambar Kantor"],
          features: ["Daftar Fasilitas", "Galeri Foto", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "shared-office",
          name: "Shared Office",
          preview: "/shared-office-collaborative-workspace-website.png",
          description: "Template untuk shared office dan workspace",
          usageCount: 1298,
          category: "Coworking Space",
          pages: ["Beranda", "Fasilitas", "Tentang Kami", "Komunitas", "Kontak"],
          tags: ["Shared Office", "Collaborative", "Workspace", "Komunitas"],
          styles: ["Desain Ramah", "Tata Letak Fasilitas", "Warna Hangat", "Gambar Kantor"],
          features: ["Daftar Fasilitas", "Profil Komunitas", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "business-center",
          name: "Business Center",
          preview: "/business-center-professional-workspace-website.png",
          description: "Template untuk business center",
          usageCount: 1087,
          category: "Coworking Space",
          pages: ["Beranda", "Layanan", "Fasilitas", "Tentang Kami", "Kontak"],
          tags: ["Business Center", "Profesional", "Workspace", "Layanan"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Kantor"],
          features: ["Daftar Layanan", "Daftar Fasilitas", "Formulir Pemesanan", "Formulir Kontak"],
        },
        {
          id: "meeting-room",
          name: "Meeting Room",
          preview: "/meeting-room-rental-space-website.png",
          description: "Template untuk rental meeting room",
          usageCount: 987,
          category: "Coworking Space",
          pages: ["Beranda", "Ruangan", "Fasilitas", "Tentang Kami", "Kontak"],
          tags: ["Meeting Room", "Rental Space", "Ruangan", "Fasilitas"],
          styles: ["Desain Modern", "Tata Letak Ruangan", "Warna Cerah", "Gambar Ruangan"],
          features: ["Katalog Ruangan", "Daftar Fasilitas", "Formulir Pemesanan", "Formulir Kontak"],
        },
      ]
    }

    if (
      businessTypeLower.includes("import export") ||
      businessTypeLower.includes("trading") ||
      businessTypeLower.includes("ekspor impor")
    ) {
      return [
        {
          id: "import-export",
          name: "Import Export",
          preview: "/import-export-trading-company-website.png",
          description: "Template untuk perusahaan import export",
          usageCount: 1432,
          category: "Import Export",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Mitra", "Kontak"],
          tags: ["Import Export", "Trading Company", "Layanan", "Mitra"],
          styles: ["Desain Korporat", "Tata Letak Layanan", "Warna Netral", "Gambar Trading"],
          features: ["Daftar Layanan", "Profil Mitra", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "international-trade",
          name: "International Trade",
          preview: "/international-trade-global-business-website.png",
          description: "Template untuk perdagangan internasional",
          usageCount: 1298,
          category: "Import Export",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Negara", "Kontak"],
          tags: ["International Trade", "Global Business", "Layanan", "Negara"],
          styles: ["Desain Global", "Tata Letak Layanan", "Warna Cerah", "Gambar Trading"],
          features: ["Daftar Layanan", "Daftar Negara", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "commodity-trading",
          name: "Commodity Trading",
          preview: "/commodity-trading-business-website.png",
          description: "Template untuk trading komoditas",
          usageCount: 1087,
          category: "Import Export",
          pages: ["Beranda", "Komoditas", "Tentang Kami", "Analisis", "Kontak"],
          tags: ["Commodity Trading", "Business", "Komoditas", "Analisis"],
          styles: ["Desain Modern", "Tata Letak Komoditas", "Warna Netral", "Grafik Trading"],
          features: ["Katalog Komoditas", "Analisis Pasar", "Formulir Permintaan", "Formulir Kontak"],
        },
        {
          id: "freight-forwarding",
          name: "Freight Forwarding",
          preview: "/freight-forwarding-logistics-website.png",
          description: "Template untuk jasa freight forwarding",
          usageCount: 987,
          category: "Import Export",
          pages: ["Beranda", "Layanan", "Tentang Kami", "Armada", "Kontak"],
          tags: ["Freight Forwarding", "Logistics", "Layanan", "Armada"],
          styles: ["Desain Teknis", "Tata Letak Layanan", "Warna Biru", "Gambar Logistik"],
          features: ["Daftar Layanan", "Katalog Armada", "Formulir Permintaan", "Formulir Kontak"],
        },
      ]
    }

    // Default templates for other business types
    return [
      {
        id: "modern-business",
        name: "Modern Business",
        preview: "/modern-business-website-template.png",
        description: "Template modern untuk berbagai jenis bisnis",
        usageCount: 4521,
        category: "General",
        pages: ["Beranda", "Tentang Kami", "Layanan", "Portfolio", "Kontak"],
        tags: ["Modern", "Bisnis", "Profesional", "Responsif"],
        styles: ["Clean Design", "Gradient Accents", "Modern Typography", "Mobile First"],
        features: ["SEO Optimized", "Fast Loading", "Contact Forms", "Social Media Integration"],
      },
      {
        id: "elegant-pro",
        name: "Elegant Pro",
        preview: "/elegant-professional-website-template.png",
        description: "Template elegan dan profesional",
        usageCount: 3876,
        category: "General",
        pages: ["Home", "About", "Services", "Team", "Blog", "Contact"],
        tags: ["Elegan", "Profesional", "Premium", "Corporate"],
        styles: ["Elegant Layout", "Sophisticated Colors", "Premium Fonts", "Smooth Animations"],
        features: ["Multi-page", "Blog Ready", "Team Showcase", "Newsletter Signup"],
      },
      {
        id: "clean-minimal",
        name: "Clean Minimal",
        preview: "/clean-minimal-website-template.png",
        description: "Template bersih dan minimalis",
        usageCount: 3234,
        category: "General",
        pages: ["Home", "About", "Work", "Contact"],
        tags: ["Minimal", "Bersih", "Simple", "Modern"],
        styles: ["Minimalist Design", "White Space", "Clean Typography", "Subtle Shadows"],
        features: ["Portfolio Showcase", "Minimal Navigation", "Fast Performance", "Easy Customization"],
      },
      {
        id: "corporate-classic",
        name: "Corporate Classic",
        preview: "/corporate-classic-business-website.png",
        description: "Template klasik untuk perusahaan",
        usageCount: 2987,
        category: "General",
        pages: ["Beranda", "Tentang Kami", "Layanan", "Portfolio", "Kontak"],
        tags: ["Korporat", "Klasik", "Bisnis", "Profesional"],
        styles: ["Desain Klasik", "Tata Letak Terstruktur", "Warna Netral", "Gambar Korporat"],
        features: ["SEO Optimized", "Fast Loading", "Contact Forms", "Social Media Integration"],
      },
      {
        id: "creative-portfolio",
        name: "Creative Portfolio",
        preview: "/creative-portfolio-artistic-website.png",
        description: "Template kreatif untuk portfolio",
        usageCount: 2654,
        category: "General",
        pages: ["Beranda", "Tentang Saya", "Portofolio", "Blog", "Kontak"],
        tags: ["Kreatif", "Portofolio", "Artistik", "Personal"],
        styles: ["Desain Artistik", "Tata Letak Unik", "Warna Kreatif", "Gambar Personal"],
        features: ["Galeri Portofolio", "Artikel Blog", "Formulir Kontak", "Integrasi Media Sosial"],
      },
      {
        id: "startup-landing",
        name: "Startup Landing",
        preview: "/startup-landing-page-modern-website.png",
        description: "Template landing page untuk startup",
        usageCount: 2432,
        category: "General",
        pages: ["Beranda", "Fitur", "Harga", "Testimoni", "Kontak"],
        tags: ["Startup", "Landing Page", "Modern", "Bisnis"],
        styles: ["Desain Modern", "Tata Letak Fitur", "Warna Cerah", "Gambar Startup"],
        features: ["Detail Fitur", "Testimoni Pengguna", "Daftar Harga", "Formulir Kontak"],
      },
    ]
  }

  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "Rp 850.000",
      originalPrice: "Rp 1.000.000",
      discount: "15%",
      features: ["Buat 1 situs website", "Domain .com", "SSL Certificate", "Support 3 Bulan"],
    },
    {
      id: "growth",
      name: "Growth",
      price: "Rp 1.435.000",
      originalPrice: "Rp 1.750.000",
      discount: "18%",
      popular: true,
      features: ["Buat 3 situs website", "Domain .com", "SSL Certificate", "Support 6 Bulan", "SEO Optimization"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "Rp 4.250.000",
      originalPrice: "Rp 5.000.000",
      discount: "15%",
      features: [
        "Buat 10 situs website",
        "Domain .com",
        "SSL Certificate",
        "Support 1 Tahun",
        "SEO Optimization",
        "E-commerce Ready",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Rp 9.600.000",
      originalPrice: "Rp 12.000.000",
      discount: "20%",
      features: [
        "Unlimited Halaman",
        "Domain .com",
        "SSL Certificate",
        "Support 2 Tahun",
        "SEO Optimization",
        "Custom Development",
      ],
    },
  ]

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreviewTemplate = (templateId: string) => {
    setPreviewTemplate(templateId)
  }

  const handleSelectTemplate = (templateId: string) => {
    updateFormData("selectedTemplate", templateId)
    setPreviewTemplate(null)
  }

  const selectRecommendedDomain = (domain: string) => {
    const domainWithoutExtension = domain.replace(selectedExtension, "")
    updateFormData("domain", domainWithoutExtension)
    setDomainStatus("available")
    setDomainRecommendations([])
  }

  const allTemplates = getTemplates()
  const filteredTemplates = allTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
      template.description.toLowerCase().includes(templateSearch.toLowerCase()) ||
      template.category.toLowerCase().includes(templateSearch.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage)
  const currentTemplates = filteredTemplates.slice(
    templatePage * templatesPerPage,
    (templatePage + 1) * templatesPerPage,
  )

  const nextTemplatePage = () => {
    if (templatePage < totalPages - 1) {
      setTemplatePage(templatePage + 1)
    }
  }

  const prevTemplatePage = () => {
    if (templatePage > 0) {
      setTemplatePage(templatePage - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedTemplate !== ""
      case 2:
        return formData.domain !== "" && (domainStatus === "available" || domainStatus === "idle")
      case 3:
        return formData.package !== ""
      case 4:
        return formData.businessName && formData.ownerName && formData.email && formData.phone
      case 5:
        return formData.paymentMethod !== ""
      case 6:
        return true
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Pilih Template untuk {businessType}</h2>
              <p className="text-gray-300">Template yang cocok untuk jenis bisnis Anda</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Cari template berdasarkan nama, deskripsi, atau kategori..."
                  value={templateSearch}
                  onChange={(e) => {
                    setTemplateSearch(e.target.value)
                    setTemplatePage(0) // Reset to first page when searching
                  }}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                />
              </div>
            </div>

            {templateSearch && (
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Ditemukan {filteredTemplates.length} template untuk "{templateSearch}"
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {currentTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`transition-all hover:shadow-lg bg-gray-900 border-gray-800 ${formData.selectedTemplate === template.id ? "ring-2 ring-white" : ""}`}
                >
                  <CardContent className="p-4">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{template.description}</p>

                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{template.usageCount.toLocaleString()} pengguna</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                        onClick={() => handlePreviewTemplate(template.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Lihat
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-white text-black hover:bg-gray-200"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        Pilih
                      </Button>
                    </div>

                    {formData.selectedTemplate === template.id && (
                      <Badge className="w-full justify-center mt-2 bg-green-600 text-white">Dipilih</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {templateSearch && currentTemplates.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-2">Tidak ada template yang ditemukan untuk "{templateSearch}"</p>
                <Button
                  variant="outline"
                  onClick={() => setTemplateSearch("")}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Hapus Filter
                </Button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={prevTemplatePage}
                  disabled={templatePage === 0}
                  className="flex items-center gap-2 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    Halaman {templatePage + 1} dari {totalPages}
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={nextTemplatePage}
                  disabled={templatePage === totalPages - 1}
                  className="flex items-center gap-2 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Selanjutnya
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {previewTemplate && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      Detail Template: {allTemplates.find((t) => t.id === previewTemplate)?.name}
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setPreviewTemplate(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)] overflow-hidden">
                    {/* Template Preview Image */}
                    <div className="lg:w-2/3 p-4 h-full flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={allTemplates.find((t) => t.id === previewTemplate)?.preview || "/placeholder.svg"}
                          alt="Template Preview"
                          className="max-w-full max-h-full object-contain rounded border border-gray-700"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                          }}
                        />
                        <Button
                          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                          onClick={() => {
                            const template = allTemplates.find((t) => t.id === previewTemplate)
                            if (template?.preview) {
                              window.open(template.preview, "_blank")
                            }
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Preview in New Tab
                        </Button>
                      </div>
                    </div>

                    {/* Template Details */}
                    <div className="lg:w-1/3 p-4 border-l border-gray-800 overflow-y-auto">
                      {(() => {
                        const template = allTemplates.find((t) => t.id === previewTemplate)
                        if (!template) return null

                        return (
                          <div className="space-y-6">
                            {/* Description */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Deskripsi</h4>
                              <p className="text-sm text-gray-300">{template.description}</p>
                            </div>

                            {/* Creator */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Dibuat oleh</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-300">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                                  {template.creator ? template.creator.charAt(0).toUpperCase() : "A"}
                                </div>
                                <span>{template.creator || "Admin Template"}</span>
                              </div>
                            </div>

                            {/* Usage Count */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Pengguna</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Users className="h-4 w-4" />
                                <span>{template.usageCount.toLocaleString()} pengguna menggunakan template ini</span>
                              </div>
                            </div>

                            {/* Pages */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Halaman Tersedia</h4>
                              <div className="flex flex-wrap gap-1">
                                {template.pages &&
                                  template.pages.map((page, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs bg-gray-800 text-gray-300"
                                    >
                                      {page}
                                    </Badge>
                                  ))}
                              </div>
                            </div>

                            {/* Tags */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-1">
                                {template.tags &&
                                  template.tags.map((tag, index) => (
                                    <Badge key={index} className="text-xs bg-blue-600 text-white">
                                      {tag}
                                    </Badge>
                                  ))}
                              </div>
                            </div>

                            {/* Styles */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Gaya Desain</h4>
                              <ul className="space-y-1">
                                {template.styles &&
                                  template.styles.map((style, index) => (
                                    <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                      {style}
                                    </li>
                                  ))}
                              </ul>
                            </div>

                            {/* Features */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Fitur Utama</h4>
                              <ul className="space-y-1">
                                {template.features &&
                                  template.features.map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                      {feature}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>

                  <div className="pt-2 pb-4 px-4 border-t border-gray-800 flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setPreviewTemplate(null)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Tutup
                    </Button>
                    <Button
                      className="bg-white text-black hover:bg-gray-200"
                      onClick={() => handleSelectTemplate(previewTemplate)}
                    >
                      Pilih Template Ini
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Pilih Domain Website</h2>
              <p className="text-gray-300">Masukkan nama domain yang diinginkan</p>
            </div>

            <div className="space-y-4">
              {/* Domain Input */}
              <div className="space-y-2">
                <div className="flex">
                  <Input
                    placeholder="namawebsite"
                    value={formData.domain}
                    onChange={(e) => updateFormData("domain", e.target.value)}
                    className="rounded-r-none bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  <select
                    value={selectedExtension}
                    onChange={(e) => setSelectedExtension(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 border border-gray-700 border-l-0 rounded-r-md flex items-center min-w-[80px]"
                  >
                    {domainExtensions.map((ext) => (
                      <option key={ext} value={ext}>
                        {ext}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Domain Status */}
                {formData.domain && (
                  <div className="flex items-center gap-2 text-sm">
                    {domainStatus === "checking" && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                        <span className="text-gray-400">Mengecek ketersediaan domain...</span>
                      </>
                    )}
                    {domainStatus === "available" && (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">
                          {formData.domain}
                          {selectedExtension} tersedia!
                        </span>
                      </>
                    )}
                    {domainStatus === "taken" && (
                      <>
                        <XCircle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 font-medium">
                          {formData.domain}
                          {selectedExtension} sudah digunakan
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Domain Recommendations */}
              {domainRecommendations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-white">Rekomendasi Domain Tersedia:</h3>
                  <div className="grid gap-2">
                    {domainRecommendations.map((domain, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-800 rounded-lg hover:bg-gray-900 cursor-pointer transition-colors"
                        onClick={() => selectRecommendedDomain(domain)}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="font-medium text-white">{domain}</span>
                        </div>
                        <Button size="sm" variant="outline" className="bg-white text-black hover:bg-gray-200">
                          Pilih
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Pilih Paket Website</h2>
              <p className="text-gray-300">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all bg-gray-900 border-gray-800 relative ${formData.package === pkg.id ? "ring-2 ring-white" : ""}`}
                  onClick={() => updateFormData("package", pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">TERPOPULER</span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-white">{pkg.name}</CardTitle>
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 line-through mb-1">{pkg.originalPrice}</div>
                      <CardDescription className="text-2xl font-bold text-white">{pkg.price}</CardDescription>
                      <div className="text-sm text-green-400 font-medium mt-1">Hemat {pkg.discount}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-white" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {formData.package === pkg.id && (
                      <Badge className="w-full justify-center mt-4 bg-green-600 text-white">Dipilih</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Lengkapi Data Bisnis</h2>
              <p className="text-gray-300">Informasi ini akan digunakan untuk website Anda</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName" className="text-white">
                  Nama Bisnis/Perusahaan
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateFormData("businessName", e.target.value)}
                  placeholder="PT. Contoh Bisnis"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="ownerName" className="text-white">
                  Nama Pemilik
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData("ownerName", e.target.value)}
                  placeholder="John Doe"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">
                  Nomor Telepon
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="08123456789"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-white">
                  Alamat
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  placeholder="Alamat lengkap bisnis Anda"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Pilih Metode Pembayaran</h2>
              <p className="text-gray-300">Pilih cara pembayaran yang Anda inginkan</p>
            </div>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => updateFormData("paymentMethod", value)}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-4 border border-gray-800 rounded-lg bg-gray-900">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" className="border-gray-600" />
                  <Label htmlFor="bank-transfer" className="flex-1 text-white">
                    Transfer Bank
                  </Label>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-800 rounded-lg bg-gray-900">
                  <RadioGroupItem value="e-wallet" id="e-wallet" className="border-gray-600" />
                  <Label htmlFor="e-wallet" className="flex-1 text-white">
                    E-Wallet (OVO, GoPay, DANA)
                  </Label>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-800 rounded-lg bg-gray-900">
                  <RadioGroupItem value="qris" id="qris" className="border-gray-600" />
                  <Label htmlFor="qris" className="flex-1 text-white">
                    QRIS (Quick Response Code Indonesian Standard)
                  </Label>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center space-x-2 p-4 border border-gray-800 rounded-lg bg-gray-900">
                  <RadioGroupItem value="credit-card" id="credit-card" className="border-gray-600" />
                  <Label htmlFor="credit-card" className="flex-1 text-white">
                    Kartu Kredit
                  </Label>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </RadioGroup>
          </div>
        )

      case 6:
        const selectedPackage = packages.find((p) => p.id === formData.package)
        const originalPrice = selectedPackage ? formatPrice(selectedPackage.price) : 0
        const discountAmount = calculateDiscount(originalPrice)
        const subtotalAfterDiscount = originalPrice - discountAmount
        const taxAmount = Math.floor(subtotalAfterDiscount * 0.11)
        const finalPrice = subtotalAfterDiscount + taxAmount

        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Konfirmasi Pesanan</h2>
              <p className="text-gray-300">Periksa kembali detail pesanan Anda</p>
            </div>

            <Card className="bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Jenis Bisnis</p>
                    <p className="font-medium text-white">{businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Template</p>
                    <p className="font-medium text-white">
                      {allTemplates.find((t) => t.id === formData.selectedTemplate)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Domain</p>
                    <p className="font-medium text-white">
                      {formData.domain}
                      {selectedExtension}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Paket</p>
                    <p className="font-medium text-white">{selectedPackage?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Nama Bisnis</p>
                    <p className="font-medium text-white">{formData.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">{formData.email}</p>
                  </div>
                </div>

                <div className="border-t pt-4 border-gray-800">
                  <h4 className="text-white font-medium mb-3">Kode Kupon</h4>

                  {!appliedCoupon ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan kode kupon"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                          onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                        />
                        <Button
                          onClick={applyCoupon}
                          disabled={isValidatingCoupon}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                        >
                          {isValidatingCoupon ? "Validasi..." : "Terapkan"}
                        </Button>
                      </div>
                      {couponError && <p className="text-red-400 text-sm">{couponError}</p>}
                    </div>
                  ) : (
                    <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 font-medium">{appliedCoupon.code}</span>
                          <span className="text-gray-400">- {appliedCoupon.description}</span>
                        </div>
                        <Button
                          onClick={removeCoupon}
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white h-auto p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 border-gray-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">Rp {originalPrice.toLocaleString("id-ID")}</span>
                  </div>

                  {appliedCoupon && discountAmount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Diskon ({appliedCoupon.code})</span>
                      <span className="text-green-400">-Rp {discountAmount.toLocaleString("id-ID")}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Pajak (11%)</span>
                    <span className="text-white">Rp {taxAmount.toLocaleString("id-ID")}</span>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2 border-gray-800">
                    <span className="text-white">Total Pembayaran</span>
                    <span className="text-white">Rp {finalPrice.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Proses Selanjutnya</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Setelah pembayaran dikonfirmasi, tim kami akan mulai mengerjakan website Anda</li>
                      <li>• Website akan selesai dalam waktu 2x24 jam</li>
                      <li>• Anda akan mendapat notifikasi via email ketika website sudah siap</li>
                      <li>• Domain akan diaktifkan setelah pembayaran dikonfirmasi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-white text-black hover:bg-gray-200"
              size="lg"
              onClick={() => {
                alert(
                  "Terima kasih! Pesanan Anda telah diterima. Silakan lakukan pembayaran sesuai instruksi yang akan dikirim ke email Anda.",
                )
              }}
            >
              Selesaikan Pembayaran
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const renderWizardForm = () => {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center mb-8">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Zaman Web</h1>
              <p className="text-sm text-gray-400">Website Builder</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                      index + 1 <= currentStep
                        ? "bg-white text-black"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${index + 1 <= currentStep ? "text-white" : "text-gray-400"}`}>
                      {step.title}
                    </div>
                    <div className={`text-xs ${index + 1 <= currentStep ? "text-gray-300" : "text-gray-500"}`}>
                      {step.desc}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden md:block w-full h-px mt-4 ${index + 1 < currentStep ? "bg-white" : "bg-gray-800"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-6xl mx-auto">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 max-w-6xl mx-auto">
            {currentStep > 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="bg-transparent border-gray-600 text-white hover:bg-gray-800 px-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Sebelumnya
              </Button>
            )}

            <div className={currentStep === 1 ? "ml-auto" : ""}>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-white text-black hover:bg-gray-200 px-8"
              >
                {currentStep === 6 ? "Selesaikan Pesanan" : "Selanjutnya"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return renderWizardForm()
}

export { WizardForm }
