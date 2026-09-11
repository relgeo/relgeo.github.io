---
title: Playground
description: IDE browser ringan untuk authoring, preview, dan inspection cepat.
---

`Playground` adalah surface interaktif ringan berbasis browser untuk RelGeo.

Ia sengaja diposisikan sebagai:

1. lightweight IDE
2. cepat dibuka
3. cepat dipakai untuk loop `edit -> resolve -> preview -> inspect`

## Kapan Playground Cocok

Gunakan Playground saat Anda ingin:

1. mencoba authoring RelGeo secara interaktif
2. melihat preview geometri secara langsung
3. memeriksa dependency graph dan inspector geometry
4. mendemokan alur edit dan resolve tanpa membangun UI sendiri

## Bentuk Surface Saat Ini

Pada snapshot repo aktif saat ini:

1. package surface-nya berada di repository `relgeo/playground`
2. ia bersifat `private`
3. ia bukan target publish registry
4. ia berfungsi sebagai workspace browser IDE resmi yang ringan

## Positioning Penting

Playground sengaja dijaga lebih ringan daripada workbench lokal yang lebih kaya.

Artinya:

1. state lokal dipertahankan secukupnya
2. surface ini diprioritaskan untuk authoring loop dan inspection loop
3. ia bukan desktop-style personal workspace penuh

Dalam bahasa singkat:

1. `Playground = lightweight browser IDE`
2. `Desktop App / Workbench = richer local workbench`

## Kemampuan Dasar

Playground saat ini sudah mengarah ke:

1. editor source RelGeo
2. live SVG preview
3. geometry inspector
4. dependency graph inspection
5. parameter controls
6. lightweight session persistence

## Boundary Penting

Playground tidak dimaksudkan untuk menggantikan:

1. CLI untuk automation terminal
2. language spec untuk kontrak normatif
3. richer local workbench untuk preference system yang lebih kaya

## Status Dokumentasi

Halaman ini adalah entry surface milik website.

Rumah dokumentasi yang lebih dekat ke package sekarang mulai hidup di `docs/README.md` milik repository playground.

## Lanjut Membaca

1. baca [CLI](/id/docs/cli/) bila Anda butuh workflow terminal
2. baca [Desktop App](/id/docs/desktop-app/) untuk memahami boundary workbench lokal yang lebih kaya
3. baca [Markdown Surfaces](/id/docs/markdown-surfaces/) untuk surface embed di dokumen
