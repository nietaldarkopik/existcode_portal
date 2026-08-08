<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->decimal('price_amount', 12, 2)->nullable();
            $table->string('price_currency', 3)->default('IDR');
            $table->enum('billing_period', ['one_time', 'monthly', 'yearly'])->default('one_time');
            $table->json('features');
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_custom')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
