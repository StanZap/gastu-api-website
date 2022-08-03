<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class GlobalStatsController extends Controller
{
    public function queryStats(Carbon $dt, $query)
    {
        $firstOfPrevMonth = $dt->clone()->firstOfMonth()->subMonth();
        $firstOfMonth = $dt->clone()->firstOfMonth();
        $firstOfNextMonth = $dt->clone()->firstOfMonth()->addMonth();
        $stats = $query
            ->selectRaw(DB::raw('sum(amount) as amount, currency, CASE WHEN `when` >= ? THEN "current" WHEN `when` < ? THEN "prev" END AS month'), [$firstOfMonth, $firstOfMonth])
            ->where('user_id', auth()->id())
            ->whereBetween('when', [$firstOfPrevMonth, $firstOfNextMonth])
            ->groupBy('currency', 'month')
            ->get();


        $map = $stats->groupBy(['month', 'currency'], false)
            ->map(function ($month) {
                return $month->map(function ($currency) {
                    return doubleval($currency[0]->amount);
                });
            })
            ->toArray();
        return $map;
    }

    public function __invoke(Request $request)
    {
        [$year, $month] = explode('-', $request->get('month'));
        $monthDate = Carbon::createFromDate($year, $month, 1, ) ?? now();
        $expenseStats = $this->queryStats($monthDate, DB::table('expenses'));
        $incomeStats = $this->queryStats($monthDate, DB::table('incomes'));

        return response([
            'data' => [
                'expenses' => $expenseStats,
                'incomes' => $incomeStats
            ]
        ]);


    }
}
