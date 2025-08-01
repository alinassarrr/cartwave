<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->enum('action', ['update_status', 'cancel_order', 'edit_order']);
            $table->enum('old_status', ['Pending', 'Paid', 'Packed', 'Shipped'])->nullable();
            $table->enum('new_status', ['Pending', 'Paid', 'Packed', 'Shipped'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('audit_logs');
    }
};
