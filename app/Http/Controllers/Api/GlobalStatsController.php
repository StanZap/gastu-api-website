<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GlobalStatsController extends Controller
{
    public function queryStats($query)
    {
        $firstOfPrevMonth = now()->firstOfMonth()->subMonth();
        $firstOfMonth = now()->firstOfMonth();
        $stats = $query
            ->selectRaw(DB::raw('sum("amount") as amount, currency, CASE WHEN `when` >= ? THEN "current" WHEN `when` < ? THEN "prev" END AS month'), [$firstOfMonth, $firstOfMonth])
            ->where('user_id', auth()->id())
            ->where('when', '>=', $firstOfPrevMonth)
            ->groupBy('currency', 'month')
            ->get();


        $map = $stats->groupBy(['month', 'currency'], false)
            ->map(function ($month) {
                return $month->map(function ($currency) {
                    return $currency[0]->amount;
                });
            })
            ->toArray();
        return $map;
    }

    public function __invoke()
    {
        $expenseStats = $this->queryStats(DB::table('expenses'));
        $incomeStats = $this->queryStats(DB::table('incomes'));

        return response([
            'data' => [
                'expenses' => $expenseStats,
                'incomes' => $incomeStats
            ]
        ]);


    }
}
