<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('excerpt', 500);
            $table->longText('body');
            $table->string('cover_image_url')->nullable();
            $table->enum('accent', ['sky', 'violet', 'amber', 'emerald', 'rose', 'neutral'])->nullable();
            $table->string('author_name')->default('Existcode Team');
            $table->unsignedSmallInteger('reading_minutes')->nullable();
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'published_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
