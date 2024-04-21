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
        Schema::create('faktura', function (Blueprint $table) {
            $table->id();
            $table->text('napomena');
            $table->date('datum');
            $table->unsignedBigInteger('spediter_id');
            $table->unsignedBigInteger('dobavljac_id');
            

            $table->foreign('spediter_id')
            ->references('id')
            ->on('spediter')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('dobavljac_id')
            ->references('id')
            ->on('dobavljac')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faktura');
    }
};
