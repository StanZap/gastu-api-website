<?php

namespace Tests\Feature\Stats;

use App\Enums\TransactionTypeEnum;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GlobalStatsTest extends TestCase
{
    use DatabaseMigrations, DatabaseMigrations;

    public function addPrevMonthIncome($currency, $amount, $days)
    {
        $userId = Auth::id();
        Transaction::factory()->create(['type' => TransactionTypeEnum::INCOME, 'amount' => $amount, 'currency' => $currency, 'user_id' => $userId, 'when' => $this->prevMonth($days)]);

    }

    public function addCurrentMonthIncome($currency, $amount, $days)
    {
        $userId = Auth::id();
        Transaction::factory()->create(['type' => TransactionTypeEnum::INCOME, 'amount' => $amount, 'currency' => $currency, 'user_id' => $userId, 'when' => $this->currentMonth($days)]);
    }

    public function addPrevMonthExpense($currency, $amount, $days)
    {
        $userId = Auth::id();
        Transaction::factory()->create(['type' => TransactionTypeEnum::EXPENSE, 'amount' => $amount, 'currency' => $currency, 'user_id' => $userId, 'when' => $this->prevMonth($days)]);

    }

    public function addCurrentMonthExpense($currency, $amount, $days)
    {
        $userId = Auth::id();
        Transaction::factory()->create(['type' => TransactionTypeEnum::EXPENSE, 'amount' => $amount, 'currency' => $currency, 'user_id' => $userId, 'when' => $this->currentMonth($days)]);
    }

    public function currentMonth($days)
    {
        return now()->firstOfMonth()->addDays($days);
    }

    public function prevMonth($days)
    {
        return now()->firstOfMonth()->subMonth()->addDays($days);
    }

    public function test_stats_can_be_retrieved()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->withoutExceptionHandling();

        $this->addCurrentMonthExpense('DOP', 200, 5);
        $this->addCurrentMonthExpense('DOP', 300, 10);
        $this->addCurrentMonthExpense('DOP', 500, 15);
        $this->addCurrentMonthExpense('DOP', 600, 23);
        $this->addCurrentMonthExpense('DOP', 1000, 23);
        $this->addCurrentMonthExpense('USD', 500, 15);
        $this->addCurrentMonthExpense('USD', 600, 23);
        $this->addCurrentMonthExpense('USD', 1000, 23);

        $this->addPrevMonthExpense('DOP', 201, 3);
        $this->addPrevMonthExpense('DOP', 301, 7);
        $this->addPrevMonthExpense('DOP', 501, 10);
        $this->addPrevMonthExpense('DOP', 601, 15);
        $this->addPrevMonthExpense('DOP', 1001, 20);
        $this->addPrevMonthExpense('USD', 201, 3);
        $this->addPrevMonthExpense('USD', 501, 10);
        $this->addPrevMonthExpense('USD', 601, 15);
        $this->addPrevMonthExpense('USD', 1001, 20);

        $this->addCurrentMonthIncome('DOP', 200, 5);
        $this->addCurrentMonthIncome('DOP', 300, 10);
        $this->addCurrentMonthIncome('DOP', 500, 15);
        $this->addCurrentMonthIncome('DOP', 600, 23);
        $this->addCurrentMonthIncome('DOP', 1000, 23);
        $this->addCurrentMonthIncome('USD', 600, 23);
        $this->addCurrentMonthIncome('USD', 1000, 23);

        $this->addPrevMonthIncome('DOP', 201, 3);
        $this->addPrevMonthIncome('DOP', 301, 7);
        $this->addPrevMonthIncome('DOP', 501, 10);
        $this->addPrevMonthIncome('DOP', 601, 15);
        $this->addPrevMonthIncome('DOP', 1001, 20);
        $this->addPrevMonthIncome('USD', 301, 7);
        $this->addPrevMonthIncome('USD', 501, 10);
        $this->addPrevMonthIncome('USD', 601, 15);
        $this->addPrevMonthIncome('USD', 1001, 20);


        $response = $this->withoutExceptionHandling()
            ->call('GET',
                '/api/stats/global',
                [
                    'month' => now()->year . '-' . now()->month,
                ]
            );

        $expected = [
            'expenses' => [
                'current' => [
                    'DOP' => 2600,
                    'USD' => 2100
                ],
                'prev' => [
                    'DOP' => 2605,
                    'USD' => 2304
                ],
            ],
            'incomes' => [
                'current' => [
                    'DOP' => 2600,
                    'USD' => 1600
                ],
                'prev' => [
                    'DOP' => 2605,
                    'USD' => 2404
                ],
            ]
        ];
        $response->assertStatus(200);
        $this->assertEquals($expected, $response->json('data'));
    }
}
