<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class UpdateTransactionController extends Controller
{
    public function __invoke(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            "currency" => ["sometimes", new Enum(CurrencyEnum::class)],
            "amount" => ["sometimes", "numeric", "min:0"],
            "subject" => ["sometimes", "min:3"],
            "description" => ["sometimes", "min:3"],
            "when" => ["sometimes", "date:Y-m-d"],
            "team_id" => ["sometimes", "exists:teams,id"],
            "account_id" => ["sometimes" => "exists:accounts,id"],
            "type" => ["sometimes", new Enum(TransactionTypeEnum::class)],
        ]);

        /** @var User $currentUser */
        $currentUser = auth()->user();

        if ($request->has("team_id")) {
            $team = Team::findOrFail($validated["team_id"]);
            abort_if(
                !$currentUser->belongsToTeam($team),
                Response::HTTP_FORBIDDEN
            );
        }

        if ($request->has("account_id")) {
            abort_if(
                $currentUser
                    ->teamAccounts()
                    ->where("id", $validated["account_id"])
                    ->count() === 0,
                Response::HTTP_FORBIDDEN
            );
        }

        $transaction->update($validated);

        return response(["message" => "Updated"], Response::HTTP_OK);
    }
}
