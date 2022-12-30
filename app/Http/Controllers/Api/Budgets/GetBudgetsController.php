<?php

namespace App\Http\Controllers\Api\Budgets;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetBudgetsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $teamIds = auth()
            ->user()
            ->allTeams()
            ->pluck("id");
        //        $budgets = Budget::with("items")
        //            ->whereIn("team_id", $teamIds)
        //            ->get()
        //            ->map(function ($budget) {
        //                $budget->incomeAmount = $budget
        //                    ->items()
        //                    ->sum("amount")
        //                    ->income()
        //                    ->groupBy("currency");
        //                $budget->expenseAmount = $budget
        //                    ->items()
        //                    ->sum("amount")
        //                    ->expense()
        //                    ->groupBy("currency");
        //                return $budget;
        //            });
        $budgets = Budget::query()
            //            ->where("MONTH(startdate)", "=", "MONTH(CURRENT_DATE))")
            ->with([
                "team",
                "items" => function ($query) {
                    // why is budget_id required here?
                    $query
                        ->select(
                            DB::raw(
                                "budget_id, sum(amount) as amount, type, currency"
                            )
                        )
                        ->groupBy("budget_id", "type", "currency"); // <--- This is the important part
                },
            ])
            //            ->whereIn("team_id", $teamIds)
            ->orderByDesc("startdate")
            ->get();

        return new Response(["data" => $budgets], Response::HTTP_OK);
    }
}
