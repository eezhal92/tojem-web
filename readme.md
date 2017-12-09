# tojem-web

## Kebutuhan Sistem

- Node JS 8.9.0+
- MySql
- Yarn 1.2.1+


## Cara Setup

### Local / Development

- Buat database di MySQL

- Install dependensi

    `yarn install`

- Inisialisasi environment project

    `node tojem init`

    Lakukan konfigurasi dan sesuaikan environment pada file `.env`.

- Migrasi database

    `node tojem db:migrate`

- Eksekusi aplikasi untuk development

    `npm run dev` atau `node tojem serve`


### Production

- Install dependensi (__`production-only`__)

    `yarn install --prod`

- Jalankan aplikasi

    `npm run start` atau `node tojem serve --prod`

## Testing

### Unit dan integration test

Untuk menjalankan unit dan integration test, gunakan `npm t`

### e2e test

Untuk melakukan e2e test:

- Jalankan aplikasi dalam environment `test`. Jalankan `node tojem server --test`.
- Jalankan `npm run e2e`. Script ini akan melakukan rollback migration terhadap test database kemudian di-migrate kembali agar database dalam keadaan bersih sebelum melakukan otomasi browser test.

## CLI

Lebih lengkap tentang command.

```console
$ node tojem --help
```


## Todo

- Gunakan `Service` pattern, `controller` hanya bertanggung jawab sebatas request-response
- Buat command untuk refresh migration, seperti `tojem db:migrate:refresh`
