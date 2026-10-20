import project1 from '../assets/images/project1.webp';
import project2 from '../assets/images/project2.webp';
import project3 from '../assets/images/project3.webp';
import project4 from '../assets/images/project4.webp';
import project5 from '../assets/images/project5.webp';

const  projects = [
  {
    id: 1,
    name: "MY Dashboard App",
    image: project1,
    link: "https://www.reihan.biz.id",
    techStack: ["Kotlin", "Golang"],
    description: "Aplikasi ini digunakan untuk mengatur aktivitas, keuangan, plan. Dengan fitur fitur yang sangat membantu seperti notifikasi, diagram data jelas, login menggunakan akun google, dan lain lain. Lalu Aplikasi ini dibuat oleh teknologi terbaru yaitu Golang dan Kotlin lalu di lengkapi keamanan yang sangat ketat"
  },
  {
    id: 2,
    name: "Management Perpustakaan",
    image: project2,
    link: "",
    techStack: ["React", "Express.js", "MySQL"],
    description: "Web Perpustakaan: aplikasi fullstack berbasis web untuk mengelola data buku, anggota, dan transaksi peminjaman secara terpusat. Sistem ini dilengkapi dengan antarmuka frontend yang responsif untuk CRUD dan pencatatan peminjaman, serta backend yang kokoh untuk memastikan keamanan data, konsistensi transaksi, dan integrasi API yang mulus."
  },
  {
    id: 3,
    name: "Game Tictactoe",
    image: project3,
    link: "https://game-tictactoe-sigma.vercel.app/",
    techStack: ["JavaScript", "HTML", "CSS"],
    description: "Ini game tictactoe biasa hanya untuk memlatih algoritma saja dan di web ini memiliki fitur rollback, lalu pemenang"
  },
  {
    id: 4,
    name: "Blogravel",
    image: project4,
    link: "",
    techStack: ["Laravel", "React", "MySQL"],
    description: "Blogravel: platform blog fullstack berbasis web yang memungkinkan pengguna membuat dan mempublikasikan artikel secara terstruktur. Dilengkapi dengan tampilan frontend yang dinamis untuk pembaca dan panel admin, autentikasi pengguna, manajemen konten (CRUD), serta backend API Laravel yang aman, terstruktur, dan mudah dikembangkan."
  },
  {
    id: 5,
    name: "Website Capture The Flag",
    image: project5,
    link: "",
    techStack: ["React", "Node.js", "MySQL"],
    description: "Website Capture The Flag (CTF): platform latihan keamanan siber fullstack untuk pengujian sistem secara legal. Aplikasi ini memadukan frontend dashboard interaktif (leaderboard, skor, dan submission) dengan backend RESTful API yang menangani pengelolaan challenge, validasi flag secara real-time, autentikasi aman, serta pencatatan aktivitas peserta secara terstruktur."
  },
]

export default projects
