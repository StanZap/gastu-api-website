<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetTransactionsController extends Controller
{
    public function __invoke(Request $request)
    {
        $filters = request()->all($this->validWhereFilters());
        $teamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id");

        $query = Transaction::with([
            "fromAccount.owner" => fn($q) => $q->select(["id", "name"]),
            "toAccount.owner" => fn($q) => $q->select(["id", "name"]),
            "user" => fn($q) => $q->select(["name", "id"]),
            "team" => fn($q) => $q->select(["name", "id"]),
        ])->whereIn("team_id", $teamIds); // this is important for privacy/security reasons

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

        $transactionItems = $query
            ->filter($filters)
            ->orderBy(
                request("orderBy", "updated_at"),
                request("orderDirection", "desc")
            )
            ->paginate($request->get("limit", 10));

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
}
