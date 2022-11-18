<?php

use App\Enums\AccountTypeEnum;
use App\Enums\CurrencyEnum;
use App\Models\Account;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\withoutExceptionHandling;

uses(DatabaseMigrations::class);
uses(RefreshDatabase::class);

beforeEach(function() {
    withoutExceptionHandling();
});

test("a user can create an account", function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $resp = post('/api/me/accounts', [
        'title' => 'Cuenta Ahorro 2011',
        'provider_name' => 'Banco BHD',
        'currency' => CurrencyEnum::DOP->value,
        'type' => AccountTypeEnum::SAVINGS->value,
    ])
        ->assertStatus(201);

    $account = Account::find($resp->json('data')['id']);
    expect($account)->toBeTruthy()
        ->and($account->owner->id)->toBe($user->id)
        ->and($user->accounts)->count(1);

})->group('core');

test("a user can retrieve their accounts", function () {
    $user = User::factory()->create();
    $team = Team::factory()->create(['user_id' => $user]);
    Sanctum::actingAs($user);

    Account::factory(2)->create(['owner_id' => $team->id, 'owner_type' => 'team']);
    $count = Account::query()->count();

    $resp = get('/api/me/accounts')
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id', 'title', 'description', 'owner_id', 'provider_name', 'amount', 'currency', 'type'
                ]
            ]
        ])
        ->assertStatus(200);

    $data = (array) $resp->json('data');
    expect(count($data))->toBe(2);

})
    ->group('core');
