<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GetTransactionsController extends Controller
{
    public function __invoke()
    {
        $filters = request()->all($this->validWhereFilters());
        $transactionItems = auth()->user()
            ->transactions()
            ->getQuery()
            ->filter($filters)
            ->orderBy(
                request('orderBy', 'updated_at'),
                request('orderDirection', 'desc')
            )
            ->paginate(request('limit', 10));

        return response($transactionItems, Response::HTTP_OK);
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
            'when',
            'type'
        ];
    }
}
