<?php

use App\Http\Controllers\Api\CreateExpenseController;
use App\Http\Controllers\Api\DeleteExpenseController;
use App\Http\Controllers\Api\GetExpensesController;
use App\Http\Controllers\Api\GetOneExpenseController;
use App\Http\Controllers\Api\UpdateExpenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')
    ->get('/user', function (Request $request) {
        return $request->user();
    });

Route::middleware('auth:sanctum')
    ->group(function () {
        Route::get('/expenses', GetExpensesController::class);
        Route::get('/expenses/{expense}', GetOneExpenseController::class);
        Route::post('/expenses', CreateExpenseController::class);
        Route::patch('/expenses/{expense}', UpdateExpenseController::class);
        Route::delete('/expenses/{expense}', DeleteExpenseController::class);
    });
