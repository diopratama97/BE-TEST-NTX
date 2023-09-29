# Beberapa point untuk test yang akan diberikan

0. Sebelum mengerjakan semua soal dengan sendiri, tanya kan setiap masalah masalah ini ke chatgpt, jadi nanti ada jawaban versi chatgpt dan ada jawaban versi diri mu

1. Refactore function yang bernama refactoreMe1 dan refactoreMe2 (wajib memakai query native) menjadi jauh lebih mudah di baca, datasset nya sudah di sediakan di folder files

##### Jawaban = Untuk poin nomer 1 sudah selesai, ada di endpoint: /api/data/survey method GET dan method POST

2. Buat endpoint berbasis websocket untuk memfecth data dari api https://livethreatmap.radware.com/api/map/attacks?limit=10 yang mana dia akan memfetch 3 menit sekali (tulis code mu di callmeWebSocket function)

##### Jawaban = Untuk poin nomer 2 sudah selesai, saya memakai schedule/cron job yang berjalan 3 menit sekali.

3. Store data data yang ada di https://livethreatmap.radware.com/api/map/attacks?limit=10 ke dalam database postgres, lalu buatkan 1 endpoint sederhana untuk mendaptkan berapa jumlah "destinationCountry" yang di serang beberapa type dan "sourcecountry" yang menyerang dengan beberapa type
   dan wajib mempunyai response dengan bentuk seperti ini :
   (tulis code mu di getData function, pake query native)

```
{
  success:true,
  statusCode:200,
  data:{
    label:["val","val","val"]
    total:[200,200,200]
  }
}
```

##### Jawaban: Untuk poin nomer 3 sudah selesai, ini bersamaan dengan waktu cronjob/schedule berjalan 3 menit dia akan memasukkan data ke dalam db dengan data sesuai api yg di akses. dan juga untuk mendapatkan data yg sudah masuk di db ada di enpoint : /api/data/fetch-api

4. Terapkan redis caching pada saat memfetch endpoint yang kamu buat di point nomor 3

##### Jawaban: Untuk poin nomer 4 sudah selesai, ini saya implement di endpoint : /api/data/fetch-api dengan skema middleware. jika dalam middleware cache nya ini di dapatkan data maka akan pakai cache redis nya. jika tidak dia akan mengakses endpoint /api/data/fetch-api dan memasukkan ke dalam cache redis dengan expired nya 3 menit.

5. Buatkan aku middleware authentikasi jwt untuk memprotect api, serta buatkan juga middleware untuk membatasi endpoint lain berdasarkan role user, contoh :
   walaupun si user mempunyai token yang valid, tapi tidak mempunyai role yang valid, dia tidak akan bisa membuka beberapa endpoint.

##### Jawaban: Untuk poin nomer 5 sudah selesai, ada tambahan endpoint /api/auth/register dan /api/auth/login. untuk role saya buat ada 2 yaitu EMPLOYE dan ADMIN. untuk data admin dan penyesuaian data barunya beserta column baru sudah saya perbarui di file survey.sql dalam folder files. untuk login saya pakai column digits dan password. password default nya saya buat 1234. untuk endpoint /api/auth/register hanya role ADMIN yang bisa akses.

6. Buatkan unit test untuk mentest si endpoint berjalan dengan baik.

7. Push hasil test ini di github mu

### untuk validasi data payload maupun dari params nya saya pakai Library Joi validation

### untuk docs API saya memakai Swagger, dapat di akses melalui : http://localhost:5000/api/docs/#/
