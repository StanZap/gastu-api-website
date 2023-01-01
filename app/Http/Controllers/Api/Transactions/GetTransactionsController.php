<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetTransactionsController extends Controller
{
    public function __invoke(Request $request)
    {
        $teamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id");

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
            ->join("teams as to", function ($q) {
                $q->on("a.owner_id", "=", "to.id")->where(
                    "a.owner_type",
                    "=",
                    "team"
                );
            })
            ->join("teams as tt", "t.team_id", "=", "tt.id")
            ->join("users as u", "t.user_id", "=", "u.id")
            ->whereIn("team_id", $teamIds); // this is important for privacy/security reasons

        if ($request->has("scope") && $request->get("scope") === "mine") {
            $query->where("user_id", auth()->id());
        }

        if ($request->has("teamId")) {
            $query->where("team_id", $request->get("teamId"));
        }

        if ($request->has("currency")) {
            $query->where("currency", $request->get("currency"));
        }

        if ($request->has("month")) {
            $query->whereMonth("when", +$request->get("month"));
        }

        if ($request->has("year")) {
            $query->whereYear("when", +$request->get("year"));
        }

        $filters = request()->all($this->validWhereFilters());
        $this->filter($query, $filters);

        $transactionItems = $query
            ->orderBy(
                request("orderBy", "t.updated_at"),
                request("orderDirection", "desc")
            )
            ->paginate($request->get("limit", 30));

        return new Response($transactionItems, Response::HTTP_OK);
    }

    public function validWhereFilters()
    {
        return [
            "search",
            "amount",
            "amount>",
            "amount<",
            "currency",
            "description",
            "subject",
            "when",
            "type",
            "currency",
        ];
    }

    public function filter($query, array $filters)
    {
        if ($filters["search"] ?? false) {
            $regex = "%" . $filters["search"] . "%";
            $query->where(
                fn($q) => $q
                    ->where("t.subject", "like", $regex)
                    ->orWhere("t.description", "like", $regex)
            );
        }

        if ($filters["type"] ?? false) {
            $query->where("type", $filters["type"]);
        }

        $this->addFilter($query, $filters, "amount");
    }

    protected function addFilter($query, $filters, $filtrable)
    {
        if ($filters[$filtrable] ?? false) {
            $query->where($filtrable, "=", doubleval($filters[$filtrable]));
        } elseif ($filters[$filtrable . ">"] ?? false) {
            $query->where(
                $filtrable,
                ">=",
                doubleval($filters[$filtrable . ">"])
            );
        } elseif ($filters[$filtrable . "<"] ?? false) {
            $query->where(
                $filtrable,
                "<=",
                doubleval($filters[$filtrable . "<"])
            );
        }
    }
}
