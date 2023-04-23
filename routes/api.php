<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EchelonController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ReligionController;
use App\Http\Controllers\WorkUnitController;
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
    Route::get('/user', [AuthController::class, 'getDataUser']);

    Route::post('/employe', [EmployeController::class, 'store']);
    Route::get('/employe', [EmployeController::class, 'index']);
    Route::put('/employe/{id}', [EmployeController::class, 'update']);
    Route::get('/employe/{id}', [EmployeController::class, 'show']);
    Route::delete('/employe/{id}', [EmployeController::class, 'destroy']);
    Route::get('/echelons', [EchelonController::class, 'index']);
    Route::get('/groups', [GroupController::class, 'index']);
    Route::get('/positions', [PositionController::class, 'index']);
    Route::get('/religions', [ReligionController::class, 'index']);
    Route::get('/work_units', [WorkUnitController::class, 'index']);
});
