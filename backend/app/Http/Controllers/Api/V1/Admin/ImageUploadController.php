<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $file = $request->file('image');
        $path = $file->storeAs(
            'uploads/'.now()->format('Y/m'),
            Str::uuid().'.'.$file->getClientOriginalExtension(),
            'public'
        );

        return response()->json(['url' => Storage::disk('public')->url($path)]);
    }
}
