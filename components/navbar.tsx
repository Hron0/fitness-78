"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50 py-5">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-orange-500">Fitness</span>
            <span className="text-white">+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-white hover:text-orange-500 font-semibold transition-colors">
              Главная
            </Link>
            <Link href="/workouts" className="text-white hover:text-orange-500 font-semibold transition-colors">
              Тренировки
            </Link>
            <Link href="/coaches" className="text-white hover:text-orange-500 font-semibold transition-colors">
              Тренеры
            </Link>
            <Link href="/prices" className="text-white hover:text-orange-500 font-semibold transition-colors">
              Цены
            </Link>
            <Link href="/contacts" className="text-white hover:text-orange-500 font-semibold transition-colors">
              Контакты
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Вход
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Регистрация</Button>
            </Link>
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
              <Link href="/" className="text-white hover:text-orange-500 font-semibold">
                Главная
              </Link>
              <Link href="/workouts" className="text-white hover:text-orange-500 font-semibold">
                Тренировки
              </Link>
              <Link href="/coaches" className="text-white hover:text-orange-500 font-semibold">
                Тренеры
              </Link>
              <Link href="/prices" className="text-white hover:text-orange-500 font-semibold">
                Цены
              </Link>
              <Link href="/contacts" className="text-white hover:text-orange-500 font-semibold">
                Контакты
              </Link>
              <div className="flex gap-2 mt-4">
                <Link href="/login">
                  <Button variant="outline" className="border-orange-500 text-orange-500 text-sm">
                    Вход
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm">Регистрация</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
