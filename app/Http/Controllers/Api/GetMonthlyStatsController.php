<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetMonthlyStatsController extends Controller
{
    public function __invoke()
    {
        $myTeamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id");

        $start = now()->startOfYear();
        $end = $start->copy()->endOfYear();

        $monthlyStats = DB::table("transactions")
            ->select(
                DB::raw(
                    "sum(amount) as amount, currency, type, team_id, DATE_FORMAT(`when`,'%m-%Y') as month"
                )
            )
            ->orderByDesc("month")
            ->orderBy("type")
            ->whereBetween("when", [$start, $end])
            ->groupBy(["team_id", "month", "type", "currency"])
            ->whereIn("team_id", $myTeamIds)
            ->get();

        $res = $monthlyStats->groupBy([
            "month",
            "team_id",
            "type",
            fn($t) => $t->currency,
        ]);

        return new Response(
            [
                "data" => $res,
            ],
            Response::HTTP_OK
        );
    }
}
