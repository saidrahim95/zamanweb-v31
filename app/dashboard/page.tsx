"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Globe,
  BarChart3,
  Users,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  LogOut,
  HelpCircle,
  User,
  Menu,
  CreditCard,
  Receipt,
  Wallet,
  Mail,
  Search,
  ChevronDown,
  ChevronRight,
  Copy,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [websites, setWebsites] = useState([
    {
      id: 1,
      name: "Toko Online Saya",
      domain: "tokoonline.zamanweb.com",
      status: "active",
      visitors: "1,234",
      template: "E-commerce Modern",
      expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    },
    {
      id: 2,
      name: "Portfolio Pribadi",
      domain: "portfolio.zamanweb.com",
      status: "draft",
      visitors: "0",
      template: "Portfolio Kreatif",
      expiresAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    },
  ])

  const [currentView, setCurrentView] = useState("dashboard")

  const [businessEmails, setBusinessEmails] = useState([
    {
      id: 1,
      email: "admin",
      domain: "tokoonline.zamanweb.com",
      fullEmail: "admin@tokoonline.zamanweb.com",
      password: "SecurePass123!",
      status: "active",
      createdAt: new Date("2024-01-15"),
      lastUsed: new Date("2024-02-28"),
    },
    {
      id: 2,
      email: "support",
      domain: "tokoonline.zamanweb.com",
      fullEmail: "support@tokoonline.zamanweb.com",
      password: "Support2024#",
      status: "active",
      createdAt: new Date("2024-01-20"),
      lastUsed: new Date("2024-02-27"),
    },
    {
      id: 3,
      email: "sales",
      domain: "tokoonline.zamanweb.com",
      fullEmail: "sales@tokoonline.zamanweb.com",
      password: "Sales@2024",
      status: "active",
      createdAt: new Date("2024-02-01"),
      lastUsed: new Date("2024-02-26"),
    },
    {
      id: 4,
      email: "info",
      domain: "portfolio.zamanweb.com",
      fullEmail: "info@portfolio.zamanweb.com",
      password: "InfoPass456$",
      status: "inactive",
      createdAt: new Date("2024-01-10"),
      lastUsed: new Date("2024-02-15"),
    },
    {
      id: 5,
      email: "contact",
      domain: "portfolio.zamanweb.com",
      fullEmail: "contact@portfolio.zamanweb.com",
      password: "Contact789%",
      status: "inactive",
      createdAt: new Date("2024-01-25"),
      lastUsed: new Date("2024-02-10"),
    },
  ])

  const [selectedWebsite, setSelectedWebsite] = useState("tokoonline.zamanweb.com")

  const websiteAnalytics = {
    "tokoonline.zamanweb.com": {
      visitors: 127,
      pageViews: 2847,
      bounceRate: 34.2,
      avgDuration: "2m 34s",
      weeklyData: [45, 78, 65, 89, 123, 98, 127],
      topPages: [
        { page: "/", views: 1234, percentage: 45 },
        { page: "/produk", views: 856, percentage: 31 },
        { page: "/tentang", views: 432, percentage: 16 },
        { page: "/kontak", views: 325, percentage: 12 },
        { page: "/blog", views: 198, percentage: 7 },
      ],
      trafficSources: [
        { source: "Google Search", visitors: 1456, color: "bg-blue-600", percentage: 52 },
        { source: "Direct", visitors: 834, color: "bg-green-600", percentage: 30 },
        { source: "Social Media", visitors: 312, color: "bg-purple-600", percentage: 11 },
        { source: "Referral", visitors: 198, color: "bg-yellow-600", percentage: 7 },
      ],
      devices: [
        { device: "Desktop", users: 1847, percentage: 65, icon: "💻" },
        { device: "Mobile", users: 892, percentage: 31, icon: "📱" },
        { device: "Tablet", users: 114, percentage: 4, icon: "📱" },
      ],
    },
    "portfolio.zamanweb.com": {
      visitors: 89,
      pageViews: 1456,
      bounceRate: 28.7,
      avgDuration: "3m 12s",
      weeklyData: [32, 45, 38, 67, 89, 72, 85],
      topPages: [
        { page: "/", views: 789, percentage: 54 },
        { page: "/portfolio", views: 423, percentage: 29 },
        { page: "/about", views: 244, percentage: 17 },
      ],
      trafficSources: [
        { source: "Direct", visitors: 623, color: "bg-green-600", percentage: 43 },
        { source: "Google Search", visitors: 578, color: "bg-blue-600", percentage: 40 },
        { source: "Social Media", visitors: 255, color: "bg-purple-600", percentage: 17 },
      ],
      devices: [
        { device: "Desktop", users: 934, percentage: 64, icon: "💻" },
        { device: "Mobile", users: 456, percentage: 31, icon: "📱" },
        { device: "Tablet", users: 66, percentage: 5, icon: "📱" },
      ],
    },
  }

  const currentAnalytics = websiteAnalytics[selectedWebsite] || websiteAnalytics["tokoonline.zamanweb.com"]

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleCreateWebsite = () => {
    const newWebsite = {
      id: websites.length + 1,
      name: `Website Baru ${websites.length + 1}`,
      domain: `website${websites.length + 1}.zamanweb.com`,
      status: "draft",
      visitors: "0",
      template: "Template Default",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    }
    setWebsites([...websites, newWebsite])
  }

  const handleViewWebsite = (websiteId: number) => {
    const website = websites.find((w) => w.id === websiteId)
    if (website) {
      window.open(`https://${website.domain}`, "_blank")
    }
  }

  const handleEditWebsite = (websiteId: number) => {
    router.push(`/dashboard/website/${websiteId}/edit`)
  }

  const handleDeleteWebsite = (websiteId: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus website ini?")) {
      setWebsites(websites.filter((w) => w.id !== websiteId))
    }
  }

  const handleNavigation = (view: string) => {
    setCurrentView(view)
  }

  const getRemainingDays = (expiresAt: Date) => {
    const now = new Date()
    const diffTime = expiresAt.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpirationDisplay = (expiresAt: Date) => {
    const remainingDays = getRemainingDays(expiresAt)

    if (remainingDays < 0) {
      return { text: "Expired", color: "text-red-400", bgColor: "bg-red-600" }
    } else if (remainingDays <= 7) {
      return { text: `${remainingDays} hari lagi`, color: "text-orange-400", bgColor: "bg-orange-600" }
    } else if (remainingDays <= 30) {
      return { text: `${remainingDays} hari lagi`, color: "text-yellow-400", bgColor: "bg-yellow-600" }
    } else {
      return { text: `${remainingDays} hari lagi`, color: "text-green-400", bgColor: "bg-green-600" }
    }
  }

  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard"
      case "websites":
        return "Website Saya"
      case "email-business":
        return "Email Bisnis"
      case "analytics":
        return "Analitik"
      case "billing-subscription":
        return "Langganan"
      case "billing-history":
        return "Riwayat Pembayaran"
      case "billing-methods":
        return "Metode Pembayaran"
      case "settings":
        return "Pengaturan"
      case "profile":
        return "Profil"
      case "help":
        return "Bantuan"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case "websites":
        return (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Kelola Website</CardTitle>
                  <CardDescription className="text-gray-400">Semua website Anda dalam satu tempat</CardDescription>
                </div>
                <Button onClick={handleCreateWebsite} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Website Baru
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {websites.map((website) => {
                  const expirationInfo = getExpirationDisplay(website.expiresAt)

                  return (
                    <div
                      key={website.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{website.name}</h3>
                          <p className="text-sm text-gray-400">{website.domain}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant={website.status === "active" ? "default" : "secondary"}
                              className={
                                website.status === "active"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-gray-600 hover:bg-gray-700"
                              }
                            >
                              {website.status === "active" ? "Aktif" : "Draft"}
                            </Badge>
                            <span className="text-sm text-gray-400">
                              {website.visitors.toLocaleString()} pengunjung
                            </span>
                            <Badge
                              variant="outline"
                              className={`${expirationInfo.bgColor} ${expirationInfo.color} border-0 text-xs`}
                            >
                              {expirationInfo.text}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleViewWebsite(website.id)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleEditWebsite(website.id)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteWebsite(website.id)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      case "analytics":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pilih Website</CardTitle>
                <CardDescription className="text-gray-400">Pilih website yang ingin Anda analisis</CardDescription>
              </CardHeader>
              <CardContent>
                <select
                  value={selectedWebsite}
                  onChange={(e) => setSelectedWebsite(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="tokoonline.zamanweb.com">Toko Online Saya (tokoonline.zamanweb.com)</option>
                  <option value="portfolio.zamanweb.com">Portfolio Pribadi (portfolio.zamanweb.com)</option>
                </select>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Pengunjung Hari Ini</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{currentAnalytics.visitors}</div>
                  <p className="text-xs text-green-400">+15% dari kemarin</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Halaman Dilihat</CardTitle>
                  <Eye className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{currentAnalytics.pageViews.toLocaleString()}</div>
                  <p className="text-xs text-green-400">+8% dari minggu lalu</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Bounce Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{currentAnalytics.bounceRate}%</div>
                  <p className="text-xs text-red-400">-2.1% dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Durasi Rata-rata</CardTitle>
                  <Globe className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{currentAnalytics.avgDuration}</div>
                  <p className="text-xs text-green-400">+12s dari minggu lalu</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Traffic Overview - {selectedWebsite}</CardTitle>
                <CardDescription className="text-gray-400">Pengunjung website dalam 7 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {currentAnalytics.weeklyData.map((value, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-full transition-all duration-300 hover:from-blue-500 hover:to-blue-300"
                        style={{ height: `${(value / Math.max(...currentAnalytics.weeklyData)) * 200}px` }}
                      />
                      <span className="text-xs text-gray-400">
                        {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
                      </span>
                      <span className="text-xs text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Halaman Terpopuler</CardTitle>
                  <CardDescription className="text-gray-400">Halaman dengan pengunjung terbanyak</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentAnalytics.topPages.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white">{item.page}</span>
                            <span className="text-sm text-gray-400">{item.views} views</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Sumber Traffic</CardTitle>
                  <CardDescription className="text-gray-400">Dari mana pengunjung berasal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentAnalytics.trafficSources.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white">{item.source}</span>
                            <span className="text-sm text-gray-400">{item.visitors}</span>
                          </div>
                          <div className="text-xs text-gray-500">{item.percentage}% dari total traffic</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Analisis Perangkat</CardTitle>
                <CardDescription className="text-gray-400">Perangkat yang digunakan pengunjung</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentAnalytics.devices.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-2xl font-bold text-white">{item.users}</div>
                      <div className="text-sm text-gray-400">{item.device}</div>
                      <div className="text-xs text-gray-500">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Akun</CardTitle>
                <CardDescription className="text-gray-400">Kelola informasi akun dan preferensi dasar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Nama Lengkap</label>
                    <input
                      type="text"
                      defaultValue={user?.name || "Demo User"}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || "demo@zamanweb.com"}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Nomor Telepon</label>
                    <input
                      type="tel"
                      defaultValue="+62 812-3456-7890"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Zona Waktu</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    </select>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Simpan Perubahan</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Notifikasi</CardTitle>
                <CardDescription className="text-gray-400">
                  Atur bagaimana Anda ingin menerima notifikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    label: "Email untuk website baru",
                    description: "Terima email ketika website berhasil dibuat",
                    checked: true,
                  },
                  {
                    label: "Laporan analitik mingguan",
                    description: "Dapatkan ringkasan performa website setiap minggu",
                    checked: true,
                  },
                  {
                    label: "Notifikasi keamanan",
                    description: "Peringatan untuk aktivitas mencurigakan",
                    checked: true,
                  },
                  { label: "Update produk", description: "Informasi tentang fitur dan update terbaru", checked: false },
                  {
                    label: "Tips dan tutorial",
                    description: "Saran untuk mengoptimalkan website Anda",
                    checked: false,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.label}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Keamanan</CardTitle>
                <CardDescription className="text-gray-400">Kelola pengaturan keamanan akun Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div>
                      <div className="font-medium text-white">Ubah Password</div>
                      <div className="text-sm text-gray-400">Terakhir diubah 3 bulan yang lalu</div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Ubah Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div>
                      <div className="font-medium text-white">Autentikasi Dua Faktor</div>
                      <div className="text-sm text-gray-400">Tambahkan lapisan keamanan ekstra</div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300">
                      Tidak Aktif
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div>
                      <div className="font-medium text-white">Sesi Aktif</div>
                      <div className="text-sm text-gray-400">Kelola perangkat yang terhubung</div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Lihat Sesi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Website Preferences */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Preferensi Website</CardTitle>
                <CardDescription className="text-gray-400">Pengaturan default untuk website baru</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Template Default</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="modern">Modern Business</option>
                      <option value="minimal">Clean Minimal</option>
                      <option value="creative">Creative Portfolio</option>
                      <option value="ecommerce">E-commerce</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Bahasa Default</label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                      <option value="ms">Bahasa Melayu</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "Auto-publish website",
                      description: "Website langsung online setelah dibuat",
                      checked: false,
                    },
                    {
                      label: "Enable analytics",
                      description: "Aktifkan tracking analytics secara default",
                      checked: true,
                    },
                    { label: "SEO optimization", description: "Terapkan optimasi SEO dasar otomatis", checked: true },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-white">{item.label}</div>
                        <div className="text-sm text-gray-400">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Billing & Langganan</CardTitle>
                <CardDescription className="text-gray-400">Kelola paket dan pembayaran Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div>
                    <div className="font-medium text-white">Paket Saat Ini</div>
                    <div className="text-sm text-gray-400">Professional - Rp 4.500.000/bulan</div>
                  </div>
                  <Badge className="bg-green-600">Aktif</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div>
                    <div className="font-medium text-white">Pembayaran Berikutnya</div>
                    <div className="text-sm text-gray-400">15 Februari 2025</div>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Lihat Invoice
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div>
                    <div className="font-medium text-white">Metode Pembayaran</div>
                    <div className="text-sm text-gray-400">**** **** **** 1234</div>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Update
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Upgrade Paket</Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{user?.name || "Demo User"}</h2>
                    <p className="text-gray-400">{user?.email || "demo@zamanweb.com"}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-green-600">Professional</Badge>
                      <span className="text-sm text-gray-400">Bergabung sejak Januari 2024</span>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Informasi Pribadi</CardTitle>
                    <CardDescription className="text-gray-400">
                      Kelola informasi pribadi dan kontak Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nama Depan</label>
                        <input
                          type="text"
                          defaultValue="Demo"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nama Belakang</label>
                        <input
                          type="text"
                          defaultValue="User"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <input
                          type="email"
                          defaultValue="demo@zamanweb.com"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nomor Telepon</label>
                        <input
                          type="tel"
                          defaultValue="+62 812-3456-7890"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-300">Bio</label>
                        <textarea
                          rows={3}
                          defaultValue="Web developer dan entrepreneur yang passionate dalam menciptakan solusi digital inovatif."
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Lokasi</label>
                        <input
                          type="text"
                          defaultValue="Jakarta, Indonesia"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Website</label>
                        <input
                          type="url"
                          defaultValue="https://demouser.com"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Simpan Perubahan</Button>
                  </CardContent>
                </Card>

                {/* Social Media Links */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Media Sosial</CardTitle>
                    <CardDescription className="text-gray-400">Tambahkan link media sosial Anda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { platform: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "💼" },
                      { platform: "Twitter", placeholder: "https://twitter.com/username", icon: "🐦" },
                      { platform: "Instagram", placeholder: "https://instagram.com/username", icon: "📷" },
                      { platform: "GitHub", placeholder: "https://github.com/username", icon: "💻" },
                      { platform: "Facebook", placeholder: "https://facebook.com/username", icon: "📘" },
                    ].map((social, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="text-2xl">{social.icon}</div>
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-300">{social.platform}</label>
                          <input
                            type="url"
                            placeholder={social.placeholder}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                          />
                        </div>
                      </div>
                    ))}
                    <Button className="bg-blue-600 hover:bg-blue-700">Simpan Link</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Stats & Activity */}
              <div className="space-y-6">
                {/* Profile Stats */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Statistik Profil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Website Dibuat</span>
                      <span className="text-white font-semibold">{websites.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Pengunjung</span>
                      <span className="text-white font-semibold">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Website Aktif</span>
                      <span className="text-white font-semibold">
                        {websites.filter((w) => w.status === "active").length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Aktivitas Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        action: "Website dibuat",
                        detail: "Portfolio Pribadi",
                        time: "2 jam lalu",
                        icon: "🌐",
                      },
                      {
                        action: "Profile diperbarui",
                        detail: "Informasi kontak",
                        time: "1 hari lalu",
                        icon: "👤",
                      },
                      {
                        action: "Website dipublish",
                        detail: "Toko Online Saya",
                        time: "3 hari lalu",
                        icon: "🚀",
                      },
                      {
                        action: "Paket diupgrade",
                        detail: "Professional",
                        time: "1 minggu lalu",
                        icon: "⭐",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="text-lg">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="text-sm text-white">{activity.action}</div>
                          <div className="text-xs text-gray-400">{activity.detail}</div>
                          <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Aksi Akun</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Pengaturan Akun
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat Profil Publik
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Bantuan
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent justify-start"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus Akun
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Achievement Section */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pencapaian</CardTitle>
                <CardDescription className="text-gray-400">Badge dan milestone yang telah Anda raih</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      title: "First Website",
                      description: "Membuat website pertama",
                      icon: "🎉",
                      earned: true,
                    },
                    {
                      title: "Professional",
                      description: "Upgrade ke paket Professional",
                      icon: "⭐",
                      earned: true,
                    },
                    {
                      title: "1K Visitors",
                      description: "Mencapai 1000 pengunjung",
                      icon: "📈",
                      earned: true,
                    },
                    {
                      title: "5 Websites",
                      description: "Membuat 5 website",
                      icon: "🌐",
                      earned: false,
                    },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border text-center ${
                        achievement.earned
                          ? "bg-blue-900/20 border-blue-700"
                          : "bg-gray-800/50 border-gray-700 opacity-50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="text-sm font-medium text-white">{achievement.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{achievement.description}</div>
                      {achievement.earned && <Badge className="bg-green-600 text-xs mt-2">Diraih</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "help":
        return (
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <div className="text-center max-w-2xl mx-auto">
                  <HelpCircle className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">Pusat Bantuan</h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Buat Tiket Support
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent px-6 py-3"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Lihat Dokumentasi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Main Content Area - Left Side */}
              <div className="xl:col-span-3 space-y-8">
                {/* Quick Actions - Moved to top for better visibility */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-xl">Aksi Cepat</CardTitle>
                    <CardDescription className="text-gray-400">Shortcut untuk tugas umum</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: "Reset Password", icon: "🔑", description: "Ubah kata sandi akun" },
                        { title: "Download Backup", icon: "💾", description: "Unduh backup website" },
                        { title: "Domain Settings", icon: "🌐", description: "Kelola pengaturan domain" },
                        { title: "Billing Info", icon: "💳", description: "Lihat informasi tagihan" },
                      ].map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-blue-500 bg-transparent flex-col items-center justify-center space-y-3 min-h-[120px] transition-all duration-200"
                        >
                          <div className="text-2xl">{action.icon}</div>
                          <div className="text-sm font-medium text-center leading-tight">{action.title}</div>
                          <div className="text-xs text-gray-500 text-center leading-relaxed break-words">
                            {action.description}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Section - Improved layout */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Pertanyaan yang Sering Diajukan</CardTitle>
                    <CardDescription className="text-gray-400">Jawaban untuk pertanyaan umum</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        question: "Bagaimana cara membuat website baru?",
                        answer:
                          "Klik tombol 'Buat Website Baru' di dashboard, pilih template yang diinginkan, dan ikuti panduan setup yang disediakan.",
                        category: "Website",
                      },
                      {
                        question: "Apakah saya bisa mengubah template setelah website dibuat?",
                        answer:
                          "Ya, Anda dapat mengubah template kapan saja melalui editor website. Namun, beberapa konten mungkin perlu disesuaikan ulang.",
                        category: "Template",
                      },
                      {
                        question: "Bagaimana cara menghubungkan domain kustom?",
                        answer:
                          "Masuk ke pengaturan website, pilih 'Domain', lalu ikuti instruksi untuk menghubungkan domain yang sudah Anda miliki.",
                        category: "Domain",
                      },
                      {
                        question: "Apakah ada batasan jumlah pengunjung?",
                        answer:
                          "Tidak ada batasan pengunjung untuk semua paket. Namun, bandwidth dan storage berbeda sesuai paket yang dipilih.",
                        category: "Paket",
                      },
                    ].map((faq, index) => (
                      <div
                        key={index}
                        className="border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                      >
                        <button className="w-full p-4 text-left hover:bg-gray-800/30 transition-colors rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 text-xs">
                                {faq.category}
                              </Badge>
                              <span className="text-white font-medium">{faq.question}</span>
                            </div>
                            <Plus className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-400 pl-0">{faq.answer}</div>
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Knowledge Base and Video Tutorials - Side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Knowledge Base */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Knowledge Base</CardTitle>
                      <CardDescription className="text-gray-400">
                        Dokumentasi lengkap dan panduan detail
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Getting Started",
                            articles: 12,
                            icon: "🚀",
                            description: "Panduan dasar untuk memulai",
                          },
                          {
                            title: "Website Builder",
                            articles: 25,
                            icon: "🏗️",
                            description: "Cara menggunakan editor website",
                          },
                          {
                            title: "Domain & Hosting",
                            articles: 8,
                            icon: "🌐",
                            description: "Pengaturan domain dan hosting",
                          },
                          { title: "E-commerce", articles: 15, icon: "🛒", description: "Membuat toko online" },
                          {
                            title: "SEO & Marketing",
                            articles: 18,
                            icon: "📈",
                            description: "Optimasi dan promosi website",
                          },
                          { title: "Troubleshooting", articles: 20, icon: "🔧", description: "Solusi masalah umum" },
                        ].map((category, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-xl">{category.icon}</div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm">{category.title}</h4>
                                <p className="text-xs text-gray-400">{category.description}</p>
                                <div className="text-xs text-gray-500 mt-1">{category.articles} artikel</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Video Tutorials */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Tutorial Video</CardTitle>
                      <CardDescription className="text-gray-400">
                        Pelajari cara menggunakan platform dengan video tutorial
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Membuat Website Pertama",
                            duration: "5:30",
                            thumbnail: "🎬",
                            description: "Panduan lengkap membuat website dari awal",
                          },
                          {
                            title: "Kustomisasi Template",
                            duration: "8:15",
                            thumbnail: "🎨",
                            description: "Cara mengubah warna, font, dan layout",
                          },
                          {
                            title: "Menambahkan Konten",
                            duration: "6:45",
                            thumbnail: "📝",
                            description: "Upload gambar, video, dan teks",
                          },
                          {
                            title: "SEO dan Analytics",
                            duration: "10:20",
                            thumbnail: "📊",
                            description: "Optimasi website untuk mesin pencari",
                          },
                        ].map((video, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-xl">{video.thumbnail}</div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm">{video.title}</h4>
                                <p className="text-xs text-gray-400">{video.description}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                                    {video.duration}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar - Right Side */}
              <div className="xl:col-span-1 space-y-6">
                {/* Contact Support */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Hubungi Support</CardTitle>
                    <CardDescription className="text-gray-400">Tim support siap membantu Anda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-green-900/20 border border-green-700">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-300 font-medium text-sm">Online</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Rata-rata respon: 2-5 menit</p>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start text-sm py-2">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Live Chat
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start text-sm py-2"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Email Support
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start text-sm py-2"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Buat Tiket
                      </Button>
                    </div>

                    <div className="pt-3 border-t border-gray-700">
                      <h4 className="text-white font-medium mb-2 text-sm">Jam Operasional</h4>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between">
                          <span>Senin - Jumat</span>
                          <span>09:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sabtu</span>
                          <span>09:00 - 15:00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minggu</span>
                          <span>Tutup</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Status Sistem</CardTitle>
                    <CardDescription className="text-gray-400">Pemantauan layanan real-time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { service: "Website Builder", status: "operational", uptime: "99.9%" },
                      { service: "Hosting", status: "operational", uptime: "99.8%" },
                      { service: "Domain Service", status: "operational", uptime: "100%" },
                      { service: "Support System", status: "operational", uptime: "99.7%" },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-white text-xs">{service.service}</span>
                        </div>
                        <div className="text-xs text-gray-400">{service.uptime}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Community */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Komunitas</CardTitle>
                    <CardDescription className="text-gray-400">Bergabung dengan komunitas pengguna</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start text-sm py-2"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Forum Komunitas
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start text-sm py-2"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Facebook Group
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent justify-start text-sm py-2"
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Discord Server
                      </Button>
                    </div>

                    <div className="pt-3 border-t border-gray-700 text-center">
                      <div className="text-xl font-bold text-white">2,847</div>
                      <div className="text-xs text-gray-400">Anggota aktif</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Updates */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Update Terbaru</CardTitle>
                    <CardDescription className="text-gray-400">Fitur dan perbaikan terbaru</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        title: "Template Baru",
                        description: "5 template bisnis modern",
                        date: "2 hari lalu",
                        type: "feature",
                      },
                      {
                        title: "Peningkatan Performa",
                        description: "Loading website 30% lebih cepat",
                        date: "1 minggu lalu",
                        type: "improvement",
                      },
                      { title: "Bug Fix", description: "Perbaikan editor mobile", date: "2 minggu lalu", type: "fix" },
                    ].map((update, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full mt-1 ${update.type === "feature" ? "bg-blue-500" : update.type === "improvement" ? "bg-green-500" : "bg-yellow-500"}`}
                        ></div>
                        <div className="flex-1">
                          <div className="text-xs text-white">{update.title}</div>
                          <div className="text-xs text-gray-400">{update.description}</div>
                          <div className="text-xs text-gray-500 mt-1">{update.date}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case "billing-subscription":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Langganan</h2>
              <p className="text-gray-400">Kelola paket langganan Anda</p>
            </div>

            <Card className="bg-red-900/20 border-red-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Perpanjangan otomatis tidak akan diaktifkan</h3>
                      <p className="text-sm text-gray-300">
                        Tambahkan metode pembayaran untuk mengaktifkan perpanjangan otomatis
                      </p>
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Tambah Metode Pembayaran</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari"
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left p-4 text-gray-300 font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Langganan</span>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </th>
                        <th className="text-left p-4 text-gray-300 font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Tanggal berakhir</span>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </th>
                        <th className="text-left p-4 text-gray-300 font-medium">
                          <div className="flex items-center space-x-1">
                            <span>Perpanjangan otomatis</span>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Business Web Hosting",
                          description: "-",
                          endDate: "2025-07-20",
                          autoRenewal: null,
                          status: "Kedaluwarsa",
                          statusColor: "red",
                        },
                        {
                          name: ".ID Domain",
                          description: "zamanprofesionallaundry.id",
                          endDate: "2025-09-04",
                          autoRenewal: "Nonaktif",
                          status: "Segera berakhir",
                          statusColor: "yellow",
                        },
                        {
                          name: ".SITE Domain",
                          description: "asosiasillaundryriau.site",
                          endDate: "2025-09-06",
                          autoRenewal: "Nonaktif",
                          status: "Segera berakhir",
                          statusColor: "yellow",
                        },
                        {
                          name: ".COM Domain",
                          description: "zalaklin.com",
                          endDate: "2025-09-17",
                          autoRenewal: "Nonaktif",
                          status: "Aktifkan perpanjangan otomatis",
                          statusColor: "blue",
                        },
                      ].map((subscription, index) => (
                        <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-white">{subscription.name}</div>
                              <div className="text-sm text-gray-400">{subscription.description}</div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-300">{subscription.endDate}</td>
                          <td className="p-4">
                            {subscription.autoRenewal ? (
                              <Badge className="bg-yellow-600/20 text-yellow-300">{subscription.autoRenewal}</Badge>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end space-x-3">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    subscription.statusColor === "red"
                                      ? "bg-red-500"
                                      : subscription.statusColor === "yellow"
                                        ? "bg-yellow-500"
                                        : "bg-blue-500"
                                  }`}
                                ></div>
                                <span
                                  className={`text-sm ${
                                    subscription.statusColor === "red"
                                      ? "text-red-400"
                                      : subscription.statusColor === "yellow"
                                        ? "text-yellow-400"
                                        : "text-blue-400"
                                  }`}
                                >
                                  {subscription.status}
                                </span>
                              </div>
                              {subscription.status !== "Aktifkan perpanjangan otomatis" && (
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                  Perpanjang
                                </Button>
                              )}
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "billing-history":
        return (
          <div className="space-y-6">
            {/* Header Tabs */}
            <div className="border-b border-gray-800">
              <nav className="flex space-x-8">
                <button className="py-2 px-1 border-b-2 border-purple-500 text-purple-400 font-medium text-sm">
                  Riwayat pembayaran
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-400 hover:text-gray-300 font-medium text-sm">
                  Riwayat pengembalian uang
                </button>
              </nav>
            </div>

            {/* Search Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Temukan tagihan</span>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari"
                    className="pl-10 pr-4 py-2 w-80 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Payment History Table */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left p-4 text-gray-400 font-medium">ID Pembayaran</th>
                        <th className="text-left p-4 text-gray-400 font-medium">ID Invoice</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Layanan</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Judul</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Dibayar pada</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Total</th>
                        <th className="w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          paymentId: "H_27651231",
                          invoiceId: "HID-1086229",
                          service: ".MY.ID Domain",
                          title: "cvlimbongholena.my.id",
                          paidDate: "2025-07-30",
                          total: "Rp18.759",
                        },
                        {
                          paymentId: "H_27519043",
                          invoiceId: "HID-1081122",
                          service: ".MY.ID Domain",
                          title: "beningsalon.my.id",
                          paidDate: "2025-07-27",
                          total: "Rp18.759",
                        },
                        {
                          paymentId: "H_27124123",
                          invoiceId: "HID-1067712",
                          service: ".MY.ID Domain",
                          title: "peronbintang.my.id",
                          paidDate: "2025-07-18",
                          total: "Rp18.759",
                        },
                        {
                          paymentId: "H_25611234",
                          invoiceId: "HID-1011876",
                          service: ".ID Domain",
                          title: "zamanlaundry.id",
                          paidDate: "2025-06-14",
                          total: "Rp234.099",
                        },
                        {
                          paymentId: "H_25611120",
                          invoiceId: "HID-1011864",
                          service: "Business Web Hosting",
                          title: "Business Web Hosting (1 Tahun)",
                          paidDate: "2025-06-14",
                          total: "Rp797.868",
                        },
                      ].map((payment, index) => (
                        <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                          <td className="p-4">
                            <div>
                              <div className="text-gray-400 text-sm">ID Pembayaran</div>
                              <div className="font-medium text-white">{payment.paymentId}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-gray-400 text-sm">ID Invoice</div>
                              <div className="font-medium text-white">{payment.invoiceId}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-gray-400 text-sm">Layanan</div>
                              <div className="text-white">{payment.service}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-gray-400 text-sm">Judul</div>
                              <div className="text-white">{payment.title}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-gray-400 text-sm">Dibayar pada</div>
                              <div className="text-white">{payment.paidDate}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-gray-400 text-sm">Total</div>
                              <div className="text-white font-medium">{payment.total}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Item per halaman:</span>
                <select className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">1-5 dari 45</span>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "billing-methods":
        return (
          <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Metode Pembayaran</CardTitle>
                    <CardDescription className="text-gray-400">
                      Kelola metode pembayaran untuk langganan dan pembelian
                    </CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Metode Baru
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Saved Payment Methods */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Metode Pembayaran Tersimpan</CardTitle>
                <CardDescription className="text-gray-400">
                  Kartu kredit dan metode pembayaran yang telah Anda simpan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Visa Card */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">Visa •••• 1234</h3>
                        <Badge className="bg-green-600 text-white text-xs">Default</Badge>
                      </div>
                      <p className="text-sm text-gray-400">Berakhir 12/2027</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Bank BCA */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Bank BCA</h3>
                      <p className="text-sm text-gray-400">Transfer Bank</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* GoPay */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">GoPay</h3>
                      <p className="text-sm text-gray-400">•••• 8901</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Pengaturan Pembayaran</CardTitle>
                <CardDescription className="text-gray-400">Konfigurasi preferensi pembayaran Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div>
                    <h3 className="font-semibold text-white">Perpanjangan Otomatis</h3>
                    <p className="text-sm text-gray-400">Otomatis perpanjang langganan sebelum berakhir</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Aktifkan
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div>
                    <h3 className="font-semibold text-white">Notifikasi Pembayaran</h3>
                    <p className="text-sm text-gray-400">Terima email notifikasi untuk setiap transaksi</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Aktif
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div>
                    <h3 className="font-semibold text-white">Mata Uang Default</h3>
                    <p className="text-sm text-gray-400">Rupiah (IDR)</p>
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Ubah
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Security */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Keamanan Pembayaran</CardTitle>
                <CardDescription className="text-gray-400">
                  Informasi tentang keamanan data pembayaran Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">🔒</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">SSL Encryption</h3>
                    <p className="text-sm text-gray-400">Data terenkripsi 256-bit</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">🛡️</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">PCI Compliant</h3>
                    <p className="text-sm text-gray-400">Standar keamanan industri</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">🔐</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">2FA Protected</h3>
                    <p className="text-sm text-gray-400">Autentikasi dua faktor</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Kontak Kami
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "email-business":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Email Bisnis</h2>
                <p className="text-gray-400">Kelola email profesional untuk bisnis Anda</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Buat Email Baru
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Email</p>
                      <p className="text-3xl font-bold text-white">5</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Email Aktif</p>
                      <p className="text-3xl font-bold text-green-400">3</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Email Tidak Aktif</p>
                      <p className="text-3xl font-bold text-red-400">2</p>
                    </div>
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">✕</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Email Accounts */}
            <div className="space-y-4">
              {/* Admin Email */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">admin@tokoonline.zamanweb.com</h3>
                        <p className="text-sm text-gray-400">Dibuat: 15/1/2024 • Terakhir digunakan: 28/2/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-600 text-white">Aktif</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Email */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">support@tokoonline.zamanweb.com</h3>
                        <p className="text-sm text-gray-400">Dibuat: 20/1/2024 • Terakhir digunakan: 27/2/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-600 text-white">Aktif</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sales Email */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">sales@tokoonline.zamanweb.com</h3>
                        <p className="text-sm text-gray-400">Dibuat: 1/2/2024 • Terakhir digunakan: 26/2/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-600 text-white">Aktif</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Email (Inactive) */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">info@portfolio.zamanweb.com</h3>
                        <p className="text-sm text-gray-400">Dibuat: 10/1/2024 • Terakhir digunakan: 15/2/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-gray-600 text-white">Tidak Aktif</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Website</CardTitle>
                  <Globe className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">2</div>
                  <p className="text-xs text-gray-400">+1 dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Pengunjung</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,234</div>
                  <p className="text-xs text-gray-400">+12% dari minggu lalu</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Website Aktif</CardTitle>
                  <BarChart3 className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1</div>
                  <p className="text-xs text-gray-400">1 draft tersimpan</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Email Bisnis</CardTitle>
                  <Mail className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">5</div>
                  <p className="text-xs text-gray-400">+2 dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Email Bisnis Aktif</CardTitle>
                  <Mail className="h-4 w-4 text-cyan-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3</div>
                  <p className="text-xs text-gray-400">2 tidak aktif</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Website Saya</CardTitle>
                    <CardDescription className="text-gray-400">Kelola semua website Anda dari sini</CardDescription>
                  </div>
                  <Button onClick={handleCreateWebsite} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Website Baru
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Toko Online Saya */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Toko Online Saya</h3>
                        <p className="text-sm text-gray-400">tokoonline.zamanweb.com</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-green-600 hover:bg-green-700">Aktif</Badge>
                          <span className="text-sm text-gray-400">1,234 pengunjung</span>
                          <Badge variant="outline" className="bg-green-600/20 text-green-300 border-0 text-xs">
                            45 hari lagi
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Portfolio Pribadi */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Portfolio Pribadi</h3>
                        <p className="text-sm text-gray-400">portfolio.zamanweb.com</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-gray-600 hover:bg-gray-700">Draft</Badge>
                          <span className="text-sm text-gray-400">0 pengunjung</span>
                          <Badge variant="outline" className="bg-yellow-600/20 text-yellow-300 border-0 text-xs">
                            12 hari lagi
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  const navigationItems = [
    {
      label: "Dashboard",
      icon: Home,
      view: "dashboard",
      active: currentView === "dashboard",
    },
    {
      label: "Website Saya",
      icon: Globe,
      view: "websites",
      active: currentView === "websites",
    },
    {
      label: "Email Bisnis",
      icon: Mail,
      view: "email-business",
      active: currentView === "email-business",
    },
    {
      label: "Analitik",
      icon: BarChart3,
      view: "analytics",
      active: currentView === "analytics",
    },
    {
      label: "Billing",
      icon: CreditCard,
      view: "billing",
      active: currentView.startsWith("billing"),
      subItems: [
        {
          label: "Langganan",
          icon: Receipt,
          view: "billing-subscription",
          active: currentView === "billing-subscription",
        },
        {
          label: "Riwayat Pembayaran",
          icon: Wallet,
          view: "billing-history",
          active: currentView === "billing-history",
        },
        {
          label: "Metode Pembayaran",
          icon: CreditCard,
          view: "billing-methods",
          active: currentView === "billing-methods",
        },
      ],
    },
    {
      label: "Pengaturan",
      icon: Settings,
      view: "settings",
      active: currentView === "settings",
    },
    {
      label: "Profil",
      icon: User,
      view: "profile",
      active: currentView === "profile",
    },
    {
      label: "Bantuan",
      icon: HelpCircle,
      view: "help",
      active: currentView === "help",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`bg-gray-900/50 border-r border-gray-800 w-72 flex-shrink-0 transition-transform duration-300 ${
            sidebarOpen ? "" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-blue-400">Zaman Web</h1>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          <nav className="py-4 px-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <Button
                  onClick={() => handleNavigation(item.view)}
                  variant="ghost"
                  className={`flex items-center space-x-3 w-full justify-start px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                    item.active
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
                {item.subItems && item.active && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.label}
                        onClick={() => handleNavigation(subItem.view)}
                        variant="ghost"
                        className={`flex items-center space-x-3 w-full justify-start px-4 py-2 rounded-lg text-left text-sm transition-colors ${
                          subItem.active
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="absolute bottom-6 left-4 right-4">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="flex items-center space-x-3 justify-start px-4 py-3 rounded-lg text-left font-medium text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between p-6.5 border-b border-gray-800 bg-black">
              <span className="text-white text-2xl font-bold">{getPageTitle()}</span>            
            <div className="text-gray-300">Halo, Demo User</div>
          </div>

          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
