<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('transaksi')->insert([
            [
                'id' => 1,
                'user_id' => 2,
                'kode_transaksi' => 'TRX001',
                'nama_penerima' => 'Budi',
                'alamat_pengiriman' => 'Jl. Mawar No. 1',
                'biaya_pengiriman' => 5000.00,
                'total' => 41000.00,
                'metode_pembayaran' => 'tunai',
                'uang_tunai' => 50000.00,
                'created_at' => '2025-07-11 07:41:40',
                'waktu_bayar' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'kode_transaksi' => 'TRX002',
                'nama_penerima' => 'Ani',
                'alamat_pengiriman' => 'Jl. Melati No. 2',
                'biaya_pengiriman' => 0.00,
                'total' => 36000.00,
                'metode_pembayaran' => 'non-tunai',
                'uang_tunai' => null,
                'created_at' => '2025-07-11 07:41:40',
                'waktu_bayar' => '2025-07-11 07:41:40',
            ],
        ]);
    }
}

