<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('total', 10, 2);
            $table->decimal('shipping_price', 10, 2)->default(0.00);
            $table->enum('status', ['pending', 'paid', 'packed', 'shipped'])->default('pending');
            $table->timestamps();
            $table->index('created_at');
            $table->index('status');
        });
    }
    
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
