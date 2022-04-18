<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GetExpensesController extends Controller
{
    public function __invoke()
    {
        $expensesList = auth()->user()->expenses()
            ->getQuery()
            ->filter($this->getFilters())
            ->paginate(request('limit'));

        return response($expensesList, Response::HTTP_OK);
    }

    public function getFilters()
    {
        return [
            'amount',
            'description',
            'title',
            'user_id',
            'when'
        ];
    }
}
