"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getTrainers, checkDatabaseTables } from "@/lib/database"
import type { Trainer } from "@/lib/supabase"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTrainers() {
      try {
        setError(null)

        // Check database tables first
        await checkDatabaseTables()

        const data = await getTrainers()

        // Transform data to handle experience_years vs experience
        const transformedData = data.map((trainer) => ({
          ...trainer,
          experience: trainer.experience_years || trainer.experience || 0,
        }))

        setTrainers(transformedData)

        if (transformedData.length === 0) {
          toast({
            title: "Информация",
            description: "Тренеры не найдены. Возможно, нужно запустить скрипт заполнения данных.",
          })
        }
      } catch (error) {
        console.error("Error fetching trainers:", error)
        const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка"
        setError(errorMessage)
        toast({
          title: "Ошибка базы данных",
          description: `${errorMessage}. Проверьте, что таблицы созданы и заполнены данными.`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTrainers()
  }, [toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white py-20 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-400">Загрузка тренеров...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] text-white py-20 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Ошибка базы данных</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Возможные решения:</p>
            <ul className="text-sm text-gray-400 text-left space-y-2">
              <li>
                • Запустите скрипт создания таблиц:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">scripts/create-missing-tables.sql</code>
              </li>
              <li>
                • Запустите скрипт заполнения данных:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">scripts/seed-coaches-workouts.sql</code>
              </li>
              <li>• Проверьте переменные окружения Supabase</li>
            </ul>
            <Button onClick={() => window.location.reload()} className="bg-[#FF5E14] hover:bg-[#FF5E14]/90">
              Попробовать снова
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Наши <span className="text-[#FF5E14]">Тренеры</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Команда профессиональных тренеров с многолетним опытом поможет вам достичь ваших целей
          </p>
        </div>

        {trainers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Тренеры не найдены</p>
            <p className="text-sm text-gray-500 mt-2">Запустите скрипт заполнения данных для добавления тренеров</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={trainer.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={trainer.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{trainer.name}</h3>
                  <Badge variant="outline" className="border-[#FF5E14] text-[#FF5E14] mb-4 block w-fit">
                    {trainer.specialization}
                  </Badge>

                  <p className="text-gray-300 mb-4">{trainer.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Опыт:</span>
                      <span className="text-white">{trainer.experience} лет</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white">{trainer.rating}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Цена за час:</span>
                      <span className="text-[#FF5E14] font-bold">{trainer.price_per_hour} ₽</span>
                    </div>
                  </div>

                  <Link href={`/booking?trainer=${trainer.id}`}>
                    <Button className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white">
                      Записаться к тренеру
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
