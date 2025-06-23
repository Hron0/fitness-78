"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { getTrainers, getWorkouts, createBooking } from "@/lib/database"
import { AuthService } from "@/lib/auth"
import type { Trainer, Workout } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [selectedTrainer, setSelectedTrainer] = useState<string>("")
  const [selectedWorkout, setSelectedWorkout] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")

  // Pre-select trainer or workout from URL params
  useEffect(() => {
    const trainerId = searchParams.get("trainer")
    const workoutId = searchParams.get("workout")

    if (trainerId) {
      setSelectedTrainer(trainerId)
    }
    if (workoutId) {
      setSelectedWorkout(workoutId)
    }
  }, [searchParams])

  useEffect(() => {
    async function fetchData() {
      try {
        const [trainersData, workoutsData] = await Promise.all([getTrainers(), getWorkouts()])
        setTrainers(trainersData)
        setWorkouts(workoutsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Для записи на тренировку необходимо войти в систему",
        variant: "destructive",
      })
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = AuthService.getCurrentUser()
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Необходимо войти в систему для записи",
        variant: "destructive",
      })
      return
    }

    // Only validate when actually submitting
    if (!selectedTrainer || !selectedWorkout || !selectedDate || !selectedTime) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      await createBooking({
        user_id: user.id,
        trainer_id: Number.parseInt(selectedTrainer),
        workout_id: Number.parseInt(selectedWorkout),
        booking_date: selectedDate.toISOString(),
        booking_time: selectedTime,
        status: "pending",
      })

      toast({
        title: "Успешно!",
        description: "Ваша запись создана. Мы свяжемся с вами для подтверждения.",
      })

      // Reset form
      setSelectedTrainer("")
      setSelectedWorkout("")
      setSelectedDate(undefined)
      setSelectedTime("")
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось создать запись. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white py-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Запись на <span className="text-[#FF5E14]">Тренировку</span>
            </h1>
            <p className="text-gray-300">Выберите тренера, тренировку и удобное время</p>
          </div>

          <Card className="bg-[#1E1E1E] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Детали записи</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="trainer" className="text-white">
                    Тренер *
                  </Label>
                  <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                      <SelectValue placeholder="Выберите тренера" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2A2A2A] border-gray-600">
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name} - {trainer.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workout" className="text-white">
                    Тренировка *
                  </Label>
                  <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                      <SelectValue placeholder="Выберите тренировку" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2A2A2A] border-gray-600">
                      {workouts.map((workout) => (
                        <SelectItem key={workout.id} value={workout.id.toString()}>
                          {workout.title} ({workout.duration} мин)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Дата *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-[#2A2A2A] border-gray-600 text-white hover:bg-[#3A3A3A]",
                          !selectedDate && "text-gray-400",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: ru }) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#2A2A2A] border-gray-600">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    Время *
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2A2A2A] border-gray-600">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white"
                  disabled={submitting}
                >
                  {submitting ? <LoadingSpinner /> : "Записаться"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
