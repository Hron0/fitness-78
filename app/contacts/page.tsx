"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { createContactMessage } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function ContactsPage() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      await createContactMessage(formData)

      toast({
        title: "Успешно!",
        description: "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Свяжитесь с <span className="text-[#FF5E14]">Нами</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Есть вопросы? Мы всегда готовы помочь вам начать ваш путь к здоровью и фитнесу
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Контактная информация</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#FF5E14] mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Адрес</h3>
                    <p className="text-gray-300">г. Москва, ул. Фитнес, д. 123</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#FF5E14] mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Телефон</h3>
                    <p className="text-gray-300">+7 (495) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#FF5E14] mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-300">info@fitness-center.ru</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#FF5E14] mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Часы работы</h3>
                    <div className="text-gray-300">
                      <p>Пн-Пт: 06:00 - 23:00</p>
                      <p>Сб-Вс: 08:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-[#1E1E1E] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Отправить сообщение</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Имя *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                    placeholder="Ваше имя"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Сообщение *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-[#2A2A2A] border-gray-600 text-white min-h-[120px]"
                    placeholder="Ваше сообщение..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white"
                  disabled={submitting}
                >
                  {submitting ? <LoadingSpinner /> : "Отправить сообщение"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
