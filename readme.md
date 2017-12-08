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


## CLI

Lebih lengkap tentang command.

```console
$ node tojem --help
```


## Todo

- Gunakan `Service` pattern, `controller` hanya bertanggung jawab sebatas request-response
