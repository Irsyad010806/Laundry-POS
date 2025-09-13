import React, { useState, useRef, useEffect } from "react";
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import QRCodePembayaran from '../components/qrcodepaymentmodal';
import { LogOut } from "lucide-react";

const kategoriList = [
                { id: 'kiloan', nama: 'Cuci Kiloan', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mr-2">
                                    <path fill="currentColor" d="m50.73 121l49.57 62h311.4l49.6-62zM245 201v46h22v-46zm-126 64L75.53 439H436.5L393 265zm137 14c40.2 0 73 32.8 73 73s-32.8 73-73 73s-73-32.8-73-73s32.8-73 73-73m0 18c-30.5 0-55 24.5-55 55s24.5 55 55 55s55-24.5 55-55s-24.5-55-55-55m16 12.5l-5.9 65.7l-30.2-10.5zM41 457v30h430v-30z"/>
                                    </svg>},
                { id: 'satuan', nama: 'Satuan', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="w-6 h-6 mr-2">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M9 3a2 2 0 1 0-2 2v1m0 0l-6 4.6a1.32 1.32 0 0 0-.5 1.06A1.34 1.34 0 0 0 1.84 13h10.32a1.34 1.34 0 0 0 1.34-1.34a1.32 1.32 0 0 0-.5-1.06Z"/>
                                    </svg>},
                { id: 'setrika', nama: 'Setrika Saja', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                                    <path fill="currentColor" d="M21 6c-1.66 0-3 1.34-3 3v4c0 .55-.45 1-1 1v-4c0-1.66-1.34-3-3-3h-4c-1.66 0-3 1.34-3 3h2c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1H6c-2.21 0-4 1.79-4 4v3h15v-2c1.66 0 3-1.34 3-3V9c0-.55.45-1 1-1h1V6zm-6 10H4v-1c0-1.1.9-2 2-2h9z"/>
                                    </svg>},
                { id: 'karpet', nama: 'Karpet & Gorden', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 5v14m14 0V8h2M3 8h6m0-2v8.586c0 .89 1.077 1.337 1.707.707l.586-.586a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 0 1.414 0l.586-.586a1 1 0 0 1 1.414 0l.586.586c.63.63 1.707.184 1.707-.707V6a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1Z"/>
                                    </svg>},
                { id: 'khusus', nama: 'Cucian Khusus', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 mr-2"><g fill="currentColor">
                                    <path d="M22 24h-4v-.15c0-.464.354-.85.798-.85h2.404c.436 0 .798.377.798.85zm-3.5-8a.5.5 0 0 0-.5.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-.5-.5zm.5 2.5V17h3v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5M14 24h-4v-.15c0-.464.354-.85.798-.85h2.403c.437 0 .799.377.799.85z"/><path d="M19.482 4H12.5a5.3 5.3 0 0 0-4.873 3.212L1.344 19.298l-.002.004a3.224 3.224 0 0 0 1.377 4.344h.002l2.286 1.189l.004.002c.633.327 1.33.425 1.989.32v3.645c0 1.813 1.478 3.196 3.214 3.196h11.553c1.736 0 3.215-1.383 3.215-3.196v-3.644a3.23 3.23 0 0 0 1.988-.321l.005-.002l2.285-1.188l.003-.001a3.224 3.224 0 0 0 1.376-4.344l-.002-.004l-6.282-12.086A5.3 5.3 0 0 0 19.482 4m3.5 24.802a1.2 1.2 0 0 1-1.215 1.196H16.5V16.861q.09-.053.17-.127l4.947-4.577l.002-.002a1.28 1.28 0 0 0 .139-1.73c.568-.25.856-.902.73-1.472l-.01-.038l-.455-1.722q.325.39.52.867l6.32 12.16c.31.6.08 1.34-.52 1.65l-2.29 1.19c-.348.18-.741.178-1.072.03a1.2 1.2 0 0 1-.579-.55l-.765-1.368c-.176-.315-.655-.19-.655.17zM16.5 15.53v-2.745a1 1 0 0 0 .044-.084L19.39 6c.76 0 1.42.51 1.61 1.24l.51 1.93c.04.18-.09.36-.27.36h-1.13c-.26 0-.39.31-.2.49l1.03.99c.12.11.12.3 0 .41zm-1-2.718v2.731l-4.44-4.123a.28.28 0 0 1 0-.41l1.03-.99c.18-.18.06-.49-.2-.49h-1.13c-.18 0-.32-.18-.27-.36l.49-1.93c.19-.73.85-1.24 1.61-1.24l2.848 6.7q.026.061.06.112m0 4.06v13.126h-5.286A1.2 1.2 0 0 1 9 28.802v-7.46c0-.36-.48-.485-.656-.17L7.58 22.54c-.13.253-.338.44-.58.55c-.33.148-.723.15-1.07-.03l-2.29-1.19c-.6-.31-.83-1.05-.52-1.65L9.44 8.06c.13-.319.307-.613.524-.873l-.44 1.73a1.29 1.29 0 0 0 .724 1.505a1.28 1.28 0 0 0 .135 1.732l4.929 4.579q.088.081.189.138"/></g>
                                    </svg>},
            ]

