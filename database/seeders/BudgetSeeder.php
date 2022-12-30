<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\BudgetItem;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teamIds = Team::where("user_id", 1)
            ->get()
            ->pluck("id");

        Budget::whereIn("team_id", $teamIds)->delete(
            fn($budget) => $budget->items()->delete()
        );

        Budget::factory()
            ->has(BudgetItem::factory()->count(30), "items")
            ->count(5)
            ->create([
                "team_id" => $teamIds->random(),
            ]);
    }
}
