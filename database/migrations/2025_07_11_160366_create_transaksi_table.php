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
        Schema::create('transaksi', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->index('fk_transaksi_user');
            $table->string('kode_transaksi')->unique();
            $table->string('nama_penerima', 100);
            $table->string('no_wa', 15)->nullable();
            $table->string('alamat_pengiriman', 255)->nullable();
            $table->decimal('biaya_pengiriman', 12, 2)->nullable();
            $table->decimal('total', 15, 2);
            $table->string('metode_pembayaran', 20);
            $table->decimal('uang_tunai', 12, 2)->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('waktu_bayar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
