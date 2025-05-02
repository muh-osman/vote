<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

use App\Http\Controllers\Api\VoteController;
use App\Http\Controllers\Api\SeriesController;
use App\Http\Controllers\Api\MaleActorController;
use App\Http\Controllers\Api\FemaleActorController;



// Group for protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Return the authenticated user and his token (http://localhost:8000/api/user)
    Route::get('user', function (Request $request) {
        return [
            'user' => $request->user(),
            'currentToken' => $request->bearerToken()
        ];
    });

    // Logout Route (http://localhost:8000/api/logout)
    Route::post('/logout', [UserController::class, 'logout']);


    // Resend verification email (http://localhost:8000/api/resend-verify-email)
    Route::post('/resend-verify-email', [UserController::class, 'resendVerifyEmail']);



    // API route to add candidates  (http://localhost:8000/api/candidates) [name]
    Route::post('/series', [SeriesController::class, 'store']);
    Route::post('/male-actor', [MaleActorController::class, 'store']);
    Route::post('/female-actor', [FemaleActorController::class, 'store']);

    // API route to get votes Count for all candidates  (http://localhost:8000/api/candidates/votes)
    Route::get('/analytics', [VoteController::class, 'analyticsVotes']);
    // API route to get all voters detailes   (http://localhost:8000/api/voters)
    Route::get('/voters', [VoteController::class, 'getAllVoters']);
});


// Group for guest routes
Route::middleware('guest')->group(function () {
    // Register Route (http://localhost:8000/api/register)
    Route::post('/register', [UserController::class, 'register']);

    // Login Route (http://localhost:8000/api/login)
    Route::post('/login', [UserController::class, 'login']);

    // Email verification endpoint (http://localhost:8000/api/verify-email)
    Route::post('/verify-email', [UserController::class, 'verifyEmail'])->name('verification.verify');

    // Password Reset Route (http://localhost:8000/api/forgot-password)
    Route::post('/forgot-password', [UserController::class, 'forgotPassword'])->name('password.email');

    // API route for resetting the password (http://localhost:8000/api/reset-password)
    Route::post('/reset-password', [UserController::class, 'resetPassword'])->name('password.reset');





    // API route to vote  (http://localhost:8000/api/vote) [name, phone_number, vote, ip]
    Route::post('/vote', [VoteController::class, 'storeVote']);
});
