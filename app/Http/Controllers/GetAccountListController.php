<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class GetAccountListController extends Controller
{
    public function __invoke(Request $request)
    {
        $teamIds = auth()->user()->allTeams()->pluck('id');
        $accountData = Account::with('owner')
            ->whereIn('owner_id', $teamIds)
            ->orderBy(
                $request->get('orderBy', 'updated_at'),
                $request->get('orderDirection', 'desc')
            )
            ->paginate();
        return $accountData;
    }
}
