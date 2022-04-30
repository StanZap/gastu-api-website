<?php

namespace App\Http\Controllers\Api;

use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class UpdateExpenseController extends Controller
{

    public function __invoke(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'amount' => ['sometimes', 'min:0'],
            'title' => ['sometimes'],
            'description' => ['sometimes'],
            'when' => ['sometimes'],
            'currency'=>[new Enum(CurrencyEnum::class)]
        ]);

        $expense->update($validated);

        return response(
            ['message' => 'Updated'],
            Response::HTTP_OK
        );
    }
}
