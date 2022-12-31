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
        $allTeas = auth()
            ->user()
            ->allTeams();
        $personalTeamId = $allTeas->where("personal_team", true)->first()->id;
        $teamIds = $allTeas->where("personal_team", false)->pluck("id");

        $now = now();
        $end = $now->endOfMonth();
        $start = $now
            ->clone()
            ->startOfMonth()
            ->addMonth()
            ->subYear();

        if (!$request->has("scope") || $request->get("scope") === "mine") {
            $query = DB::table("transactions as t")
                ->select(
                    DB::raw(
                        "sum(t.amount) as amount, t.currency, t.type, t.team_id, DATE_FORMAT(t.`when`,'%m-%Y') as month"
                    )
                )
                ->rightJoin("accounts as a", "t.account_id", "=", "a.id")
                ->rightJoin("teams as tm", function ($join) use (
                    $personalTeamId
                ) {
                    $join
                        ->on("a.owner_id", "=", "tm.id")
                        ->where("a.owner_type", "=", "team")
                        ->where("tm.personal_team", true)
                        ->where("tm.id", "=", $personalTeamId);
                })
                ->orderByDesc("month")
                ->orderBy("type")
                ->whereBetween("when", [$start, $end]);

            $monthlyStats = $query
                ->groupBy(["month", "type", "currency", "team_id"])
                ->get();

            $res = $monthlyStats->groupBy([
                "month",
                "type",
                fn($t) => $t->currency,
                "team_id",
            ]);
        } else {
            $query = DB::table("transactions as t")
                ->select(
                    DB::raw(
                        "sum(t.amount) as amount, t.currency, CASE WHEN t.type = 'expense' AND tm.id != t.team_id THEN 'income' WHEN t.type = 'income' AND tm.id != t.team_id THEN 'expense' ELSE t.type END as type, t.team_id, DATE_FORMAT(t.`when`,'%m-%Y') as month, (CASE WHEN tm.id = t.team_id THEN tm.name ELSE u.name END) as user"
                    )
                )
                ->rightJoin("accounts as a", "t.account_id", "=", "a.id")
                ->rightJoin("teams as tm", function ($join) {
                    $join
                        ->on("a.owner_id", "=", "tm.id")
                        ->where("a.owner_type", "=", "team");
                })
                ->rightJoin("users as u", "tm.user_id", "=", "u.id")
                ->orderByDesc("month")
                ->orderBy("type")
                ->whereBetween("when", [$start, $end])
                ->whereIn("t.team_id", $teamIds);

            //            if ($request->has("teamId")) {
            //                $query->where("team_id", $request->get("teamId"));
            //            }

            $monthlyStats = $query
                ->groupBy(["team_id", "month", "type", "currency", "user"])
                ->get();

            $res = $monthlyStats->groupBy([
                "month",
                "team_id",
                "type",
                fn($t) => $t->currency,
            ]);
        }

        return new Response(
            [
                "data" => $res,
            ],
            Response::HTTP_OK
        );
    }
}
