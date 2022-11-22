<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property mixed $path
 */
class Attachment extends Model
{
    use HasFactory;

    protected $fillable = ['transaction_id', 'path', 'title', 'description'];
    protected $appends = ['attachment_url'];

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    public function getAttachmentUrlAttribute(): string
    {
        return asset('storage/' . $this->path);
    }
}
