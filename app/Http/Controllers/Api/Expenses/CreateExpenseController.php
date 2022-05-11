<?php

namespace App\Http\Controllers\Api\Expenses;

use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class CreateExpenseController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'min:0'],
            'title' => ['required', 'min:3'],
            'description' => ['nullable', 'min:3'],
            'when' => ['required'],
            'currency' => [new Enum(CurrencyEnum::class)]
        ]);

        $expense = auth()->user()->expenses()->create($validated);

        return response(
            ['data' => $expense],
            Response::HTTP_CREATED
        );
    }
}
