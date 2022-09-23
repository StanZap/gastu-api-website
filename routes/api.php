<?php

use App\Http\Controllers\Api\Auth\GenerateTokenController;
use App\Http\Controllers\Api\Auth\RevokeTokenController;
use App\Http\Controllers\Api\Transactions\CreateTransactionController;
use App\Http\Controllers\Api\Transactions\DeleteTransactionController;
use App\Http\Controllers\Api\Transactions\GetTransactionsController;
use App\Http\Controllers\Api\Transactions\GetOneTransactionController;
use App\Http\Controllers\Api\Transactions\UpdateTransactionController;
use App\Http\Controllers\Api\GlobalStatsController;
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
    ->prefix('transactions')
    ->group(function () {
        Route::get('/{transaction}', GetOneTransactionController::class);
        Route::get('/', GetTransactionsController::class);
        Route::post('/', CreateTransactionController::class);
        Route::patch('/{transaction}', UpdateTransactionController::class);
        Route::delete('/{transaction}', DeleteTransactionController::class);
    });

Route::middleware('auth:sanctum')
    ->prefix('stats')
    ->group(function () {
        Route::get('/global', GlobalStatsController::class);
    });

Route::prefix('auth')
    ->group(function () {
        Route::post('create-token', GenerateTokenController::class);

        Route::middleware('auth:sanctum')
            ->post('revoke-token', RevokeTokenController::class);
    });

