<?php

namespace App\Support\Ordering\Models;

use App\Support\Billing\Models\Invoice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;
use RuntimeException;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'order_number', 'customer_name', 'customer_email', 'customer_phone',
        'customer_company', 'notes', 'status', 'currency', 'subtotal_amount',
        'discount_amount', 'tax_amount', 'total_amount',
    ];

    protected function casts(): array
    {
        return [
            'subtotal_amount' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Order $order) {
            if (! $order->order_number) {
                $order->order_number = static::generateOrderNumber();
            }
        });
    }

    protected static function generateOrderNumber(): string
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $candidate = 'ORD-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));

            if (! static::where('order_number', $candidate)->exists()) {
                return $candidate;
            }
        }

        throw new RuntimeException('Unable to generate a unique order number.');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }
}
