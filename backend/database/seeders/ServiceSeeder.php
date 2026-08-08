<?php

namespace Database\Seeders;

use App\Support\Services\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => ['id' => 'Pengembangan Web Aplikasi', 'en' => 'Web Application Development'],
                'slug' => ['id' => 'pengembangan-web-aplikasi', 'en' => 'web-development'],
                'summary' => [
                    'id' => 'Website dan web app custom yang cepat, aman, dan siap tumbuh bersama bisnis Anda.',
                    'en' => 'Fast, secure custom websites and web apps built to grow alongside your business.',
                ],
                'description' => [
                    'id' => 'Kami membangun aplikasi web dari nol menggunakan teknologi modern seperti React, Laravel, dan Node.js — mulai dari sistem internal, platform e-commerce, hingga aplikasi SaaS. Setiap proyek melalui proses arsitektur yang matang, testing menyeluruh, dan optimasi performa sehingga aplikasi Anda siap diandalkan saat bisnis berkembang.',
                    'en' => 'We build web applications from the ground up using modern technology like React, Laravel, and Node.js — from internal systems to e-commerce platforms and SaaS products. Every project goes through solid architecture planning, thorough testing, and performance optimization so your application stays reliable as your business grows.',
                ],
                'category' => ['id' => 'Software Development', 'en' => 'Software Development'],
                'icon_key' => 'code-2',
                'accent' => 'sky',
                'features' => [
                    'id' => [
                        'Arsitektur modern (React, Laravel, Node.js)',
                        'Optimasi performa & SEO',
                        'Integrasi API & sistem pihak ketiga',
                        'Testing & QA menyeluruh',
                    ],
                    'en' => [
                        'Modern architecture (React, Laravel, Node.js)',
                        'Performance & SEO optimization',
                        'API integration with third-party systems',
                        'Comprehensive testing & QA',
                    ],
                ],
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => ['id' => 'Pengembangan Aplikasi Mobile', 'en' => 'Mobile App Development'],
                'slug' => ['id' => 'pengembangan-aplikasi-mobile', 'en' => 'mobile-app-development'],
                'summary' => [
                    'id' => 'Aplikasi iOS & Android yang responsif, dengan pengalaman pengguna yang mulus.',
                    'en' => 'Responsive iOS & Android apps with a seamless user experience.',
                ],
                'description' => [
                    'id' => 'Tim kami mengembangkan aplikasi mobile native maupun cross-platform (React Native/Flutter) yang dioptimalkan untuk performa dan pengalaman pengguna. Kami menangani seluruh siklus, dari desain UX mobile-first, integrasi backend, hingga publikasi ke App Store dan Play Store.',
                    'en' => "Our team builds native and cross-platform mobile apps (React Native/Flutter) optimized for performance and user experience. We handle the full lifecycle — from mobile-first UX design and backend integration to publishing on the App Store and Play Store.",
                ],
                'category' => ['id' => 'Software Development', 'en' => 'Software Development'],
                'icon_key' => 'smartphone',
                'accent' => 'violet',
                'features' => [
                    'id' => [
                        'Native iOS & Android atau cross-platform (React Native/Flutter)',
                        'Desain UX mobile-first',
                        'Integrasi push notification & payment gateway',
                        'Publikasi ke App Store & Play Store',
                    ],
                    'en' => [
                        'Native iOS & Android or cross-platform (React Native/Flutter)',
                        'Mobile-first UX design',
                        'Push notification & payment gateway integration',
                        'App Store & Play Store publishing',
                    ],
                ],
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'name' => ['id' => 'Desain UI/UX', 'en' => 'UI/UX Design'],
                'slug' => ['id' => 'desain-ui-ux', 'en' => 'ui-ux-design'],
                'summary' => [
                    'id' => 'Desain antarmuka yang indah sekaligus mudah digunakan, berbasis riset pengguna nyata.',
                    'en' => 'Beautiful, easy-to-use interfaces backed by real user research.',
                ],
                'description' => [
                    'id' => 'Kami merancang pengalaman digital yang intuitif melalui riset pengguna, wireframing, dan prototyping interaktif. Setiap desain diuji usability-nya sebelum masuk ke tahap development, memastikan produk akhir benar-benar sesuai kebutuhan pengguna dan tujuan bisnis Anda.',
                    'en' => "We design intuitive digital experiences through user research, wireframing, and interactive prototyping. Every design is usability-tested before development begins, ensuring the final product truly fits your users' needs and business goals.",
                ],
                'category' => ['id' => 'Design', 'en' => 'Design'],
                'icon_key' => 'palette',
                'accent' => 'amber',
                'features' => [
                    'id' => [
                        'Riset pengguna & wireframing',
                        'Design system & prototyping interaktif',
                        'Usability testing',
                        'Handoff siap developer (Figma)',
                    ],
                    'en' => [
                        'User research & wireframing',
                        'Design systems & interactive prototyping',
                        'Usability testing',
                        'Developer-ready handoff (Figma)',
                    ],
                ],
                'is_featured' => false,
                'sort_order' => 3,
            ],
            [
                'name' => ['id' => 'Cloud & DevOps', 'en' => 'Cloud & DevOps'],
                'slug' => ['id' => 'cloud-devops', 'en' => 'cloud-devops'],
                'summary' => [
                    'id' => 'Infrastruktur cloud yang aman, scalable, dan mudah dipantau.',
                    'en' => "Secure, scalable cloud infrastructure that's easy to monitor.",
                ],
                'description' => [
                    'id' => 'Kami membantu migrasi sistem Anda ke cloud (AWS, GCP, atau Azure), membangun pipeline CI/CD otomatis, dan menyiapkan monitoring untuk memastikan aplikasi Anda tetap tersedia dan aman saat traffic meningkat.',
                    'en' => 'We help migrate your systems to the cloud (AWS, GCP, or Azure), build automated CI/CD pipelines, and set up monitoring to keep your application available and secure as traffic grows.',
                ],
                'category' => ['id' => 'Infrastructure', 'en' => 'Infrastructure'],
                'icon_key' => 'cloud',
                'accent' => 'emerald',
                'features' => [
                    'id' => [
                        'Migrasi & arsitektur cloud (AWS/GCP/Azure)',
                        'CI/CD pipeline otomatis',
                        'Monitoring & scaling',
                        'Keamanan infrastruktur',
                    ],
                    'en' => [
                        'Cloud migration & architecture (AWS/GCP/Azure)',
                        'Automated CI/CD pipelines',
                        'Monitoring & scaling',
                        'Infrastructure security',
                    ],
                ],
                'is_featured' => false,
                'sort_order' => 4,
            ],
            [
                'name' => ['id' => 'Company Profile & Landing Page', 'en' => 'Company Profile & Landing Page'],
                'slug' => ['id' => 'company-profile-landing-page', 'en' => 'company-profile-landing-page'],
                'summary' => [
                    'id' => 'Website perusahaan yang profesional, cepat online, dan siap dikembangkan.',
                    'en' => 'A professional company website, live fast and ready to grow.',
                ],
                'description' => [
                    'id' => 'Solusi cepat untuk bisnis yang butuh kehadiran online yang meyakinkan — dari landing page kampanye hingga company profile multi-halaman. Desain modern, responsif, dan dilengkapi CMS agar Anda bisa memperbarui konten sendiri tanpa developer.',
                    'en' => 'A quick solution for businesses that need a convincing online presence — from campaign landing pages to multi-page company profiles. Modern, responsive design with a CMS so you can update content yourself without a developer.',
                ],
                'category' => ['id' => 'Software Development', 'en' => 'Software Development'],
                'icon_key' => 'layout-template',
                'accent' => 'rose',
                'features' => [
                    'id' => [
                        'Desain modern & responsif',
                        'Optimasi konversi & SEO dasar',
                        'Integrasi CMS mudah dikelola',
                        'Selesai dalam 1-2 minggu',
                    ],
                    'en' => [
                        'Modern, responsive design',
                        'Conversion optimization & basic SEO',
                        'Easy-to-manage CMS integration',
                        'Delivered in 1-2 weeks',
                    ],
                ],
                'is_featured' => true,
                'sort_order' => 0,
            ],
            [
                'name' => ['id' => 'Konsultasi IT & Maintenance', 'en' => 'IT Consulting & Maintenance'],
                'slug' => ['id' => 'konsultasi-it-maintenance', 'en' => 'it-consulting-maintenance'],
                'summary' => [
                    'id' => 'Dukungan teknis berkelanjutan agar sistem Anda selalu berjalan optimal.',
                    'en' => 'Ongoing technical support to keep your systems running smoothly.',
                ],
                'description' => [
                    'id' => 'Punya sistem yang sudah berjalan tapi butuh perawatan rutin, audit keamanan, atau saran teknologi? Tim kami siap menjadi mitra IT jangka panjang Anda — mulai dari maintenance berkala, bug fixing, hingga konsultasi arsitektur.',
                    'en' => 'Have a system already running but need regular upkeep, security audits, or technology advice? Our team is ready to be your long-term IT partner — from routine maintenance and bug fixes to architecture consulting.',
                ],
                'category' => ['id' => 'Support', 'en' => 'Support'],
                'icon_key' => 'life-buoy',
                'accent' => 'neutral',
                'features' => [
                    'id' => [
                        'Audit sistem & rekomendasi teknologi',
                        'Maintenance rutin & bug fixing',
                        'Dukungan teknis responsif',
                        'Dokumentasi teknis lengkap',
                    ],
                    'en' => [
                        'System audit & technology recommendations',
                        'Routine maintenance & bug fixing',
                        'Responsive technical support',
                        'Complete technical documentation',
                    ],
                ],
                'is_featured' => false,
                'sort_order' => 5,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['slug->id' => $service['slug']['id']], $service);
        }
    }
}
