<?php

namespace Database\Factories;

use App\Enums\CurrencyEnum;
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
        $currencies = array_values(CurrencyEnum::cases());
        $currencyOptions = array_map( fn($enumObj) => $enumObj->name, $currencies);
        $randCurrency = $currencyOptions[rand(0, count($currencyOptions) - 1)];
        $randomDate = now()->subMonth(rand(0, 2))->subDays(rand(0, 30));

        return [
            'amount' => rand(0, 1000) / 100,
            'currency' => $randCurrency,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'user_id' => User::factory(),
            'when' => $randomDate
        ];
    }
}
