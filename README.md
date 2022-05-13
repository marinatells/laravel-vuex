После клонирования проекта:

1. `composer update`
2. Копировать файл
    3. `cp .env.example .env` (MacOS/Linux)
    4. `copy .env.example .env` (Windows)
4. `php artisan key:generate`
5. создай новую БД, пропиши её настройки в файле `.env`
6. `php artisan migrate`
7. `php artisan db:seed`
8. `npm i`
9. `npm run dev`



После запусти эти команды в разных терминалах и надейся на лучшее)
1. `npm run hot`
2. `php artisan serve`
