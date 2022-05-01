<?php

namespace App\Http\Controllers\Api\Incomes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GetIncomesController extends Controller
{
    public function __invoke()
    {
        $filters = request()->all($this->validWhereFilters());
        $incomeList = auth()->user()
            ->incomes()
            ->getQuery()
            ->filter($filters)
            ->orderBy(
                request('orderBy', 'updated_at'),
                request('orderDirection', 'desc')
            )
            ->paginate(request('limit', 10));

        return response($incomeList, Response::HTTP_OK);
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
