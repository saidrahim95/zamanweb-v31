import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-4">Zaman Web</h2>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-6 text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <Link href="/tutorial" className="hover:text-white transition-colors">
              Tutorial
            </Link>
            <Link href="/pertanyaan" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">
              Syarta dan Ketentuan
            </Link>
            <Link href="/kebijakan-pengembalian" className="hover:text-white transition-colors">
              Kebijakan Pengembalian
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <a
              href="#"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-black" />
            </a>
            <a
              href="https://www.instagram.com/zamannyadigitalisasi/"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-black" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-black" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 border-t border-gray-800 pt-4">
          <p>
            <Link href="/" className="hover:text-white transition-colors cursor-pointer">
              Copyright © Zaman Web, Inc.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
