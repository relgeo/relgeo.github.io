---
title: Aplikasi Desktop
description: Surface workbench lokal yang lebih kaya daripada playground browser.
---

`Desktop App` atau `Workbench` adalah nama untuk surface lokal yang lebih kaya daripada Playground web.

Halaman ini sengaja ditulis dengan jujur:

1. arahnya sudah jelas
2. bukti audit dan strategy-nya sudah cukup banyak
3. tetapi source package surface ini belum hidup sebagai package aktif di workspace yang sama seperti docs-site

## Cara Memahami Surface Ini

Surface ini diposisikan sebagai:

1. richer local workbench
2. lebih kaya secara UX daripada Playground
3. lebih layak membawa preference system yang lebih menetap

Jika Playground adalah IDE browser ringan, maka Desktop App adalah workbench lokal yang lebih berat dan lebih personal.

## Boundary Dengan Playground

Perbedaan sehat yang perlu dijaga:

1. Playground fokus pada authoring cepat dan inspection cepat
2. Desktop App boleh membawa state dan preference yang lebih kaya
3. Playground tidak perlu meniru seluruh model UX workbench lokal

## Status Saat Ini

Berdasarkan strategy dan audit repo:

1. surface ini sering disebut sebagai Flutter workbench
2. arah dan boundary-nya sudah cukup banyak dibahas
3. ada evidence audit bahwa surface ini bukan sekadar ide
4. tetapi ia belum tampil di workspace aktif ini sebagai package app publik yang rapi

Karena itu, halaman ini belum menjadi panduan penggunaan mendalam. Ia baru menjadi slot dokumentasi resmi agar boundary surface-nya jelas dari sekarang.

## Kenapa Halaman Ini Tetap Penting

Tanpa halaman ini, pembaca luar bisa salah memahami bahwa:

1. Playground adalah satu-satunya surface interaktif
2. atau semua workbench kaya nanti akan sekadar ditumpuk ke web playground

Padahal arah sehatnya bukan begitu.

## Status Dokumentasi

Ke depan, surface ini sebaiknya punya rumah dokumentasi yang lebih dekat dengan repo atau package workbench aktifnya sendiri.

Untuk saat ini, website hanya membakukan:

1. peran surface ini
2. boundary-nya terhadap Playground
3. posisinya dalam arsitektur produk RelGeo

## Lanjut Membaca

1. baca [Playground](/id/docs/playground/) untuk surface browser yang ringan
2. baca [CLI](/id/docs/cli/) untuk automation terminal
3. baca [Current Capabilities](/id/current-capabilities/) untuk melihat bagaimana surface ini diposisikan di level produk
