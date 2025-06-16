"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { AuthService } from "@/lib/auth"
import type { AuthUser } from "@/lib/supabase"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for current user on component mount
    const currentUser = AuthService.getCurrentUser()
    console.log("Header: Current user on mount:", currentUser) // Debug log
    setUser(currentUser)
    setIsLoading(false)

    // Listen for storage changes (when user logs in/out in same or other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "fitness_user") {
        const updatedUser = AuthService.getCurrentUser()
        console.log("Header: User changed via storage:", updatedUser) // Debug log
        setUser(updatedUser)
      }
    }

    // Listen for custom events (when user logs in/out in same tab)
    const handleAuthChange = () => {
      const updatedUser = AuthService.getCurrentUser()
      console.log("Header: User changed via custom event:", updatedUser) // Debug log
      setUser(updatedUser)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("authStateChanged", handleAuthChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("authStateChanged", handleAuthChange)
    }
  }, [])

  const handleLogout = () => {
    AuthService.logout()
    setUser(null)
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authStateChanged"))
    window.location.href = "/"
  }

  // Debug: Log current state
  console.log("Header render - User:", user, "Loading:", isLoading)

  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50 py-5">
      <div className="container mx-auto px-5">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-[#FF5E14]">Fitness</span>
            <span className="text-white">+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
              Главная
            </Link>
            <Link href="/trainings" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
              Тренировки
            </Link>
            <Link href="/trainers" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
              Тренеры
            </Link>
            <Link href="/prices" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
              Цены
            </Link>
            <Link href="/contacts" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
              Контакты
            </Link>
            <Link href="/booking" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
              Запись
            </Link>
            {user && AuthService.isAdmin(user) && (
              <Link href="/admin" className="text-white hover:text-[#FF5E14] font-semibold transition-colors">
                Админ
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex gap-4">
            {isLoading ? (
              <div className="text-white">Загрузка...</div>
            ) : user ? (
              // Logged in user options
              <div className="flex items-center gap-4">
                <span className="text-white text-sm">Привет, {user.name}!</span>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white rounded-full"
                  >
                    Профиль
                  </Button>
                </Link>
                <Button onClick={handleLogout} className="bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white rounded-full">
                  Выход
                </Button>
              </div>
            ) : (
              // Not logged in options
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white rounded-full"
                  >
                    Вход
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white rounded-full">Регистрация</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-white hover:text-[#FF5E14] font-semibold">
                Главная
              </Link>
              <Link href="/trainings" className="text-white hover:text-[#FF5E14] font-semibold">
                Тренировки
              </Link>
              <Link href="/trainers" className="text-white hover:text-[#FF5E14] font-semibold">
                Тренеры
              </Link>
              <Link href="/prices" className="text-white hover:text-[#FF5E14] font-semibold">
                Цены
              </Link>
              <Link href="/contacts" className="text-white hover:text-[#FF5E14] font-semibold">
                Контакты
              </Link>
              <Link href="/booking" className="text-white hover:text-[#FF5E14] font-semibold">
                Запись
              </Link>
              {user && AuthService.isAdmin(user) && (
                <Link href="/admin" className="text-white hover:text-[#FF5E14] font-semibold">
                  Админ
                </Link>
              )}

              {isLoading ? (
                <div className="text-white">Загрузка...</div>
              ) : user ? (
                // Logged in user options
                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-white text-sm">Привет, {user.name}!</span>
                  <Link href="/profile">
                    <Button variant="outline" className="border-[#FF5E14] text-[#FF5E14] text-sm w-full">
                      Профиль
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white text-sm w-full"
                  >
                    Выход
                  </Button>
                </div>
              ) : (
                // Not logged in options
                <div className="flex gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="border-[#FF5E14] text-[#FF5E14] text-sm">
                      Вход
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white text-sm">Регистрация</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
