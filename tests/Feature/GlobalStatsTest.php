<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\Income;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GlobalStatsTest extends TestCase
{
    use DatabaseMigrations, DatabaseMigrations;

    public function addDopPrevMonthIncome($amount, $days)
    {
        $userId = Auth::id();
        Income::factory()->create(['amount' => $amount, 'currency' => 'DOP', 'user_id' => $userId, 'when' => $this->prevMonth($days)]);

    }

    public function addDopCurrentMonthIncome($amount, $days)
    {
        $userId = Auth::id();
        Income::factory()->create(['amount' => $amount, 'currency' => 'DOP', 'user_id' => $userId, 'when' => $this->currentMonth($days)]);
    }

    public function addPrevMonthExpense($currency, $amount, $days)
    {
        $userId = Auth::id();
        Expense::factory()->create(['amount' => $amount, 'currency' => $currency, 'user_id' => $userId, 'when' => $this->prevMonth($days)]);

    }

    public function addCurrentMonthExpense($currency, $amount, $days)
    {
        $userId = Auth::id();
        Expense::factory()->create(['amount' => $amount, 'currency' => 'DOP', 'user_id' => $userId, 'when' => $this->currentMonth($days)]);
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

        $this->addDopCurrentMonthIncome(200, 5);
        $this->addDopCurrentMonthIncome(300, 10);
        $this->addDopCurrentMonthIncome(500, 15);
        $this->addDopCurrentMonthIncome(600, 23);
        $this->addDopCurrentMonthIncome(1000, 23);

        $this->addDopPrevMonthIncome(201, 3);
        $this->addDopPrevMonthIncome(301, 7);
        $this->addDopPrevMonthIncome(501, 10);
        $this->addDopPrevMonthIncome(601, 15);
        $this->addDopPrevMonthIncome(1001, 20);


        $response = $this->withoutExceptionHandling()
            ->get('/api/stats/global');

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
                    'DOP' => 2600
                ],
                'prev' => [
                    'DOP' => 2605
                ],
            ]
        ];
        $response->assertStatus(200);
        $this->assertEquals($expected, $response->json('data'));
    }
}
