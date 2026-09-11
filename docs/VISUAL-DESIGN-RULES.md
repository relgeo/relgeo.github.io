# RelGeo Website Visual Design Rules

Status: draft untuk dibahas.

Dokumen ini menetapkan aturan visual untuk website `relgeo.github.io`. Tujuannya adalah menjaga website tetap padat informasi, mudah dipindai, dan konsisten pada viewport desktop maupun mobile.

## 1. Prinsip Utama

1. Konten penting harus terlihat secepat mungkin tanpa scroll yang tidak perlu.
2. Ruang kosong dipakai untuk memisahkan kelompok informasi, bukan sebagai dekorasi kosong.
3. Semua halaman memakai sistem navigasi, container, spacing, dan tipografi yang sama.
4. Hierarki informasi ditentukan oleh ukuran, posisi, dan kontras; bukan dengan memperbesar semua elemen.
5. Desktop lebar tidak boleh membuat komponen tumbuh tanpa batas.
6. Setiap keputusan visual harus tetap mendukung akses keyboard, fokus yang terlihat, dan keterbacaan.

## 2. Anggaran Viewport

Target utama adalah viewport desktop 1280×720.

- navbar mulai maksimal 16px dari bagian atas viewport;
- tinggi navbar target 56–64px;
- konten penting hero harus mulai terlihat pada viewport pertama;
- padding vertikal halaman maksimal 24px sebelum konten utama;
- tidak boleh ada band kosong besar di atas navbar;
- halaman boleh scroll, tetapi informasi orientasi dan aksi utama tidak boleh terdorong tanpa alasan.

## 3. Container dan Alignment

- gunakan satu lebar maksimum global, target `1180px`;
- margin horizontal desktop target `20–32px`;
- gunakan alignment kiri yang sama untuk brand, heading, breadcrumb, dan body content;
- hindari container dengan lebar berbeda antar-variant tanpa alasan informasi;
- navbar dan content utama harus mengikuti grid horizontal yang sama;
- pada mobile, margin horizontal minimum `12px` dan maksimum `20px`.

## 4. Navbar

Navbar adalah satu komponen global, bukan komponen berbeda untuk gateway, home, docs, dan spec.

- posisi selalu di bagian atas container;
- tinggi dan padding konsisten di semua halaman;
- brand memakai satu gaya penulisan dan satu treatment visual;
- link memakai ukuran teks yang sama dan jarak yang konsisten;
- state aktif memakai satu pola: background atau border yang halus, bukan perubahan ukuran;
- `Playground` selalu tersedia sebagai link utama ke `/playground/`;
- language switcher berada pada area yang sama di semua halaman;
- jangan memakai kombinasi navbar pill, rectangle, dan alignment berbeda kecuali ada kebutuhan struktural yang jelas;
- pada layar sempit, nav boleh horizontal-scroll atau collapse, tetapi tidak boleh terpotong diam-diam.

## 5. Spacing

Gunakan skala spacing terbatas:

```text
4, 8, 12, 16, 24, 32, 48
```

Aturan praktis:

- `8–12px` untuk elemen yang berdekatan;
- `16px` untuk kelompok kecil;
- `24px` untuk antar-section;
- `32px` untuk pemisahan section besar;
- `48px` hanya untuk pemisahan hero atau section utama;
- hindari margin/padding lebih dari `48px` tanpa alasan layout yang terdokumentasi;
- jangan memakai padding besar seragam pada semua card.

## 6. Tipografi

- gunakan maksimal tiga tingkat heading utama dalam satu viewport;
- heading hero desktop target `48–64px`, bukan ukuran ekstrem;
- heading halaman biasa target `36–48px`;
- body text target `16–18px` dengan line-height sekitar `1.5`;
- metadata/kicker boleh lebih kecil, tetapi tetap terbaca;
- panjang baris body target `60–80 karakter`;
- heading tidak boleh mengambil sebagian besar viewport jika aksi utama belum terlihat.

## 7. Card dan Panel

- card dipakai untuk mengelompokkan informasi yang memang berhubungan;
- target padding card desktop `20–28px`;
- gunakan satu radius utama dan satu radius kecil;
- border, shadow, dan background harus ringan dan tidak bersaing dengan konten;
- hindari card di dalam card jika tidak ada hierarki yang jelas;
- panel samping tidak boleh membuat body utama terlalu sempit;
- card pertama pada viewport harus memuat konteks atau aksi yang berguna.

## 8. Warna dan Kontras

- background dekoratif harus tetap subordinat terhadap teks;
- gunakan satu warna aksen utama untuk link, focus, dan primary action;
- state aktif, hover, dan focus harus dapat dibedakan tanpa hanya mengandalkan warna;
- teks utama harus memiliki kontras yang memadai;
- jangan menambah warna baru untuk memperbaiki masalah hierarki yang seharusnya diselesaikan dengan spacing atau typography.

## 9. Responsive Behavior

### Desktop

- gunakan grid dua kolom hanya ketika kolom kedua memberi informasi nyata;
- hero illustration tidak boleh mendorong heading dan aksi utama keluar viewport;
- nav tetap satu baris pada lebar sekitar 1280px.

### Mobile dan viewport pendek

- prioritaskan brand, menu utama, language switcher, lalu content;
- kurangi padding sebelum mengurangi ukuran teks keterbacaan;
- nav boleh scroll horizontal dengan scrollbar yang tidak mengganggu;
- illustration boleh turun ke bawah atau disembunyikan jika mengganggu tugas utama;
- jangan memaksa dua kolom pada lebar yang tidak cukup.

## 10. Accessibility dan Interaction

- semua link dan button harus dapat dicapai dengan keyboard;
- focus ring harus terlihat jelas;
- gunakan `aria-current="page"` pada link navigasi aktif;
- gunakan label navigasi yang bermakna;
- jangan menjadikan warna satu-satunya penanda state;
- perubahan visual tidak boleh menghilangkan informasi atau aksi;
- area klik link/button harus nyaman pada touch device.

## 11. Acceptance Checklist

Sebelum perubahan visual dianggap selesai, periksa:

- [ ] viewport 1280×720 tidak memiliki ruang kosong besar di atas navbar;
- [ ] navbar gateway, home, docs, dan spec konsisten;
- [ ] brand, nav, language switcher, dan content memakai grid yang sama;
- [ ] heading dan aksi utama terlihat tanpa scroll yang tidak perlu;
- [ ] padding card tidak berlebihan;
- [ ] `/playground/` terlihat jelas dari navigasi;
- [ ] layout tidak pecah pada viewport sempit;
- [ ] keyboard focus dan active state tetap terlihat;
- [ ] build, check, dan test website berhasil.

## 12. Batasan Perubahan

Perubahan visual sebaiknya dimulai dari `src/layouts/DocsLayout.astro` sebagai shared layout. Halaman individual hanya boleh memiliki pengecualian jika kebutuhan informasinya benar-benar berbeda dan pengecualian tersebut dijelaskan dalam code review.
