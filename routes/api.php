<?php

use App\Http\Controllers\Api\Expenses\GetOneExpenseController;
use App\Http\Controllers\Api\Expenses\GetExpensesController;
use App\Http\Controllers\Api\Expenses\CreateExpenseController;
use App\Http\Controllers\Api\Expenses\UpdateExpenseController;
use App\Http\Controllers\Api\Expenses\DeleteExpenseController;

use App\Http\Controllers\Api\Incomes\UpdateIncomeController;
use App\Http\Controllers\Api\Incomes\CreateIncomeController;
use App\Http\Controllers\Api\Incomes\DeleteIncomeController;
use App\Http\Controllers\Api\Incomes\GetIncomesController;
use App\Http\Controllers\Api\Incomes\GetOneIncomeController;
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
    ->prefix('expenses')
    ->group(function () {
        Route::get('/{expense}', GetOneExpenseController::class);
        Route::get('/', GetExpensesController::class);
        Route::post('/', CreateExpenseController::class);
        Route::patch('/{expense}', UpdateExpenseController::class);
        Route::delete('/{expense}', DeleteExpenseController::class);
    });

Route::middleware('auth:sanctum')
    ->prefix('incomes')
    ->group(function () {
        Route::get('/{income}', GetOneIncomeController::class);
        Route::get('/', GetIncomesController::class);
        Route::post('/', CreateIncomeController::class);
        Route::patch('/{income}', UpdateIncomeController::class);
        Route::delete('/{income}', DeleteIncomeController::class);
    });
