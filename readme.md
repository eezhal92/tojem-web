# tojem-web

## Kebutuhan Sistem
- Node JS 8.9.0+
- MySql
- Yarn 1.2.1+

## Cara Setup di Local
- Buat database di MySQL
- Buat file `.env`. Lihat contoh `.env.example`
- Jalankan script untuk migrasi databse `npm run db:migrate`
- Install dependensi `yarn install`
- Jalankan aplikasi `yarn run dev`

## Cara Setup di Production
- Install dependensi `production-only`, jalankan `yarn install --prod`
- Jalankan aplikasi `yarn run start`

## Todo
- Gunakan `Service` pattern, `controller` hanya bertanggung jawab sebatas request-response
