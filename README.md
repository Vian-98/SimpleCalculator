# 💻 Vian Simple Calculator

Tampilan utama kalkulator dalam Dark Theme
<img width="1480" height="810" alt="Screenshot 2025-11-23 222324" src="https://github.com/user-attachments/assets/afc5c5a3-63ce-43ba-a767-5873c9e3878d" />

**Vian Simple Calculator** adalah aplikasi kalkulator berbasis web minimalis dengan _Dark Theme_ dan tipografi **Montserrat** yang elegan. Dibangun dengan Vanilla JavaScript, fokus utamanya adalah menyediakan fungsionalitas inti yang cepat, akurat, dan dilengkapi dengan fitur memori serta riwayat yang andal.

## 💡 Highlight Fitur

| Ikon | Fitur | Deskripsi |
| :---: | :--- | :--- |
| 🗄️ | **Memory Management** | Fungsi lengkap **M+**, **M-**, **MR**, dan **MC** untuk menyimpan dan memanipulasi nilai perhitungan. |
| 🕰️ | **Calculation History** | Mencatat hingga 5 perhitungan terakhir di panel **Memory & History** lengkap dengan _timestamp_. |
| 🖥️ | **Responsive Design** | Tata letak (_layout_) yang optimal untuk perangkat **Mobile** maupun **Desktop**. |
| 🚨 | **Error Handling** | Penanganan khusus untuk operasi yang tidak valid, terutama menampilkan **"Error: Bagi Nol"**. |
| ⌨️ | **Full Keyboard Support** | Input angka, operator (`+`, `-`, `*`, `/`), dan evaluasi (`Enter` / `=`) didukung penuh. |

---

## 🖼️ Demonstrasi Visual (Screenshot Gallery)

Berikut adalah visualisasi dari berbagai fitur dan kondisi kalkulator.

### A. Tampilan Mobile & Responsive 
Kalkulator menyesuaikan tata letak untuk perangkat vertikal (_mobile view_), mempertahankan keterbacaan dan aksesibilitas semua tombol.

<img width="636" height="889" alt="Screenshot 2025-11-23 222356" src="https://github.com/user-attachments/assets/fe5b10ff-17c4-4d11-9650-e0b6d911fc2e" />

### B. Proses Perhitungan 
Ekspresi yang sedang dibangun (`78×94-65+85`) ditampilkan di area riwayat atas, sementara nilai saat ini (`85`) ditampilkan di layar output utama. Ini memastikan pengguna dapat melacak operasi yang panjang.
<img width="1183" height="682" alt="Screenshot 2025-11-23 222434" src="https://github.com/user-attachments/assets/e4960693-aa69-434e-b9e4-694c9bc69f7d" />

### C. Penanganan Kesalahan: Pembagian dengan Nol
Fungsi _error handling_ dalam `script.js` mendeteksi pembagian dengan nol dan menampilkan pesan **"Error: Bagi Nol"** di layar output.
<img width="1133" height="669" alt="Screenshot 2025-11-23 222500" src="https://github.com/user-attachments/assets/b2a6dd75-f322-4346-927a-b644aeca1c87" />

### D. Mengambil Nilai dari Memori (MR) 
Menunjukkan fitur **MR** (_Memory Recall_). Nilai **M: 58** yang tersimpan di memori telah dipanggil dan ditampilkan di layar utama, siap untuk digunakan dalam perhitungan berikutnya.
<img width="1080" height="634" alt="Screenshot 2025-11-23 222536" src="https://github.com/user-attachments/assets/026bd310-c514-441b-8da6-8b5a8c92d45f" />

### E. Memori dan Riwayat Aktif 
Menampilkan kondisi kalkulator saat memori aktif (**M: 30**) setelah operasi **M+** atau **M-** dilakukan. Riwayat perhitungan yang telah selesai (`78×94-65+85 = 7352`) tercatat di bawah nilai memori.
<img width="1069" height="645" alt="Screenshot 2025-11-23 222548" src="https://github.com/user-attachments/assets/4bd9445b-b28e-48db-9276-ed56216c024c" />

---

## 🚀 Instalasi Cepat

Karena ini adalah proyek berbasis _front-end_ murni, tidak ada _dependency_ yang rumit.

1.  **Kloning Repositori:**
    ```bash
    git clone https://github.com/Vian-98/SimpleCalculator.git
    ```
2.  **Jalankan:**
    Buka _file_ `index.html` langsung di _browser_ Anda.

atau bisa gunakan link berikut : 
https://vian-98.github.io/SimpleCalculator/

---
