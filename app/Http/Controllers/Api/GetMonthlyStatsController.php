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

        $query = DB::table("transactions as t")
            ->select(
                DB::raw(
                    "sum(t.amount) as amount, t.currency, t.type, t.team_id, DATE_FORMAT(t.`when`,'%m-%Y') as month, u.name as user"
                )
            )
            ->rightJoin("accounts as a", "t.account_id", "=", "a.id")
            ->rightJoin("teams as tm", function ($join) {
                $join
                    ->on("a.owner_id", "=", "tm.id")
                    ->where("a.owner_type", "=", "team")
                    ->where("tm.personal_team", true);
            })
            ->rightJoin("users as u", "tm.user_id", "=", "u.id")
            ->orderByDesc("month")
            ->orderBy("type")
            ->whereBetween("when", [$start, $end])
            ->whereIn("team_id", $myTeamIds);

        $monthlyStats = $query
            ->groupBy(["team_id", "month", "type", "currency", "user"])
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
