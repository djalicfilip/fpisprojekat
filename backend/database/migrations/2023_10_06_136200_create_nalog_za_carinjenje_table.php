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
        Schema::create('nalog_za_carinjenje', function (Blueprint $table) {
            $table->id();
            $table->date('datumNaloga');
            $table->text('sadrzajNaloga');
            $table->unsignedBigInteger('zaposleni_id');
            $table->unsignedBigInteger('faktura_id');
            $table->unsignedBigInteger('spediter_id');

            $table->foreign('zaposleni_id')
            ->references('id')
            ->on('zaposleni')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('faktura_id')
            ->references('id')
            ->on('faktura')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('spediter_id')
            ->references('id')
            ->on('spediter')
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
        Schema::dropIfExists('nalog_za_carinjenje');
    }
};
