# tojem-web

## Kebutuhan Sistem

- Node JS 8.9.0+
- MySql
- Yarn 1.2.1+
- [libvips](https://jcupitt.github.io/libvips/install.html)


## Cara Setup

### Local / Development

- Install dependensi

    `yarn install`

- Inisialisasi environment project

    `node tojem init`

    Lakukan konfigurasi dan sesuaikan environment pada file `.env`.

- Buat database di MySQL

    `tojem db:create`

- Migrasi database

    `tojem db:migrate`

- Eksekusi aplikasi untuk development

    `npm run dev` atau `tojem serve`


### Production

- Install dependensi (__`production-only`__)

    `yarn install --prod`

- Jalankan aplikasi

    `npm run start` atau `tojem serve --prod`

## Testing

### Unit dan Integration Test

Untuk menjalankan unit dan integration test, gunakan `npm t`

### Browser Test (e2e)

Untuk melakukan e2e test, eksekusi dengan perintah `npm run e2e`
atau `tojem test:e2e`. Penjelasan ada pada CLI [`Commands`](#commands).



## CLI

```console
$ tojem --help
```

### Commands (perintah)

- `init`. Membuat file `.env` jika belum tersedia.
- `serve`. Mengaktifkan web server.
- `db:migrate`. Melakukan migrasi (membuat tabel) dan strukturnya.
- `db:migrate:undo`.  Menghapus satu tabel berdasarkan urutan migrasinya.
- `db:migrate:rollback`.  Menghapus semua tabel.
- `db:migrate:refresh`.  Melakukan proses `db:migrate:rollback` kemudian `db:migrate`.
- `test:e2e`. Melakukan proses otomasi browser test. Server berjalan pada background process dan berakhir setelah test selesai.

### Flags (options)

- `-t, --test`. Mengubah environment menjadi `'test'` mode.
- `-s, --silent`. Mengalihkan output CLI ke `storage/log/<nama-file>.log`.
- `--help`. Tampilkan bantuan.

### Trick

Lakukan perintah `tojem db:migrate:refresh --test` untuk melakukan refresh `test` database.


---


## Todo

- [ ] Gunakan `Service` pattern, `controller` hanya bertanggung jawab sebatas request-response
- [x] Buat command untuk refresh migration, seperti `tojem db:migrate:refresh`
- [ ] Hapus bin file `./tojem`, karena bisa di akses `./node_modules/.bin/tojem`
- [ ] Implementasi [Connect Session Store](https://github.com/mweibel/connect-session-sequelize)
- [ ] ...
