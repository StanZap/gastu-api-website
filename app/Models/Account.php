<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'amount',
        'provider_name',
        'description',
        'owner_id',
        'owner_type',
        'type',
        'currency'
    ];

    public function owner()
    {
        return $this->morphTo();
    }

}
