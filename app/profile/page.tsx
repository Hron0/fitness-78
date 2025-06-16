"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthService } from "@/lib/auth"
import { getUserBookings } from "@/lib/database"
import type { AuthUser, Booking } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Shield, Calendar, Clock, Dumbbell, UserCheck } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(false)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setLoading(false)

    // Fetch user bookings
    fetchUserBookings(currentUser.id)
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
