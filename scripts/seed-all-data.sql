-- Insert admin user (password is hashed version of '132132132')
INSERT INTO users (name, email, phone, password, role, created_at, updated_at)
VALUES (
    'Администратор',
    'admin@fitness.com',
    '+7 (999) 000-00-00',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    NOW(),
    NOW()
);

-- Insert sample coaches with actual images
INSERT INTO coaches (name, specialization, description, experience_years, rating, price_per_hour, image_url, created_at, updated_at)
VALUES 
    ('Дмитрий Петров', 'Силовые тренировки', 'Опытный тренер по силовым тренировкам с 8-летним стажем. Мастер спорта по пауэрлифтингу, специализируется на наборе мышечной массы и увеличении силовых показателей.', 8, 4.9, 2500, '/images/trainers/dmitry.jpg', NOW(), NOW()),
    ('Елена Смирнова', 'Йога и пилатес', 'Сертифицированный инструктор по йоге и пилатесу. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.', 6, 4.8, 2000, '/images/trainers/elena.jpg', NOW(), NOW()),
    ('Игорь Волков', 'Кроссфит', 'Специалист по функциональным тренировкам и кроссфиту. Эксперт по функциональным движениям и профилактике травм.', 5, 4.7, 2200, '/images/trainers/igor.jpg', NOW(), NOW()),
    ('Мария Козлова', 'Фитнес и аэробика', 'Тренер групповых программ и персональных тренировок. Специалист по снижению веса и кардио тренировкам.', 7, 4.9, 1800, '/images/trainers/maria.jpg', NOW(), NOW()),
    ('Алексей Новиков', 'Единоборства', 'Мастер спорта по боксу. Обучает технике бокса и самообороне. 10 лет опыта в единоборствах.', 10, 4.8, 3000, '/images/trainers/dmitry.jpg', NOW(), NOW()),
    ('Анна Петрова', 'Персональные тренировки', 'Ведущий персональный тренер. Создает индивидуальные программы тренировок для достижения любых целей.', 9, 4.9, 2800, '/images/trainers/elena.jpg', NOW(), NOW());

-- Insert sample workouts with proper trainer references and actual images
INSERT INTO workouts (title, description, duration, difficulty, category, trainer_id, image_url, created_at, updated_at)
VALUES 
    ('Силовая тренировка', 'Комплексная тренировка для развития силы и мышечной массы. Включает базовые упражнения со свободными весами.', 60, 'Средний', 'Силовые', 1, '/images/workouts/strength.jpg', NOW(), NOW()),
    ('HIIT тренировка', 'Высокоинтенсивная интервальная тренировка для жиросжигания. Максимальный эффект за минимальное время.', 45, 'Высокий', 'Кардио', 3, '/images/workouts/hiit.jpg', NOW(), NOW()),
    ('Йога для начинающих', 'Мягкая практика йоги для новичков. Улучшение гибкости, баланса и внутренней гармонии.', 60, 'Легкий', 'Йога', 2, '/images/workouts/yoga.jpg', NOW(), NOW()),
    ('Функциональный тренинг', 'Тренировка функциональных движений, которые используются в повседневной жизни.', 50, 'Средний', 'Функциональный', 3, '/images/workouts/functional.jpg', NOW(), NOW()),
    ('Бокс для фитнеса', 'Кардио-тренировка с элементами бокса. Отличный способ снять стресс и улучшить координацию.', 55, 'Высокий', 'Бокс', 5, '/images/workouts/boxing.jpg', NOW(), NOW()),
    ('Пилатес', 'Укрепление мышц кора и улучшение осанки. Подходит для всех уровней подготовки.', 50, 'Легкий', 'Пилатес', 2, '/images/workouts/pilates.jpg', NOW(), NOW()),
    ('Персональная тренировка', 'Индивидуальная тренировка с персональным тренером. Программа составляется под ваши цели.', 60, 'Средний', 'Персональные', 6, '/images/workouts/strength.jpg', NOW(), NOW()),
    ('Кроссфит WOD', 'Workout of the Day - ежедневная тренировка кроссфит с разнообразными упражнениями.', 45, 'Высокий', 'Кроссфит', 3, '/images/workouts/functional.jpg', NOW(), NOW());

-- Insert a test user
INSERT INTO users (name, email, phone, password, role, created_at, updated_at)
VALUES (
    'Тестовый Пользователь',
    'test@example.com',
    '+7 (999) 123-45-67',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'user',
    NOW(),
    NOW()
);

-- Insert some sample bookings
INSERT INTO bookings (user_id, trainer_id, workout_id, booking_date, booking_time, status, created_at, updated_at)
VALUES 
    (2, 1, 1, CURRENT_DATE + INTERVAL '1 day', '10:00', 'pending', NOW(), NOW()),
    (2, 2, 3, CURRENT_DATE + INTERVAL '2 days', '14:00', 'confirmed', NOW(), NOW()),
    (2, 3, 2, CURRENT_DATE + INTERVAL '3 days', '16:00', 'pending', NOW(), NOW());

-- Insert some sample contact messages
INSERT INTO contact_messages (name, email, phone, message, status, created_at, updated_at)
VALUES 
    ('Иван Иванов', 'ivan@example.com', '+7 (999) 111-22-33', 'Здравствуйте! Хотел бы узнать подробнее о ваших тренировках по боксу.', 'new', NOW(), NOW()),
    ('Мария Петрова', 'maria@example.com', '+7 (999) 444-55-66', 'Интересуют групповые занятия йогой. Есть ли места в вечернее время?', 'read', NOW(), NOW()),
    ('Алексей Сидоров', 'alex@example.com', NULL, 'Подскажите, какие документы нужны для оформления абонемента?', 'new', NOW(), NOW());
