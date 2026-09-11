---
title: Getting Started
description: Jalur baca pertama untuk pengguna RelGeo baru.
---

RelGeo adalah DSL dan toolchain untuk gambar vektor deklaratif berbasis relasi.

Untuk mulai memahami proyek ini, gunakan urutan singkat berikut:

1. pahami posisi produk dan filosofi umumnya
2. baca [Current Capabilities](/id/docs/current-capabilities/) untuk melihat apa yang sudah nyata hari ini
3. pilih surface penggunaan yang paling dekat dengan kebutuhan Anda:
   [CLI](/id/docs/cli/), [Playground](/id/docs/playground/), atau [Desktop App](/id/docs/desktop-app/)
4. baca [Markdown Surfaces](/id/docs/markdown-surfaces/) untuk memahami perbedaan `rg` dan `relgeo`
5. baca [Language Status](/id/docs/language-status/) untuk memahami boundary `id` vs `en`
6. buka `language-spec` jika ingin melihat kontrak normatif aktif

## Coba Workflow Utama

Untuk mencoba loop authoring lokal yang menjadi jalur onboarding utama, jalankan dari root integration workspace:

```bash
pnpm install
pnpm --dir ../playground dev
```

Lalu gunakan urutan berikut di Playground:

1. pilih contoh `01. Fundamentals`
2. ubah source di editor
3. tunggu status `READY` setelah source di-resolve
4. baca hasilnya di live preview
5. buka `Inspector` atau `Layers` untuk memeriksa geometry dan dependency

Playground adalah browser IDE lokal; repository ini belum mengklaim URL hosted Playground publik.

Jika Anda hanya membutuhkan workflow terminal, gunakan:

```bash
pnpm --dir ../cli exec tsx src/index.ts check ../playground/src/assets/examples/basics/01_fundamentals.yaml
pnpm --dir ../cli exec tsx src/index.ts compile ../playground/src/assets/examples/basics/01_fundamentals.yaml -f svg
```

Untuk jalur Markdown, lanjutkan ke [Markdown Surfaces](/id/docs/markdown-surfaces/). Fence `rg` menampilkan source, sedangkan fence `relgeo` menampilkan rendered preview.

Blok `rg` ditujukan untuk source RelGeo yang ingin dibaca:

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

Blok `relgeo` ditujukan untuk preview atau embed:

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
