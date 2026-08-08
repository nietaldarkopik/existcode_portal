<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Support\Contact\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class ContactMessageController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ContactMessageResource::collection(ContactMessage::latest()->paginate(20));
    }

    public function show(ContactMessage $contact_message): ContactMessageResource
    {
        return new ContactMessageResource($contact_message);
    }

    public function update(Request $request, ContactMessage $contact_message): ContactMessageResource
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['new', 'read', 'archived'])],
        ]);

        $contact_message->update($data);

        return new ContactMessageResource($contact_message->fresh());
    }
}
