<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::enforceMorphMap([
            'user' => 'App\Models\User',
            'team' => 'App\Models\Team',
        ]);

//        Blade::aliasComponent('layouts.panel-layout', 'panel');
        Blade::component('layouts.panel-layout', 'panel');
    }
}
