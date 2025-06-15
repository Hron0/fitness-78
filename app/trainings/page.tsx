"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getWorkouts } from "@/lib/database"
import type { Workout } from "@/lib/supabase"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Легкий":
      return "bg-green-500"
    case "Средний":
      return "bg-yellow-500"
    case "Высокий":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export default function TrainingsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const data = await getWorkouts()
        setWorkouts(data)
      } catch (error) {
        console.error("Error fetching workouts:", error)
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить список тренировок",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white py-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Наши <span className="text-[#FF5E14]">Тренировки</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Выберите тренировку, которая подходит именно вам. У нас есть программы для любого уровня подготовки
          </p>
        </div>

        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Тренировки не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={workout.image_url || "/placeholder.svg?height=200&width=300"}
                    alt={workout.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-4 right-4 ${getDifficultyColor(workout.difficulty)} text-white`}>
                    {workout.difficulty}
                  </Badge>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{workout.title}</h3>
                    <Badge variant="outline" className="border-[#FF5E14] text-[#FF5E14]">
                      {workout.category}
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-4">{workout.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">Длительность: {workout.duration} мин</span>
                    {workout.trainer && <span className="text-sm text-[#FF5E14]">Тренер: {workout.trainer.name}</span>}
                  </div>

                  <Link href={`/booking?workout=${workout.id}`}>
                    <Button className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white">Записаться</Button>
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
