"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare, Dumbbell, UserCheck, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { supabase, type Trainer, type Workout, type Booking, type ContactMessage } from "@/lib/supabase"
import { AuthService } from "@/lib/auth"
import { TrainerForm } from "@/components/admin/trainer-form"
import { WorkoutForm } from "@/components/admin/workout-form"

export default function AdminPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const [showTrainerForm, setShowTrainerForm] = useState(false)
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    // Check if user is admin
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser || !AuthService.isAdmin(currentUser)) {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав для доступа к админ панели",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    loadData()
  }, [router, toast])

  const loadData = async () => {
    try {
      const [trainersRes, workoutsRes, bookingsRes, messagesRes] = await Promise.all([
        supabase.from("coaches").select("*"),
        supabase.from("workouts").select("*"),
        supabase.from("bookings").select("*, coach:coaches(*), workout:workouts(*), user:users(name, email)"),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ])

      if (trainersRes.data) setTrainers(trainersRes.data)
      if (workoutsRes.data) setWorkouts(workoutsRes.data)
      if (bookingsRes.data) setBookings(bookingsRes.data)
      if (messagesRes.data) setMessages(messagesRes.data)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", bookingId)

      if (error) throw error

      toast({
        title: "Статус обновлен",
        description: "Статус записи успешно изменен",
      })

      loadData()
    } catch (error) {
      console.error("Error updating booking:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус записи",
        variant: "destructive",
      })
    }
  }

  const updateMessageStatus = async (messageId: number, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", messageId)

      if (error) throw error

      toast({
        title: "Статус обновлен",
        description: "Статус сообщения успешно изменен",
      })

      loadData()
    } catch (error) {
      console.error("Error updating message:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус сообщения",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    AuthService.logout()
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    })
    router.push("/login")
  }

  const createTrainer = async (trainerData: Omit<Trainer, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("coaches")
        .insert([
          {
            ...trainerData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Тренер добавлен",
        description: "Новый тренер успешно добавлен",
      })

      loadData()
      setShowTrainerForm(false)
    } catch (error) {
      console.error("Error creating trainer:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось добавить тренера",
        variant: "destructive",
      })
    }
  }

  const updateTrainer = async (id: number, trainerData: Partial<Trainer>) => {
    try {
      const { error } = await supabase
        .from("coaches")
        .update({
          ...trainerData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      toast({
        title: "Тренер обновлен",
        description: "Данные тренера успешно обновлены",
      })

      loadData()
      setEditingTrainer(null)
      setShowTrainerForm(false)
    } catch (error) {
      console.error("Error updating trainer:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные тренера",
        variant: "destructive",
      })
    }
  }

  const deleteTrainer = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого тренера?")) return

    try {
      const { error } = await supabase.from("coaches").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Тренер удален",
        description: "Тренер успешно удален",
      })

      loadData()
    } catch (error) {
      console.error("Error deleting trainer:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тренера",
        variant: "destructive",
      })
    }
  }

  const createWorkout = async (workoutData: Omit<Workout, "id" | "created_at" | "updated_at">) => {
    // 🔑 ensure trainer_id is either a real id or null
    const dataToSave = {
      ...workoutData,
      trainer_id: workoutData.trainer_id && workoutData.trainer_id > 0 ? workoutData.trainer_id : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase.from("workouts").insert([dataToSave])
      if (error) throw error
      toast({ title: "Тренировка добавлена", description: "Новая тренировка успешно добавлена" })
      loadData()
      setShowWorkoutForm(false)
    } catch (error) {
      console.error("Error creating workout:", error)
      toast({ title: "Ошибка", description: "Не удалось добавить тренировку", variant: "destructive" })
    }
  }

  const updateWorkout = async (id: number, workoutData: Partial<Workout>) => {
    const dataToSave = {
      ...workoutData,
      trainer_id: workoutData.trainer_id && workoutData.trainer_id > 0 ? workoutData.trainer_id : null,
      updated_at: new Date().toISOString(),
    }

    try {
      const { error } = await supabase.from("workouts").update(dataToSave).eq("id", id)
      if (error) throw error
      toast({ title: "Тренировка обновлена", description: "Данные тренировки успешно обновлены" })
      loadData()
      setEditingWorkout(null)
      setShowWorkoutForm(false)
    } catch (error) {
      console.error("Error updating workout:", error)
      toast({ title: "Ошибка", description: "Не удалось обновить данные тренировки", variant: "destructive" })
    }
  }

  const deleteWorkout = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту тренировку?")) return

    try {
      const { error } = await supabase.from("workouts").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Тренировка удалена",
        description: "Тренировка успешно удалена",
      })

      loadData()
    } catch (error) {
      console.error("Error deleting workout:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тренировку",
        variant: "destructive",
      })
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
        <div className="flex justify-between items-center mb-16">
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold mb-4">
              Админ <span className="text-[#FF5E14]">Панель</span>
            </h1>
            <p className="text-xl text-gray-300">Управление фитнес-центром Fitness+</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Выйти
          </Button>
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
                  <p className="text-gray-400 text-sm">Новые сообщения</p>
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
                  {bookings.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Записей пока нет</p>
                  ) : (
                    bookings.map((booking) => (
                      <div key={booking.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-white">{booking.workout?.title}</h3>
                            <p className="text-gray-300">Тренер: {booking.coach?.name}</p>
                            <p className="text-gray-300">
                              Клиент: {booking.user?.name} ({booking.user?.email})
                            </p>
                            <p className="text-gray-400 text-sm">
                              {new Date(booking.booking_date).toLocaleDateString("ru-RU")}
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
                    ))
                  )}
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
                  {messages.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Сообщений пока нет</p>
                  ) : (
                    messages.map((message) => (
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
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trainers" className="mt-6">
            <Card className="bg-[#1E1E1E] border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Управление тренерами</CardTitle>
                <Button
                  onClick={() => {
                    setEditingTrainer(null)
                    setShowTrainerForm(true)
                  }}
                  className="bg-[#FF5E14] hover:bg-[#FF5E14]/90"
                >
                  Добавить тренера
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainers.map((trainer) => (
                    <div key={trainer.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                      {trainer.image_url && (
                        <img
                          src={trainer.image_url || "/placeholder.svg"}
                          alt={trainer.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="font-bold text-white mb-2">{trainer.name}</h3>
                      <p className="text-gray-300 mb-1">{trainer.specialization}</p>
                      <p className="text-gray-400 text-sm mb-2">Опыт: {trainer.experience_years} лет</p>
                      <p className="text-gray-400 text-sm mb-2">Рейтинг: {trainer.rating}/5</p>
                      <p className="text-[#FF5E14] font-bold mb-3">{trainer.price_per_hour} ₽/час</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingTrainer(trainer)
                            setShowTrainerForm(true)
                          }}
                        >
                          Редактировать
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteTrainer(trainer.id)}>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Управление тренировками</CardTitle>
                <Button
                  onClick={() => {
                    setEditingWorkout(null)
                    setShowWorkoutForm(true)
                  }}
                  className="bg-[#FF5E14] hover:bg-[#FF5E14]/90"
                >
                  Добавить тренировку
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workouts.map((workout) => (
                    <div key={workout.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                      {workout.image_url && (
                        <img
                          src={workout.image_url || "/placeholder.svg"}
                          alt={workout.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="font-bold text-white mb-2">{workout.title}</h3>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{workout.description}</p>
                      <p className="text-gray-400 text-sm mb-2">
                        {workout.duration} мин • {workout.difficulty} • {workout.category}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingWorkout(workout)
                            setShowWorkoutForm(true)
                          }}
                        >
                          Редактировать
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteWorkout(workout.id)}>
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
      {/* Trainer Form Modal */}
      {showTrainerForm && (
        <TrainerForm
          trainer={editingTrainer}
          onSubmit={editingTrainer ? (data) => updateTrainer(editingTrainer.id, data) : createTrainer}
          onCancel={() => {
            setShowTrainerForm(false)
            setEditingTrainer(null)
          }}
        />
      )}

      {/* Workout Form Modal */}
      {showWorkoutForm && (
        <WorkoutForm
          workout={editingWorkout}
          trainers={trainers}
          onSubmit={editingWorkout ? (data) => updateWorkout(editingWorkout.id, data) : createWorkout}
          onCancel={() => {
            setShowWorkoutForm(false)
            setEditingWorkout(null)
          }}
        />
      )}
    </div>
  )
}
