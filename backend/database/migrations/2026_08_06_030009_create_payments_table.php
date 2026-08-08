<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $table->enum('method', ['bank_transfer', 'e_wallet', 'credit_card', 'other'])->default('bank_transfer');
            $table->string('provider')->nullable()->default('manual');
            $table->string('provider_reference')->nullable();
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->text('confirmation_note')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
