<?php

namespace Database\Seeders;

use App\Support\Blog\Models\BlogCategory;
use App\Support\Blog\Models\BlogPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $categoryIdByKey = BlogCategory::all()->mapWithKeys(
            fn (BlogCategory $category) => [$category->getTranslation('slug', 'en') => $category->id]
        );

        $posts = [
            [
                'blog_category_id' => $categoryIdByKey['tips-tutorials'] ?? null,
                'title' => [
                    'id' => '5 Alasan Bisnis Anda Butuh Company Profile Profesional di 2026',
                    'en' => '5 Reasons Your Business Needs a Professional Company Profile in 2026',
                ],
                'slug' => [
                    'id' => '5-alasan-bisnis-butuh-company-profile-profesional-2026',
                    'en' => '5-reasons-your-business-needs-a-professional-company-profile-2026',
                ],
                'excerpt' => [
                    'id' => 'Website bukan lagi pelengkap — ini adalah kesan pertama calon klien terhadap bisnis Anda. Berikut alasan company profile profesional wajib jadi prioritas.',
                    'en' => "A website isn't a nice-to-have anymore — it's your prospective client's first impression of your business. Here's why a professional company profile deserves to be a priority.",
                ],
                'body' => [
                    'id' => "Di era digital, calon klien atau investor hampir selalu mencari nama bisnis Anda secara online sebelum memutuskan untuk berkomitmen. Tanpa company profile yang profesional, Anda kehilangan kesempatan untuk membangun kepercayaan di momen paling penting.\n\nPertama, company profile memberikan kredibilitas instan. Desain yang rapi dan konten yang jelas menunjukkan bahwa bisnis Anda serius dan terpercaya.\n\nKedua, ini adalah aset marketing 24/7 yang bekerja tanpa henti — menjelaskan layanan, portofolio, dan keunggulan Anda kapan saja calon klien mengunjunginya.\n\nKetiga, company profile modern memudahkan tim sales Anda. Alih-alih menjelaskan semua dari awal, cukup arahkan calon klien ke website untuk melihat bukti kerja dan testimoni.\n\nKeempat, SEO dasar pada company profile membantu bisnis Anda ditemukan di pencarian Google secara organik, tanpa perlu iklan berbayar terus-menerus.\n\nTerakhir, company profile yang dilengkapi CMS memungkinkan Anda memperbarui konten sendiri — tanpa perlu bergantung pada developer setiap kali ada informasi baru.",
                    'en' => "In the digital age, prospective clients or investors almost always search for your business online before committing to anything. Without a professional company profile, you lose the chance to build trust at the moment it matters most.\n\nFirst, a company profile provides instant credibility. Clean design and clear content signal that your business is serious and trustworthy.\n\nSecond, it's a 24/7 marketing asset that never stops working — explaining your services, portfolio, and strengths whenever a prospect visits.\n\nThird, a modern company profile makes your sales team's job easier. Instead of explaining everything from scratch, they can simply point prospects to the website to see proof of work and testimonials.\n\nFourth, basic SEO on a company profile helps your business get found organically on Google, without relying entirely on paid ads.\n\nFinally, a CMS-powered company profile lets you update content yourself — without depending on a developer every time there's new information to share.",
                ],
                'accent' => 'rose',
                'reading_minutes' => 4,
                'published_at' => Carbon::parse('2026-06-02'),
            ],
            [
                'blog_category_id' => $categoryIdByKey['technology'] ?? null,
                'title' => [
                    'id' => 'Laravel vs Node.js: Mana yang Tepat untuk Startup Anda?',
                    'en' => 'Laravel vs Node.js: Which One Is Right for Your Startup?',
                ],
                'slug' => [
                    'id' => 'laravel-vs-nodejs-mana-yang-tepat-untuk-startup',
                    'en' => 'laravel-vs-nodejs-which-one-is-right-for-your-startup',
                ],
                'excerpt' => [
                    'id' => 'Dua teknologi backend populer, dua filosofi berbeda. Kami bahas kapan sebaiknya memilih Laravel dan kapan Node.js lebih masuk akal.',
                    'en' => 'Two popular backend technologies, two different philosophies. We break down when to choose Laravel and when Node.js makes more sense.',
                ],
                'body' => [
                    'id' => "Pertanyaan \"Laravel atau Node.js?\" sering muncul di awal proyek startup. Jawabannya sebenarnya tergantung pada kebutuhan spesifik tim dan produk Anda.\n\nLaravel unggul dalam kecepatan development untuk aplikasi berbasis data yang kompleks — CRUD, sistem admin, e-commerce, atau platform SaaS dengan banyak relasi antar entitas. Ekosistemnya matang, konvensinya jelas, dan cocok untuk tim yang ingin membangun fondasi solid dengan cepat.\n\nNode.js lebih unggul untuk aplikasi real-time (chat, notifikasi live, dashboard streaming data) dan ketika tim Anda ingin satu bahasa (JavaScript/TypeScript) di seluruh stack, dari frontend hingga backend.\n\nDi Existcode, kami memilih teknologi berdasarkan kebutuhan proyek, bukan preferensi semata — dan pada banyak kasus, kombinasi keduanya (Laravel untuk core business logic, Node.js untuk layanan real-time) justru memberikan hasil terbaik.",
                    'en' => "The \"Laravel or Node.js?\" question tends to come up early in every startup project. The real answer depends on your team's and product's specific needs.\n\nLaravel shines for fast development of data-heavy applications — CRUD systems, admin panels, e-commerce, or SaaS platforms with lots of relationships between entities. Its ecosystem is mature, its conventions are clear, and it suits teams that want to build a solid foundation quickly.\n\nNode.js has the edge for real-time applications (chat, live notifications, streaming dashboards) and when your team wants a single language (JavaScript/TypeScript) across the entire stack, from frontend to backend.\n\nAt Existcode, we choose technology based on project needs, not personal preference — and in many cases, combining both (Laravel for core business logic, Node.js for real-time services) delivers the best results.",
                ],
                'accent' => 'emerald',
                'reading_minutes' => 5,
                'published_at' => Carbon::parse('2026-05-20'),
            ],
            [
                'blog_category_id' => $categoryIdByKey['case-studies'] ?? null,
                'title' => [
                    'id' => 'Studi Kasus: Migrasi Sistem Legacy Klien Kami ke Cloud',
                    'en' => "Case Study: Migrating Our Client's Legacy System to the Cloud",
                ],
                'slug' => [
                    'id' => 'studi-kasus-migrasi-sistem-legacy-ke-cloud',
                    'en' => 'case-study-migrating-a-legacy-system-to-the-cloud',
                ],
                'excerpt' => [
                    'id' => 'Bagaimana kami membantu sebuah perusahaan distribusi memigrasikan sistem on-premise berusia 8 tahun ke infrastruktur cloud modern, tanpa downtime berarti.',
                    'en' => 'How we helped a distribution company migrate an 8-year-old on-premise system to modern cloud infrastructure, with virtually no downtime.',
                ],
                'body' => [
                    'id' => "Klien kami, sebuah perusahaan distribusi menengah, mengoperasikan sistem inventaris on-premise yang dibangun sejak 2018. Sistem ini semakin sering down saat traffic tinggi dan sulit di-scale.\n\nTim Existcode melakukan audit menyeluruh terhadap arsitektur lama, lalu merancang strategi migrasi bertahap ke cloud (AWS) tanpa mengganggu operasional harian klien.\n\nProses migrasi dilakukan dalam empat tahap: containerisasi aplikasi, migrasi database dengan replikasi paralel, pengujian beban di lingkungan staging, dan cutover bertahap per modul.\n\nHasilnya, downtime total selama migrasi kurang dari 15 menit, waktu respons sistem meningkat 60%, dan klien kini dapat melakukan scaling otomatis saat musim ramai tanpa perlu menambah server manual.",
                    'en' => "Our client, a mid-sized distribution company, was running an on-premise inventory system built back in 2018. The system was increasingly going down under high traffic and was difficult to scale.\n\nThe Existcode team conducted a thorough audit of the legacy architecture, then designed a phased migration strategy to the cloud (AWS) without disrupting the client's daily operations.\n\nThe migration was carried out in four stages: containerizing the application, migrating the database with parallel replication, load testing in a staging environment, and a gradual module-by-module cutover.\n\nThe result: total downtime during the migration was under 15 minutes, system response time improved by 60%, and the client can now scale automatically during peak seasons without manually provisioning servers.",
                ],
                'accent' => 'sky',
                'reading_minutes' => 6,
                'published_at' => Carbon::parse('2026-04-14'),
            ],
            [
                'blog_category_id' => $categoryIdByKey['tips-tutorials'] ?? null,
                'title' => [
                    'id' => 'Cara Memilih Vendor IT Development yang Tepat',
                    'en' => 'How to Choose the Right IT Development Vendor',
                ],
                'slug' => [
                    'id' => 'cara-memilih-vendor-it-development-yang-tepat',
                    'en' => 'how-to-choose-the-right-it-development-vendor',
                ],
                'excerpt' => [
                    'id' => 'Memilih partner teknologi yang salah bisa mahal — dari segi waktu maupun biaya. Berikut hal-hal yang perlu Anda cek sebelum berkomitmen.',
                    'en' => 'Choosing the wrong technology partner can be costly — in both time and money. Here are the things to check before you commit.',
                ],
                'body' => [
                    'id' => "Memilih vendor development bukan sekadar membandingkan harga. Berikut beberapa hal yang perlu Anda perhatikan.\n\nPertama, lihat portofolio dan studi kasus mereka — apakah pernah mengerjakan proyek dengan kompleksitas serupa dengan kebutuhan Anda?\n\nKedua, tanyakan bagaimana proses komunikasi selama proyek berjalan. Vendor yang baik memberikan update rutin dan transparan mengenai progres, bukan hanya di akhir proyek.\n\nKetiga, pastikan ada kejelasan mengenai kepemilikan kode dan dokumentasi setelah proyek selesai — ini penting agar Anda tidak terkunci pada satu vendor selamanya.\n\nKeempat, cek dukungan pasca-peluncuran. Aplikasi yang baik butuh maintenance berkelanjutan, jadi pastikan vendor Anda menawarkan paket dukungan jangka panjang.\n\nTerakhir, percayai insting Anda — komunikasi yang lancar dan responsif di awal biasanya mencerminkan bagaimana proyek akan berjalan ke depannya.",
                    'en' => "Choosing a development vendor isn't just about comparing prices. Here are a few things worth checking.\n\nFirst, look at their portfolio and case studies — have they handled projects with a complexity similar to what you need?\n\nSecond, ask about their communication process during a project. A good vendor gives regular, transparent progress updates, not just a report at the very end.\n\nThird, make sure there's clarity around code ownership and documentation once the project wraps up — this matters so you're not locked into one vendor forever.\n\nFourth, check their post-launch support. A good application needs ongoing maintenance, so make sure your vendor offers a long-term support plan.\n\nFinally, trust your instincts — smooth, responsive communication early on usually reflects how the rest of the project will go.",
                ],
                'accent' => 'amber',
                'reading_minutes' => 4,
                'published_at' => Carbon::parse('2026-03-28'),
            ],
            [
                'blog_category_id' => $categoryIdByKey['tips-tutorials'] ?? null,
                'title' => [
                    'id' => 'Mengapa UI/UX yang Baik Meningkatkan Konversi Bisnis Anda',
                    'en' => 'Why Good UI/UX Increases Your Business Conversions',
                ],
                'slug' => [
                    'id' => 'mengapa-ui-ux-yang-baik-meningkatkan-konversi-bisnis',
                    'en' => 'why-good-ui-ux-increases-your-business-conversions',
                ],
                'excerpt' => [
                    'id' => 'Desain yang indah saja tidak cukup — UI/UX yang baik adalah tentang menghilangkan friksi antara pengguna dan tujuan mereka.',
                    'en' => "Beautiful design alone isn't enough — good UI/UX is about removing friction between users and their goals.",
                ],
                'body' => [
                    'id' => "Banyak bisnis berinvestasi besar pada traffic (iklan, SEO, media sosial) tapi mengabaikan pengalaman pengguna di website atau aplikasi mereka. Hasilnya, traffic tinggi tapi konversi tetap rendah.\n\nUI/UX yang baik menghilangkan friksi — mengurangi jumlah klik yang dibutuhkan pengguna untuk mencapai tujuan mereka, entah itu membeli produk, mengisi formulir, atau menghubungi tim sales.\n\nRiset pengguna membantu kita memahami di mana pengguna sebenarnya kebingungan atau frustrasi — sesuatu yang sering tidak terlihat hanya dari data analytics.\n\nDesain yang konsisten (design system) juga membangun kepercayaan bawah sadar — pengguna merasa produk Anda dapat diandalkan hanya dari konsistensi visualnya.\n\nInvestasi pada UI/UX bukan biaya kosmetik — ini investasi langsung pada tingkat konversi dan retensi pengguna Anda.",
                    'en' => "Many businesses invest heavily in traffic (ads, SEO, social media) but neglect the user experience on their website or app. The result: high traffic, but conversions stay low.\n\nGood UI/UX removes friction — reducing the number of clicks a user needs to reach their goal, whether that's buying a product, filling out a form, or contacting sales.\n\nUser research helps us understand where users actually get confused or frustrated — something that often doesn't show up in analytics data alone.\n\nConsistent design (a design system) also builds subconscious trust — users feel your product is reliable just from its visual consistency.\n\nInvesting in UI/UX isn't a cosmetic cost — it's a direct investment in your conversion and retention rates.",
                ],
                'accent' => 'violet',
                'reading_minutes' => 4,
                'published_at' => Carbon::parse('2026-03-10'),
            ],
            [
                'blog_category_id' => $categoryIdByKey['case-studies'] ?? null,
                'title' => [
                    'id' => 'Studi Kasus: Meningkatkan Performa Aplikasi E-Commerce 3x Lebih Cepat',
                    'en' => 'Case Study: Making an E-Commerce App 3x Faster',
                ],
                'slug' => [
                    'id' => 'studi-kasus-meningkatkan-performa-ecommerce-3x-lebih-cepat',
                    'en' => 'case-study-making-an-ecommerce-app-3x-faster',
                ],
                'excerpt' => [
                    'id' => 'Waktu loading yang lambat membuat klien kami kehilangan penjualan saat traffic tinggi. Ini cara kami mempercepatnya tanpa merombak seluruh sistem.',
                    'en' => "Slow load times were costing our client sales during high-traffic periods. Here's how we sped things up without rebuilding the whole system.",
                ],
                'body' => [
                    'id' => "Klien e-commerce kami mengalami waktu loading rata-rata 4.8 detik pada halaman produk saat traffic tinggi — angka yang berdampak langsung pada tingkat pentalan (bounce rate) dan penjualan.\n\nTim kami melakukan profiling menyeluruh dan menemukan tiga bottleneck utama: query database yang tidak efisien, gambar produk yang tidak dioptimasi, dan tidak adanya caching di layer aplikasi.\n\nKami mengoptimasi query dengan indexing yang tepat, menerapkan lazy loading dan kompresi gambar otomatis, serta menambahkan caching di level aplikasi dan CDN untuk aset statis.\n\nDalam dua minggu, waktu loading rata-rata turun menjadi 1.6 detik — peningkatan performa 3x lipat — tanpa perlu merombak arsitektur sistem yang sudah ada.",
                    'en' => "Our e-commerce client was seeing an average load time of 4.8 seconds on product pages during high traffic — a number with a direct impact on bounce rate and sales.\n\nOur team ran a thorough profiling pass and found three main bottlenecks: inefficient database queries, unoptimized product images, and no caching at the application layer.\n\nWe optimized queries with proper indexing, implemented lazy loading and automatic image compression, and added application-level caching plus a CDN for static assets.\n\nWithin two weeks, average load time dropped to 1.6 seconds — a 3x performance improvement — without having to rebuild the existing system architecture.",
                ],
                'accent' => 'sky',
                'reading_minutes' => 5,
                'published_at' => Carbon::parse('2026-02-18'),
            ],
            [
                'blog_category_id' => $categoryIdByKey['technology'] ?? null,
                'title' => [
                    'id' => 'Tren Teknologi Web Development yang Wajib Diketahui di 2026',
                    'en' => 'Web Development Trends You Need to Know in 2026',
                ],
                'slug' => [
                    'id' => 'tren-teknologi-web-development-2026',
                    'en' => 'web-development-trends-2026',
                ],
                'excerpt' => [
                    'id' => 'Dari AI-assisted development hingga edge computing — berikut tren yang membentuk cara kami membangun aplikasi web tahun ini.',
                    'en' => "From AI-assisted development to edge computing — here are the trends shaping how we build web applications this year.",
                ],
                'body' => [
                    'id' => "Industri web development terus berevolusi. Berikut beberapa tren yang kami perhatikan sepanjang tahun ini.\n\nAI-assisted development kini menjadi bagian dari workflow harian tim engineering — mempercepat penulisan kode boilerplate sehingga developer bisa fokus pada logika bisnis yang kompleks.\n\nEdge computing semakin populer untuk aplikasi yang membutuhkan latensi rendah, memindahkan sebagian komputasi lebih dekat ke pengguna alih-alih selalu bergantung pada server pusat.\n\nFramework full-stack seperti React Server Components semakin matang, mengurangi kompleksitas dalam membangun aplikasi yang cepat dan SEO-friendly sekaligus.\n\nTerakhir, kesadaran akan keamanan siber semakin meningkat — praktik seperti zero-trust architecture kini bukan lagi opsional, terutama untuk aplikasi yang menangani data pengguna sensitif.",
                    'en' => "The web development industry keeps evolving. Here are a few trends we've been watching closely this year.\n\nAI-assisted development is now part of the daily workflow for engineering teams — speeding up boilerplate code so developers can focus on complex business logic.\n\nEdge computing is gaining traction for applications that need low latency, moving some computation closer to the user instead of always relying on a central server.\n\nFull-stack frameworks like React Server Components are maturing fast, reducing the complexity of building apps that are both fast and SEO-friendly.\n\nFinally, cybersecurity awareness keeps rising — practices like zero-trust architecture are no longer optional, especially for applications handling sensitive user data.",
                ],
                'accent' => 'emerald',
                'reading_minutes' => 5,
                'published_at' => Carbon::parse('2026-01-25'),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(['slug->id' => $post['slug']['id']], $post);
        }
    }
}
