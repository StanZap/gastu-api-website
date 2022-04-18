<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ExpensesTest extends TestCase
{
    use DatabaseMigrations;

    public function test_expense_can_be_created()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->post('/api/expenses', [
            'title' => 'title',
            'description' => 'description',
            'amount' => 100.00,
            'when' => now()
        ]);

        $response
            ->assertJsonStructure(['data'])
            ->assertStatus(201);
    }

    public function test_expenses_can_be_retrieved_by_owner()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Expense::factory(3)->create(['user_id' => $user->id]);

        $response = $this->get('/api/expenses');

        $response->assertJsonStructure([
            'data' => ['*' => ['id', 'amount', 'title', 'description', 'when']]
        ])
            ->assertStatus(200);

        $this->assertCount(3, $response->json('data'));
    }

    public function test_an_expense_can_be_updated()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $expense = Expense::factory()->create();

        $response = $this->patch('/api/expenses/' . $expense->id, [
            'title' => 'Updated title',
            'amount' => 999.00
        ]);

        $response->assertJsonStructure(['message'])
            ->assertStatus(200);

        $this->assertDatabaseHas('expenses', [
            'amount' => 999.00,
            'title' => 'Updated title'
        ]);
    }

    public function test_an_expense_can_be_deleted()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $expense = Expense::factory()->create(['user_id' => $user->id]);

        $this->delete('/api/expenses/' . $expense->id)
            ->assertStatus(200);

        $this->assertDatabaseMissing('expenses', ['id' => $expense->id]);
    }

    public function test_one_expense_can_be_retrieve()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $expense = Expense::factory()->create(['user_id' => $user->id]);

        $this->get('/api/expenses/' . $expense->id)
            ->assertJsonStructure([
                'id',
                'when',
                'title',
                'description',
                'created_at',
                'updated_at',
                'user_id'
            ])
            ->assertStatus(200);
    }
}
