import { Play, FileText, Users, Clock } from "lucide-react"
import Link from "next/link"
import { UnifiedHeader } from "@/components/unified-header"
import { Footer } from "@/components/footer"

export default function TutorialPage() {
  const tutorials = [
    {
      id: 1,
      title: "Cara Memesan Paket Website",
      description: "Panduan lengkap untuk memesan paket website yang sesuai kebutuhan",
      duration: "10 menit",
      difficulty: "Pemula",
      views: "15.2k",
      category: "Cara Pemesanan",
      thumbnail: "/website-creation-tutorial.png",
    },
    {
      id: 2,
      title: "Proses Pembayaran dan Konfirmasi",
      description: "Langkah-langkah pembayaran dan konfirmasi pesanan website",
      duration: "8 menit",
      difficulty: "Pemula",
      views: "12.1k",
      category: "Cara Pemesanan",
      thumbnail: "/website-template-selection.png",
    },
    {
      id: 3,
      title: "Mengedit Konten Website",
      description: "Cara mengubah teks, gambar, dan konten website dengan mudah",
      duration: "15 menit",
      difficulty: "Pemula",
      views: "18.5k",
      category: "Cara Edit Website",
      thumbnail: "/website-customization-colors-fonts.png",
    },
    {
      id: 4,
      title: "Mengubah Template dan Layout",
      description: "Panduan mengganti template dan mengatur layout halaman",
      duration: "12 menit",
      difficulty: "Menengah",
      views: "9.8k",
      category: "Cara Edit Website",
      thumbnail: "/domain-hosting-management.png",
    },
    {
      id: 5,
      title: "Menambah Halaman Baru",
      description: "Cara menambahkan halaman baru ke website Anda",
      duration: "10 menit",
      difficulty: "Pemula",
      views: "14.3k",
      category: "Cara Edit Website",
      thumbnail: "/seo-optimization-tutorial.png",
    },
    {
      id: 6,
      title: "Kustomisasi Warna dan Font",
      description: "Mengubah tampilan website sesuai brand dan preferensi Anda",
      duration: "18 menit",
      difficulty: "Menengah",
      views: "11.7k",
      category: "Cara Edit Website",
      thumbnail: "/ecommerce-website-features.png",
    },
  ]

  const categories = ["Semua", "Cara Pemesanan", "Cara Edit Website"]

  return (
    <div className="min-h-screen bg-black">
      {/* Unified Header */}
      <UnifiedHeader />

      {/* Hero Section */}
      <section className="bg-black py-16 pt-38">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Tutorial Membuat Website</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Pelajari cara membuat website profesional dengan panduan step-by-step yang mudah diikuti
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              50k+ Pengguna
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              25+ Tutorial
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Update Mingguan
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "Semua" ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-800"
              >
                <div className="relative">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-colors">
                      <Play className="w-6 h-6 text-blue-600" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        tutorial.difficulty === "Pemula"
                          ? "bg-green-100 text-green-800"
                          : tutorial.difficulty === "Menengah"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-black bg-white px-2 py-1 rounded">
                      {tutorial.category}
                    </span>
                    <span className="text-xs text-gray-400">{tutorial.views} views</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{tutorial.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{tutorial.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {tutorial.duration}
                    </div>
                    <button className="text-white hover:text-gray-300 font-medium text-sm">Mulai Tutorial →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Membuat Website Anda?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Mulai dengan template profesional dan ikuti tutorial kami untuk hasil terbaik
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Mulai Membuat Website
          </Link>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
