<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetAccountListController extends Controller
{
    public function __invoke(Request $request)
    {
        return auth()
            ->user()
            ->accounts()
            ->paginate();
    }
}
