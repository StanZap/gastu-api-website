<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\TransactionTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetMyStatsTransactionsController extends Controller
{
    public function __invoke(Request $request)
    {
        $allTeams = auth()
            ->user()
            ->allTeams();
        $personalTeamId = $allTeams->where("personal_team", true)->first()->id;
        $teamIds = $allTeams->where("personal_team", false)->pluck("id");

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
                    t.type
                ")
            )
            ->join("accounts as a", function ($q) use ($request) {
                $q->on("a.id", "=", "t.account_id");
            })
            ->join("teams as to", function ($q) use (
                $request,
                $personalTeamId
            ) {
                $q->on("a.owner_id", "=", "to.id")
                    ->where("a.owner_type", "=", "team")
                    ->where("to.id", "=", $personalTeamId);
            })
            ->join("teams as tt", "t.team_id", "=", "tt.id")
            ->join("users as u", "t.user_id", "=", "u.id")
            ->orderByDesc("t.when");

        if ($request->has("teamId")) {
            $query->where("t.team_id", $request->get("teamId"));
        }

        if ($request->has("type")) {
            $query->where("t.type", $request->get("type"));
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
