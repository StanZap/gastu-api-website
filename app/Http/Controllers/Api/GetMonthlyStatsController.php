<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetMonthlyStatsController extends Controller
{
    public function __invoke(Request $request)
    {
        $myTeamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id");

        $start = now()->startOfYear();
        $end = $start->copy()->endOfYear();

        $query = DB::table("transactions")
            ->select(
                DB::raw(
                    "sum(amount) as amount, currency, type, team_id, DATE_FORMAT(`when`,'%m-%Y') as month"
                )
            )
            ->orderByDesc("month")
            ->orderBy("type")
            ->whereBetween("when", [$start, $end])
            ->whereIn("team_id", $myTeamIds);

        if ($request->has("mode") && $request->get("mode") === "mine") {
            $query->where("user_id", auth()->id());
        }

        $monthlyStats = $query
            ->groupBy(["team_id", "month", "type", "currency"])
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
