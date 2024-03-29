<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Laravel\Jetstream\Events\TeamCreated;
use Laravel\Jetstream\Events\TeamDeleted;
use Laravel\Jetstream\Events\TeamUpdated;
use Laravel\Jetstream\Team as JetstreamTeam;

class Team extends JetstreamTeam
{
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        "personal_team" => "boolean",
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ["name", "personal_team"];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        "created" => TeamCreated::class,
        "updated" => TeamUpdated::class,
        "deleted" => TeamDeleted::class,
    ];

    public function accounts(): MorphMany
    {
        return $this->morphMany(Account::class, "owner", "owner_type", "id");
    }

    public function budgets(): HasMany
    {
        return $this->hasMany(Budget::class);
    }
}
