"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, Dumbbell, UserCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase, type Trainer, type Workout, type Booking, type ContactMessage } from "@/lib/supabase"

export default function AdminPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [trainersRes, workoutsRes, bookingsRes, messagesRes] = await Promise.all([
        supabase.from("trainers").select("*"),
        supabase.from("workouts").select("*, trainer:trainers(*)"),
        supabase.from("bookings").select("*, trainer:trainers(*), workout:workouts(*)"),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ])

      if (trainersRes.data) setTrainers(trainersRes.data)
      if (workoutsRes.data) setWorkouts(workoutsRes.data)
      if (bookingsRes.data) setBookings(bookingsRes.data)
      if (messagesRes.data) setMessages(messagesRes.data)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await supabase.from("bookings").update({ status }).eq("id", bookingId)

      loadData()
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      await supabase.from("contact_messages").update({ status }).eq("id", messageId)

      loadData()
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF5E14] mx-auto mb-4"></div>
          <p className="text-xl">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Админ <span className="text-[#FF5E14]">Панель</span>
          </h1>
          <p className="text-xl text-gray-300">Управление фитнес-центром Fitness+</p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-[#1E1E1E] border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Тренеры</p>
                  <p className="text-3xl font-bold text-[#FF5E14]">{trainers.length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-[#FF5E14]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Тренировки</p>
                  <p className="text-3xl font-bold text-[#FF5E14]">{workouts.length}</p>
                </div>
                <Dumbbell className="w-8 h-8 text-[#FF5E14]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Записи</p>
                  <p className="text-3xl font-bold text-[#FF5E14]">{bookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#FF5E14]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Сообщения</p>
                  <p className="text-3xl font-bold text-[#FF5E14]">
                    {messages.filter((m) => m.status === "new").length}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-[#FF5E14]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#1E1E1E]">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#FF5E14]">
              Записи
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[#FF5E14]">
              Сообщения
            </TabsTrigger>
            <TabsTrigger value="trainers" className="data-[state=active]:bg-[#FF5E14]">
              Тренеры
            </TabsTrigger>
            <TabsTrigger value="workouts" className="data-[state=active]:bg-[#FF5E14]">
              Тренировки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-[#1E1E1E] border-none">
              <CardHeader>
                <CardTitle className="text-white">Записи на тренировки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white">{booking.workout?.title}</h3>
                          <p className="text-gray-300">Тренер: {booking.trainer?.name}</p>
                          <p className="text-gray-400 text-sm">
                            {booking.booking_date} в {booking.booking_time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-green-600"
                                : booking.status === "cancelled"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                            }
                          >
                            {booking.status === "confirmed"
                              ? "Подтверждено"
                              : booking.status === "cancelled"
                                ? "Отменено"
                                : "Ожидает"}
                          </Badge>
                          {booking.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updateBookingStatus(booking.id, "confirmed")}
                              >
                                Подтвердить
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateBookingStatus(booking.id, "cancelled")}
                              >
                                Отменить
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Card className="bg-[#1E1E1E] border-none">
              <CardHeader>
                <CardTitle className="text-white">Контактные сообщения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-white">{message.name}</h3>
                          <p className="text-gray-300">{message.email}</p>
                          {message.phone && <p className="text-gray-400">{message.phone}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            className={
                              message.status === "replied"
                                ? "bg-green-600"
                                : message.status === "read"
                                  ? "bg-blue-600"
                                  : "bg-yellow-600"
                            }
                          >
                            {message.status === "replied"
                              ? "Отвечено"
                              : message.status === "read"
                                ? "Прочитано"
                                : "Новое"}
                          </Badge>
                          {message.status === "new" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => updateMessageStatus(message.id, "read")}
                            >
                              Отметить прочитанным
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-300">{message.message}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        {new Date(message.created_at).toLocaleString("ru-RU")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trainers" className="mt-6">
            <Card className="bg-[#1E1E1E] border-none">
              <CardHeader>
                <CardTitle className="text-white">Управление тренерами</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainers.map((trainer) => (
                    <div key={trainer.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                      <h3 className="font-bold text-white mb-2">{trainer.name}</h3>
                      <p className="text-gray-300 mb-1">{trainer.specialization}</p>
                      <p className="text-gray-400 text-sm mb-2">Опыт: {trainer.experience} лет</p>
                      <p className="text-[#FF5E14] font-bold">{trainer.price_per_hour} ₽/час</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Редактировать
                        </Button>
                        <Button size="sm" variant="destructive">
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="mt-6">
            <Card className="bg-[#1E1E1E] border-none">
              <CardHeader>
                <CardTitle className="text-white">Управление тренировками</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workouts.map((workout) => (
                    <div key={workout.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                      <h3 className="font-bold text-white mb-2">{workout.title}</h3>
                      <p className="text-gray-300 mb-1">{workout.category}</p>
                      <p className="text-gray-400 text-sm mb-2">
                        {workout.duration} мин • {workout.difficulty}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">Тренер: {workout.trainer?.name}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Редактировать
                        </Button>
                        <Button size="sm" variant="destructive">
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
