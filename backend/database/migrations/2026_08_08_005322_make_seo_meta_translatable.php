<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('seo_meta', function (Blueprint $table) {
            $table->dropColumn(['title', 'description']);
        });

        Schema::table('seo_meta', function (Blueprint $table) {
            $table->json('title')->nullable()->after('seoable_type');
            $table->json('description')->nullable()->after('title');
            $table->string('keywords')->nullable()->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('seo_meta', function (Blueprint $table) {
            $table->dropColumn(['title', 'description', 'keywords']);
        });

        Schema::table('seo_meta', function (Blueprint $table) {
            $table->string('title')->nullable()->after('seoable_type');
            $table->string('description', 500)->nullable()->after('title');
        });
    }
};
