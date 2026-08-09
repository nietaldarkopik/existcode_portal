<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Support\Contact\Jobs\SendContactWhatsappNotification;
use App\Support\Contact\Jobs\SendContactWhatsappReply;
use App\Support\Contact\Models\ContactMessage;

class ContactMessageController extends Controller
{
    public function store(StoreContactMessageRequest $request): ContactMessageResource
    {
        $message = ContactMessage::create($request->validated());   

        SendContactWhatsappNotification::dispatch($message);
        SendContactWhatsappReply::dispatch($message);

        return new ContactMessageResource($message->fresh());
    }
}
