<?php

namespace App\Support\Billing\Models;

use App\Support\Ordering\Models\Order;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Invoice extends Model
{
    protected $fillable = [
        'order_id', 'invoice_number', 'status', 'currency', 'amount_due',
        'due_at', 'paid_at', 'payment_instructions',
    ];

    protected function casts(): array
    {
        return [
            'amount_due' => 'decimal:2',
            'due_at' => 'datetime',
            'paid_at' => 'datetime',
            'payment_instructions' => 'array',
        ];
    }

    public static function invoiceNumberForOrder(string $orderNumber): string
    {
        return 'INV-'.Str::after($orderNumber, 'ORD-');
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
