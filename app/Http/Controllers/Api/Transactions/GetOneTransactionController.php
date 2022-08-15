<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;

class GetOneTransactionController extends Controller
{
    public function __invoke(Transaction $transaction)
    {
        return $transaction;
    }
}
