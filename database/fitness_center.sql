-- Создание базы данных
CREATE DATABASE IF NOT EXISTS fitness_center CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fitness_center;

-- Таблица пользователей
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    membership_type VARCHAR(50) DEFAULT 'Базовый',
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица тренеров
CREATE TABLE trainers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    rating DECIMAL(2,1) DEFAULT 5.0,
    price_per_hour INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица тренировок
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration INT NOT NULL,
    difficulty ENUM('Легкий', 'Средний', 'Высокий') NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    trainer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE CASCADE
);

-- Таблица бронирований
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trainer_id INT NOT NULL,
    workout_id INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

-- Таблица сообщений
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Вставка тестовых данных
-- Админ (пароль: admin123)
INSERT INTO users (name, email, password, is_admin, membership_type) VALUES
('Администратор', 'admin@fitnessplus.ru', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', TRUE, 'Премиум');

-- Тренеры
INSERT INTO trainers (name, specialization, experience, description, image_url, rating, price_per_hour) VALUES
('Алексей Петров', 'Силовые тренировки', 8, 'Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.', 'assets/images/trainers/alexey.jpg', 4.9, 3000),
('Мария Иванова', 'Йога и пилатес', 6, 'Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.', 'assets/images/trainers/maria.jpg', 5.0, 2500),
('Дмитрий Козлов', 'Функциональный тренинг', 5, 'Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.', 'assets/images/trainers/dmitry.jpg', 4.8, 2800),
('Анна Смирнова', 'Кардио и жиросжигание', 4, 'Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.', 'assets/images/trainers/anna.jpg', 4.7, 2200),
('Игорь Волков', 'Единоборства', 10, 'Мастер спорта по боксу. Обучает технике бокса и самообороне.', 'assets/images/trainers/igor.jpg', 4.9, 3500),
('Елена Новикова', 'Групповые программы', 7, 'Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.', 'assets/images/trainers/elena.jpg', 4.8, 2000);

-- Тренировки
INSERT INTO workouts (title, description, duration, difficulty, category, image_url, trainer_id) VALUES
('Силовая тренировка', 'Комплексная тренировка для развития силы и мышечной массы', 60, 'Средний', 'Силовые', 'assets/images/workouts/strength.jpg', 1),
('HIIT тренировка', 'Высокоинтенсивная интервальная тренировка для жиросжигания', 45, 'Высокий', 'Кардио', 'assets/images/workouts/hiit.jpg', 4),
('Йога для начинающих', 'Мягкая практика йоги для улучшения гибкости и расслабления', 75, 'Легкий', 'Йога', 'assets/images/workouts/yoga.jpg', 2),
('Функциональный тренинг', 'Тренировка движений, которые мы используем в повседневной жизни', 50, 'Средний', 'Функциональный', 'assets/images/workouts/functional.jpg', 3),
('Пилатес', 'Укрепление мышц кора и улучшение осанки', 55, 'Легкий', 'Пилатес', 'assets/images/workouts/pilates.jpg', 2),
('Бокс', 'Тренировка боксерских техник и кардио нагрузка', 60, 'Высокий', 'Единоборства', 'assets/images/workouts/boxing.jpg', 5);

-- Тестовый пользователь (пароль: test123)
INSERT INTO users (name, email, phone, membership_type, password) VALUES
('Тестовый Пользователь', 'test@example.com', '+7 (999) 123-45-67', 'Стандарт', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
