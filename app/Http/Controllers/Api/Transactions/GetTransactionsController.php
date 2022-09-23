<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetTransactionsController extends Controller
{
    public function __invoke(Request $request)
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
            ->paginate($request->get('limit', 10));

        return new Response($transactionItems, Response::HTTP_OK);
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
