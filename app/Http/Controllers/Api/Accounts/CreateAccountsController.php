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
            'title' => ['sometimes', 'min:3'],
            'description' => ['sometimes', 'nullable', 'min:3'],
            'provider_name' => ['sometimes', 'min:1'],
            'amount' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['sometimes', new Enum(CurrencyEnum::class)],
            'type' => ['sometimes', new Enum(AccountTypeEnum::class)],
            'owner_id' => ['sometimes', 'exists:teams,id'],
        ]);

        $account = Account::create([
            ...$validated,
            'owner_type' => 'team',
        ]);

        return new Response([
            'data' => [
                'id' => $account->id
            ]
        ], Response::HTTP_CREATED);
    }
}
