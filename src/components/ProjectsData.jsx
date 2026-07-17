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
    description: "Web Dashboard To-Do List (Fullstack) ini merupakan aplikasi berbasis web yang dikembangkan untuk membantu pengguna mengelola aktivitas harian secara terstruktur dan efisien. Aplikasi ini dibangun dengan arsitektur fullstack client-server, memadukan frontend React yang interaktif dengan backend Golang yang mengelola logika bisnis dan API secara andal."
  },
  {
    id: 2,
    name: "Management Perpustakaan",
    image: project2,
    link: "",
    description: "Web Perpustakaan: aplikasi fullstack berbasis web untuk mengelola data buku, anggota, dan transaksi peminjaman secara terpusat. Sistem ini dilengkapi dengan antarmuka frontend yang responsif untuk CRUD dan pencatatan peminjaman, serta backend yang kokoh untuk memastikan keamanan data, konsistensi transaksi, dan integrasi API yang mulus."
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
    description: "Blogravel: platform blog fullstack berbasis web yang memungkinkan pengguna membuat dan mempublikasikan artikel secara terstruktur. Dilengkapi dengan tampilan frontend yang dinamis untuk pembaca dan panel admin, autentikasi pengguna, manajemen konten (CRUD), serta backend API Laravel yang aman, terstruktur, dan mudah dikembangkan."
  },
  {
    id: 5,
    name: "Website Capture The Flag",
    image: project5,
    link: "",
    description: "Website Capture The Flag (CTF): platform latihan keamanan siber fullstack untuk pengujian sistem secara legal. Aplikasi ini memadukan frontend dashboard interaktif (leaderboard, skor, dan submission) dengan backend RESTful API yang menangani pengelolaan challenge, validasi flag secara real-time, autentikasi aman, serta pencatatan aktivitas peserta secara terstruktur."
  },
]

export default projects
