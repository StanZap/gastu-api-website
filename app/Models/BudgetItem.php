<?php

namespace App\Models;

use App\Enums\TransactionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetItem extends Model
{
    use HasFactory;

    protected $fillable = [
        "subject",
        "description",
        "amount",
        "type",
        "budget_id",
        "team_id",
    ];

    protected $casts = [
        "amount" => "decimal:2",
    ];

    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function scopeType($query, $type)
    {
        return $query->where("type", $type);
    }

    public function scopeIncome($query)
    {
        return $this->scopeType($query, TransactionTypeEnum::INCOME);
    }

    public function scopeExpense($query)
    {
        return $this->scopeType($query, TransactionTypeEnum::EXPENSE);
    }
}
