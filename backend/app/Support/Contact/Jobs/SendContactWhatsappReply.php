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
class SendContactWhatsappReply
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

        $text = "Terima kasih {$message->name} sudah menghubungi kami. Pesan anda sudah kami terima dan akan segera kami tindak lanjuti. Informasi lebih lanjut silakan hubungi kami di nomor ini atau kunjungi website kami di https://existcode.id.";

        try {
            $response = Http::withToken($secret)
                ->timeout(10)
                ->post(rtrim($url, '/').'/reply', ['message' => $text,'to' => $message->phone]);

            if ($response->failed()) {
                Log::warning('Failed to send WhatsApp Reply.', [
                    'contact_message_id' => $message->id,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (ConnectionException $e) {
            Log::warning('WhatsApp Reply unreachable.', [
                'contact_message_id' => $message->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
