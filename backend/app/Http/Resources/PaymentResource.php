<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'method' => $this->method,
            'provider' => $this->provider,
            'provider_reference' => $this->provider_reference,
            'amount' => $this->amount,
            'status' => $this->status,
            'confirmation_note' => $this->confirmation_note,
            'confirmed_at' => $this->confirmed_at?->toIso8601String(),
            'paid_at' => $this->paid_at?->toIso8601String(),
        ];
    }
}
