<?php

namespace App\Models;

use App\Enums\TransactionTypeEnum;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ["name", "email", "password"];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        "password",
        "remember_token",
        "two_factor_recovery_codes",
        "two_factor_secret",
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        "email_verified_at" => "datetime",
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ["profile_photo_url"];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function teamTransactions()
    {
    }

    //    public function expenses()
    //    {
    //        return $this->hasMany(Transaction::class)
    //            ->where('type', TransactionType::Expense->value);
    //    }
    //
    //    public function incomes()
    //    {
    //        return $this->hasMany(Income::class)
    //            ->where('type', TransactionType::Income->value);
    //    }

    public function accounts(): MorphMany
    {
        return $this->morphMany(Account::class, "owner", "owner_type", "id");
    }

    public function teamAccounts()
    {
        return Account::whereIn(
            "owner_id",
            $this->allTeams()->pluck("id")
        )->where("owner_type", "team");
    }
}
