---
title: Kapabilitas Saat Ini
description: Ringkasan singkat tentang apa yang sudah bisa dilakukan RelGeo saat ini.
---

RelGeo hari ini sudah cukup matang untuk dipakai sebagai bahasa gambar vektor deklaratif yang:

1. tetap enak dibaca sebagai source di markdown
2. bisa dirender sebagai preview atau embed di markdown
3. menjaga geometri tetap deterministik dan relation-first
4. mulai serius untuk kebutuhan gambar teknik, tanpa membatasi diri hanya pada domain itu

## Yang Sudah Bisa Dipakai Sekarang

### 1. Menulis gambar vektor sebagai source yang tetap terbaca

Fence `rg` dipakai saat source memang ingin tetap menjadi bagian dari dokumen.

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

Di mode ini, pembaca melihat source RelGeo secara langsung, mirip ketika orang membaca potongan kode lain di markdown.

### 2. Menyisipkan hasil render langsung di markdown

Fence `relgeo` dipakai saat yang ingin ditampilkan adalah artifact hasil render, bukan blok source kedua.

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

Ini penting untuk visi RelGeo sebagai cara menyisipkan gambar vektor bebas ke dalam markdown, bukan sekadar mengekspor gambar statis di luar alur penulisan.

### 3. Menjaga gambar tetap relation-first dan parametric

RelGeo tidak hanya menyimpan koordinat mentah. Object dapat merujuk object lain, anchor lain, query lain, dan parameter lain. Artinya satu source yang sama bisa menghasilkan variasi gambar berbeda saat input berubah, tanpa kehilangan keterbacaan niat pembuatnya.

### 4. Memisahkan geometri dari metadata presentasional

RelGeo sudah punya jalur metadata seperti `meta`, `metaPreset`, dan `metaPresets`, sehingga penulis dapat merapikan style atau metadata presentasional tanpa mencampuradukkan semuanya ke aturan geometri.

### 5. Menjadi fondasi gambar teknik yang dapat mendokumentasikan dirinya sendiri

Fokus domain awal RelGeo memang gambar teknik. Alasannya bukan karena RelGeo sempit, tetapi karena domain ini menuntut ketelitian, determinisme, dan keterbacaan yang tinggi. Jika fondasi ini kuat, domain lain bisa tumbuh di atasnya dengan kedalaman yang sama.

## Status Saat Ini

- RelGeo aktif hari ini mengikuti language spec v0.5.
- Website docs membantu onboarding dan framing publik.
- Language spec memegang kontrak normatif yang diikuti implementasi.

Urutan baca terdekat:

1. baca [Mengapa RelGeo](/id/why-relgeo/)
2. baca [Surface Markdown](/id/docs/markdown-surfaces/)
3. baca halaman ini untuk melihat kapabilitas yang sudah nyata
4. baca [Status Bahasa](/id/docs/language-status/)
5. masuk ke [Spesifikasi Bahasa](/id/docs/language-spec/) saat perlu aturan aktif yang lebih rinci

## Surface Yang Masih Terus Diperkuat

Website publik, doc-site, plugin markdown, dan ekosistem lintas renderer masih terus dimatangkan. Fondasi bahasanya sudah nyata; permukaan publiknya masih terus diperjelas dan diperkuat.
