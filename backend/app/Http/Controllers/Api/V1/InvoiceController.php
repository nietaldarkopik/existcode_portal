<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Billing\ConfirmPaymentRequest;
use App\Http\Resources\InvoiceResource;
use App\Support\Billing\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class InvoiceController extends Controller
{
    public function show(Invoice $invoice): InvoiceResource
    {
        return new InvoiceResource($invoice->load('order.items', 'payments'));
    }

    public function confirmPayment(ConfirmPaymentRequest $request, Invoice $invoice): InvoiceResource
    {
        if ($invoice->status !== 'unpaid') {
            throw ValidationException::withMessages([
                'invoice' => 'Invoice ini sudah tidak dapat dikonfirmasi.',
            ]);
        }

        DB::transaction(function () use ($request, $invoice) {
            $invoice->payments()->create([
                'method' => 'bank_transfer',
                'provider' => 'manual',
                'amount' => $invoice->amount_due,
                'status' => 'success',
                'confirmation_note' => $request->validated('confirmation_note'),
                'confirmed_at' => now(),
                'paid_at' => now(),
            ]);

            $invoice->update(['status' => 'paid', 'paid_at' => now()]);
            $invoice->order()->update(['status' => 'paid']);
        });

        return new InvoiceResource($invoice->fresh()->load('order.items', 'payments'));
    }
}
