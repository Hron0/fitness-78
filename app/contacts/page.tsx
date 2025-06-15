"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время.",
      })

      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#FF5E14]">Контакты</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Как нас найти</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#FF5E14] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Адрес</h3>
                  <p className="text-gray-300">г. Москва, ул. Спортивная, 15</p>
                  <p className="text-gray-300">метро "Спортивная", 2 минуты пешком</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#FF5E14] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Телефон</h3>
                  <p className="text-gray-300">+7 (495) 123-45-67</p>
                  <p className="text-gray-300">+7 (926) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#FF5E14] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <p className="text-gray-300">info@fitnessplus.ru</p>
                  <p className="text-gray-300">support@fitnessplus.ru</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#FF5E14] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">Часы работы</h3>
                  <p className="text-gray-300">Пн-Пт: 7:00 - 23:00</p>
                  <p className="text-gray-300">Сб-Вс: 8:00 - 22:00</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#1E1E1E] rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-400">Карта будет здесь</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1E1E1E] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
            <p className="text-gray-300 mb-6">Мы ответим в течение 24 часов</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Имя *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#2A2A2A] border-gray-600 text-white"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#2A2A2A] border-gray-600 text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Сообщение *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-[#2A2A2A] border-gray-600 text-white"
                  placeholder="Расскажите, чем мы можем помочь..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляем..." : "Отправить сообщение"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
