<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
            'amount' => ['sometimes', 'numeric', 'min:1']
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
