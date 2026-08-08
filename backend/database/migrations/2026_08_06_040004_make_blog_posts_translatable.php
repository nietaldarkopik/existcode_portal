<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn(['title', 'slug', 'excerpt', 'body']);
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->json('title')->after('blog_category_id');
            $table->json('slug')->after('title');
            $table->json('excerpt')->after('slug');
            $table->json('body')->after('excerpt');
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['title', 'slug', 'excerpt', 'body']);
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->string('title')->after('blog_category_id');
            $table->string('slug')->unique()->after('title');
            $table->string('excerpt', 500)->after('slug');
            $table->longText('body')->after('excerpt');
        });
    }
};
