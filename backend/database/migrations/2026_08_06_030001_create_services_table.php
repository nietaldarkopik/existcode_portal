<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('summary', 160);
            $table->text('description');
            $table->string('category');
            $table->string('icon_key')->nullable();
            $table->enum('accent', ['sky', 'violet', 'amber', 'emerald', 'rose', 'neutral'])->default('neutral');
            $table->json('features')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
