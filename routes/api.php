<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;

// Telegram authentication callback using the TelegramAuthController
use App\Http\Controllers\TelegramAuthController;
Route::match(['GET', 'POST'], '/auth/telegram/callback', [TelegramAuthController::class, 'handleCallback']);

// Google Socialite login - redirect
Route::get('/auth/google/redirect', function () {
    return \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->redirect();
});

// Google Socialite login - callback
Route::get('/auth/google/callback', function () {
    $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->user();
    $user = \App\Models\User::firstOrCreate(
        ['email' => $googleUser->getEmail()],
        [
            'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Google User',
            'password' => \bcrypt(\Illuminate\Support\Str::random(24)),
        ]
    );
    $token = $user->createToken('api-token')->plainTextToken;
    return \redirect()->away(\env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
});

// Protected user route
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Registration route
Route::post('/register', [RegisterController::class, 'register']);
