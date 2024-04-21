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
        Schema::create('profaktura', function (Blueprint $table) {
            $table->id(); 
            $table->date('datum');
            $table->double('PDV');
            $table->double('ukupanIznos');
            $table->unsignedBigInteger('dobavljac_id');

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
        Schema::dropIfExists('profaktura');
    }
};
