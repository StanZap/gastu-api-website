<?php

namespace App\Http\Controllers\Api\Expenses;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Response;

class DeleteExpenseController extends Controller
{
    public function __invoke(Expense $expense)
    {
        $expense->delete();

        return response(
            ['message' => 'Deleted.'],
            Response::HTTP_OK
        );
    }
}
