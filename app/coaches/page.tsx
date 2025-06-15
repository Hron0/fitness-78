import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const coaches = [
  {
    id: 1,
    name: "Алексей Петров",
    specialization: "Силовые тренировки",
    description:
      "Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.",
    experience: "8 лет",
    rating: 4.9,
    price: "3000 ₽",
    specializationColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Мария Иванова",
    specialization: "Йога и пилатес",
    description: "Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.",
    experience: "6 лет",
    rating: 5.0,
    price: "2500 ₽",
    specializationColor: "bg-green-500",
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    specialization: "Функциональный тренинг",
    description: "Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.",
    experience: "5 лет",
    rating: 4.8,
    price: "2800 ₽",
    specializationColor: "bg-red-500",
  },
]

export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Наши <span className="text-orange-500">Тренеры</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Команда профессиональных тренеров с многолетним опытом поможет вам достичь ваших целей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <Card key={coach.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="relative">
                  <Badge className={`absolute top-4 right-4 z-10 ${coach.specializationColor} text-white`}>
                    {coach.specialization}
                  </Badge>
                  <div className="h-64 bg-gray-800 flex items-center justify-center">
                    <div className="w-20 h-20 border-2 border-gray-600 rounded flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{coach.name}</h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">{coach.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Опыт:</span>
                      <span className="text-white font-semibold">{coach.experience}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold">{coach.rating}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Цена за час:</span>
                      <span className="text-orange-500 font-bold text-lg">{coach.price}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Записаться к тренеру</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
