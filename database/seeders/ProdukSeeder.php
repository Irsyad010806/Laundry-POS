<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('produk')->insert([
            [
                'id' => 1,
                'nama' => 'Cuci Kiloan Reguler',
                'harga' => 7000,
                'stok' => 100,
                'gambar' => 'kiloan.jpg',
                'kategori' => 'kiloan',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 2,
                'nama' => 'Cuci Kiloan Express',
                'harga' => 12000,
                'stok' => 100,
                'gambar' => 'kiloan-express.jpg',
                'kategori' => 'kiloan',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 3,
                'nama' => 'Cuci Satuan Kemeja',
                'harga' => 6000,
                'stok' => 100,
                'gambar' => 'kemeja.jpg',
                'kategori' => 'satuan',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 4,
                'nama' => 'Cuci Satuan Celana',
                'harga' => 7000,
                'stok' => 100,
                'gambar' => 'celana.jpg',
                'kategori' => 'satuan',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 5,
                'nama' => 'Setrika Saja',
                'harga' => 5000,
                'stok' => 100,
                'gambar' => 'setrika.jpg',
                'kategori' => 'setrika',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 6,
                'nama' => 'Karpet Kecil',
                'harga' => 20000,
                'stok' => 50,
                'gambar' => 'karpet-kecil.jpg',
                'kategori' => 'karpet',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 7,
                'nama' => 'Karpet Besar',
                'harga' => 40000,
                'stok' => 30,
                'gambar' => 'karpet-besar.jpg',
                'kategori' => 'karpet',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 8,
                'nama' => 'Gorden',
                'harga' => 25000,
                'stok' => 20,
                'gambar' => 'gorden.jpg',
                'kategori' => 'karpet',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 9,
                'nama' => 'Jas',
                'harga' => 20000,
                'stok' => 20,
                'gambar' => 'jas.jpg',
                'kategori' => 'khusus',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
            [
                'id' => 10,
                'nama' => 'Bed Cover',
                'harga' => 30000,
                'stok' => 15,
                'gambar' => 'bedcover.jpg',
                'kategori' => 'khusus',
                'created_at' => '2025-07-11 07:41:40',
                'updated_at' => '2025-07-11 07:41:40',
            ],
        ]);
    }
}
