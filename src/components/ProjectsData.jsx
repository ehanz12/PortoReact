import project1 from '../assets/images/project1.png';
import project2 from '../assets/images/project2.png';
import project3 from '../assets/images/project3.png';
import project4 from '../assets/images/project4.png';
import project5 from '../assets/images/project5.png';

const  projects = [
  {
    id: 1,
    name: "Dashboard Pribadi",
    image: project1,
    link: "https://www.reihan.biz.id",
    description: "Web Dashboard To-Do List (Backend-Focused)Web Dashboard To-Do List ini merupakan aplikasi berbasis web yang dikembangkan untuk membantu pengguna mengelola aktivitas dan tugas harian secara terstruktur dan efisien. Aplikasi ini dibangun dengan arsitektur client–server, di mana backend menggunakan Golang sebagai penyedia API dan pengelola logika bisnis, sementara frontend menggunakan React untuk menampilkan antarmuka yang interaktif."
  },
  {
    id: 2,
    name: "Management Perpustakaan",
    image: project2,
    link: "",
    description: "Web Perpustakaan : aplikasi berbasis web yang digunakan untuk mengelola data buku, anggota, dan transaksi peminjaman secara terpusat dan efisien. Sistem ini dilengkapi dengan fitur autentikasi pengguna, manajemen data (CRUD), serta pencatatan peminjaman dan pengembalian buku. Backend dirancang untuk memastikan keamanan data, konsistensi transaksi, dan kemudahan integrasi dengan frontend melalui API."
  },
  {
    id: 3,
    name: "Game Tictactoe",
    image: project3,
    link: "https://game-tictactoe-sigma.vercel.app/",
    description: "Ini game tictactoe biasa hanya untuk memlatih algoritma saja dan di web ini memiliki fitur rollback, lalu pemenang"
  },
  {
    id: 4,
    name: "Blogravel",
    image: project4,
    link: "",
    description: "Blog  platform berbasis web yang memungkinkan pengguna untuk membuat, mengelola, dan mempublikasikan artikel secara terstruktur. Sistem ini dilengkapi dengan autentikasi pengguna, manajemen konten (CRUD), pengelolaan kategori dan komentar, serta API backend yang dirancang aman, terstruktur, dan mudah dikembangkan untuk mendukung kebutuhan frontend."
  },
  {
    id: 5,
    name: "Website Capture The Flag",
    image: project5,
    link: "",
    description: "Capture The Flag (CTF) aplikasi berbasis web yang dirancang sebagai platform latihan keamanan siber, khususnya dalam pengujian dan eksploitasi sistem secara legal. Backend aplikasi ini berperan sebagai pusat pengelolaan challenge, validasi flag, autentikasi peserta, serta perhitungan skor dan leaderboard .Backend dibangun menggunakan arsitektur RESTful API yang menangani proses submission flag, verifikasi keabsahan jawaban, pembatasan akses challenge, dan pencatatan aktivitas peserta. Sistem autentikasi dan otorisasi diterapkan untuk memastikan setiap flag hanya dapat dikirim oleh pengguna yang sah."
  },
]

export default projects
