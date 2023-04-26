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
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->string('nip', 100)->nullable();
            $table->string('fullname', 255);
            $table->string('tempat_lahir', 255)->nullable();
            $table->string('tanggal_lahir', 255)->nullable();
            $table->string('jenis_kelamin', 255)->nullable();
            $table->string('alamat', 255)->nullable();
            $table->string('picture', 255)->nullable();
            $table->string('no_HP', 100)->nullable();
            $table->string('npwp', 100)->nullable();

            // relasi table groups
            $table->unsignedBigInteger('group_id');
            $table->foreign('group_id')->references('id')->on('groups');

            // relasi table echelons
            $table->unsignedBigInteger('echelon_id');
            $table->foreign('echelon_id')->references('id')->on('echelons');

            // relasi table positions
            $table->unsignedBigInteger('position_id');
            $table->foreign('position_id')->references('id')->on('positions');

            $table->string('tempat_tugas');

            // relasi table religions
            $table->unsignedBigInteger('religion_id');
            $table->foreign('religion_id')->references('id')->on('religions');

            // relasi table work_units
            $table->unsignedBigInteger('work_unit_id');
            $table->foreign('work_unit_id')->references('id')->on('work_units');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};
