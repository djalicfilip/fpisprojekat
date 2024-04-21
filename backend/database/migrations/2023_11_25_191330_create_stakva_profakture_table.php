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
        Schema::create('stavka_profakture', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->integer('kolicina');
            $table->decimal('iznos', 8, 2);
            $table->unsignedBigInteger('proizvod_id');
            $table->unsignedBigInteger('profaktura_id');

            $table->primary(['id', 'profaktura_id']);

            $table->foreign('proizvod_id')
            ->references('id')
            ->on('proizvod')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('profaktura_id')
            ->references('id')
            ->on('profaktura')
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
        Schema::dropIfExists('stavka_profakture');
    }
};
