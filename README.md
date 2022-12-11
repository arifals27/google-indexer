# google-indexer
otomatis index ke google

# Cara pake
- jalankan kode ini
```
git clone https://github.com/arifals27/google-indexer.git
cd google-indexer
npm install
```
- aktifkan Indexing API <a href="https://console.developers.google.com/flows/enableapi?apiid=indexing.googleapis.com&credential=client_key">disini</a>
- Jika tidak memiliki "Project", maka buatlah sebuah project.
- Setelah aktif, buatlah service account <a href="https://console.developers.google.com/iam-admin/serviceaccounts">disini</a>
- Pilih project yang sudah kamu buat
- Pada bagian "Grant this service account access to project", pilih "Owner"
- Klik tombol "Done"
- Jika sudah selesai, buka service account yang sudah dibuat tadi, masuk ke tab "KEYS", dan pilih "Create new key" > JSON > create
- Otomatis maka akan terdownload file .json dari service account tersebut
- Copy/rename file .json yang sudah di download ke dalam service_account_1.json
- Untuk service_account_{2-5}.json, silahkan buat project baru, dan buatlah sebuah service account seperti panduan di atas.
- Edit file index.js dan ubah "const limitService" sesuai dengan jumlah service account yang sudah dibuat.

# Ketentuan
- 1 project hanya bisa submit sampai 200 indexing saja.
- Jika ingin index sampai 1000 per hari, maka perlu 5 service account dari 5 project yang berbeda. 1 project 1 service account.

# Penggunaan
- http://localhost:3000/submit/{url} to submit URL
  * http://localhost:3000/submit/https://example.com/page-important.html
- http://localhost:3000/reset to reset config.json
  * use this with cron, you can curl once a day. 

