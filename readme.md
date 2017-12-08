# tojem-web

## Kebutuhan Sistem
- Node JS 8.9.0+
- MySql
- Yarn 1.2.1+

## Cara Setup
### Local / Development
- Buat database di MySQL
- Install dependensi <br>
  `yarn install`
- Initialisasi project environment <br>
  `node tojem init` <br>
  Lakukan konfigurasi dan sesuaikan environment pada file `.env`.
- Migrasi database <br>
  `node tojem db:migrate`
- Eksekusi aplikasi untuk development <br>
  `npm run dev` atau `node tojem serve`

### Production
- Install dependensi (__`production-only`__) <br>
  `yarn install --prod`
- Jalankan aplikasi <br>
  `npm run start` atau `node tojem serve --prod`

## CLI
Lebih lengkap tentang command.

```console
$ node tojem --help
```

## Todo
- Gunakan `Service` pattern, `controller` hanya bertanggung jawab sebatas request-response
