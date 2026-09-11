---
title: Language Status
description: Menjelaskan mana source normatif aktif, mana surface publik Inggris, dan arah sinkronisasinya.
---

Halaman ini menjelaskan status bahasa publik untuk dokumentasi RelGeo saat ini.

## Ringkasan Singkat

Saat ini:

1. source normatif aktif berada di repository `relgeo/spec` pada folder `id/`
2. surface publik bahasa Inggris sedang disiapkan di repository `relgeo/spec` pada folder `en/`
3. docs-site memakai route publik yang stabil, walau source internal aktif tetap berada di pohon `id/`

Artinya, implementasi repo, audit, dan kontrak bahasa aktif masih merujuk ke dokumen Indonesia.

RelGeo sendiri sudah bergerak dengan kontrak aktif `v0.5`. Yang sedang dibedakan di halaman ini bukan versi bahasa DSL-nya, melainkan status editorial dan status bahasa publik dokumentasinya.

## Versi Package Dan Versi DSL

Angka versi package atau release, misalnya `0.4.0` atau `0.5.0`, adalah metadata distribusi masing-masing package. Angka tersebut tidak sama dengan versi kontrak bahasa `RelGeo DSL v0.5`. Package dapat memiliki ritme rilis sendiri selama tetap mengikuti kontrak DSL yang berlaku.

## Mengapa `id` Masih Menjadi Rumah Normatif

Alasannya sederhana:

1. pohon `id/` adalah dokumen yang paling matang dan paling selaras dengan implementasi aktif
2. sejarah delta dan audit yang sudah ada juga merujuk ke pohon ini
3. menjaga satu rumah normatif aktif mengurangi risiko drift saat bahasa Inggris belum lengkap

Keputusan ini bukan berarti bahasa Inggris kurang penting. Ini hanya urutan pematangan.

## Apa Status `en` Saat Ini

Folder source `en/` dan surface `/en/...` disiapkan untuk:

1. akses publik yang lebih luas
2. docs-site bilingual
3. persiapan repo spec terpisah di masa depan

Namun untuk saat ini, `en/` belum mengambil alih status normatif dari `id/`.

Jika ada perbedaan sementara:

1. `id/` tetap dianggap benar untuk kontrak aktif
2. `en/` harus dibaca sebagai surface publik yang sedang didekatkan ke kontrak aktif

Prinsip praktisnya:

1. jangan menebak aturan bahasa aktif dari `en/` jika ada detail yang belum sinkron
2. gunakan `en/` untuk akses publik, orientasi awal, dan docs-site bilingual
3. gunakan `id/` bila Anda sedang memeriksa detail kontrak implementasi, audit, atau keputusan semantics terbaru

## Bagaimana Sinkronisasinya Ke Depan

Arah yang ingin dijaga:

1. perubahan semantik masuk ke rumah normatif aktif terlebih dahulu
2. setelah itu, surface Inggris diselaraskan
3. route publik docs-site tidak perlu berubah walau source nanti dipindah ke repo spec terpisah

Dengan kata lain, yang ingin distabilkan adalah:

1. kontrak bahasa
2. route publik
3. boundary editorial

Bukan lokasi repo yang sekarang.

## Apa Dampaknya ke Pembaca dan Kontributor

Jika Anda membaca RelGeo sebagai pengguna luar:

1. Anda tetap bisa memakai route publik `/id/...` dan `/en/...` dengan stabil
2. Anda tidak perlu mengikuti struktur repo internal untuk memahami posisi dokumen
3. bila ada ketegangan antara narasi publik dan detail kontrak, pohon normatif aktif tetap menjadi rujukan final

Jika Anda berkontribusi ke spec:

1. perubahan semantics masuk ke rumah normatif aktif dulu
2. perubahan editorial atau perapian public surface bisa mengikuti setelahnya
3. target akhirnya adalah dua bahasa publik yang sama kuat, bukan dua rumah normatif yang saling bersaing

## Untuk Pembaca Luar

Jika Anda ingin:

1. melihat kontrak bahasa aktif sekarang, buka `language-spec`
2. memahami cara RelGeo hidup di Markdown, baca `Markdown Surfaces`
3. mengikuti arah bilingual dan public surface, gunakan halaman ini sebagai konteks
4. memahami alasan produk dan problem framing-nya, lanjut ke `Why RelGeo`
