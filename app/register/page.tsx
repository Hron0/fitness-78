"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { registerFormSchema, type RegisterFormData } from "@/lib/validations"
import { z } from "zod"

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = registerFormSchema.parse(formData)

      // Register user
      const { user, error } = await AuthService.register({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        password: validatedData.password,
      })

      if (error) {
        toast({
          title: "Ошибка регистрации",
          description: error,
          variant: "destructive",
        })
        return
      }

      if (user) {
        // Save user and redirect
        AuthService.saveUser(user)
        toast({
          title: "Регистрация успешна",
          description: "Добро пожаловать в Fitness+!",
        })
        router.push("/")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<RegisterFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RegisterFormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        toast({
          title: "Ошибка",
          description: "Произошла неожиданная ошибка",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center py-20">
      <div className="container mx-auto px-5 max-w-md">
        <div className="bg-[#1E1E1E] p-8 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Регистрация</h1>
            <p className="text-gray-300">Создайте аккаунт в Fitness+</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Имя
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
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Подтвердите пароль
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white py-3"
              disabled={loading}
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="text-[#FF5E14] hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
