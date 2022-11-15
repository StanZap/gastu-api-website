<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionType;
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
            'amount' => ['required', 'numeric', 'min:0'],
            'title' => ['required', 'min:3'],
            'description' => ['nullable', 'min:3'],
            'when' => ['required'],
            'currency' => [new Enum(CurrencyEnum::class)],
            'type' => [new Enum(TransactionType::class)],
            'from_account_id' => [
                Rule::requiredIf(fn() => in_array($request->type, [
                    TransactionType::Expense,
                    TransactionType::Transfer
                ])),
                'exists:accounts,id'
            ],
            'to_account_id' => [
                Rule::requiredIf(fn() => in_array($request->type, [
                    TransactionType::Income,
                    TransactionType::Transfer
                ])),
                'exists:accounts,id'
            ],
        ]);

        $authUser = auth()->user();

        if($validated['type'] === TransactionType::Income->value) {
            $account = Account::where('id', $validated['to_account_id'])->first();
            if($account) {
               $account->amount = $account->amount + $validated['amount'];
               $account->save();
               $transaction = $authUser->transactions()->create($validated);

                return response(
                    ['data' => $transaction],
                    Response::HTTP_CREATED
                );
            }
        } else if ($validated['type'] === TransactionType::Expense->value) {
            $account = Account::where('id', $validated['from_account_id'])->first();
            if($account) {
                $account->amount = $account->amount - $validated['amount'];
                $account->save();
                $transaction = $authUser->transactions()->create($validated);

                return response(
                    ['data' => $transaction],
                    Response::HTTP_CREATED
                );
            }
        } else if ($validated['type'] === TransactionType::Transfer->value) {
            $fromAccount = Account::where('id', $validated['from_account_id'])->first();
            $toAccount = Account::where('id', $validated['to_account_id'])->first();
            if ($fromAccount && $toAccount) {
                $fromAccount->amount = $fromAccount->amount - $validated['amount'];
                $toAccount->amount = $toAccount->amount + $validated['amount'];
                $fromAccount->save();
                $toAccount->save();
                $transaction = $authUser->transactions()->create($validated);

                return response(
                    ['data' => $transaction],
                    Response::HTTP_CREATED
                );
            }
        }

        return new Response([
            "error" => [
                "message" => "Invalid request",
            ]
        ], Response::HTTP_BAD_REQUEST);
    }
}
