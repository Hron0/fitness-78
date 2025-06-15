<?php

namespace Database\Seeders;

use App\Models\Trainer;
use Illuminate\Database\Seeder;

class TrainerSeeder extends Seeder
{
    public function run(): void
    {
        $trainers = [
            [
                'name' => 'Алексей Петров',
                'specialization' => 'Силовые тренировки',
                'experience' => 8,
                'description' => 'Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.',
                'image_url' => '/images/trainers/alexey.jpg',
                'rating' => 4.9,
                'price_per_hour' => 3000,
            ],
            [
                'name' => 'Мария Иванова',
                'specialization' => 'Йога и пилатес',
                'experience' => 6,
                'description' => 'Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.',
                'image_url' => '/images/trainers/maria.jpg',
                'rating' => 5.0,
                'price_per_hour' => 2500,
            ],
            [
                'name' => 'Дмитрий Козлов',
                'specialization' => 'Функциональный тренинг',
                'experience' => 5,
                'description' => 'Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.',
                'image_url' => '/images/trainers/dmitry.jpg',
                'rating' => 4.8,
                'price_per_hour' => 2800,
            ],
            [
                'name' => 'Анна Смирнова',
                'specialization' => 'Кардио и жиросжигание',
                'experience' => 4,
                'description' => 'Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.',
                'image_url' => '/images/trainers/anna.jpg',
                'rating' => 4.7,
                'price_per_hour' => 2200,
            ],
            [
                'name' => 'Игорь Волков',
                'specialization' => 'Единоборства',
                'experience' => 10,
                'description' => 'Мастер спорта по боксу. Обучает технике бокса и самообороне.',
                'image_url' => '/images/trainers/igor.jpg',
                'rating' => 4.9,
                'price_per_hour' => 3500,
            ],
            [
                'name' => 'Елена Новикова',
                'specialization' => 'Групповые программы',
                'experience' => 7,
                'description' => 'Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.',
                'image_url' => '/images/trainers/elena.jpg',
                'rating' => 4.8,
                'price_per_hour' => 2000,
            ],
        ];

        foreach ($trainers as $trainer) {
            Trainer::create($trainer);
        }
    }
}
