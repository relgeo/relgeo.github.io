# RelGeo Website Terminology Policy

Dokumen ini menjaga agar bilingual surface tetap konsisten tanpa menerjemahkan nama produk atau sintaks secara sembarangan.

## Gunakan Bahasa Route

- Label navigasi dan judul editorial diterjemahkan pada route `/id/`.
- Route `/en/` memakai istilah Inggris yang natural dan konsisten.
- Teks `alt`, `aria-label`, tombol, dan metadata mengikuti bahasa route yang sama.

## Pertahankan Sebagai Istilah Canonical

Nama berikut tidak diterjemahkan karena merupakan nama produk, package, sintaks, atau istilah teknis yang dipakai lintas repository:

- `RelGeo`, `CLI`, `Playground`, `Workbench`, `Desktop App`
- `relation-first`, `DSL`, `Markdown`, `SVG`, `JSON`, `YAML`
- `source`, `renderer`, `language service`, `remark plugin`
- nama package, command, fence (`rg` dan `relgeo`), serta identifier dalam code block

Istilah canonical tetap boleh diberi penjelasan Bahasa Indonesia pada kalimat sekitarnya.

## Terjemahkan Sebagai Bahasa Editorial

Gunakan padanan Bahasa Indonesia untuk label umum yang bukan nama produk:

| English | Bahasa Indonesia |
| --- | --- |
| Documentation | Dokumentasi |
| Getting started | Mulai |
| Current Capabilities | Kapabilitas Saat Ini |
| Language Status | Status Bahasa |
| Language Spec | Spesifikasi Bahasa |
| Use Cases | Contoh Penggunaan |
| Why RelGeo | Mengapa RelGeo |
| Markdown Surfaces | Surface Markdown |
| Desktop App | Aplikasi Desktop |

Jika istilah teknis dipertahankan dalam prose Indonesia, pastikan itu memang menunjuk pada nama surface atau konsep lintas package, bukan sekadar label yang terlupa diterjemahkan.