export interface Produk {
    id: number;
    nama: string;
    harga: number;
    gambar: string;
    kategori: string;
}

interface DashboardProps {
    produk: Produk[];
}

export default function Dashboard({ produk }: DashboardProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [kategoriAktif, setKategoriAktif] = useState<string>('kiloan');
    const [transaksi, setTransaksi] = useState<Array<{ produk: Produk, qty: number }>>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [selectedPayment, setSelectedPayment] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showNonTunaiModal, setShowNonTunaiModal] = useState(false);
    const [uangTunai, setUangTunai] = useState<number | ''>('');
    const [uangTunaiDisplay, setUangTunaiDisplay] = useState('');
    const [loading, setLoading] = useState(false);

    // Pengiriman
    const [namaPenerima, setNamaPenerima] = useState('');
    const [noWhatsApp, setNoWhatsApp] = useState('');
    const [isAlamatAktif, setIsAlamatAktif] = useState(false);
    const [alamatPengiriman, setAlamatPengiriman] = useState('');
    const [biayaPengiriman, setBiayaPengiriman] = useState(10000);

    // Perhitungan total
    const totalSebelumDiskon = transaksi.reduce(
        (total, item) => total + item.produk.harga * item.qty,
        0
    );
    const totalAkhir = totalSebelumDiskon + (isAlamatAktif ? biayaPengiriman : 0);
    const kembalian = Number(uangTunai) - Number(totalAkhir);

    // Produk filter
    const hasilCariProduk = produk.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const produkByKategori = produk.filter(item =>
        item.kategori === kategoriAktif && item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tambah transaksi
    const tambahTransaksi = (produk: Produk) => {
        setTransaksi((prev) => {
            const index = prev.findIndex(item => item.produk.id === produk.id);
            if (index !== -1) {
                const update = [...prev];
                update[index].qty += 1;
                return update;
            }
            return [...prev, { produk, qty: 1 }];
        });
    };

    // Update qty
    const updateQuantity = (produkId: number, newQty: number) => {
        const finalQty = Math.max(0, newQty);
        if (finalQty === 0) {
            setTransaksi(prev => prev.filter(item => item.produk.id !== produkId));
            setQuantities(prev => {
                const newQuantities = { ...prev };
                delete newQuantities[produkId];
                return newQuantities;
            });
        } else {
            setQuantities(prev => ({
                ...prev,
                [produkId]: finalQty
            }));
            setTransaksi(prev =>
                prev.map(item =>
                    item.produk.id === produkId
                        ? { ...item, qty: finalQty }
                        : item
                )
            );
        }
    };

    // Reset pembayaran
    const resetPembayaranTunai = () => {
        setUangTunai('');
        setUangTunaiDisplay('');
        setShowModal(false);
    };

    // Simulasi konfirmasi pembayaran
    const handleKonfirmasiPembayaran = () => {
        setShowModal(false);
        setShowNonTunaiModal(false);
        setLoading(true);

        const dataToSend = {
            nama_penerima: namaPenerima,
            no_wa: noWhatsApp,
            alamat_pengiriman: isAlamatAktif ? alamatPengiriman : null,
            biaya_pengiriman: isAlamatAktif ? biayaPengiriman : 0,
            total: totalAkhir,
            pembayaran: selectedPayment,
            uang_tunai: uangTunai,
            transaksi: transaksi.map(item => ({
                produk_id: item.produk.id,
                qty: item.qty,
                harga: item.produk.harga,
            })),
        };

        router.post('/transaksi', dataToSend, {
    onSuccess: () => {
        setLoading(false);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Transaksi Berhasil.',
        });
        setTransaksi([]);
        setUangTunai('');
        setUangTunaiDisplay('');
        setNamaPenerima('');
        setNoWhatsApp('');
        setAlamatPengiriman('');
        setIsAlamatAktif(false);
    },
    onError: (errors) => {
        setLoading(false);

        // Tampilkan semua error dari server
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            html: Object.values(errors).join('<br>'),
        });
    }
});

    };

    return (
        <div className="flex h-screen w-full bg-white flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center pt-4 px-4 bg-blue-400 py-4">
            <h1 className="text-2xl font-bold text-white">Laundry POS</h1>
            <button
                className="bg-red-500 flex items-center text-white px-4 py-2 rounded hover:bg-red-500 transition hover:scale-105 cursor-pointer"
                onClick={() => router.post('/logout')}
            >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
            </button>
            </div>

            <div className="flex h-full p-4 w-full">
                {/* Katalog Produk */}
                <div className="w-4/6 h-full bg-white rounded-lg p-4 border border-gray-200 shadow-lg">
                    <div className="flex items-center mb-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder='Cari Produk'
                                className="border-gray-300 border p-2 focus:outline-none rounded-md w-full text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full mb-4">
                        {kategoriList.map((kat, idx) => (
                            <button
                                key={kat.id}
                                className={`border text-black py-2 flex items-center justify-center w-full cursor-pointer
                                    ${kategoriAktif === kat.id ? 'bg-blue-400 text-white scale-105' : 'bg-white'}
                                    ${idx === 0 ? 'rounded-l-md' : ''}
                                    ${idx === kategoriList.length - 1 ? 'rounded-r-md' : ''}
                                    ${kategoriAktif === kat.id ? 'rounded-md' : 'rounded-sm'}
                                    transition-all duration-200`}
                                onClick={() => setKategoriAktif(kat.id)}
                            >
                                {kat.icon}
                                {kat.nama}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-4 p-2 [scrollbar-width:thin] overflow-y-auto max-h-[375px] overflow-x-hidden">
                        {(searchTerm.trim() !== '' ? hasilCariProduk : produkByKategori).length > 0 ? (
                            (searchTerm.trim() !== '' ? hasilCariProduk : produkByKategori).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => tambahTransaksi(item)}
                                    className="flex flex-col rounded-sm border hover:scale-105 hover:shadow-md hover:shadow-gray-500 transition-all duration-300 ease-in-out cursor-pointer border-gray-300 w-[120px] h-[140px]"
                                >
                                    <img src={`/images/${item.gambar}`} alt={item.nama} className="object-cover w-full h-20 rounded-t-sm" />
                                    <div className="p-2 rounded-b-sm">
                                        <p className="text-black text-sm font-semibold truncate">{item.nama}</p>
                                        <p className="text-green-500 text-xs">Rp. {item.harga.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-6 flex flex-col justify-center items-center w-full h-[140px]">
                                <p className="text-black text-center">Belum ada produk pada kategori ini</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Keranjang */}
                <div className="border border-gray-200 ml-4 flex-1 relative overflow-x-auto shadow-lg sm:rounded-lg bg-white h-full w-full">
                    <div className="flex-1 overflow-x-hidden overflow-y-auto h-[330px]">
                        <table className="min-w-full table-fixed text-sm text-left text-black">
                            <thead className="text-xs text-black uppercase bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 w-1/5">Product</th>
                                    <th className="px-4 py-3 w-1/5 text-center">Qty</th>
                                    <th className="px-4 py-3 w-1/5">Unit&nbsp;Price</th>
                                    <th className="px-4 py-3 w-1/5">Total&nbsp;Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaksi.map((item, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-100 border-b border-gray-200">
                                        <th className="px-6 py-4 font-medium text-black whitespace-normal truncate overflow-hidden max-w-40">
                                            {item.produk.nama}
                                        </th>
                                        <td className="px-6 py-4 whitespace-normal">
                                            <div className="flex items-center w-full">
                                                <svg onClick={() => updateQuantity(item.produk.id, (quantities[item.produk.id] || item.qty) - 1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer size-4 mr-2">
                                                    <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                                </svg>
                                                <p>{quantities[item.produk.id] || item.qty}</p>
                                                <svg onClick={() => updateQuantity(item.produk.id, (quantities[item.produk.id] || item.qty) + 1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 cursor-pointer ml-2">
                                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-normal">
                                            Rp.&nbsp;{item.produk.harga.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-normal">
                                            Rp.&nbsp;{(item.produk.harga * (Number(quantities[item.produk.id] || item.qty) || item.qty)).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border border-gray-300 bg-gray-100 font-bold w-full absolute bottom-28">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-left text-black">
                                        Subtotal
                                    </td>
                                    <td className="text-right px-6 py-4 text-black">
                                        Rp. {totalSebelumDiskon.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-100 absolute bottom-0 left-0 items-center justify-center m-4 ">
                        <div className="flex mb-4">
                            <label
                                htmlFor="method-tunai"
                                className="flex justify-center items-center w-1/2 text-black cursor-pointer"
                                onClick={() => setSelectedPayment('tunai')}
                            >
                                <input
                                    type="radio"
                                    id="method-tunai"
                                    name="method"
                                    className="mr-2"
                                    checked={selectedPayment === 'tunai'}
                                    onChange={() => setSelectedPayment('tunai')}
                                />
                                Tunai
                            </label>
                            <label
                                htmlFor="method-nontunai"
                                className="flex justify-center items-center w-1/2 text-black cursor-pointer"
                                onClick={() => setSelectedPayment('non-tunai')}
                            >
                                <input
                                    type="radio"
                                    id="method-nontunai"
                                    name="method"
                                    className="mr-2"
                                    checked={selectedPayment === 'non-tunai'}
                                    onChange={() => setSelectedPayment('non-tunai')}
                                />
                                Non Tunai
                            </label>
                        </div>
                        <div className="flex gap-4 w-ful">
                            <button onClick={() => setTransaksi([])} className="flex justify-center bg-transparent text-blue-500 border border-blue-500 rounded-sm items-center px-4 cursor-pointer hover:scale-105 transition-all duration-300">
                                Batalkan&nbsp;Transaksi
                            </button>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-800 hover:scale-105 text-white py-2 cursor-pointer rounded-md"
                                onClick={() => {
                                    if (transaksi.length === 0) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Oops!',
                                            text: 'Silahkan pilih produk terlebih dahulu.',
                                            confirmButtonText: 'OK',
                                        });
                                        return;
                                    }
                                    if (!selectedPayment) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Opps!',
                                            text: 'Silahkan pilih metode pembayaran terlebih dahulu.',
                                            confirmButtonText: 'OK',
                                        });
                                        return;
                                    }
                                    if (selectedPayment === 'tunai') {
                                        setShowModal(true);
                                    } else if (selectedPayment === 'non-tunai') {
                                        setShowNonTunaiModal(true);
                                    }
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Loading */}
            {loading && (
                <div className="flex flex-col items-center text-white text-xl">
                    <svg className="animate-spin h-10 w-10 mb-4" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                    </svg>
                    Memproses Transaksi...
                </div>
            )}
            {/* Modal Tunai */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Pembayaran Tunai</h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex justify-center items-center"
                                onClick={resetPembayaranTunai}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 border-b border-gray-200 max-h-96 overflow-y-auto text-black">
                            {/* Input Nama & Alamat */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Nama Pelanggan</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                    value={namaPenerima}
                                    onChange={e => setNamaPenerima(e.target.value)}
                                    placeholder="Masukkan nama pelanggan"
                                />
                                <label className="block text-gray-700 font-medium mb-1">No WhatsApp</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                    value={noWhatsApp}
                                    onChange={e => setNoWhatsApp(e.target.value)}
                                    placeholder="Masukkan No WhatsApp"
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="alamat-aktif"
                                        checked={isAlamatAktif}
                                        onChange={e => setIsAlamatAktif(e.target.checked)}
                                        className="w-4 h-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="alamat-aktif" className="text-sm text-gray-700 cursor-pointer">
                                        Antar ke rumah?
                                    </label>
                                </div>
                                {isAlamatAktif && (
                                    <div className="space-y-2 mt-2">
                                        <textarea
                                            className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            value={alamatPengiriman}
                                            onChange={e => setAlamatPengiriman(e.target.value)}
                                            placeholder="Masukkan alamat pengiriman"
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Ringkasan */}
                            <h4 className="font-semibold mb-2 mt-4">Ringkasan Checkout</h4>
                            <ul className="text-sm text-black space-y-1">
                                {transaksi.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.qty}x {item.produk.nama}</span>
                                        <span>Rp. {(item.produk.harga * item.qty).toLocaleString('id-ID')}</span>
                                    </li>
                                ))}
                                {isAlamatAktif && (
                                    <li className="flex justify-between">
                                            <span className="text-gray-700 font-medium">Biaya Pengiriman</span>
                                            <span className="text-black">Rp. {biayaPengiriman.toLocaleString('id-ID')}</span>
                                    </li>
                                )}
                            </ul>
                            <div className="flex justify-between font-bold mt-2 text-black">
                                <span>Total:</span>
                                <span>Rp. {totalAkhir.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        {/* Pembayaran */}
                        <div className="p-4 space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Total Harga</span>
                                <span className="text-black font-semibold">Rp. {totalAkhir.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="uangTunai" className="text-gray-700 font-medium">Uang Tunai</label>
                                <input
                                    type="text"
                                    id="uangTunai"
                                    value={uangTunaiDisplay}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/\D/g, '');
                                        if (raw === '') {
                                            setUangTunai('');
                                            setUangTunaiDisplay('');
                                        } else {
                                            const numeric = parseInt(raw, 10);
                                            setUangTunai(numeric);
                                            setUangTunaiDisplay(numeric.toLocaleString('id-ID'));
                                        }
                                    }}
                                    className="border border-gray-300 rounded px-2 py-1 w-40 text-black"
                                    placeholder="Masukkan nominal"
                                />
                            </div>
                            {uangTunai !== '' && (
                                <div>
                                    <div className="flex justify-between">
                                        <span className={`font-medium ${kembalian < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {kembalian < 0 ? 'Uang Kurang' : 'Kembalian'}
                                        </span>
                                        <span className={`font-bold ${kembalian < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            Rp. {Math.abs(kembalian).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded-md cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300"
                                onClick={() => {
                                    if (namaPenerima.trim() === '') {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Oops!',
                                            text: 'Silakan masukkan nama pelanggan!',
                                        });
                                        return;
                                    }
                                    if (uangTunai === '' || Number(uangTunai) < totalAkhir) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Oops!',
                                            text: 'Silakan masukkan nominal pembayaran yang cukup!',
                                        });
                                        return;
                                    }
                                    handleKonfirmasiPembayaran();
                                }}
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Non-Tunai */}
            {showNonTunaiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Pembayaran Non Tunai</h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex justify-center items-center"
                                onClick={() => setShowNonTunaiModal(false)}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 border-b border-gray-200 text-black">
                            {/* Input Nama & Alamat */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Nama Pelanggan</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                    value={namaPenerima}
                                    onChange={e => setNamaPenerima(e.target.value)}
                                    placeholder="Masukkan nama pelanggan"
                                />
                                <label className="block text-gray-700 font-medium mb-1">No WhatsApp</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                    value={noWhatsApp}
                                    onChange={e => setNoWhatsApp(e.target.value)}
                                    placeholder="Masukkan No WhatsApp"
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="alamat-aktif-nontunai"
                                        checked={isAlamatAktif}
                                        onChange={e => setIsAlamatAktif(e.target.checked)}
                                        className="w-4 h-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="alamat-aktif-nontunai" className="text-sm text-gray-700 cursor-pointer">
                                        Antar ke rumah?
                                    </label>
                                </div>
                                {isAlamatAktif && (
                                    <div className="space-y-2 mt-2">
                                        <textarea
                                            className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            value={alamatPengiriman}
                                            onChange={e => setAlamatPengiriman(e.target.value)}
                                            placeholder="Masukkan alamat pengiriman"
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Ringkasan */}
                            <h4 className="font-semibold mb-2 mt-4">Ringkasan Checkout</h4>
                            <ul className="text-sm text-black space-y-1">
                                {transaksi.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.qty}x {item.produk.nama}</span>
                                        <span>Rp. {(item.produk.harga * item.qty).toLocaleString('id-ID')}</span>
                                    </li>
                                ))}
                                {isAlamatAktif && (
                                    <li className="flex justify-between">
                                            <span className="text-gray-700 font-medium">Biaya Pengiriman</span>
                                            <span className="text-black">Rp. {biayaPengiriman.toLocaleString('id-ID')}</span>
                                    </li>
                                )}
                            </ul>
                            <div className="flex justify-between font-bold mt-2 text-black">
                                <span>Total:</span>
                                <span>Rp {totalAkhir.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        {/* QR Code & Konfirmasi */}
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex justify-center">
                                <QRCodePembayaran value="https://simulasi.pembayaran/12345" />
                            </div>
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded-md cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300"
                                onClick={() =>{
                                    if (namaPenerima.trim() === '') {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Oops!',
                                            text: 'Silakan masukkan nama pelanggan!',
                                        });
                                        return;
                                    }
                                    handleKonfirmasiPembayaran();

                                }}
                            >
                                Konfirmasi Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}