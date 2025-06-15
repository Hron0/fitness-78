import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] py-16">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-[#FF5E14] mb-5">Fitness+</h3>
            <p className="text-gray-300">Премиальный фитнес-клуб с индивидуальным подходом к каждому клиенту</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#FF5E14] mb-5">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#FF5E14] transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/trainings" className="text-gray-300 hover:text-[#FF5E14] transition-colors">
                  Тренировки
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="text-gray-300 hover:text-[#FF5E14] transition-colors">
                  Тренеры
                </Link>
              </li>
              <li>
                <Link href="/prices" className="text-gray-300 hover:text-[#FF5E14] transition-colors">
                  Цены
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#FF5E14] mb-5">Контакты</h3>
            <ul className="space-y-3 text-gray-300">
              <li>г. Москва, ул. Спортивная, 15</li>
              <li>+7 (495) 123-45-67</li>
              <li>info@fitnessplus.ru</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#FF5E14] mb-5">Часы работы</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Пн-Пт: 7:00 - 23:00</li>
              <li>Сб-Вс: 8:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Fitness+. Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}
