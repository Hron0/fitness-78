-- Обновляем пути к изображениям тренеров
UPDATE trainers SET image_url = 'assets/images/trainers/alexey.jpg' WHERE id = 1;
UPDATE trainers SET image_url = 'assets/images/trainers/maria.jpg' WHERE id = 2;
UPDATE trainers SET image_url = 'assets/images/trainers/dmitry.jpg' WHERE id = 3;
UPDATE trainers SET image_url = 'assets/images/trainers/anna.jpg' WHERE id = 4;
UPDATE trainers SET image_url = 'assets/images/trainers/igor.jpg' WHERE id = 5;
UPDATE trainers SET image_url = 'assets/images/trainers/elena.jpg' WHERE id = 6;

-- Обновляем пути к изображениям тренировок
UPDATE workouts SET image_url = 'assets/images/workouts/strength.jpg' WHERE id = 1;
UPDATE workouts SET image_url = 'assets/images/workouts/hiit.jpg' WHERE id = 2;
UPDATE workouts SET image_url = 'assets/images/workouts/yoga.jpg' WHERE id = 3;
UPDATE workouts SET image_url = 'assets/images/workouts/functional.jpg' WHERE id = 4;
UPDATE workouts SET image_url = 'assets/images/workouts/pilates.jpg' WHERE id = 5;
UPDATE workouts SET image_url = 'assets/images/workouts/boxing.jpg' WHERE id = 6;
