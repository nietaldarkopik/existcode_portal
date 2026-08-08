<?php

namespace Database\Seeders;

use App\Support\News\Models\NewsPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class NewsPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => [
                    'id' => 'Existcode Resmi Meluncurkan Layanan Cloud & DevOps',
                    'en' => 'Existcode Officially Launches Cloud & DevOps Services',
                ],
                'slug' => [
                    'id' => 'existcode-luncurkan-layanan-cloud-devops',
                    'en' => 'existcode-launches-cloud-devops-services',
                ],
                'excerpt' => [
                    'id' => 'Melengkapi lini layanan kami, Existcode kini menyediakan jasa migrasi cloud, CI/CD, dan monitoring infrastruktur.',
                    'en' => 'Rounding out our service lineup, Existcode now offers cloud migration, CI/CD, and infrastructure monitoring services.',
                ],
                'body' => [
                    'id' => 'Menjawab kebutuhan klien yang semakin banyak mengelola infrastruktur skala besar, Existcode resmi meluncurkan layanan Cloud & DevOps. Layanan ini mencakup migrasi ke AWS/GCP/Azure, penyiapan pipeline CI/CD otomatis, hingga monitoring dan scaling infrastruktur. Tim kami telah membantu beberapa klien pilot memigrasikan sistem mereka dengan downtime minimal sebelum peluncuran resmi ini.',
                    'en' => 'In response to growing client demand for managing large-scale infrastructure, Existcode has officially launched its Cloud & DevOps services. This includes migration to AWS/GCP/Azure, automated CI/CD pipeline setup, and infrastructure monitoring and scaling. Our team has already helped several pilot clients migrate their systems with minimal downtime ahead of this official launch.',
                ],
                'accent' => 'emerald',
                'news_type' => 'product_update',
                'published_at' => Carbon::parse('2026-07-15'),
            ],
            [
                'title' => [
                    'id' => 'Existcode Menyelesaikan 50+ Proyek di Tahun 2025',
                    'en' => 'Existcode Completes 50+ Projects in 2025',
                ],
                'slug' => [
                    'id' => 'existcode-selesaikan-50-proyek-2025',
                    'en' => 'existcode-completes-50-projects-2025',
                ],
                'excerpt' => [
                    'id' => 'Sebuah pencapaian yang tidak lepas dari kepercayaan klien di berbagai industri — dari retail, distribusi, hingga fintech.',
                    'en' => "A milestone made possible by client trust across industries — from retail and distribution to fintech.",
                ],
                'body' => [
                    'id' => 'Sepanjang 2025, tim Existcode berhasil menyelesaikan lebih dari 50 proyek — mulai dari company profile, aplikasi mobile, hingga sistem enterprise custom. Pencapaian ini menjadi bukti kepercayaan klien di berbagai sektor industri terhadap kualitas dan konsistensi kerja tim kami. Kami berterima kasih kepada seluruh klien yang telah mempercayakan proyek mereka kepada Existcode.',
                    'en' => "Throughout 2025, the Existcode team completed more than 50 projects — ranging from company profiles and mobile apps to custom enterprise systems. This milestone reflects the trust clients across industries have placed in the quality and consistency of our work. We're grateful to every client who entrusted their project to Existcode.",
                ],
                'accent' => 'sky',
                'news_type' => 'milestone',
                'published_at' => Carbon::parse('2026-01-10'),
            ],
            [
                'title' => [
                    'id' => 'Tim Existcode Bertambah: Selamat Datang 3 Engineer Baru',
                    'en' => 'Existcode Team Grows: Welcoming 3 New Engineers',
                ],
                'slug' => [
                    'id' => 'existcode-tambah-3-engineer-baru',
                    'en' => 'existcode-welcomes-3-new-engineers',
                ],
                'excerpt' => [
                    'id' => 'Untuk mendukung pertumbuhan proyek, kami menyambut tiga engineer baru di tim backend dan mobile.',
                    'en' => 'To support our growing project pipeline, we welcome three new engineers to our backend and mobile teams.',
                ],
                'body' => [
                    'id' => 'Seiring bertambahnya jumlah proyek yang kami tangani, Existcode dengan bangga menyambut tiga engineer baru yang bergabung di tim backend dan mobile development. Penambahan tim ini memungkinkan kami menangani lebih banyak proyek secara paralel tanpa mengorbankan kualitas dan kecepatan pengerjaan.',
                    'en' => 'As the number of projects we handle continues to grow, Existcode is proud to welcome three new engineers to our backend and mobile development teams. This expansion allows us to take on more projects in parallel without compromising on quality or delivery speed.',
                ],
                'accent' => 'violet',
                'news_type' => 'announcement',
                'published_at' => Carbon::parse('2026-05-05'),
            ],
            [
                'title' => [
                    'id' => 'Existcode Raih Kepercayaan 10 Klien Baru di Kuartal Ini',
                    'en' => 'Existcode Earns Trust of 10 New Clients This Quarter',
                ],
                'slug' => [
                    'id' => 'existcode-raih-10-klien-baru-kuartal-ini',
                    'en' => 'existcode-10-new-clients-this-quarter',
                ],
                'excerpt' => [
                    'id' => 'Pertumbuhan yang stabil mendorong kami untuk terus meningkatkan kapasitas tim dan kualitas layanan.',
                    'en' => "Steady growth is pushing us to keep expanding our team's capacity and the quality of our service.",
                ],
                'body' => [
                    'id' => 'Kuartal ini, Existcode mencatat pertumbuhan signifikan dengan bergabungnya 10 klien baru dari berbagai industri, termasuk retail, pendidikan, dan jasa profesional. Kami berkomitmen untuk terus menjaga kualitas layanan sembari terus bertumbuh, dengan menambah kapasitas tim secara proporsional.',
                    'en' => "This quarter, Existcode recorded significant growth with 10 new clients joining us from a range of industries, including retail, education, and professional services. We remain committed to maintaining service quality as we grow, scaling our team's capacity accordingly.",
                ],
                'accent' => 'amber',
                'news_type' => 'milestone',
                'published_at' => Carbon::parse('2026-04-02'),
            ],
            [
                'title' => [
                    'id' => 'Existcode Kini Menyediakan Paket Maintenance Bulanan',
                    'en' => 'Existcode Now Offers a Monthly Maintenance Plan',
                ],
                'slug' => [
                    'id' => 'existcode-sediakan-paket-maintenance-bulanan',
                    'en' => 'existcode-monthly-maintenance-plan',
                ],
                'excerpt' => [
                    'id' => 'Paket retainer baru ini dirancang untuk klien yang ingin memastikan sistem mereka tetap aman dan optimal tanpa repot.',
                    'en' => 'This new retainer plan is designed for clients who want their systems to stay secure and optimized without the hassle.',
                ],
                'body' => [
                    'id' => 'Banyak klien yang telah menyelesaikan proyek dengan kami tetap membutuhkan dukungan teknis berkelanjutan. Menjawab kebutuhan ini, Existcode meluncurkan paket Maintenance Retainer bulanan yang mencakup monitoring rutin, backup, update keamanan, dan dukungan teknis responsif — semua dengan satu biaya tetap per bulan.',
                    'en' => 'Many clients who have completed a project with us still need ongoing technical support. To meet this need, Existcode has launched a monthly Maintenance Retainer plan that includes routine monitoring, backups, security updates, and responsive technical support — all for one fixed monthly fee.',
                ],
                'accent' => 'neutral',
                'news_type' => 'product_update',
                'published_at' => Carbon::parse('2026-02-01'),
            ],
        ];

        foreach ($posts as $post) {
            NewsPost::updateOrCreate(['slug->id' => $post['slug']['id']], $post);
        }
    }
}
