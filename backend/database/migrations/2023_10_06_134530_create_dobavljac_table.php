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
        Schema::create('dobavljac', function (Blueprint $table) {
            $table->id();
            $table->string('naziv_dobavljaca');
            $table->string('email_dobavljaca');
            $table->string('adresa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dobavljac');
    }
};
