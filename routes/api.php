<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Telegram login callback
Route::match(['GET', 'POST'], '/auth/telegram/callback', function (Request $request) {
    $telegramUser = $request->all();
    // You may want to validate the Telegram data here
    $user = \App\Models\User::firstOrCreate(
        ['telegram_id' => $telegramUser['id']],
        [
            'name' => $telegramUser['first_name'] ?? 'Telegram User',
            'email' => ($telegramUser['username'] ?? 'telegram')."_{$telegramUser['id']}@telegram.local",
            'password' => bcrypt(\Illuminate\Support\Str::random(24)),
        ]
    );
    $token = $user->createToken('api-token')->plainTextToken;
    return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
});

// Google Socialite login
Route::get('/auth/google/redirect', function () {
    return \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->redirect();
});

Route::get('/auth/google/callback', function () {
    $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->user();
    $user = \App\Models\User::firstOrCreate(
        ['email' => $googleUser->getEmail()],
        [
    'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Google User',
    'password' => bcrypt(\Illuminate\Support\Str::random(24)),
]
    );
    $token = $user->createToken('api-token')->plainTextToken;
    return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
});

// Google Socialite login
Route::get('/auth/google/redirect', function () {
    return \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->redirect();
});

Route::get('/auth/google/callback', function () {
    $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->stateless()->user();
    $user = \App\Models\User::firstOrCreate(
        ['email' => $googleUser->getEmail()],
        [
    'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Google User',
    'password' => bcrypt(\Illuminate\Support\Str::random(24)),
]
    );
    $token = $user->createToken('api-token')->plainTextToken;
    return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
