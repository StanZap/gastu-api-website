<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'amount' => rand(0, 1000) / 100,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'user_id' => User::factory(),
            'when' => now()
        ];
    }
}
