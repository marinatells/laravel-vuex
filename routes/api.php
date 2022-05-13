<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


// для проверки токена и для получения юзера
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum']);


// создание токена по почте и паролю
// https://laravel.su/docs/8.x/sanctum#issuing-api-tokens
Route::post('/token', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if($user == null){
        return null;
    }
    // Проверка пароля!
    if(Hash::check($request->password, $user->password)) {
        if ($user->name == 'Admin') {
            $abilities = ['can-add', 'can-delete', 'can-edit'];
        } else {
            $abilities = ['can-edit'];
        }

        $token = $user->createToken($request->device_name, $abilities)->plainTextToken;
        $user->save();
        return $token;
    }else{
        return null;
    }
});



// создание токена по почте и паролю
Route::post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response('ok', 200);
})->middleware(['auth:sanctum']);

// Посмотреть список книг могут все пользователи
Route::get('/book/all', [BookController::class, 'all']);

// Добавить — только одмин
Route::post('/book/add', [BookController::class, 'add'])
    ->middleware(['auth:sanctum', 'abilities:can-add']);
// Удалить — только одмин
Route::post('/book/delete/{id}', [BookController::class, 'delete'])
    ->middleware(['auth:sanctum', 'abilities:can-delete']);

// Менятьдоступность — библиотекарь и одмин
Route::post('/book/change_availabilty/{id}', [BookController::class, 'changeAvailabilty'])
    ->middleware(['auth:sanctum', 'abilities:can-edit']);
