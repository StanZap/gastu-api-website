<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class GetMonthClosureStatsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request)
    {
        $teamId = $request->get("teamId");
        // Get total income transactions of the month, where team is $teamId grouped by user and currency.
        // Do not include expense transactions or teams

        $monthYear = Str::of($request->get("month"))
            ->split("/-/")
            ->toArray();

        $start = now()
            ->setMonth($monthYear[0])
            ->setYear($monthYear[1])
            ->startOfMonth();

        $end = $start->clone()->endOfMonth();

        $usersIncome = DB::table("transactions as t")
            ->selectRaw(
                "sum(t.amount) as amount, t.currency, u.name as user, tm.id as team_id"
            )
            ->join("accounts as a", function ($q) {
                $q->on("a.id", "=", "t.account_id")->where(
                    "a.owner_type",
                    "=",
                    "team"
                );
            })
            ->join("teams as tm", function ($q) {
                $q->on("tm.id", "=", "a.owner_id")
                    ->where("tm.personal_team", "=", true)
                    ->join("users as u", "u.id", "=", "tm.user_id");
            })
            ->where("t.type", "income")
            ->whereBetween("t.when", [$start, $end])
            ->groupBy("t.currency", "u.name", "tm.id")
            ->get();

        $ownerIds = $usersIncome->pluck("team_id")->toArray();
        $contributionPercentage = 50;

        $expectedContributions = $usersIncome->map(function ($item) use (
            $contributionPercentage
        ) {
            return [
                "amount" => $item->amount * $contributionPercentage,
                "currency" => $item->currency,
                "user" => $item->user,
                "team_id" => $item->team_id,
            ];
        });

        $usersExpenses = DB::table("transactions as t")
            ->selectRaw(
                "
               sum(
                    IF(t.alt_currency IS NOT NULL, t.alt_currency_conversion * t.amount, t.amount)
               ) AS amount,
               t.type,
               IF(t.alt_currency IS NOT NULL, t.alt_currency, t.currency) AS currency,
               a.owner_id AS team_id
            "
            )
            ->join("accounts as a", function ($q) use ($ownerIds) {
                $q->on("a.id", "=", "t.account_id")
                    ->where("a.owner_type", "=", "team")
                    ->whereIn("a.owner_id", $ownerIds);
            })
            ->where("t.team_id", $teamId)
            ->whereBetween("t.when", [$start, $end])
            ->groupBy("t.type", "currency", "a.owner_id")
            ->get()
            ->map(function ($item) use ($usersIncome) {
                return [
                    "amount" => $item->amount,
                    "currency" => $item->currency,
                    "team_id" => $item->team_id,
                    "user" => $usersIncome
                        ->where("team_id", $item->team_id)
                        ->first()->user,
                ];
            });

        return new Response(
            [
                "data" => [
                    "expected" => $expectedContributions,
                    "totalExpected" => $expectedContributions->sum("amount"),
                    "actual" => $usersExpenses,
                    "totalActual" => $usersExpenses->sum("amount"),
                ],
            ],
            ResponseAlias::HTTP_OK
        );
    }
}
