<?php

namespace App\Http\Controllers\Api\Incomes;

use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class UpdateIncomeController extends Controller
{

    public function __invoke(Request $request, Income $income)
    {
        $validated = $request->validate([
            'amount' => ['sometimes', 'min:0'],
            'currency' => [new Enum(CurrencyEnum::class)],
            'title' => ['sometimes'],
            'description' => ['sometimes'],
            'when' => ['sometimes'],
        ]);

        $income->update($validated);

        return response(
            ['message' => 'Updated'],
            Response::HTTP_OK
        );
    }
}
