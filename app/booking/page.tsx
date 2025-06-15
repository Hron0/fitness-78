"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { supabase, type Trainer, type Workout } from "@/lib/supabase"

export default function BookingPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [selectedTrainer, setSelectedTrainer] = useState<string>("")
  const [selectedWorkout, setSelectedWorkout] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

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

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [trainersRes, workoutsRes] = await Promise.all([
        supabase.from("trainers").select("*"),
        supabase.from("workouts").select("*, trainer:trainers(*)"),
      ])

      if (trainersRes.data) setTrainers(trainersRes.data)
      if (workoutsRes.data) setWorkouts(workoutsRes.data)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Сначала создаем или находим пользователя
      let { data: user } = await supabase.from("users").select("id").eq("email", userInfo.email).single()

      if (!user) {
        const { data: newUser } = await supabase
          .from("users")
          .insert({
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            membership_type: "Базовый",
          })
          .select("id")
          .single()

        user = newUser
      }

      if (user && selectedDate && selectedTime) {
        // Создаем запись на тренировку
        await supabase.from("bookings").insert({
          user_id: user.id,
          trainer_id: selectedTrainer,
          workout_id: selectedWorkout,
          booking_date: format(selectedDate, "yyyy-MM-dd"),
          booking_time: selectedTime,
          status: "pending",
        })

        alert("Запись успешно создана! Мы свяжемся с вами для подтверждения.")

        // Сброс формы
        setSelectedTrainer("")
        setSelectedWorkout("")
        setSelectedDate(undefined)
        setSelectedTime("")
        setUserInfo({ name: "", email: "", phone: "" })
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("Произошла ошибка при создании записи. Попробуйте еще раз.")
    } finally {
      setSubmitting(false)
    }
  }

  const filteredWorkouts = selectedTrainer ? workouts.filter((w) => w.trainer_id === selectedTrainer) : workouts

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF5E14] mx-auto mb-4"></div>
          <p className="text-xl">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Запись на <span className="text-[#FF5E14]">Тренировку</span>
          </h1>
          <p className="text-xl text-gray-300">Выберите тренера, тренировку и удобное время</p>
        </div>

        <Card className="bg-[#1E1E1E] border-none">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Форма записи</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Информация о пользователе */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Имя *
                  </Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    required
                    className="bg-[#2A2A2A] border-gray-600 text-white mt-1"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    required
                    className="bg-[#2A2A2A] border-gray-600 text-white mt-1"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    className="bg-[#2A2A2A] border-gray-600 text-white mt-1"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              {/* Выбор тренера */}
              <div>
                <Label className="text-gray-300">Выберите тренера *</Label>
                <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                  <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white mt-1">
                    <SelectValue placeholder="Выберите тренера" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id} className="text-white">
                        {trainer.name} - {trainer.specialization} ({trainer.price_per_hour} ₽/час)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Выбор тренировки */}
              <div>
                <Label className="text-gray-300">Выберите тренировку *</Label>
                <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
                  <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white mt-1">
                    <SelectValue placeholder="Выберите тренировку" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-gray-600">
                    {filteredWorkouts.map((workout) => (
                      <SelectItem key={workout.id} value={workout.id} className="text-white">
                        {workout.title} ({workout.duration} мин, {workout.difficulty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Выбор даты и времени */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Выберите дату *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-[#2A2A2A] border-gray-600 text-white mt-1"
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

                <div>
                  <Label className="text-gray-300">Выберите время *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white mt-1">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2A2A2A] border-gray-600">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time} className="text-white">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white py-3"
                disabled={submitting || !selectedTrainer || !selectedWorkout || !selectedDate || !selectedTime}
              >
                {submitting ? "Создание записи..." : "Записаться на тренировку"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
