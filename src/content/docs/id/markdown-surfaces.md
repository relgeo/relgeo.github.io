---
title: Markdown Surfaces
description: Perbedaan peran antara fenced code `rg` dan `relgeo` di dokumentasi RelGeo.
---

RelGeo mendukung dua permukaan markdown yang sengaja dibedakan:

1. `rg` untuk membaca source
2. `relgeo` untuk menampilkan hasil render atau embed

Pemisahan ini penting agar pembaca dan author bisa memilih niatnya dengan jelas.

## Kapan memakai `rg`

Gunakan `rg` ketika source RelGeo sendiri adalah bagian dari isi dokumen.

Contohnya:

1. tutorial syntax
2. pembahasan kontrak bahasa
3. review atau audit source
4. artikel yang ingin menunjukkan aturan gambar baris demi baris

Contoh:

```rg
version: 0.5
metaPresets:
  plate:
    fill: "#e2e8f0"
    stroke: "#64748b"
objects:
  panel:
    type: rect
    size: [80, 40]
    place:
      topLeft: [0, 0]
    metaPreset: plate
    holes:
      - circle:
          center: panel.center
          radius: 10
```

Pada mode ini, pembaca diharapkan membaca source sebagai artefak utama.

## Kapan memakai `relgeo`

Gunakan `relgeo` ketika yang harus muncul di dokumen adalah gambar hasil render, bukan code block kedua.

Contohnya:

1. preview gambar di artikel
2. embed hasil gambar di dokumentasi produk
3. halaman yang ingin menunjukkan bahwa RelGeo bisa hidup alami di Markdown

Contoh dengan source yang sama:

```relgeo
version: 0.5
metaPresets:
  plate:
    fill: "#e2e8f0"
    stroke: "#64748b"
objects:
  panel:
    type: rect
    size: [80, 40]
    place:
      topLeft: [0, 0]
    metaPreset: plate
    holes:
      - circle:
          center: panel.center
          radius: 10
```

Pada mode ini, code tidak ditampilkan ulang. Yang muncul adalah hasil render.

## Prinsip Kontrak Publik

Yang ingin dijaga oleh docs-site dan plugin markdown RelGeo adalah:

1. satu source bisa dipakai untuk dua niat baca yang berbeda
2. `rg` menekankan source readability
3. `relgeo` menekankan rendered artifact
4. author tidak perlu mengekspor gambar ke PNG hanya untuk menyisipkannya ke Markdown

Ini adalah bagian penting dari visi RelGeo sebagai bahasa untuk gambar vektor bebas yang bisa hidup di medium teks.
