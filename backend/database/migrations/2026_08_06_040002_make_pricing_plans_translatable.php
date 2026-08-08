<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn(['name', 'slug', 'tagline']);
        });

        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->json('name')->after('service_id');
            $table->json('slug')->after('name');
            $table->json('tagline')->nullable()->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->dropColumn(['name', 'slug', 'tagline']);
        });

        Schema::table('pricing_plans', function (Blueprint $table) {
            $table->string('name')->after('service_id');
            $table->string('slug')->unique()->after('name');
            $table->string('tagline')->nullable()->after('slug');
        });
    }
};
