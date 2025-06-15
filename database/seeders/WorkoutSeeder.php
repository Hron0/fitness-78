<?php

namespace Database\Seeders;

use App\Models\Workout;
use Illuminate\Database\Seeder;

class WorkoutSeeder extends Seeder
{
    public function run(): void
    {
        $workouts = [
            [
                'title' => 'Силовая тренировка',
                'description' => 'Комплексная тренировка для развития силы и мышечной массы',
                'duration' => 60,
                'difficulty' => 'Средний',
                'category' => 'Силовые',
                'image_url' => '/images/workouts/strength.jpg',
                'trainer_id' => 1,
            ],
            [
                'title' => 'HIIT тренировка',
                'description' => 'Высокоинтенсивная интервальная тренировка для жиросжигания',
                'duration' => 45,
                'difficulty' => 'Высокий',
                'category' => 'Кардио',
                'image_url' => '/images/workouts/hiit.jpg',
                'trainer_id' => 4,
            ],
            [
                'title' => 'Йога для начинающих',
                'description' => 'Мягкая практика йоги для улучшения гибкости и расслабления',
                'duration' => 75,
                'difficulty' => 'Легкий',
                'category' => 'Йога',
                'image_url' => '/images/workouts/yoga.jpg',
                'trainer_id' => 2,
            ],
            [
                'title' => 'Функциональный тренинг',
                'description' => 'Тренировка движений, которые мы используем в повседневной жизни',
                'duration' => 50,
                'difficulty' => 'Средний',
                'category' => 'Функциональный',
                'image_url' => '/images/workouts/functional.jpg',
                'trainer_id' => 3,
            ],
            [
                'title' => 'Пилатес',
                'description' => 'Укрепление мышц кора и улучшение осанки',
                'duration' => 55,
                'difficulty' => 'Легкий',
                'category' => 'Пилатес',
                'image_url' => '/images/workouts/pilates.jpg',
                'trainer_id' => 2,
            ],
            [
                'title' => 'Бокс',
                'description' => 'Тренировка боксерских техник и кардио нагрузка',
                'duration' => 60,
                'difficulty' => 'Высокий',
                'category' => 'Единоборства',
                'image_url' => '/images/workouts/boxing.jpg',
                'trainer_id' => 5,
            ],
        ];

        foreach ($workouts as $workout) {
            Workout::create($workout);
        }
    }
}
