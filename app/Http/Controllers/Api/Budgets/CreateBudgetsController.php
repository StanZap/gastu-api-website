<?php

namespace App\Http\Controllers\Api\Budgets;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CreateBudgetsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // handle budget validation and creation

        $validated = $request->validate([
            "team_id" => "required|exists:teams,id",
            "startdate" => "required|date",
            "items" => "sometimes|array",
            "items.*.subject" => "required|string",
            "items.*.description" => "required|string",
            "items.*.amount" => "required|numeric",
            "items.*.type" => "required|in:income,expense",
        ]);

        $budget = Budget::create($validated);

        if (isset($validated["items"])) {
            $budget->items()->createMany($validated["items"]);
        }

        $budget->load(["team", "items"]);

        return new Response([
            "data" => $budget,
            Response::HTTP_CREATED,
        ]);
    }
}
