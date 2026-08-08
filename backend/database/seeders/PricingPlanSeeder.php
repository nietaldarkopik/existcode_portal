<?php

namespace Database\Seeders;

use App\Support\Pricing\Models\PricingPlan;
use App\Support\Services\Models\Service;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        $serviceIdByKey = Service::all()->mapWithKeys(
            fn (Service $service) => [$service->getTranslation('slug', 'en') => $service->id]
        );

        $plans = [
            [
                'service_id' => $serviceIdByKey['company-profile-landing-page'] ?? null,
                'name' => ['id' => 'Landing Page Starter', 'en' => 'Landing Page Starter'],
                'slug' => ['id' => 'landing-page-starter', 'en' => 'landing-page-starter'],
                'tagline' => [
                    'id' => 'Cocok untuk kampanye atau produk baru yang butuh cepat online.',
                    'en' => 'Perfect for campaigns or new products that need to launch fast.',
                ],
                'price_amount' => 4500000,
                'billing_period' => 'one_time',
                'features' => [
                    'id' => ['1 halaman landing page', 'Desain responsif', 'Formulir kontak', '1x revisi desain', 'Selesai 5-7 hari kerja'],
                    'en' => ['1 landing page', 'Responsive design', 'Contact form', '1x design revision', 'Delivered in 5-7 business days'],
                ],
                'is_popular' => false,
                'sort_order' => 0,
            ],
            [
                'service_id' => $serviceIdByKey['company-profile-landing-page'] ?? null,
                'name' => ['id' => 'Company Profile Pro', 'en' => 'Company Profile Pro'],
                'slug' => ['id' => 'company-profile-pro', 'en' => 'company-profile-pro'],
                'tagline' => [
                    'id' => 'Website perusahaan lengkap dengan CMS yang mudah dikelola.',
                    'en' => 'A complete company website with an easy-to-manage CMS.',
                ],
                'price_amount' => 9500000,
                'billing_period' => 'one_time',
                'features' => [
                    'id' => ['Hingga 7 halaman', 'CMS untuk update konten sendiri', 'SEO on-page dasar', '3x revisi desain', 'Selesai 10-14 hari kerja'],
                    'en' => ['Up to 7 pages', 'Self-service content CMS', 'Basic on-page SEO', '3x design revisions', 'Delivered in 10-14 business days'],
                ],
                'is_popular' => true,
                'sort_order' => 1,
            ],
            [
                'service_id' => $serviceIdByKey['web-development'] ?? null,
                'name' => ['id' => 'E-Commerce Custom', 'en' => 'E-Commerce Custom'],
                'slug' => ['id' => 'ecommerce-custom', 'en' => 'ecommerce-custom'],
                'tagline' => [
                    'id' => 'Toko online dengan katalog, keranjang, dan pembayaran terintegrasi.',
                    'en' => 'An online store with catalog, cart, and integrated payments.',
                ],
                'price_amount' => 25000000,
                'billing_period' => 'one_time',
                'features' => [
                    'id' => ['Katalog produk & keranjang belanja', 'Integrasi payment gateway lokal', 'Dashboard admin', 'Optimasi performa & keamanan'],
                    'en' => ['Product catalog & shopping cart', 'Local payment gateway integration', 'Admin dashboard', 'Performance & security optimization'],
                ],
                'is_popular' => false,
                'sort_order' => 2,
            ],
            [
                'service_id' => $serviceIdByKey['mobile-app-development'] ?? null,
                'name' => ['id' => 'Mobile App MVP', 'en' => 'Mobile App MVP'],
                'slug' => ['id' => 'mobile-app-mvp', 'en' => 'mobile-app-mvp'],
                'tagline' => [
                    'id' => 'Versi awal aplikasi mobile Anda, siap divalidasi ke pengguna nyata.',
                    'en' => 'An early version of your mobile app, ready to validate with real users.',
                ],
                'price_amount' => 35000000,
                'billing_period' => 'one_time',
                'features' => [
                    'id' => ['Aplikasi iOS & Android (cross-platform)', 'Hingga 8 halaman/fitur inti', 'Integrasi API backend', 'Publikasi ke App Store & Play Store'],
                    'en' => ['iOS & Android app (cross-platform)', 'Up to 8 core pages/features', 'Backend API integration', 'App Store & Play Store publishing'],
                ],
                'is_popular' => false,
                'sort_order' => 3,
            ],
            [
                'service_id' => $serviceIdByKey['web-development'] ?? null,
                'name' => ['id' => 'Enterprise / Custom Software', 'en' => 'Enterprise / Custom Software'],
                'slug' => ['id' => 'enterprise-custom', 'en' => 'enterprise-custom'],
                'tagline' => [
                    'id' => 'Solusi skala besar yang disesuaikan penuh dengan kebutuhan bisnis Anda.',
                    'en' => 'A large-scale solution fully tailored to your business needs.',
                ],
                'price_amount' => null,
                'billing_period' => 'one_time',
                'features' => [
                    'id' => ['Kebutuhan & arsitektur disesuaikan', 'Tim dedicated', 'SLA & dukungan prioritas', 'Skalabilitas tinggi'],
                    'en' => ['Tailored requirements & architecture', 'Dedicated team', 'SLA & priority support', 'High scalability'],
                ],
                'is_popular' => false,
                'is_custom' => true,
                'sort_order' => 4,
            ],
            [
                'service_id' => $serviceIdByKey['it-consulting-maintenance'] ?? null,
                'name' => ['id' => 'Maintenance Retainer', 'en' => 'Maintenance Retainer'],
                'slug' => ['id' => 'maintenance-retainer', 'en' => 'maintenance-retainer'],
                'tagline' => [
                    'id' => 'Ketenangan pikiran — sistem Anda dipantau dan dirawat setiap bulan.',
                    'en' => 'Peace of mind — your system monitored and maintained every month.',
                ],
                'price_amount' => 1500000,
                'billing_period' => 'monthly',
                'features' => [
                    'id' => ['Monitoring & backup rutin', 'Update keamanan berkala', 'Dukungan teknis via WhatsApp/email', 'Laporan bulanan'],
                    'en' => ['Routine monitoring & backups', 'Regular security updates', 'Technical support via WhatsApp/email', 'Monthly reports'],
                ],
                'is_popular' => false,
                'sort_order' => 5,
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::updateOrCreate(['slug->id' => $plan['slug']['id']], $plan);
        }
    }
}
