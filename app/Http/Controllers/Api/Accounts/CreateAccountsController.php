<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Enums\AccountTypeEnum;
use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class CreateAccountsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $validated = $request->validate([
            'title' => ['required', 'min:3'],
            'description' => ['nullable', 'min:3'],
            'provider_name' => ['required', 'min:1'],
            'amount' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['required', new Enum(CurrencyEnum::class)],
            'type' => ['required', new Enum(AccountTypeEnum::class)]
        ]);

        $account = Account::create([
            ...$validated,

            'amount' => 0.00,
            'owner_id' => auth()->id(),
            'owner_type' => User::class,
        ]);

        return new Response([
            'data' => [
                'id' => $account->id
            ]
        ], Response::HTTP_CREATED);
    }
}
