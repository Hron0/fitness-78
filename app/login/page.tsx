"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { loginFormSchema, type LoginFormData } from "@/lib/validations"
import { z } from "zod"

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = loginFormSchema.parse(formData)

      // Login user
      const { user, error } = await AuthService.login(validatedData)

      if (error) {
        toast({
          title: "Ошибка входа",
          description: error,
          variant: "destructive",
        })
        return
      }

      if (user) {
        // Save user and redirect
        AuthService.saveUser(user)

        // Dispatch custom event to notify header and other components
        window.dispatchEvent(new Event("authStateChanged"))

        toast({
          title: "Вход выполнен",
          description: `Добро пожаловать, ${user.name}!`,
        })

        // Redirect to admin page if admin, otherwise to home
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/")
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<LoginFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message
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
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
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
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

            <Button
              type="submit"
              className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white py-3"
              disabled={loading}
            >
              {loading ? "Вход..." : "Войти"}
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

          <div className="mt-4 p-4 bg-[#2A2A2A] rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Тестовые данные для входа:</p>
            <p className="text-sm text-gray-300">
              <strong>Администратор:</strong>
              <br />
              Email: admin@fitness.com
              <br />
              Пароль: 132132132
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
