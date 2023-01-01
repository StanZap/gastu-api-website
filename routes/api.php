<?php

use App\Http\Controllers\Api\AddAttachmentController;
use App\Http\Controllers\Api\Accounts\CreateAccountsController;
use App\Http\Controllers\Api\Accounts\UpdateAccountController;
use App\Http\Controllers\Api\Auth\GenerateTokenController;
use App\Http\Controllers\Api\Auth\RevokeTokenController;
use App\Http\Controllers\Api\Budgets\CreateBudgetsController;
use App\Http\Controllers\Api\Budgets\GetBudgetsController;
use App\Http\Controllers\Api\GetMonthlyStatsController;
use App\Http\Controllers\Api\Transactions\CreateTransactionController;
use App\Http\Controllers\Api\Transactions\DeleteTransactionController;
use App\Http\Controllers\Api\Transactions\GetMyStatsTransactionsController;
use App\Http\Controllers\Api\Transactions\GetTeamStatsTransactionsController;
use App\Http\Controllers\Api\Transactions\GetTransactionsController;
use App\Http\Controllers\Api\Transactions\GetOneTransactionController;
use App\Http\Controllers\Api\Transactions\UpdateTransactionController;
use App\Http\Controllers\Api\Accounts\GetOneAccountController;
use App\Http\Controllers\Api\GlobalStatsController;
use App\Http\Controllers\GetAccountListController;
use App\Http\Resources\ProfileResource;
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

Route::middleware("auth:sanctum")->get("/me/profile", function (
    Request $request
) {
    $userData = auth()
        ->user()
        ->load(["accounts"]);
    return new ProfileResource($userData);
});

Route::middleware("auth:sanctum")
    ->prefix("me/accounts")
    ->group(function () {
        Route::post("", CreateAccountsController::class);
        Route::get("", GetAccountListController::class);
        Route::get("{account}", GetOneAccountController::class);
        Route::patch("{account}", UpdateAccountController::class);
    });

Route::middleware("auth:sanctum")
    ->prefix("me/transactions")
    ->group(function () {
        Route::get("/{transaction}", GetOneTransactionController::class);
        Route::get("/", GetTransactionsController::class);
        Route::post("/", CreateTransactionController::class);
        Route::patch("/{transaction}", UpdateTransactionController::class);
        Route::delete("/{transaction}", DeleteTransactionController::class);
    });

Route::middleware("auth:sanctum")
    ->prefix("me/stats")
    ->group(function () {
        Route::get("/global", GlobalStatsController::class);
        Route::get("/monthly", GetMonthlyStatsController::class);
        Route::get("/my/transactions", GetMyStatsTransactionsController::class);
        Route::get(
            "/team/transactions",
            GetTeamStatsTransactionsController::class
        );
    });

Route::middleware("auth:sanctum")
    ->prefix("me/budgets")
    ->group(function () {
        Route::get("", GetBudgetsController::class);
        Route::post("", CreateBudgetsController::class);
    });

Route::prefix("auth")->group(function () {
    Route::post("create-token", GenerateTokenController::class);

    Route::middleware("auth:sanctum")->post(
        "revoke-token",
        RevokeTokenController::class
    );
});

Route::middleware("auth:sanctum")
    ->prefix("me/attachments")
    ->group(function () {
        Route::post("", AddAttachmentController::class);
    });
