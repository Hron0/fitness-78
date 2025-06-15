import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    id: 1,
    name: "Базовый",
    price: 2990,
    duration: 1,
    isPopular: false,
    features: [
      "Доступ в тренажерный зал",
      "Раздевалки и душевые",
      "Консультация тренера",
      "Групповые занятия (5 в месяц)",
    ],
  },
  {
    id: 2,
    name: "Стандарт",
    price: 4990,
    duration: 1,
    isPopular: true,
    features: [
      "Все из тарифа Базовый",
      "Безлимитные групповые занятия",
      "Доступ к бассейну",
      "Сауна и хамам",
      "Персональная программа тренировок",
      "Заморозка абонемента (7 дней)",
    ],
  },
  {
    id: 3,
    name: "Премиум",
    price: 7990,
    duration: 1,
    isPopular: false,
    features: [
      "Все из тарифа Стандарт",
      "2 персональные тренировки",
      "Консультация диетолога",
      "Массаж (1 сеанс)",
      "Приоритетная запись",
      "Гостевые визиты (2 в месяц)",
      "Заморозка абонемента (14 дней)",
    ],
  },
]

export default function PricesPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white py-20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Наши <span className="text-[#FF5E14]">Тарифы</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Выберите тарифный план, который подходит именно вам. Все планы включают доступ к современному оборудованию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-[#1E1E1E] p-8 rounded-lg relative hover:transform hover:-translate-y-2 transition-all duration-300 ${
                plan.isPopular ? "border-2 border-[#FF5E14]" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF5E14] text-white px-4 py-1 rounded-full text-sm">
                  Популярный
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#FF5E14]">{plan.price.toLocaleString()}</span>
                  <span className="text-gray-400"> ₽/месяц</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/register">
                <Button
                  className={`w-full ${
                    plan.isPopular
                      ? "bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white"
                      : "bg-transparent border border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white"
                  }`}
                >
                  Выбрать план
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Дополнительные <span className="text-[#FF5E14]">Услуги</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1E1E1E] p-6 rounded-lg text-center">
              <h3 className="text-white font-bold mb-2">Персональная тренировка</h3>
              <p className="text-[#FF5E14] text-2xl font-bold">от 2000 ₽</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-lg text-center">
              <h3 className="text-white font-bold mb-2">Массаж</h3>
              <p className="text-[#FF5E14] text-2xl font-bold">от 1500 ₽</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-lg text-center">
              <h3 className="text-white font-bold mb-2">Консультация диетолога</h3>
              <p className="text-[#FF5E14] text-2xl font-bold">2500 ₽</p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-lg text-center">
              <h3 className="text-white font-bold mb-2">Разовое посещение</h3>
              <p className="text-[#FF5E14] text-2xl font-bold">800 ₽</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
