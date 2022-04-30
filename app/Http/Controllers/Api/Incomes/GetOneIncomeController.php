<?php

namespace App\Http\Controllers\Api\Incomes;

use App\Http\Controllers\Controller;
use App\Models\Income;

class GetOneIncomeController extends Controller
{
    public function __invoke(Income $income)
    {
        return $income;
    }
}
