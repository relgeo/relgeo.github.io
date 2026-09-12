---
title: CLI
description: Surface terminal untuk validasi, kompilasi, dan workflow shell atau CI ringan.
---

`CLI` adalah surface terminal utama RelGeo.

Gunakan surface ini saat Anda ingin bekerja dari shell tanpa membuka UI browser.

## Kapan CLI Cocok

CLI paling cocok untuk:

1. memvalidasi dokumen RelGeo
2. mengompilasi source menjadi JSON, SVG, atau graph
3. memasukkan RelGeo ke workflow shell
4. menjalankan pemeriksaan ringan di CI

Jika yang Anda butuhkan adalah authoring interaktif, gunakan [Playground](/id/docs/playground/).

## Bentuk Surface Saat Ini

Pada snapshot repo aktif saat ini:

1. package surface-nya berada di repository `relgeo/cli`
2. CLI mengikuti kontrak bahasa aktif v0.5
3. jalur konsumsi paling sehat saat ini masih melalui monorepo ini

## Kemampuan Dasar

Secara praktis, CLI saat ini sudah mencakup:

1. `info` untuk membaca struktur dokumen
2. `compile` untuk menghasilkan output
3. `check` atau `validate` untuk validasi tanpa output final
4. parameter override
5. pemilihan profil
6. sheet target untuk ekspor SVG

## Contoh Alur

```bash
pnpm relgeo info path/to/design.yaml
pnpm relgeo compile path/to/design.yaml
pnpm relgeo compile path/to/design.yaml -f svg -o output.svg
pnpm relgeo check path/to/design.yaml
```

## Boundary Penting

CLI bukan editor interaktif.

CLI juga bukan pengganti `@relgeo/core` bila Anda ingin integrasi runtime langsung ke kode.

Gunakan CLI bila kebutuhan Anda adalah:

1. automation
2. terminal workflow
3. compile atau validate tanpa UI

## Status Dokumentasi

Halaman ini adalah entry surface milik website.

Rumah dokumentasi yang lebih dekat ke package sekarang mulai hidup di `docs/README.md` milik repository CLI.

## Lanjut Membaca

1. baca [Playground](/id/docs/playground/) bila Anda ingin authoring interaktif
2. baca [Surface Markdown](/id/docs/markdown-surfaces/) bila Anda ingin embedding di markdown
3. buka [Spesifikasi Bahasa](/id/docs/language-spec/) saat membutuhkan kontrak bahasa aktif
