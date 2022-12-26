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
            "when" => ["required"],
            "currency" => ["required", new Enum(CurrencyEnum::class)],
            "type" => ["required", new Enum(TransactionTypeEnum::class)],
            "from_account_id" => [
                Rule::requiredIf(
                    fn() => $request->type === TransactionTypeEnum::EXPENSE,
                    "exists:accounts,id"
                ),
            ],
            "to_account_id" => [
                Rule::requiredIf(
                    fn() => $request->type === TransactionTypeEnum::INCOME,
                    "exists:accounts,id"
                ),
            ],
            "team_id" => ["required", "exists:teams,id"],
        ]);

        $authUser = auth()->user();

        // validate user belongs to provide team
        //        if($validated['team_id'] ?? false) {
        ////            abort_if(!$authUser->belongsToTeam($validated['team_id']), Response::HTTP_FORBIDDEN);
        //        }

        $fromAccount = null;
        $toAccount = null;
        $teamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id")
            ->toArray();
        if (array_key_exists("from_account_id", $validated)) {
            $fromAccount = Account::where("id", $validated["from_account_id"])
                ->whereIn("owner_id", $teamIds)
                ->first();
        }

        if (array_key_exists("to_account_id", $validated)) {
            $toAccount = Account::where("id", $validated["to_account_id"])
                ->whereIn("owner_id", $teamIds)
                ->first();
        }

        if ($validated["type"] === TransactionTypeEnum::INCOME->value) {
            if ($toAccount) {
                $toAccount->amount = $toAccount->amount + $validated["amount"];
                $toAccount->save();
                $transaction = $authUser->transactions()->create($validated);

                return response(
                    ["data" => $transaction],
                    Response::HTTP_CREATED
                );
            }
        } elseif ($validated["type"] === TransactionTypeEnum::EXPENSE->value) {
            if ($fromAccount) {
                $fromAccount->amount =
                    $fromAccount->amount - $validated["amount"];
                $fromAccount->save();
                $transaction = $authUser->transactions()->create($validated);

                return response(
                    ["data" => $transaction],
                    Response::HTTP_CREATED
                );
            }
        } elseif ($validated["type"] === TransactionTypeEnum::TRANSFER->value) {
            if ($fromAccount && $toAccount) {
                $fromAccount->amount =
                    $fromAccount->amount - $validated["amount"];
                $toAccount->amount = $toAccount->amount + $validated["amount"];
                $fromAccount->save();
                $toAccount->save();
                $transaction = $authUser->transactions()->create($validated);

                return response(
                    ["data" => $transaction],
                    Response::HTTP_CREATED
                );
            }
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
