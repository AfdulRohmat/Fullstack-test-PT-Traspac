<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// REGISTER NEW USER
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::post('/employe', [EmployeController::class, 'store']);
    Route::get('/employe', [EmployeController::class, 'index']);
    Route::put('/employe/{id}', [EmployeController::class, 'update']);
    Route::delete('/employe/{id}', [EmployeController::class, 'destroy']);
});
