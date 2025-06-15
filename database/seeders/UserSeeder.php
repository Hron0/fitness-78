<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Создаем администратора
        User::create([
            'name' => 'Администратор',
            'email' => 'admin@fitnessplus.ru',
            'password' => Hash::make('admin123'),
            'is_admin' => true,
            'membership_type' => 'Премиум',
        ]);

        // Создаем тестового пользователя
        User::create([
            'name' => 'Тестовый Пользователь',
            'email' => 'test@example.com',
            'phone' => '+7 (999) 123-45-67',
            'password' => Hash::make('password'),
            'membership_type' => 'Стандарт',
        ]);
    }
}
