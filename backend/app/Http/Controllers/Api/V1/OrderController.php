<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ordering\StoreOrderRequest;
use App\Http\Resources\OrderResource;
use App\Support\Billing\Models\Invoice;
use App\Support\Ordering\Models\Order;
use App\Support\Pricing\Models\PricingPlan;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request): OrderResource
    {
        $data = $request->validated();

        $plan = PricingPlan::findOrFail($data['pricing_plan_id']);

        if ($plan->is_custom) {
            throw ValidationException::withMessages([
                'pricing_plan_id' => 'Paket ini memerlukan konsultasi langsung. Silakan hubungi kami melalui halaman Kontak.',
            ]);
        }

        $order = DB::transaction(function () use ($data, $plan) {
            $order = Order::create([
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'customer_company' => $data['customer_company'] ?? null,
                'notes' => $data['notes'] ?? null,
                'currency' => $plan->price_currency,
                'subtotal_amount' => $plan->price_amount,
                'total_amount' => $plan->price_amount,
            ]);

            $order->items()->create([
                'pricing_plan_id' => $plan->id,
                'item_name' => $plan->name,
                'item_description' => $plan->tagline,
                'unit_price' => $plan->price_amount,
                'quantity' => 1,
                'line_total' => $plan->price_amount,
            ]);

            $order->invoice()->create([
                'invoice_number' => Invoice::invoiceNumberForOrder($order->order_number),
                'amount_due' => $order->total_amount,
                'currency' => $order->currency,
                'due_at' => now()->addDays(3),
                'payment_instructions' => [
                    'bank_name' => config('company.bank_transfer.bank_name'),
                    'account_number' => config('company.bank_transfer.account_number'),
                    'account_holder' => config('company.bank_transfer.account_holder'),
                ],
            ]);

            return $order;
        });

        return new OrderResource($order->fresh(['items', 'invoice']));
    }

    public function show(Order $order): OrderResource
    {
        return new OrderResource($order->load('items', 'invoice'));
    }
}
