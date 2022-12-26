<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class GetOneTransactionController extends Controller
{
    public function __invoke(Transaction $transaction)
    {
        $trx = $transaction->load([
            "account.owner" => fn($q) => $q->select(["id", "name"]),
            "attachments",
            "team",
        ]);

        return new Response(
            [
                "data" => $trx,
            ],
            ResponseAlias::HTTP_OK
        );
    }
}
