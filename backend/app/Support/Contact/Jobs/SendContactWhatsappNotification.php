<?php

namespace App\Support\Contact\Jobs;

use App\Support\Contact\Models\ContactMessage;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

// Runs synchronously (not queued) — Hostinger shared hosting has no
// persistent queue worker, so a queued job would just sit unprocessed in
// the `jobs` table. A short HTTP timeout below keeps the contact form
// responsive even if the WhatsApp gateway is unreachable.
class SendContactWhatsappNotification
{
    use Dispatchable;

    public function __construct(private readonly ContactMessage $contactMessage)
    {
    }

    public function handle(): void
    {
        $url = config('services.whatsapp_gateway.url');
        $secret = config('services.whatsapp_gateway.secret');

        if (! $url || ! $secret) {
            return;
        }

        $message = $this->contactMessage;

        $text = "*Pesan Kontak Baru*\n\n"
            ."Nama: {$message->name}\n"
            ."Email: {$message->email}\n"
            .($message->phone ? "Telepon: {$message->phone}\n" : '')
            .($message->subject ? "Subjek: {$message->subject}\n" : '')
            ."\nPesan:\n{$message->message}";

        try {
            $response = Http::withToken($secret)
                ->timeout(10)
                ->post(rtrim($url, '/').'/notify', ['message' => $text]);

            if ($response->failed()) {
                Log::warning('Failed to send WhatsApp contact notification.', [
                    'contact_message_id' => $message->id,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (ConnectionException $e) {
            Log::warning('WhatsApp gateway unreachable.', [
                'contact_message_id' => $message->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
