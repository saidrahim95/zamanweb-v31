import { UnifiedHeader } from "@/components/unified-header"
import { Footer } from "@/components/footer"

export default function KebijakanPengembalianPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <UnifiedHeader />

      <main className="pt-38 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Kebijakan Pengembalian</h1>
            <p className="text-gray-400 text-lg">Ketentuan pengembalian dana dan pembatalan layanan Zaman Web</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">1. Kebijakan Umum</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Zaman Web berkomitmen untuk memberikan layanan terbaik kepada pelanggan. Kebijakan pengembalian ini
                  berlaku untuk semua layanan pembuatan website yang kami tawarkan.
                </p>
                <p>
                  Pengembalian dana dapat diajukan dalam kondisi tertentu sesuai dengan ketentuan yang berlaku di bawah
                  ini.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">2. Periode Pengembalian</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong>Sebelum Pengerjaan Dimulai:</strong> Pengembalian dana 100% dapat dilakukan dalam waktu 24 jam
                  setelah pembayaran jika pengerjaan website belum dimulai.
                </p>
                <p>
                  <strong>Setelah Pengerjaan Dimulai:</strong> Pengembalian dana tidak dapat dilakukan setelah proses
                  pembuatan website dimulai, kecuali dalam kondisi khusus yang dijelaskan di bawah.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">3. Kondisi Pengembalian Dana</h2>
              <div className="space-y-4 text-gray-300">
                <p>Pengembalian dana dapat diajukan dalam kondisi berikut:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ketidakmampuan teknis kami untuk menyelesaikan proyek sesuai spesifikasi yang disepakati</li>
                  <li>Keterlambatan pengerjaan lebih dari 14 hari dari jadwal yang disepakati tanpa pemberitahuan</li>
                  <li>
                    Kegagalan sistem atau masalah teknis dari pihak kami yang mengakibatkan proyek tidak dapat
                    diselesaikan
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">4. Kondisi yang Tidak Dapat Dikembalikan</h2>
              <div className="space-y-4 text-gray-300">
                <p>Pengembalian dana TIDAK berlaku untuk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Perubahan kebutuhan atau spesifikasi dari pelanggan setelah pengerjaan dimulai</li>
                  <li>Ketidakpuasan terhadap desain yang telah disetujui sebelumnya</li>
                  <li>Permintaan fitur tambahan yang tidak termasuk dalam paket yang dipilih</li>
                  <li>Masalah yang disebabkan oleh pihak ketiga (hosting, domain, dll.)</li>
                  <li>Website yang telah selesai dan diserahkan kepada pelanggan</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">5. Proses Pengajuan Pengembalian</h2>
              <div className="space-y-4 text-gray-300">
                <p>Untuk mengajukan pengembalian dana:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Hubungi tim support kami melalui email atau WhatsApp</li>
                  <li>Sertakan nomor order dan alasan pengajuan pengembalian</li>
                  <li>Tim kami akan mengevaluasi pengajuan dalam waktu 2-3 hari kerja</li>
                  <li>Jika disetujui, pengembalian akan diproses dalam 7-14 hari kerja</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">6. Metode Pengembalian</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Pengembalian dana akan dilakukan melalui metode pembayaran yang sama dengan yang digunakan saat
                  pembelian. Biaya administrasi bank atau payment gateway menjadi tanggungan pelanggan.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">7. Garansi Layanan</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Kami memberikan garansi perbaikan bug dan error teknis selama 30 hari setelah website diserahkan.
                  Garansi tidak berlaku untuk permintaan perubahan desain atau penambahan fitur baru.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">8. Kontak Support</h2>
              <div className="space-y-4 text-gray-300">
                <p>Untuk pertanyaan lebih lanjut mengenai kebijakan pengembalian:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email: support@zamanweb.com</li>
                  <li>WhatsApp: +62 812-3456-7890</li>
                  <li>Jam operasional: Senin-Jumat, 09:00-17:00 WIB</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">9. Perubahan Kebijakan</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Zaman Web berhak mengubah kebijakan pengembalian ini sewaktu-waktu. Perubahan akan diberitahukan
                  melalui website dan email kepada pelanggan terdaftar.
                </p>
                <p className="text-sm text-gray-400 mt-6">Terakhir diperbarui: Januari 2025</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
