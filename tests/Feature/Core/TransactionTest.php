<?php

namespace Tests\Feature\Core;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionTypeEnum;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use function Pest\Laravel\post;
use function Pest\Laravel\withoutExceptionHandling;
use function PHPUnit\Framework\assertCount;

uses(DatabaseMigrations::class);
uses(RefreshDatabase::class);

beforeEach(function () {
   withoutExceptionHandling();
});


test("a user can make an income transaction", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $toAccount = Account::factory()->create([
        'owner_id' => $user->id,
        'amount' => 500,
    ]);

    $resp = post('/api/me/transactions', [
        'subject' => 'subject',
        'description' => 'description',
        'amount' => 100.00,
        'currency' => $toAccount->currency,
        'when' => now(),
        'type' => TransactionTypeEnum::INCOME->value,
        'to_account_id' => $toAccount->id
    ])
        ->assertJsonStructure(['data'])
        ->assertStatus(201);

    $newTransaction = Transaction::where('type', TransactionTypeEnum::INCOME)->first();
    $this->assertEquals($resp['data']['id'], $newTransaction->id);

    $toAccount->refresh();
    $this->assertEquals($toAccount->amount, 600);
})
    ->group("core");

test("a user can make an expense transaction", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $fromAccount = Account::factory()->create([
        'owner_id' => $user->id,
        'amount' => 800
    ]);

    $resp = post('/api/me/transactions', [
        'subject' => 'subject',
        'description' => 'description',
        'amount' => 200.00,
        'currency' => $fromAccount->currency,
        'when' => now(),
        'type' => TransactionTypeEnum::EXPENSE->value,
        'from_account_id' => $fromAccount->id,
    ])
        ->assertJsonStructure(['data'])
        ->assertStatus(201);

    $newTransaction = Transaction::where('type', TransactionTypeEnum::EXPENSE)->first();
    $this->assertEquals($resp['data']['id'], $newTransaction->id);

    $fromAccount->refresh();
    $this->assertEquals($fromAccount->amount, 600);
})->group("core");

test("a user can make a transfer transaction between two accounts", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $fromAccount = Account::factory()->create([
        'owner_id' => $user->id,
        'amount' => 1400,
        'currency' => CurrencyEnum::CAD->value
    ]);
    $toAccount = Account::factory()->create([
        'owner_id' => $user->id,
        'amount' => 7300,
        'currency' => CurrencyEnum::CAD->value
    ]);

    $resp = post('/api/me/transactions', [
        'subject' => 'subject',
        'description' => 'description',
        'amount' => 400.00,
        'currency' => $fromAccount->currency,
        'when' => now(),
        'type' => TransactionTypeEnum::TRANSFER->value,
        'from_account_id' => $fromAccount->id,
        'to_account_id' => $toAccount->id,
    ])
        ->assertJsonStructure(['data'])
        ->assertStatus(201);

    $newTransaction = Transaction::where('type', TransactionTypeEnum::TRANSFER)->first();
    $this->assertEquals($resp['data']['id'], $newTransaction->id);

    $fromAccount->refresh();
    $toAccount->refresh();
    $this->assertEquals($fromAccount->amount, 1000);
    $this->assertEquals($toAccount->amount, 7700);
})->group("core");


test("a user can fetch their transactions", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    Transaction::factory(3)->create(['user_id' => $user->id, 'type' => TransactionTypeEnum::INCOME]);
    Transaction::factory(2)->create(['user_id' => $user->id, 'type' => TransactionTypeEnum::EXPENSE]);
    Transaction::factory(2)->create([
        'user_id' => $user->id,
        'type' => TransactionTypeEnum::TRANSFER,
        'amount' => 50.0,
        'from_account_id' => Account::factory()->create(['amount' => 1000]),
        'to_account_id' => Account::factory()->create(['amount' => 1000]),
    ]);

    $response = $this->get('/api/me/transactions')
        ->assertJsonStructure([
            'data' => ['*' => ['id', 'amount', 'currency', 'title', 'description', 'when', 'from_account', 'to_account']]
        ])
        ->assertStatus(200);

    assertCount(7, $response->json('data'));
})->group("core");

test("a_transaction_can_be_updated", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $income = Transaction::factory()->create(['type' => TransactionTypeEnum::INCOME]);

    $update = [
        'subject' => 'Updated title',
        'amount' => 999.00
    ];

    $response = $this->patch('/api/transactions/' . $income->id, $update);

    $response
        ->assertJsonStructure(['message'])
        ->assertStatus(200);

    $this->assertDatabaseHas('transactions', [
        ...$update,
        'type' => TransactionTypeEnum::INCOME->value
    ])
        ->assertDatabaseCount('transactions', 1);
})
    ->skip()
    ->group("core");

test("an_transaction_can_be_deleted", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $t = Transaction::factory()->create(['user_id' => $user->id]);

    $this->delete('/api/transactions/' . $t->id)
        ->assertStatus(200);

    $this->assertDatabaseMissing('transactions', ['id' => $t->id]);
})->skip()->group("core");

test("one_transaction_can_be_retrieve", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $t = Transaction::factory()->create(['user_id' => $user->id]);

    $this->get('/api/me/transactions/' . $t->id)
        ->assertJsonStructure([
            'data' => [
                'id',
                'when',
                'amount',
                'currency',
                'subject',
                'description',
                'type',
                'created_at',
                'updated_at',
                'user_id',
                'from_account',
                'to_account'
            ]
        ])
        ->assertStatus(200);
})->group("core");