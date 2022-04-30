<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\Income;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $adminId = User::whereEmail(env('ADMIN_USER_EMAIL'))->first()?->id;
        Expense::factory(20)->create([
            'user_id' => $adminId ?? User::factory()->create()
        ]);
        Income::factory(20)->create([
            'user_id' => $adminId ?? User::factory()->create()
        ]);
    }
}
