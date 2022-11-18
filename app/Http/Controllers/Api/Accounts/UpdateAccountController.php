<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Enums\AccountTypeEnum;
use App\Enums\CurrencyEnum;
use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;

class UpdateAccountController extends Controller
{

    public function __invoke(Request $request, Account $account)
    {
        $validated = $request->validate([
            'title' => ['required', 'min:3'],
            'description' => ['nullable', 'min:3'],
            'provider_name' => ['required', 'min:1'],
            'amount' => ['sometimes', 'numeric', 'min:0'],
            'currency' => ['required', new Enum(CurrencyEnum::class)],
            'type' => ['required', new Enum(AccountTypeEnum::class)],
            'owner_id' => ['required', 'exists:teams,id'],
        ]);

        $account->update($validated);

        return response(
            ['message' => 'Updated'],
            Response::HTTP_OK
        );
    }
}
