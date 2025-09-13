<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Inertia\Inertia;
use App\Models\DetailTransaksi;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Member;
date_default_timezone_set('Asia/Jakarta');


class TransaksiController extends Controller
{
    public function index()
    {
        $transaksi = Transaksi::with([
            'detail.produk:id,nama,harga,gambar',
            'member:id,nama'
        ])->get();

        return Inertia::render('transaksi', [
            'transaksi' => $transaksi,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'nama_penerima' => 'required|string',
            'no_wa' => 'nullable|integer',
            'alamat_pengiriman' => 'nullable|string',
            'biaya_pengiriman' => 'nullable|numeric',
            'total' => 'required|numeric',
            'pembayaran' => 'required|in:tunai,non-tunai',
            'uang_tunai' => 'nullable|numeric',
            'transaksi' => 'required|array|min:1',
            'transaksi.*.produk_id' => 'required|exists:produk,id',
            'transaksi.*.qty' => 'required|integer|min:1',
            'transaksi.*.harga' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $transaksi = Transaksi::create([
                'kode_transaksi'     => 'INV' . date('YmdHis'),
                'total'              => $request->total,
                'user_id'            => Auth::id(),
                'metode_pembayaran'  => $request->pembayaran,
                'nama_penerima'      => $request->nama_penerima,
                'no_wa'              => $request->no_wa,
                'alamat_pengiriman'  => $request->alamat_pengiriman,
                'biaya_pengiriman'   => $request->biaya_pengiriman,
                'uang_tunai'         => $request->uang_tunai,
                'created_at'         => now(),
                'waktu_bayar'        => now(),
            ]);

            $details = [];
            foreach ($request->transaksi as $item) {
                $details[] = [
                    'transaksi_id' => $transaksi->id,
                    'produk_id'    => $item['produk_id'],
                    'qty'          => $item['qty'],
                    'harga'        => $item['harga'],
                    'created_at'   => now(),
                    'waktu_bayar'  => now(),
                ];
            }

            DetailTransaksi::insert($details);

            DB::commit();

            return redirect()->route('kasir')->with('message', 'Transaksi berhasil!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
    public function lunas($id)
    {
        $trx = Transaksi::findOrFail($id);
        $trx->status = 'paid';
        $trx->waktu_bayar = now();
        $trx->save();

        return back()->with('success', 'Transaksi berhasil ditandai lunas.');
    }
}
