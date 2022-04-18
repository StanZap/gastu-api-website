<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class GetOneExpenseController extends Controller
{
    public function __invoke(Expense $expense)
    {
        return $expense;
    }
}
