<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class CreateTransactionController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'min:0'],
            'title' => ['required', 'min:3'],
            'description' => ['nullable', 'min:3'],
            'when' => ['required'],
            'currency' => [new Enum(CurrencyEnum::class)],
            'type' => [new Enum(TransactionType::class)]
        ]);

        $authUser = auth()->user();
        $transaction = $authUser->transactions()->create($validated);

        return response(
            ['data' => $transaction],
            Response::HTTP_CREATED
        );
    }
}
