<?php

namespace Database\Seeders;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionTypeEnum;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::find(1);
        // seed 100 transactions with when prop from month 1 to month 12 of this year and of type expense and income
        Transaction::factory(200)->create([
            "when" => fn() => now()
                ->subMonth(rand(1, 12))
                ->subDays(rand(0, 30)),
            "type" => fn() => [
                TransactionTypeEnum::INCOME,
                TransactionTypeEnum::EXPENSE,
            ][rand(0, 1)],
            "user_id" => fn() => $user->id,
            "team_id" => $user
                ->allTeams()
                ->get(rand(0, $user->allTeams()->count() - 1))->id,
        ]);
    }
}
