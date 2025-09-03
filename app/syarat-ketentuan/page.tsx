import { UnifiedHeader } from "@/components/unified-header"
import { Footer } from "@/components/footer"

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <UnifiedHeader />

      <main className="pt-38 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Syarat dan Ketentuan</h1>
            <p className="text-gray-400 text-lg">
              Terakhir diperbarui:{" "}
              {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Penerimaan Syarat</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dengan mengakses dan menggunakan layanan Zaman Web, Anda menyetujui untuk terikat oleh syarat dan
                ketentuan ini. Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Layanan yang Disediakan</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Zaman Web menyediakan layanan pembuatan website profesional dengan berbagai paket yang tersedia:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Paket Starter - Website dasar dengan 1 halaman</li>
                <li>Paket Growth - Website bisnis dengan 3 halaman</li>
                <li>Paket Pro - Website profesional dengan 10 halaman</li>
                <li>Paket Enterprise - Website unlimited dengan fitur custom</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Pembayaran dan Pengembalian Dana</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Pembayaran harus dilakukan sepenuhnya sebelum pengerjaan website dimulai. Kami menerima berbagai metode
                pembayaran yang tersedia di platform kami. Pengembalian dana dapat dilakukan dalam kondisi tertentu
                sesuai kebijakan pengembalian.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Hak Kekayaan Intelektual</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Setelah pembayaran lunas, klien memiliki hak penuh atas konten website yang telah dibuat. Namun,
                template dan framework yang digunakan tetap menjadi hak milik Zaman Web dan penyedia layanan terkait.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Waktu Pengerjaan</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Website akan selesai dalam waktu 2x24 jam setelah konfirmasi pembayaran dan data lengkap diterima.
                Keterlambatan dapat terjadi jika terdapat revisi atau permintaan tambahan dari klien.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Dukungan dan Maintenance</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Setiap paket menyertakan dukungan teknis sesuai dengan durasi yang tercantum. Dukungan meliputi
                perbaikan bug, update keamanan, dan bantuan teknis dasar. Perubahan konten atau desain besar memerlukan
                biaya tambahan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Batasan Tanggung Jawab</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Zaman Web tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan website, termasuk namun
                tidak terbatas pada kehilangan data, gangguan bisnis, atau kerugian finansial lainnya.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Perubahan Syarat</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui
                website dan email terdaftar. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan terhadap
                syarat baru.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Kontak</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Email: support@zamanweb.com</li>
                <li>WhatsApp: +62 812-3456-7890</li>
                <li>Website: www.zamanweb.com</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
