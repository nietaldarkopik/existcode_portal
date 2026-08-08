<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Support\Contact\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function store(StoreContactMessageRequest $request): ContactMessageResource
    {
        $message = ContactMessage::create($request->validated());

        return new ContactMessageResource($message->fresh());
    }
}
