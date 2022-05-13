<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Book;

class DatabaseSeeder extends Seeder
{
 /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin')
        ]);

        User::create([
            'name' => 'User',
            'email' => 'user@test.com',
            'password' => Hash::make('user')
        ]);

        Book::create([
            'title' => 'Анна Каренина',
            'author' => 'Лев Николаевич Толстой',
            'availability' => true
        ]);

        Book::create([
            'title' => 'Сборник "Вечер"',
            'author' => 'Анна Андреевна Ахматова',
            'availability' => true
        ]);
    }
}
