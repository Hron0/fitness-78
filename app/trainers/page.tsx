import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"

const trainers = [
  {
    id: 1,
    name: "Алексей Петров",
    specialization: "Силовые тренировки",
    experience: 8,
    description:
      "Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    pricePerHour: 3000,
  },
  {
    id: 2,
    name: "Мария Иванова",
    specialization: "Йога и пилатес",
    experience: 6,
    description: "Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 5.0,
    pricePerHour: 2500,
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    specialization: "Функциональный тренинг",
    experience: 5,
    description: "Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    pricePerHour: 2800,
  },
  {
    id: 4,
    name: "Анна Смирнова",
    specialization: "Кардио и жиросжигание",
    experience: 4,
    description: "Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    pricePerHour: 2200,
  },
  {
    id: 5,
    name: "Игорь Волков",
    specialization: "Единоборства",
    experience: 10,
    description: "Мастер спорта по боксу. Обучает технике бокса и самообороне.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    pricePerHour: 3500,
  },
  {
    id: 6,
    name: "Елена Новикова",
    specialization: "Групповые программы",
    experience: 7,
    description: "Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    pricePerHour: 2000,
  },
]

export default function TrainersPage() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={trainer.image || "/placeholder.svg"}
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
                    <span className="text-[#FF5E14] font-bold">{trainer.pricePerHour} ₽</span>
                  </div>
                </div>

                <Link href={`/booking?trainer=${trainer.id}`}>
                  <Button className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white">Записаться к тренеру</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
