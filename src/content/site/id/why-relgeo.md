---
title: Why RelGeo
description: Mengapa authoring vektor relation-first itu penting.
---

RelGeo lahir dari kebutuhan menulis gambar vektor sebagai teks yang:

1. tetap bisa dibaca manusia
2. tetap bisa diproses mesin
3. tetap deterministik saat parameter atau data input berubah

Fokus awalnya adalah technical drawing karena domain ini menuntut ketelitian tinggi,
tetapi identitas RelGeo tidak dibatasi oleh satu domain itu saja.

## Masalah yang Ingin Diselesaikan

RelGeo tumbuh dari tiga kebutuhan yang saling terkait:

1. gambar vektor bebas yang bisa hidup langsung di dokumen markdown, bukan hanya sebagai gambar ekspor
2. gambar teknik yang mendokumentasikan dirinya sendiri, sehingga koordinat, relasi, dan perhitungan tetap terbaca sebagai source
3. satu aturan gambar yang tetap bisa dipakai ulang ketika parameter atau data input berubah

RelGeo tidak dibangun sebagai renderer baru yang kebetulan punya syntax. RelGeo dibangun untuk menjaga intent authoring tetap hidup di source.

## Kenapa Relation-First

Pada banyak alur gambar biasa, hasil akhir cepat terlihat tetapi alasan di balik bentuknya cepat hilang. RelGeo mengambil arah sebaliknya:

1. author menulis relasi, bukan hanya koordinat akhir
2. geometri final dihasilkan dari kontrak yang sama
3. perubahan parameter tidak memutus makna gambar

Pendekatan ini membuat source lebih dekat ke cara manusia menjelaskan gambar teknis:
"bagian ini berada di tengah panel", "lubang ini berjarak sama", "garis ini muncul dari hasil query geometri", bukan sekadar daftar angka final.

## Kenapa Technical Drawing Didahulukan

Technical drawing dipilih sebagai domain awal karena ia adalah ujian keras yang baik:

1. perlu presisi
2. perlu determinisme
3. perlu intent yang jelas
4. tidak memberi banyak ruang untuk hasil yang "kira-kira benar"

Kekuatan di domain ini memberi dasar yang lebih sehat untuk perluasan ke domain lain.

## Namun RelGeo Tidak Sempit

Technical drawing adalah lapisan pendalaman pertama, bukan batas identitas produk.

Visi yang dijaga tetap lebih luas:

1. bahasa vektor relation-first yang nyaman hidup di medium teks
2. source yang tetap terbaca manusia dan mesin
3. gambar yang bisa berpindah antara niat baca source dan niat lihat hasil render

Karena itu route markdown, docs-site, dan plugin embed diperlakukan serius sejak awal.
