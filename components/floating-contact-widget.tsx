"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, X, MessageCircle, Mail, Send, Bot, User } from "lucide-react"

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Halo! Selamat datang di Zaman Web. Saya siap membantu Anda dengan pertanyaan seputar pembuatan website. Bagaimana saya bisa membantu Anda hari ini?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const toggleWidget = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      setShowChat(false)
    }
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("harga") || message.includes("biaya") || message.includes("tarif")) {
      return "Kami memiliki beberapa paket website: Basic (Rp 2.500.000), Professional (Rp 4.500.000), dan Enterprise (Rp 7.500.000). Setiap paket memiliki fitur yang berbeda. Apakah Anda ingin mengetahui detail paket tertentu?"
    }

    if (message.includes("template") || message.includes("desain")) {
      return "Kami memiliki berbagai template untuk berbagai jenis bisnis seperti restoran, toko online, klinik kesehatan, jasa konsultan, dan lainnya. Anda bisa mencoba fitur pencarian template di halaman utama kami!"
    }

    if (message.includes("domain") || message.includes("hosting")) {
      return "Semua paket kami sudah termasuk domain .com dan hosting. Kami juga menyediakan SSL certificate untuk keamanan website Anda."
    }

    if (message.includes("waktu") || message.includes("berapa lama")) {
      return "Proses pembuatan website biasanya memakan waktu 3-7 hari kerja tergantung kompleksitas dan paket yang dipilih. Untuk paket Enterprise mungkin membutuhkan waktu lebih lama."
    }

    if (message.includes("support") || message.includes("bantuan")) {
      return "Kami menyediakan support 24/7 melalui berbagai channel. Untuk paket Basic support 3 bulan, Professional 6 bulan, dan Enterprise 1 tahun penuh."
    }

    return "Terima kasih atas pertanyaan Anda. Untuk informasi lebih detail, Anda bisa menghubungi tim customer service kami melalui WhatsApp di +62 8511700772 atau email cs@zamanweb.com"
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case "whatsapp":
        window.open(`https://wa.me/${value.replace(/[^0-9]/g, "")}`, "_blank")
        break
      case "email":
        window.open(`mailto:${value}`, "_blank")
        break
      case "chat":
        setShowChat(true)
        break
    }
  }

  return (
    <>
      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleWidget}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          size="lg"
        >
          <Phone className="h-5 w-5" />
          <span className="font-medium">Kontak Kami</span>
        </Button>
      </div>

      {/* Contact Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Modal Content */}
          <Card className="relative w-full max-w-md bg-white shadow-2xl">
            {!showChat ? (
              <>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">Kontak Kami</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Kami Siap Membantu kebutuhan perusahaan Anda, tersedia selama 24/7 untuk mendukung proses bisnis
                    Anda
                  </p>

                  <div className="space-y-3">
                    {/* Chat Button */}
                    <Button
                      onClick={() => handleContactClick("chat", "")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center gap-3 justify-start"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">Hubungi Kami</span>
                    </Button>

                    {/* Email Button */}
                    <Button
                      onClick={() => handleContactClick("email", "cs@zamanweb.com")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center gap-3 justify-start"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="font-medium">cs@zamanweb.com</span>
                    </Button>

                    {/* WhatsApp Button */}
                    <Button
                      onClick={() => handleContactClick("whatsapp", "+62 8511700772")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center gap-3 justify-start"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="font-medium">+62 8511700772</span>
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg font-bold text-gray-900">Chat dengan Kami</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowChat(false)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Chat Messages */}
                  <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "bot" && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.text}
                        </div>
                        {message.sender === "user" && (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ketik pesan Anda..."
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
