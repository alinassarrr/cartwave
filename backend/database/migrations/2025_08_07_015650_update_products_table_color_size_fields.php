<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop the enum columns
            $table->dropColumn(['color', 'size']);
        });

        Schema::table('products', function (Blueprint $table) {
            // Add new nullable string columns
            $table->string('color')->nullable();
            $table->string('size')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop the new columns
            $table->dropColumn(['color', 'size']);
        });

        Schema::table('products', function (Blueprint $table) {
            // Restore the original enum columns
            $table->enum('color', ['Red', 'Blue', 'Black', 'White']);
            $table->enum('size', ['S', 'M', 'L', 'XL']);
        });
    }
};
