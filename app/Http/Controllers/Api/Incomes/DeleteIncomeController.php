<?php

namespace App\Http\Controllers\Api\Incomes;

use App\Http\Controllers\Controller;
use App\Models\Income;
use Illuminate\Http\Response;

class DeleteIncomeController extends Controller
{
    public function __invoke(Income $income)
    {
        $income->delete();

        return response(
            ['message' => 'Deleted.'],
            Response::HTTP_OK
        );
    }
}
