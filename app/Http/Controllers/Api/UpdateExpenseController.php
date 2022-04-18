<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UpdateExpenseController extends Controller
{

    public function __invoke(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'amount' => ['sometimes'],
            'title' => ['sometimes'],
            'description' => ['sometimes'],
            'when' => ['sometimes']
        ]);

        $expense->update($validated);

        return response(
            ['message' => 'Updated'],
            Response::HTTP_OK
        );
    }
}
