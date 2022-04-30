<?php

namespace App\Models;

use App\Enums\CurrencyEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = ['amount', 'title', 'description', 'when', 'user_id', 'currency'];

    protected $casts = [
        'when' => 'datetime',
        'currency' => CurrencyEnum::class,
    ];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $regex = '%' . $filters['search'] . '%';
            $query->where(
                fn($q) => $q
                    ->where('title', 'like', $regex)
                    ->orWhere('description', 'like', $regex)
            );
        }

        $this->addFilter($query, $filters, 'amount');
    }

    protected function addFilter($query, $filters, $filtrable)
    {
        if ($filters[$filtrable] ?? false) {
            $query->where($filtrable, '=', doubleval($filters[$filtrable]));
        } elseif ($filters[$filtrable . '>'] ?? false) {
            $query->where(
                $filtrable,
                '>=',
                doubleval($filters[$filtrable . '>'])
            );
        } elseif ($filters[$filtrable . '<'] ?? false) {
            $query->where(
                $filtrable,
                '<=',
                doubleval($filters[$filtrable . '<'])
            );
        }
    }
}
