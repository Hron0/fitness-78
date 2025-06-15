import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        ></div>

        <div className="container mx-auto px-5 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              Премиум <span className="text-[#FF5E14]">фитнес</span> опыт
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Измени свое тело и мышление в нашем эксклюзивном фитнес-клубе с индивидуальным подходом
            </p>
            <div className="flex gap-4">
              <Link href="/register">
                <Button className="bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white px-10 py-6 text-lg rounded-full">
                  Начать сейчас
                </Button>
              </Link>
              <Link href="/trainings">
                <Button
                  variant="outline"
                  className="border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white px-10 py-6 text-lg rounded-full"
                >
                  Посмотреть тренировки
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Почему <span className="text-[#FF5E14]">Fitness+</span>
            </h2>
            <p className="text-xl text-gray-300">
              Мы предлагаем уникальный опыт, который вы не найдете в других клубах
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1E1E1E] p-10 rounded-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6">🏋️</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Персональные тренировки</h3>
              <p className="text-gray-300">
                Индивидуальные программы от лучших тренеров страны с учетом ваших целей и возможностей
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-10 rounded-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Групповые занятия</h3>
              <p className="text-gray-300">
                20+ направлений для любого уровня подготовки в современных залах с профессиональным оборудованием
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-10 rounded-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Цифровой трекинг</h3>
              <p className="text-gray-300">
                Отслеживайте прогресс в мобильном приложении с детальной статистикой и рекомендациями
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1E1E1E]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#FF5E14] mb-2">500+</div>
              <div className="text-gray-300">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF5E14] mb-2">15</div>
              <div className="text-gray-300">Опытных тренеров</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF5E14] mb-2">24/7</div>
              <div className="text-gray-300">Доступ к залу</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FF5E14] mb-2">5</div>
              <div className="text-gray-300">Лет на рынке</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              Наши <span className="text-[#FF5E14]">Тарифы</span>
            </h2>
            <p className="text-xl text-gray-300">Выберите план, который подходит вашему образу жизни</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#1E1E1E] p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Базовый</h3>
              <div className="text-4xl font-bold text-[#FF5E14] mb-4">2990 ₽</div>
              <p className="text-gray-400 mb-6">в месяц</p>
              <Link href="/prices">
                <Button
                  variant="outline"
                  className="w-full border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white"
                >
                  Подробнее
                </Button>
              </Link>
            </div>

            <div className="bg-[#1E1E1E] p-8 rounded-lg text-center relative border-2 border-[#FF5E14]">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF5E14] text-white px-4 py-1 rounded-full text-sm">
                Популярный
              </div>
              <h3 className="text-2xl font-bold mb-4">Стандарт</h3>
              <div className="text-4xl font-bold text-[#FF5E14] mb-4">4990 ₽</div>
              <p className="text-gray-400 mb-6">в месяц</p>
              <Link href="/prices">
                <Button className="w-full bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white">Подробнее</Button>
              </Link>
            </div>

            <div className="bg-[#1E1E1E] p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Премиум</h3>
              <div className="text-4xl font-bold text-[#FF5E14] mb-4">7990 ₽</div>
              <p className="text-gray-400 mb-6">в месяц</p>
              <Link href="/prices">
                <Button
                  variant="outline"
                  className="w-full border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white"
                >
                  Подробнее
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1E1E1E]">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы начать свой <span className="text-[#FF5E14]">фитнес-путь</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Присоединяйтесь к нашему клубу сегодня и получите бесплатную консультацию с персональным тренером
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/booking">
              <Button className="bg-[#FF5E14] hover:bg-[#FF5E14]/90 text-white px-10 py-6 text-lg rounded-full">
                Записаться на тренировку
              </Button>
            </Link>
            <Link href="/contacts">
              <Button
                variant="outline"
                className="border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white px-10 py-6 text-lg rounded-full"
              >
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
