<?php

namespace App\Console\Commands;

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use Illuminate\Console\Command;

class AddAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gastu:addadmin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add admin user';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(CreateNewUser $cnu)
    {
        $admin = User::query()->where('email', env('ADMIN_USER_EMAIL'))->first();
        if(!$admin) {
            $cnu->create([
                'email' => env('ADMIN_USER_EMAIL'),
                'name' =>  env('ADMIN_USER_NAME'),
                'password' => env('ADMIN_USER_PASSWORD'),
                'password_confirmation' => env('ADMIN_USER_PASSWORD'),
            ]);
        }
        return 0;
    }
}
