<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class CreateTransactionController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            "amount" => ["required", "numeric", "min:0"],
            "subject" => ["required", "min:3"],
            "description" => ["nullable", "min:3"],
            "when" => ["required", "date"],
            "currency" => ["required", new Enum(CurrencyEnum::class)],
            "type" => ["required", new Enum(TransactionTypeEnum::class)],
            "account_id" => ["required", "exists:accounts,id"],
            "team_id" => ["required", "exists:teams,id"],
        ]);

        $authUser = auth()->user();

        // validate user belongs to provide team
        //        if($validated['team_id'] ?? false) {
        ////            abort_if(!$authUser->belongsToTeam($validated['team_id']), Response::HTTP_FORBIDDEN);
        //        }

        $teamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id")
            ->toArray();

        $account = Account::where("id", $validated["account_id"])
            ->whereIn("owner_id", $teamIds)
            ->first();

        if ($account) {
            $transaction = $authUser->transactions()->create($validated);

            return response(["data" => $transaction], Response::HTTP_CREATED);
        }

        return new Response(
            [
                "error" => [
                    "message" => "Invalid request",
                ],
            ],
            Response::HTTP_BAD_REQUEST
        );
    }
}
