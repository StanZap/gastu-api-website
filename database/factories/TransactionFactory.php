<?php

namespace Database\Factories;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionTypeEnum;
use App\Models\Account;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $currencies = array_values(CurrencyEnum::cases());
        $currencyOptions = array_map(
            fn($enumObj) => $enumObj->name,
            $currencies
        );
        $randCurrency = $currencyOptions[rand(0, count($currencyOptions) - 1)];
        $randomDate = now()
            ->subMonth(rand(0, 2))
            ->subDays(rand(0, 30));
        $type = TransactionTypeEnum::random()->value;

        $account = null;
        if (
            in_array($type, [
                TransactionTypeEnum::EXPENSE,
                TransactionTypeEnum::INCOME,
            ])
        ) {
            $account = Account::factory();
        }

        return [
            "amount" => rand(0, 1000) / 100,
            "currency" => $randCurrency,
            "subject" => $this->faker->sentence(),
            "description" => substr($this->faker->paragraph(), 0, 255),
            "user_id" => User::factory(),
            "when" => $randomDate,
            "type" => $type,
            "account_id" => $account,
            "team_id" => Team::factory(),
        ];
    }
}
