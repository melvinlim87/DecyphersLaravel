<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TelegramAuthController;

Route::match(['GET', 'POST'], '/auth/telegram/callback', [TelegramAuthController::class, 'handleCallback']);

use App\Http\Controllers\Auth\GoogleAuthController;

// Google Socialite login - redirect
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect']);

// Google Socialite login - callback
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

// Protected user route
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Registration route
Route::post('/register', [RegisterController::class, 'register']);

// Login route
Route::post('/login', [\App\Http\Controllers\Api\LoginController::class, 'login']);

// Logout route - protected by auth:sanctum middleware
Route::middleware(['auth:sanctum'])->post('/logout', [\App\Http\Controllers\Api\LoginController::class, 'logout']);
