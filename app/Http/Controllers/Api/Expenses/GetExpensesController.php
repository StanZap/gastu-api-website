<?php

namespace App\Http\Controllers\Api\Expenses;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GetExpensesController extends Controller
{
    public function __invoke()
    {
        $filters = request()->all($this->validWhereFilters());
        $expenseList = auth()->user()
            ->expenses()
            ->getQuery()
            ->filter($filters)
            ->orderBy(
                request('orderBy', 'updated_at'),
                request('orderDirection', 'desc')
            )
            ->paginate(request('limit', 10));

        return response($expenseList, Response::HTTP_OK);
    }

    public function validWhereFilters()
    {
        return [
            'search',
            'amount',
            'amount>',
            'amount<',
            'currency',
            'description',
            'title',
            'when'
        ];
    }
}
