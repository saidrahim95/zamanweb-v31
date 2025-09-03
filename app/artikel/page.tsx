import Link from "next/link"
import { Calendar, User, Tag, Clock, ArrowRight } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { Footer } from "@/components/footer"

export default function ArtikelPage() {
  const articles = [
    {
      id: 1,
      title: "10 Tips Memilih Template Website yang Tepat untuk Bisnis Anda",
      excerpt:
        "Memilih template yang tepat adalah langkah penting dalam membangun website bisnis. Pelajari kriteria dan tips untuk memilih template yang sesuai dengan kebutuhan bisnis Anda.",
      category: "Design",
      author: "Tim WebBuilder",
      date: "15 Januari 2024",
      readTime: "5 menit",
      image: "/modern-website-template-selection.png",
    },
    {
      id: 2,
      title: "Cara Meningkatkan SEO Website untuk Bisnis Lokal",
      excerpt:
        "SEO lokal sangat penting untuk bisnis yang melayani area tertentu. Pelajari strategi SEO yang efektif untuk meningkatkan visibilitas bisnis lokal Anda di mesin pencari.",
      category: "SEO",
      author: "Sarah Marketing",
      date: "12 Januari 2024",
      readTime: "8 menit",
      image: "/local-seo-optimization.png",
    },
    {
      id: 3,
      title: "Panduan Lengkap Memilih Domain yang Memorable",
      excerpt:
        "Domain adalah identitas online bisnis Anda. Temukan tips dan trik untuk memilih nama domain yang mudah diingat, SEO-friendly, dan mencerminkan brand Anda.",
      category: "Domain",
      author: "Alex Tech",
      date: "10 Januari 2024",
      readTime: "6 menit",
      image: "/domain-name-selection.png",
    },
    {
      id: 4,
      title: "5 Kesalahan Umum dalam Desain Website yang Harus Dihindari",
      excerpt:
        "Hindari kesalahan desain yang dapat merusak user experience dan kredibilitas bisnis Anda. Pelajari kesalahan umum dan cara mengatasinya.",
      category: "Design",
      author: "Maya Designer",
      date: "8 Januari 2024",
      readTime: "7 menit",
      image: "/website-design-mistakes.png",
    },
    {
      id: 5,
      title: "Strategi Content Marketing untuk Website Bisnis",
      excerpt:
        "Content marketing adalah kunci untuk menarik dan mempertahankan pelanggan. Pelajari strategi content marketing yang efektif untuk website bisnis Anda.",
      category: "Marketing",
      author: "Rina Content",
      date: "5 Januari 2024",
      readTime: "10 menit",
      image: "/content-marketing-strategy.png",
    },
    {
      id: 6,
      title: "Mengoptimalkan Kecepatan Loading Website untuk Konversi Lebih Baik",
      excerpt:
        "Kecepatan loading website sangat mempengaruhi user experience dan konversi. Pelajari teknik optimasi untuk meningkatkan performa website Anda.",
      category: "Performance",
      author: "Doni Developer",
      date: "3 Januari 2024",
      readTime: "9 menit",
      image: "/website-speed-optimization.png",
    },
  ]

  const categories = ["Semua", "Design", "SEO", "Domain", "Marketing", "Performance"]

  return (
    <div className="min-h-screen bg-black">
      {/* Unified Header */}
      <UnifiedHeader />

      {/* Hero Section */}
      <section className="bg-black py-16 pt-38">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Artikel & Tips Bisnis Online</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Temukan wawasan, tips, dan strategi terbaru untuk mengembangkan bisnis online Anda dengan website yang
            profesional
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full transition-colors ${
                  category === "Semua" ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-800"
              >
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {article.category}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">{article.title}</h2>

                  <p className="text-gray-300 mb-4 line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-3">{article.author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{article.date}</span>
                    </div>

                    <Link
                      href={`/artikel/${article.id}`}
                      className="text-white hover:text-gray-300 font-medium flex items-center"
                    >
                      Baca
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Tips Terbaru</h2>
          <p className="text-gray-300 mb-8">
            Berlangganan newsletter kami untuk mendapatkan artikel dan tips bisnis online terbaru langsung di inbox Anda
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-400"
            />
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-medium transition-colors">
              Berlangganan
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
