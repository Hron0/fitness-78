"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthService } from "@/lib/auth"
import { getUserBookings, getUserMessages, createUserMessage } from "@/lib/database"
import type { AuthUser, Booking, UserMessage } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, Shield, Calendar, Clock, Dumbbell, UserCheck, MessageSquare, Send } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userMessages, setUserMessages] = useState<UserMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setLoading(false)

    // Fetch user data
    fetchUserBookings(currentUser.id)
    fetchUserMessages(currentUser.id)
  }, [router])

  const fetchUserBookings = async (userId: number) => {
    setBookingsLoading(true)
    try {
      const userBookings = await getUserBookings(userId)
      setBookings(userBookings)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setBookingsLoading(false)
    }
  }

  const fetchUserMessages = async (userId: number) => {
    setMessagesLoading(true)
    try {
      const messages = await getUserMessages(userId)
      setUserMessages(messages)
    } catch (error) {
      console.error("Error fetching user messages:", error)
    } finally {
      setMessagesLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!user || !newMessage.trim()) return

    setSendingMessage(true)
    try {
      await createUserMessage({
        user_id: user.id,
        message: newMessage.trim(),
      })

      toast({
        title: "Сообщение отправлено",
        description: "Ваше сообщение успешно отправлено администрации",
      })

      setNewMessage("")
      fetchUserMessages(user.id)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive",
      })
    } finally {
      setSendingMessage(false)
    }
  }

  const handleLogout = () => {
    AuthService.logout()
    router.push("/")
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Ожидает", variant: "secondary" as const },
      confirmed: { label: "Подтверждено", variant: "default" as const },
      cancelled: { label: "Отменено", variant: "destructive" as const },
      completed: { label: "Завершено", variant: "outline" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getMessageStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "read" ? "default" : "secondary"}>{status === "read" ? "Прочитано" : "Новое"}</Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-orange-500" />
              Профиль пользователя
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Имя</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Роль</p>
                  <p className="font-medium capitalize">{user.role === "admin" ? "Администратор" : "Пользователь"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleLogout} variant="outline" className="flex-1">
                Выйти из аккаунта
              </Button>
              {AuthService.isAdmin(user) && (
                <Button onClick={() => router.push("/admin")} className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Панель администратора
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message to Admin Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-orange-500" />
              Связь с администрацией
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Сообщение администрации
              </label>
              <Textarea
                id="message"
                placeholder="Напишите ваше сообщение администрации..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sendingMessage}
              className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
            >
              {sendingMessage ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {sendingMessage ? "Отправка..." : "Отправить сообщение"}
            </Button>

            {/* Previous Messages */}
            {messagesLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : userMessages.length > 0 ? (
              <div className="space-y-3 mt-6">
                <h4 className="font-medium text-gray-900">Ваши сообщения</h4>
                {userMessages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500">
                        {format(new Date(message.created_at), "dd MMMM yyyy, HH:mm", { locale: ru })}
                      </span>
                      {getMessageStatusBadge(message.status)}
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-4">У вас пока нет сообщений</p>
            )}
          </CardContent>
        </Card>

        {/* Bookings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-orange-500" />
              Мои записи на тренировки
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">У вас пока нет записей на тренировки</p>
                <Button onClick={() => router.push("/booking")} className="bg-orange-500 hover:bg-orange-600">
                  Записаться на тренировку
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">{booking.workout?.title || "Тренировка"}</span>
                        </div>

                        {booking.trainer && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <UserCheck className="h-4 w-4" />
                            <span>
                              {booking.trainer.name} - {booking.trainer.specialization}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(booking.booking_date), "dd MMMM yyyy", { locale: ru })}</span>
                          </div>

                          {booking.booking_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{booking.booking_time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        {getStatusBadge(booking.status)}
                        {booking.workout && (
                          <p className="text-sm text-gray-500 mt-1">{booking.workout.duration} мин</p>
                        )}
                      </div>
                    </div>

                    {booking.workout?.description && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{booking.workout.description}</p>
                    )}
                  </div>
                ))}

                <div className="text-center pt-4">
                  <Button onClick={() => router.push("/booking")} variant="outline">
                    Записаться на новую тренировку
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
