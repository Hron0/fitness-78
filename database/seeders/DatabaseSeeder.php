<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Trainer;
use App\Models\Workout;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Создаем админа
        User::create([
            'name' => 'Администратор',
            'email' => 'admin@fitnessplus.ru',
            'password' => Hash::make('admin123'),
            'is_admin' => true,
            'membership_type' => 'Премиум',
        ]);

        // Создаем тренеров
        $trainers = [
            [
                'name' => 'Алексей Петров',
                'specialization' => 'Силовые тренировки',
                'experience' => 8,
                'description' => 'Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.',
                'image_url' => 'images/trainers/alexey.jpg',
                'rating' => 4.9,
                'price_per_hour' => 3000,
            ],
            [
                'name' => 'Мария Иванова',
                'specialization' => 'Йога и пилатес',
                'experience' => 6,
                'description' => 'Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.',
                'image_url' => 'images/trainers/maria.jpg',
                'rating' => 5.0,
                'price_per_hour' => 2500,
            ],
            [
                'name' => 'Дмитрий Козлов',
                'specialization' => 'Функциональный тренинг',
                'experience' => 5,
                'description' => 'Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.',
                'image_url' => 'images/trainers/dmitry.jpg',
                'rating' => 4.8,
                'price_per_hour' => 2800,
            ],
            [
                'name' => 'Анна Смирнова',
                'specialization' => 'Кардио и жиросжигание',
                'experience' => 4,
                'description' => 'Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.',
                'image_url' => 'images/trainers/anna.jpg',
                'rating' => 4.7,
                'price_per_hour' => 2200,
            ],
            [
                'name' => 'Игорь Волков',
                'specialization' => 'Единоборства',
                'experience' => 10,
                'description' => 'Мастер спорта по боксу. Обучает технике бокса и самообороне.',
                'image_url' => 'images/trainers/igor.jpg',
                'rating' => 4.9,
                'price_per_hour' => 3500,
            ],
            [
                'name' => 'Елена Новикова',
                'specialization' => 'Групповые программы',
                'experience' => 7,
                'description' => 'Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.',
                'image_url' => 'images/trainers/elena.jpg',
                'rating' => 4.8,
                'price_per_hour' => 2000,
            ],
        ];

        foreach ($trainers as $trainerData) {
            Trainer::create($trainerData);
        }

        // Создаем тренировки
        $workouts = [
            [
                'title' => 'Силовая тренировка',
                'description' => 'Комплексная тренировка для развития силы и мышечной массы',
                'duration' => 60,
                'difficulty' => 'Средний',
                'category' => 'Силовые',
                'image_url' => 'images/workouts/strength.jpg',
                'trainer_id' => 1,
            ],
            [
                'title' => 'HIIT тренировка',
                'description' => 'Высокоинтенсивная интервальная тренировка для жиросжигания',
                'duration' => 45,
                'difficulty' => 'Высокий',
                'category' => 'Кардио',
                'image_url' => 'images/workouts/hiit.jpg',
                'trainer_id' => 4,
            ],
            [
                'title' => 'Йога для начинающих',
                'description' => 'Мягкая практика йоги для улучшения гибкости и расслабления',
                'duration' => 75,
                'difficulty' => 'Легкий',
                'category' => 'Йога',
                'image_url' => 'images/workouts/yoga.jpg',
                'trainer_id' => 2,
            ],
            [
                'title' => 'Функциональный тренинг',
                'description' => 'Тренировка движений, которые мы используем в повседневной жизни',
                'duration' => 50,
                'difficulty' => 'Средний',
                'category' => 'Функциональный',
                'image_url' => 'images/workouts/functional.jpg',
                'trainer_id' => 3,
            ],
            [
                'title' => 'Пилатес',
                'description' => 'Укрепление мышц кора и улучшение осанки',
                'duration' => 55,
                'difficulty' => 'Легкий',
                'category' => 'Пилатес',
                'image_url' => 'images/workouts/pilates.jpg',
                'trainer_id' => 2,
            ],
            [
                'title' => 'Бокс',
                'description' => 'Тренировка боксерских техник и кардио нагрузка',
                'duration' => 60,
                'difficulty' => 'Высокий',
                'category' => 'Единоборства',
                'image_url' => 'images/workouts/boxing.jpg',
                'trainer_id' => 5,
            ],
        ];

        foreach ($workouts as $workoutData) {
            Workout::create($workoutData);
        }

        // Создаем тестового пользователя
        User::create([
            'name' => 'Тестовый Пользователь',
            'email' => 'test@example.com',
            'phone' => '+7 (999) 123-45-67',
            'membership_type' => 'Стандарт',
            'password' => Hash::make('test123'),
        ]);

        $this->call([
            UserSeeder::class,
            TrainerSeeder::class,
            WorkoutSeeder::class,
        ]);
    }
}
