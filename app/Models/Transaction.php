<?php

namespace App\Models;

use App\Enums\CurrencyEnum;
use App\Enums\TransactionTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Malico\LaravelNanoid\Eloquent\InteractsWithNanoid;

class Transaction extends Model
{
    use HasFactory;
    use InteractsWithNanoid;

    protected $fillable = ['amount', 'currency', 'subject', 'description', 'when', 'user_id', 'type', 'to_account_id', 'from_account_id'];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function (self $model): void {
            $model->{$model->getKeyName()} = $model->generateNanoid();
        });
    }

    protected $casts = [
        'when' => 'datetime',
        'currency' => CurrencyEnum::class,
        'type' => TransactionTypeEnum::class
    ];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['search'] ?? false) {
            $regex = '%' . $filters['search'] . '%';
            $query->where(
                fn($q) => $q
                    ->where('subject', 'like', $regex)
                    ->orWhere('description', 'like', $regex)
            );
        }

        if ($filters['type'] ?? false) {
            $query->where('type', $filters['type']);
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

    public function fromAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'from_account_id');
    }

    public function toAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'to_account_id');
    }
}
