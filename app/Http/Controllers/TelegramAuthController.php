<?php

namespace App\Http\Controllers;

use Azate\LaravelTelegramLoginAuth\TelegramLoginAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TelegramAuthController extends Controller
{
    public function handleCallback(TelegramLoginAuth $telegramLoginAuth, Request $request)
    {

        try {
            // Log all incoming data for debugging
            Log::info('Telegram callback data:', $request->all());
            
            // Validate the Telegram data
            $telegramUser = $telegramLoginAuth->validate($request);
           
            if (!$telegramUser) {
                Log::warning('Invalid Telegram authentication data');
                return response()->json(['error' => 'Invalid Telegram authentication data'], 401);
            }
            
            // Log the validated user data
            Log::info('Validated Telegram user:', (array) $telegramUser);
            
            // Debug the structure of the Telegram user data
            Log::debug('Telegram user structure:', ['data' => $request->all()]);
            
            // Get the ID directly from the request data
            $telegramId = $request->input('id');
            if (!$telegramId) {
                throw new \Exception('Telegram user ID is missing in request data');
            }
            
            // Get username or use a fallback
            $username = $request->input('username', 'telegram');
            
            // Generate the email format for this Telegram user
            $email = "{$username}_{$telegramId}@telegram.local";
            
            // Log the email we're going to use
            Log::info('Generated email for Telegram user:', ['email' => $email]);
             
            // First try to find user by telegram_id
            $userByTelegramId = \App\Models\User::where('telegram_id', $telegramId)->first();
            
            if ($userByTelegramId) {
                Log::info('Found existing user by telegram_id', ['user_id' => $userByTelegramId->id]);
                // User already exists with this telegram_id, just generate token
                $token = $userByTelegramId->createToken('api-token')->plainTextToken;
                return \redirect()->away(\env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
            }
            
            // If not found by telegram_id, check by email
            $userByEmail = \App\Models\User::where('email', $email)->first();
            
            if ($userByEmail) {
                Log::info('Found existing user by email', ['user_id' => $userByEmail->id]);
                // Update the user with telegram_id if it doesn't have one
                if (!$userByEmail->telegram_id) {
                    $userByEmail->telegram_id = $telegramId;
                    $userByEmail->save();
                    Log::info('Updated existing user with telegram_id', ['user_id' => $userByEmail->id]);
                }
                
                // Generate token for the existing user
                $token = $userByEmail->createToken('api-token')->plainTextToken;
                return \redirect()->away(\env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
            }
            
            // If no user found, create a new one
            Log::info('Creating new user for Telegram login');
            $newUser = \App\Models\User::create([
                'telegram_id' => $telegramId,
                'name' => $request->input('first_name', 'Telegram User'),
                'email' => $email,
                'password' => \bcrypt(\Illuminate\Support\Str::random(24)),
            ]);
            
            Log::info('Created new user', ['user_id' => $newUser->id]);
            
            // Generate token and redirect
            $token = $newUser->createToken('api-token')->plainTextToken;
            return \redirect()->away(\env('FRONTEND_URL', 'http://localhost:3000') . '/auth/callback?token=' . $token);
        } catch (\Exception $e) {
            // Log the detailed error
            Log::error('Telegram authentication error: ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
            
            // Return a more detailed error response for debugging
            return response()->json([
                'error' => 'Authentication failed', 
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}
