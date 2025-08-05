<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        Schema::create('report_logs', function (Blueprint $table) {
            $table->id();
            $table->timestamp('sent_at');
            $table->integer('total_orders');
            $table->decimal('total_revenue', 10, 2);
        });
    }

    public function down(): void {
        Schema::dropIfExists('report_logs');
    }
};
