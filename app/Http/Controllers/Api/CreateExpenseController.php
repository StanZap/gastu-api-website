<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CreateExpenseController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'min:0'],
            'title' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'when' => ['required']
        ]);

        $expense = Expense::create([
            ...$validated,
            "user_id" => auth()->id()
        ]);

        return response(
            ['data' => $expense],
            Response::HTTP_CREATED
        );
    }
}
