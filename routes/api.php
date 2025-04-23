<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;


// Telegram login callback
Route::match(['GET', 'POST'], '/auth/telegram/callback', function (Request $request) {
    try {
        // Log the incoming request for debugging
        \Illuminate\Support\Facades\Log::info('Telegram callback received', ['data' => $request->all()]);
        
        $telegramUser = $request->all();
        
        // Validate required Telegram data
        if (!isset($telegramUser['id'])) {
            \Illuminate\Support\Facades\Log::error('Telegram callback missing ID', ['data' => $telegramUser]);
            return response()->json(['error' => 'Invalid Telegram data: missing ID'], 400);
        }
        
        // Create or find user
        $user = \App\Models\User::firstOrCreate(
            ['telegram_id' => $telegramUser['id']],
            [
                'name' => $telegramUser['first_name'] ?? $telegramUser['username'] ?? 'Telegram User',
                'email' => ($telegramUser['username'] ?? 'telegram')."_{$telegramUser['id']}@telegram.local",
                'password' => bcrypt(\Illuminate\Support\Str::random(24)),
            ]
        );
        
        // Create token (same as Google flow)
        $token = $user->createToken('api-token')->plainTextToken;
        
        // Redirect to frontend with token
        return redirect()->away(env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
    } catch (\Exception $e) {
        // Log any exceptions
        \Illuminate\Support\Facades\Log::error('Telegram login error', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'data' => $request->all()
        ]);
        
        return response()->json(['error' => 'Server error during Telegram login'], 500);
    }
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

Route::post('/register', [registerController::class, 'register']);
