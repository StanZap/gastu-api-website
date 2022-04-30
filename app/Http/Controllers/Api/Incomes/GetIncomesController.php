<?php

namespace App\Http\Controllers\Api\Incomes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GetIncomesController extends Controller
{
    public function __invoke()
    {
        $incomeList = auth()->user()
            ->incomes()
            ->getQuery()
            ->filter($this->getFilters())
            ->orderBy(
                request('orderBy', 'updated_at'),
                request('orderDirection', 'desc')
            )
            ->paginate(request('limit', 400));

        return response($incomeList, Response::HTTP_OK);
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
