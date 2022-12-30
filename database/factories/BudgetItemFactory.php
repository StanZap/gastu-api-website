<?php

namespace Database\Factories;

use App\Models\Budget;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BudgetItem>
 */
class BudgetItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "subject" => $this->faker->sentence(),
            "amount" => $this->faker->randomFloat(2, 0, 1000),
            // currency one of "EUR", "USD", "DOP"
            "currency" => $this->faker->randomElement(["EUR", "USD", "DOP"]),
            "budget_id" => Budget::factory(),
            "type" => $this->faker->randomElement(["income", "expense"]),
            "description" => $this->faker->sentence(),
            "team_id" => Team::factory(),
        ];
    }
}
