<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice_number' => $this->invoice_number,
            'status' => $this->status,
            'currency' => $this->currency,
            'amount_due' => $this->amount_due,
            'due_at' => $this->due_at?->toIso8601String(),
            'paid_at' => $this->paid_at?->toIso8601String(),
            'payment_instructions' => $this->payment_instructions,
            'order' => $this->whenLoaded('order', fn () => new OrderResource($this->order)),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
        ];
    }
}
