<?php

namespace App\Http\Controllers\Api\Expenses;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GetExpensesController extends Controller
{
    public function __invoke()
    {
        $expensesList = auth()->user()
            ->expenses()
            ->getQuery()
            ->filter($this->getFilters())
            ->orderBy(
                request('orderBy', 'updated_at'),
                request('orderDirection', 'desc')
            )
            ->paginate(request('limit', 400));

        return response($expensesList, Response::HTTP_OK);
    }

    public function getFilters()
    {
        return [
            'amount',
            'currency',
            'description',
            'title',
            'user_id',
            'when'
        ];
    }
}
