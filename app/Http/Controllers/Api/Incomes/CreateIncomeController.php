<?php

namespace App\Http\Controllers\Api\Incomes;

use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class CreateIncomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'min:0'],
            'title' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'when' => ['required'],
            'currency' => [new Enum(CurrencyEnum::class)]
        ]);

        $incomes = Income::create([
            ...$validated,
            "user_id" => auth()->id()
        ]);

        return response(
            ['data' => $incomes],
            Response::HTTP_CREATED
        );
    }
}
