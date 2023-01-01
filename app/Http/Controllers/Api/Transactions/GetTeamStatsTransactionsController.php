<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\TransactionTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetTeamStatsTransactionsController extends Controller
{
    public function __invoke(Request $request)
    {
        $allTeams = auth()
            ->user()
            ->allTeams();
        $personalTeamId = $allTeams->where("personal_team", true)->first()->id;
        $teamIds = $allTeams->where("personal_team", false)->pluck("id");

        $invertedType =
            $request->get("type") === TransactionTypeEnum::EXPENSE->value
                ? TransactionTypeEnum::INCOME->value
                : TransactionTypeEnum::EXPENSE->value;

        $query = DB::table("transactions as t")
            ->select(
                DB::raw("
                    t.id,
                    t.subject,
                    t.amount,
                    t.description,
                    t.when,
                    a.title as account_title,
                    a.provider_name as account_provider,
                    to.name as account_owner_team,
                    u.name as user_name,
                    t.currency,
                    tt.name as team_name,
                    CASE
                        WHEN t.type = 'expense' AND to.id != t.team_id THEN 'income'
                        WHEN t.type = 'income' AND to.id != t.team_id THEN 'expense'
                        ELSE t.type
                    END as type
                ")
            )
            ->join("accounts as a", function ($q) use ($request) {
                $q->on("a.id", "=", "t.account_id");
            })
            ->join("teams as to", function ($q) use ($request) {
                $q->on("a.owner_id", "=", "to.id")->where(
                    "a.owner_type",
                    "=",
                    "team"
                );
            })
            ->join("teams as tt", "t.team_id", "=", "tt.id")
            ->join("users as u", "t.user_id", "=", "u.id")
            ->where(function ($q) use ($invertedType, $request) {
                $q->whereRaw("to.id != t.team_id AND t.type = ?", [
                    $invertedType,
                ])->orWhereRaw("to.id = t.team_id AND t.type = ?", [
                    $request->get("type"),
                ]);
            })
            ->orderByDesc("t.when");

        if ($request->has("teamId")) {
            $query->where("t.team_id", $request->get("teamId"));
        }

        if ($request->has("accountOwnerId")) {
            $query
                ->where("a.owner_type", "=", "team")
                ->where("a.owner_id", $request->get("accountOwnerId"));
        }

        if ($request->has("currency")) {
            $query->where("t.currency", "=", $request->get("currency"));
        }

        if ($request->has("month")) {
            $query->whereMonth("t.when", +$request->get("month"));
        }

        if ($request->has("year")) {
            $query->whereYear("t.when", +$request->get("year"));
        }

        $transactionItems = $query
            //            ->filter($filters)
            //            ->orderBy(
            //                request("orderBy", "updated_at"),
            //                request("orderDirection", "desc")
            //            )
            //            ->paginate($request->get("limit", 30));
            ->get();

        return new Response(["data" => $transactionItems], Response::HTTP_OK);
    }
}
