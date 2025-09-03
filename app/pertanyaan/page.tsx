"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { UnifiedHeader } from "@/components/unified-header"
import { Footer } from "@/components/footer"

export default function PertanyaanPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqItems = [
    {
      question: "Apa sih Zaman Web?",
      answer:
        "Zaman Web adalah platform pembuatan website profesional yang memungkinkan Anda membuat website bisnis dengan mudah dan cepat. Kami menyediakan berbagai template yang dapat disesuaikan dengan kebutuhan bisnis Anda, mulai dari toko online, restoran, jasa konsultan, hingga berbagai jenis usaha lainnya.",
    },
    {
      question: "Bagaimana cara melakukan pembelian website di Zaman Web?",
      answer:
        "Proses pembelian sangat mudah: 1) Masukkan jenis bisnis Anda di halaman utama, 2) Pilih template yang sesuai, 3) Tentukan nama domain yang diinginkan, 4) Pilih paket yang sesuai kebutuhan, 5) Lengkapi data bisnis Anda, 6) Pilih metode pembayaran, 7) Selesaikan pembayaran. Website Anda akan siap dalam 2x24 jam setelah pembayaran dikonfirmasi.",
    },
    {
      question: "Bagaimana pembayaran Zaman Web?",
      answer:
        "Kami menerima berbagai metode pembayaran untuk kemudahan Anda: Transfer Bank (BCA, Mandiri, BRI, BNI), E-wallet (GoPay, OVO, DANA, ShopeePay), Kartu Kredit/Debit (Visa, Mastercard), dan Virtual Account. Semua transaksi dilindungi dengan sistem keamanan tingkat tinggi.",
    },
    {
      question: "Apa yang terjadi setelah saya melakukan pembayaran?",
      answer:
        "Setelah pembayaran dikonfirmasi: 1) Anda akan menerima email konfirmasi, 2) Tim kami akan mulai membangun website sesuai template dan data yang Anda berikan, 3) Domain akan didaftarkan dan dikonfigurasi, 4) Website akan diuji untuk memastikan berfungsi dengan baik, 5) Dalam maksimal 2x24 jam, website Anda akan live dan dapat diakses. Anda juga akan menerima panduan pengelolaan website.",
    },
    {
      question: "Apa itu Email Bisnis dan bagaimana cara mendapatkannya?",
      answer:
        "Email Bisnis adalah alamat email profesional menggunakan domain website Anda (contoh: info@namabisnis.com). Fitur ini tersedia di paket Premium dan Enterprise. Email bisnis memberikan kesan profesional, meningkatkan kredibilitas, dan membantu branding bisnis Anda. Setup dilakukan otomatis bersamaan dengan pembuatan website.",
    },
    {
      question: "Apa itu Template Website Zaman Web?",
      answer:
        "Template adalah desain website siap pakai yang telah dioptimalkan untuk berbagai jenis bisnis. Setiap template sudah dilengkapi dengan: Layout responsif untuk semua perangkat, Desain modern dan profesional, Fitur-fitur khusus sesuai jenis bisnis, Optimasi SEO dasar, Loading speed yang cepat. Anda dapat memilih dari puluhan template yang tersedia.",
    },
    {
      question: "Bagaimana cara melakukan perpanjangan website saya di Zaman Web?",
      answer:
        "Perpanjangan website dapat dilakukan dengan mudah: 1) Login ke dashboard pelanggan, 2) Pilih website yang akan diperpanjang, 3) Pilih durasi perpanjangan (1 tahun, 2 tahun, atau 3 tahun), 4) Lakukan pembayaran. Kami akan mengirimkan reminder 30 hari sebelum masa aktif berakhir. Perpanjangan dapat dilakukan kapan saja sebelum expired.",
    },
    {
      question: "Bisakah saya mengganti domain website saya di Zaman Web?",
      answer:
        "Ya, Anda dapat mengganti domain dengan ketentuan: 1) Penggantian domain dapat dilakukan maksimal 1x dalam setahun, 2) Dikenakan biaya administrasi untuk penggantian, 3) Proses penggantian membutuhkan waktu 1-3 hari kerja, 4) Domain lama akan tetap aktif selama 30 hari untuk redirect. Hubungi customer service untuk bantuan penggantian domain.",
    },
    {
      question: "Bisakah membatalkan pembelian website di Zaman Web?",
      answer:
        "Pembatalan dapat dilakukan dengan syarat: 1) Pembatalan hanya dapat dilakukan dalam 24 jam setelah pembayaran jika website belum mulai dikerjakan, 2) Jika website sudah dalam proses pembuatan, pembatalan tidak dapat dilakukan, 3) Refund akan diproses dalam 3-7 hari kerja setelah persetujuan pembatalan. Untuk pembatalan, hubungi customer service dengan menyertakan nomor order.",
    },
    {
      question: "Dimana kalian bisa menghubungi alamat kami?",
      answer:
        "Anda dapat menghubungi kami melalui berbagai cara: Email: support@zamanweb.com, WhatsApp: +62 812-3456-7890 (24/7), Live Chat: Tersedia di website (jam kerja), Alamat Kantor: Jl. Teknologi No. 123, Jakarta Selatan 12345. Tim customer service kami siap membantu Anda dengan respon cepat dan solusi terbaik.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <UnifiedHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-38">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Perlu bantuan?</h1>
          <p className="text-xl text-gray-300">Jangan khawatir! Cari dan temukan pertanyaanmu disini</p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-800 rounded-lg bg-gray-900">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
              >
                <span className="text-lg font-medium text-white">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-2">Masih ada pertanyaan?</h3>
            <p className="text-gray-300 mb-4">Tim customer service kami siap membantu Anda 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@zamanweb.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Email Support
              </a>
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
