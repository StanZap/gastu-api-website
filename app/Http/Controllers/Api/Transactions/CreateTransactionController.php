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
            'amount' => ['required', 'numeric', 'min:0'],
            'subject' => ['required', 'min:3'],
            'description' => ['nullable', 'min:3'],
            'when' => ['required'],
            'currency' => ['required', new Enum(CurrencyEnum::class)],
            'type' => ['required', new Enum(TransactionTypeEnum::class)],
            'from_account_id' => [
                Rule::requiredIf(fn() => in_array($request->type, [
                    TransactionTypeEnum::EXPENSE,
                    TransactionTypeEnum::TRANSFER
                ])),
                'exists:accounts,id'
            ],
            'to_account_id' => [
                Rule::requiredIf(fn() => in_array($request->type, [
                    TransactionTypeEnum::INCOME,
                    TransactionTypeEnum::TRANSFER
                ])),
                'exists:accounts,id'
            ],
        ]);

        $authUser = auth()->user();

        if($validated['type'] === TransactionTypeEnum::INCOME->value) {
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
        } else if ($validated['type'] === TransactionTypeEnum::EXPENSE->value) {
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
        } else if ($validated['type'] === TransactionTypeEnum::TRANSFER->value) {
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
