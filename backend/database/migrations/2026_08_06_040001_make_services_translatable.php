<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn(['name', 'slug', 'summary', 'description', 'category']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->json('name')->after('id');
            $table->json('slug')->after('name');
            $table->json('summary')->after('slug');
            $table->json('description')->after('summary');
            $table->json('category')->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['name', 'slug', 'summary', 'description', 'category']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->string('name')->after('id');
            $table->string('slug')->unique()->after('name');
            $table->string('summary', 160)->after('slug');
            $table->text('description')->after('summary');
            $table->string('category')->after('description');
        });
    }
};
