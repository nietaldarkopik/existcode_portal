<?php

use App\Http\Controllers\Api\V1\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\V1\Admin\BlogCategoryController as AdminBlogCategoryController;
use App\Http\Controllers\Api\V1\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Api\V1\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Api\V1\Admin\ImageUploadController as AdminImageUploadController;
use App\Http\Controllers\Api\V1\Admin\NewsPostController as AdminNewsPostController;
use App\Http\Controllers\Api\V1\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\V1\Admin\PricingPlanController as AdminPricingPlanController;
use App\Http\Controllers\Api\V1\Admin\SeoSettingController as AdminSeoSettingController;
use App\Http\Controllers\Api\V1\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\V1\Admin\ThemeSettingController as AdminThemeSettingController;
use App\Http\Controllers\Api\V1\BlogCategoryController;
use App\Http\Controllers\Api\V1\BlogPostController;
use App\Http\Controllers\Api\V1\ContactMessageController;
use App\Http\Controllers\Api\V1\InvoiceController;
use App\Http\Controllers\Api\V1\NewsPostController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\PricingPlanController;
use App\Http\Controllers\Api\V1\SeoSettingController;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\ThemeSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', fn () => response()->json(['status' => 'ok']));

    Route::post('admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:10,1');

    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
        Route::get('/me', fn (Illuminate\Http\Request $request) => $request->user());
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        Route::apiResource('services', AdminServiceController::class);
        Route::apiResource('pricing-plans', AdminPricingPlanController::class);
        Route::apiResource('blog-categories', AdminBlogCategoryController::class);
        Route::apiResource('blog-posts', AdminBlogPostController::class);
        Route::apiResource('news-posts', AdminNewsPostController::class);
        Route::apiResource('orders', AdminOrderController::class)->only(['index', 'show', 'update']);
        Route::apiResource('contact-messages', AdminContactMessageController::class)->only(['index', 'show', 'update']);

        Route::get('/settings/theme', [AdminThemeSettingController::class, 'show']);
        Route::put('/settings/theme', [AdminThemeSettingController::class, 'update']);

        Route::get('/settings/seo', [AdminSeoSettingController::class, 'show']);
        Route::put('/settings/seo', [AdminSeoSettingController::class, 'update']);

        Route::post('/uploads/image', [AdminImageUploadController::class, 'store']);
    });

    // Public, read-only company-profile content. Slug columns are locale-JSON
    // now (e.g. slug->id vs slug->en), so these are plain string params looked
    // up manually per-locale in the controller rather than implicit bindings.
    Route::get('services', [ServiceController::class, 'index']);
    Route::get('services/{slug}', [ServiceController::class, 'show']);

    Route::get('pricing-plans', [PricingPlanController::class, 'index']);
    Route::get('pricing-plans/{slug}', [PricingPlanController::class, 'show']);

    Route::get('blog-categories', [BlogCategoryController::class, 'index']);
    Route::get('blog-posts', [BlogPostController::class, 'index']);
    Route::get('blog-posts/{slug}', [BlogPostController::class, 'show']);

    Route::get('news-posts', [NewsPostController::class, 'index']);
    Route::get('news-posts/{slug}', [NewsPostController::class, 'show']);

    Route::get('settings/theme', [ThemeSettingController::class, 'show']);
    Route::get('settings/seo', [SeoSettingController::class, 'show']);

    // Guest mutations — behind Sanctum's statefulApi() CSRF check, throttled.
    Route::middleware('throttle:10,1')->group(function () {
        Route::post('contact-messages', [ContactMessageController::class, 'store']);

        Route::post('orders', [OrderController::class, 'store']);
        Route::get('orders/{order:order_number}', [OrderController::class, 'show']);

        Route::get('invoices/{invoice:invoice_number}', [InvoiceController::class, 'show']);
        Route::post('invoices/{invoice:invoice_number}/confirm-payment', [InvoiceController::class, 'confirmPayment']);
    });
});
