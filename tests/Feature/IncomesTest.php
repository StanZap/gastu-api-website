<?php

namespace Tests\Feature;

use App\Models\Income;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class IncomesTest extends TestCase
{
    use DatabaseMigrations;

    public function test_income_can_be_created()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->post('/api/incomes', [
            'title' => 'title',
            'description' => 'description',
            'amount' => 100.00,
            'currency' => 'DOP',
            'when' => now()
        ]);

        $response
            ->assertJsonStructure(['data'])
            ->assertStatus(201);
    }

    public function test_incomes_can_be_retrieved_by_owner()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Income::factory(3)->create(['user_id' => $user->id]);

        $response = $this->get('/api/incomes')
            ->assertJsonStructure([
                'data' => ['*' => ['id', 'amount', 'currency', 'title', 'description', 'when']]
            ])
            ->assertStatus(200);

        $this->assertCount(3, $response->json('data'));
    }

    public function test_an_expense_can_be_updated()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $income = Income::factory()->create();

        $update = [
            'title' => 'Updated title',
            'amount' => 999.00
        ];

        $response = $this->patch('/api/incomes/' . $income->id, $update);

        $response
            ->assertJsonStructure(['message'])
            ->assertStatus(200);

        $this->assertDatabaseHas('incomes', $update)
            ->assertDatabaseCount('incomes', 1);
    }

    public function test_an_incomes_can_be_deleted()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $income = Income::factory()->create(['user_id' => $user->id]);

        $this->delete('/api/incomes/' . $income->id)
            ->assertStatus(200);

        $this->assertDatabaseMissing('incomes', ['id' => $income->id]);
    }

    public function test_one_income_can_be_retrieve()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $income = Income::factory()->create(['user_id' => $user->id]);

        $this->get('/api/incomes/' . $income->id)
            ->assertJsonStructure([
                'id',
                'when',
                'amount',
                'currency',
                'title',
                'description',
                'created_at',
                'updated_at',
                'user_id'
            ])
            ->assertStatus(200);
    }
}
