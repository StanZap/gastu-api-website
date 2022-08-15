<?php

namespace Tests\Feature;

use App\Enums\TransactionType;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use DatabaseMigrations;

    public function test_income_transaction_can_be_created()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this
            ->post('/api/transactions', [
                'title' => 'title',
                'description' => 'description',
                'amount' => 100.00,
                'currency' => 'DOP',
                'when' => now(),
                'type' => TransactionType::Income->value
            ]);

        $response
            ->assertJsonStructure(['data'])
            ->assertStatus(201);

        $this->assertCount(1, Transaction::where('type', TransactionType::Income)->get());
    }

    public function test_expense_transaction_can_be_created()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->post('/api/transactions', [
            'title' => 'title',
            'description' => 'description',
            'amount' => 100.00,
            'currency' => 'DOP',
            'when' => now(),
            'type' => TransactionType::Expense->value
        ]);

        $response
            ->assertJsonStructure(['data'])
            ->assertStatus(201);

        $this->assertCount(1, Transaction::where('type', TransactionType::Expense)->get());
    }


    public function test_any_transaction_can_be_retrieved_by_owner()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Transaction::factory(3)->create(['user_id' => $user->id, 'type' => TransactionType::Income]);

        $response = $this->get('/api/incomes')
            ->assertJsonStructure([
                'data' => ['*' => ['id', 'amount', 'currency', 'title', 'description', 'when']]
            ])
            ->assertStatus(200);

        $this->assertCount(3, $response->json('data'));
    }

    public function test_a_transaction_can_be_updated()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $income = Transaction::factory()->create(['type' => TransactionType::Income]);

        $update = [
            'title' => 'Updated title',
            'amount' => 999.00
        ];

        $response = $this->patch('/api/transactions/' . $income->id, $update);

        $response
            ->assertJsonStructure(['message'])
            ->assertStatus(200);

        $this->assertDatabaseHas('transactions', [
            ...$update,
            'type' => TransactionType::Income->value
        ])
            ->assertDatabaseCount('transactions', 1);
    }

    public function test_an_transaction_can_be_deleted()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $t = Transaction::factory()->create(['user_id' => $user->id]);

        $this->delete('/api/transactions/' . $t->id)
            ->assertStatus(200);

        $this->assertDatabaseMissing('transactions', ['id' => $t->id]);
    }

    public function test_one_transaction_can_be_retrieve()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $t = Transaction::factory()->create(['user_id' => $user->id]);

        $this->get('/api/transactions/' . $t->id)
            ->assertJsonStructure([
                'id',
                'when',
                'amount',
                'currency',
                'title',
                'description',
                'type',
                'created_at',
                'updated_at',
                'user_id'
            ])
            ->assertStatus(200);
    }
}
