import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const workouts = [
  {
    id: 1,
    title: "Силовая тренировка",
    description: "Комплексная тренировка для развития силы и мышечной массы",
    duration: "60 мин",
    difficulty: "Средний",
    difficultyColor: "bg-yellow-500",
  },
  {
    id: 2,
    title: "HIIT тренировка",
    description: "Высокоинтенсивная интервальная тренировка для жиросжигания",
    duration: "45 мин",
    difficulty: "Высокий",
    difficultyColor: "bg-red-500",
  },
  {
    id: 3,
    title: "Йога для начинающих",
    description: "Мягкая практика йоги для улучшения гибкости и расслабления",
    duration: "75 мин",
    difficulty: "Легкий",
    difficultyColor: "bg-green-500",
  },
  {
    id: 4,
    title: "Кроссфит",
    description: "Функциональные движения высокой интенсивности",
    duration: "50 мин",
    difficulty: "Средний",
    difficultyColor: "bg-yellow-500",
  },
  {
    id: 5,
    title: "Пилатес",
    description: "Укрепление корпуса и улучшение осанки",
    duration: "60 мин",
    difficulty: "Легкий",
    difficultyColor: "bg-green-500",
  },
  {
    id: 6,
    title: "Бокс",
    description: "Кардио-тренировка с элементами бокса",
    duration: "55 мин",
    difficulty: "Высокий",
    difficultyColor: "bg-red-500",
  },
]

export default function WorkoutsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Наши <span className="text-orange-500">Тренировки</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Выберите тренировку, которая подходит именно вам. У нас есть программы для любого уровня подготовки
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workouts.map((workout) => (
              <Card key={workout.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="relative">
                  <Badge className={`absolute top-4 right-4 z-10 ${workout.difficultyColor} text-white`}>
                    {workout.difficulty}
                  </Badge>
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-gray-600 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{workout.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{workout.description}</p>
                  <p className="text-gray-300 mb-6">Длительность: {workout.duration}</p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Записаться</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
