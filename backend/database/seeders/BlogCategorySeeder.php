<?php

namespace Database\Seeders;

use App\Support\Blog\Models\BlogCategory;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => ['id' => 'Tips & Tutorial', 'en' => 'Tips & Tutorials'],
                'slug' => ['id' => 'tips-tutorial', 'en' => 'tips-tutorials'],
            ],
            [
                'name' => ['id' => 'Studi Kasus', 'en' => 'Case Studies'],
                'slug' => ['id' => 'studi-kasus', 'en' => 'case-studies'],
            ],
            [
                'name' => ['id' => 'Teknologi', 'en' => 'Technology'],
                'slug' => ['id' => 'teknologi', 'en' => 'technology'],
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::updateOrCreate(['slug->id' => $category['slug']['id']], $category);
        }
    }
}
