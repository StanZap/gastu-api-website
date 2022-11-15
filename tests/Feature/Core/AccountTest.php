<?php

use App\Models\Account;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\withoutExceptionHandling;
use function PHPUnit\Framework\assertCount;

uses(DatabaseMigrations::class);
uses(RefreshDatabase::class);

test("a user can create an account", function () {
    withoutExceptionHandling();

    $user = User::factory()->create();
    actingAs($user);

    $resp = post('/api/me/accounts', [
        'title' => 'Cuenta Ahorro 2011',
        'provider_name' => 'Banco BHD'
    ])
        ->assertStatus(201);

    $account = Account::find($resp->json('data')['id']);
    expect($account)->toBeTruthy()
        ->and($account->owner->id)->toBe($user->id)
        ->and($user->accounts)->count(1);

})->group('core');

test("a user can retrieve their accounts", function () {
    $user = User::factory()->create();
    actingAs($user);

    Account::factory(2)->create(['owner_id' => $user->id]);

    $resp = get('/api/me/accounts')
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 'title', 'description', 'owner_id', 'provider_name'
                ]
            ]
        ])
        ->assertStatus(200);

    $data = (array) $resp->json('data');
    expect(count($data))->toBe(2);

})
    ->group('core');
