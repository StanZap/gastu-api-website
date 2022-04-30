<?php

namespace App\Http\Controllers\Api\Expenses;

use App\Http\Controllers\Controller;
use App\Models\Expense;

class GetOneExpenseController extends Controller
{
    public function __invoke(Expense $expense)
    {
        return $expense;
    }
}
