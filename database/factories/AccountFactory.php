<?php

namespace Database\Factories;

use App\Enums\AccountTypeEnum;
use App\Enums\CurrencyEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'provider_name' => $this->faker->sentence(),
            'owner_type' => User::class,
            'owner_id' => User::factory(),
            'amount' => 100,
            'currency' => CurrencyEnum::random()->value,
            'type' => AccountTypeEnum::random()->value,
        ];
    }
}
