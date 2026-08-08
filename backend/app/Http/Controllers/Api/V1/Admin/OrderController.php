<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Support\Ordering\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $orders = Order::with(['items', 'invoice'])->latest()->paginate(20);

        return OrderResource::collection($orders);
    }

    public function show(Order $order): OrderResource
    {
        return new OrderResource($order->load(['items', 'invoice.payments']));
    }

    public function update(Request $request, Order $order): OrderResource
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending_payment', 'paid', 'in_progress', 'completed', 'cancelled'])],
        ]);

        $order->update($data);

        return new OrderResource($order->fresh(['items', 'invoice']));
    }
}
