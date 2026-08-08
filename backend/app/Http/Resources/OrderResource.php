<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'customer_name' => $this->customer_name,
            'customer_email' => $this->customer_email,
            'customer_phone' => $this->customer_phone,
            'customer_company' => $this->customer_company,
            'notes' => $this->notes,
            'status' => $this->status,
            'currency' => $this->currency,
            'subtotal_amount' => $this->subtotal_amount,
            'discount_amount' => $this->discount_amount,
            'tax_amount' => $this->tax_amount,
            'total_amount' => $this->total_amount,
            'created_at' => $this->created_at?->toIso8601String(),
            'items' => OrderItemResource::collection($this->whenLoaded('items')),
            'invoice' => $this->whenLoaded('invoice', fn () => $this->invoice ? new InvoiceResource($this->invoice) : null),
        ];
    }
}
