<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class GetOneAccountController extends Controller
{
    public function __invoke(Account $account)
    {

        return new Response([
            'data' => $account,
        ], ResponseAlias::HTTP_OK);
    }
}
