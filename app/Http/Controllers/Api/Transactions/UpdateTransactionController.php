<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class UpdateTransactionController extends Controller
{

    public function __invoke(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'amount' => ['sometimes', 'min:0'],
            'currency'=> [new Enum(CurrencyEnum::class)],
            'title' => ['sometimes'],
            'description' => ['sometimes'],
            'when' => ['sometimes'],
        ]);

        $transaction->update($validated);

        return response(
            ['message' => 'Updated'],
            Response::HTTP_OK
        );
    }
}
