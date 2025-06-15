"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика авторизации
    console.log("Login attempt:", formData)
    alert("Функция входа будет реализована с подключением к базе данных")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center py-20">
      <div className="container mx-auto px-5 max-w-md">
        <div className="bg-[#1E1E1E] p-8 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Вход</h1>
            <p className="text-gray-300">Войдите в свой аккаунт Fitness+</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white py-3">
              Войти
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Нет аккаунта?{" "}
              <Link href="/register" className="text-[#FF5E14] hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
