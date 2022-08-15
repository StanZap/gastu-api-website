<?php

namespace App\Http\Controllers\Api\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Response;

class DeleteTransactionController extends Controller
{
    public function __invoke(Transaction $transaction)
    {
        $transaction->delete();

        return response(
            ['message' => 'Deleted.'],
            Response::HTTP_OK
        );
    }
}
