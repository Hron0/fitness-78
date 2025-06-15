import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const workouts = [
  {
    id: 1,
    title: "Силовая тренировка",
    description: "Комплексная тренировка для развития силы и мышечной массы",
    duration: 60,
    difficulty: "Средний",
    category: "Силовые",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "HIIT тренировка",
    description: "Высокоинтенсивная интервальная тренировка для жиросжигания",
    duration: 45,
    difficulty: "Высокий",
    category: "Кардио",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Йога для начинающих",
    description: "Мягкая практика йоги для улучшения гибкости и расслабления",
    duration: 75,
    difficulty: "Легкий",
    category: "Йога",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Функциональный тренинг",
    description: "Тренировка движений, которые мы используем в повседневной жизни",
    duration: 50,
    difficulty: "Средний",
    category: "Функциональный",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Пилатес",
    description: "Укрепление мышц кора и улучшение осанки",
    duration: 55,
    difficulty: "Легкий",
    category: "Пилатес",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Бокс",
    description: "Тренировка боксерских техник и кардио нагрузка",
    duration: 60,
    difficulty: "Высокий",
    category: "Единоборства",
    image: "/placeholder.svg?height=200&width=300",
  },
]

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-[#1E1E1E] rounded-lg overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={workout.image || "/placeholder.svg"}
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
                </div>
                <Link href={`/booking?workout=${workout.id}`}>
                  <Button className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white">Записаться</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
