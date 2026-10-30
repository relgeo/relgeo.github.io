# RelGeo brand mark

**Status:** mark global RelGeo; pemakaian pertama pada icon desktop  
**Master asset:** [`public/brand/relgeo-mark.png`](../../public/brand/relgeo-mark.png)

Gambar master di atas adalah mark resmi RelGeo. Ia dimiliki identitas global
RelGeo, bukan salah satu aplikasi. Wordmark “RelGeo” yang sudah digunakan
website tetap menjadi wordmark terpisah dan dapat dipasangkan dengan mark ini.

## Aturan penggunaan

- Pertahankan bentuk, warna, proporsi, dan transparansi dari master asset.
- File icon khusus platform boleh diubah ukurannya dan diberi padding transparan
  agar sesuai dengan format icon OS; jangan menggambar ulang atau mengubah warna.
- Jangan meratakan gambar ke latar hitam. Transparansi merupakan bagian dari
  asset.
- Aplikasi desktop Flutter adalah pemakai pertama. Penggunaan pada favicon,
  halaman website, Playground, dokumentasi, dan surface lain menyusul melalui
  perubahan terpisah.
- Simpan hasil turunan di repository pemilik platform; master asset tetap di
  repository website RelGeo ini.

## Pemakaian awal

Turunan icon desktop tersedia pada repository `relgeo/flutter`:

- macOS: `macos/Runner/Assets.xcassets/AppIcon.appiconset/`;
- Windows: `windows/runner/resources/app_icon.ico`;
- Linux: `linux/runner/resources/relgeo-icon.png`.

Linux runner memasang PNG ke bundle desktop agar window icon dapat dimuat saat
aplikasi diluncurkan dari direktori mana pun.
