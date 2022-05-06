<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/book/add', [BookController::class, 'add']);
Route::get('/book/all', [BookController::class, 'all']);
Route::post('/book/delete/{id}', [BookController::class, 'delete']);
Route::post('/book/change_availabilty/{id}', [BookController::class, 'changeAvailabilty']);

Route::post('/token', function (Request $request) {

    $user = User::where('email', $request->email)->first();

    if($user == null){
        return null;
    }
    // Проверка пароля!
    if(Hash::check($request->password, $user->password)){
        $token = $user->createToken($request->device_name)->plainTextToken;
        $user->remember_token = $token;
        $user->save();
        return $token;
    }else{
        return null;
    }
});
