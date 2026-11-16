import project1 from '../assets/images/project1.webp';
import project2 from '../assets/images/project2.webp';
import project3 from '../assets/images/project3.webp';
import project4 from '../assets/images/project4.webp';
import project5 from '../assets/images/project5.webp';
import project6 from '../assets/images/project6.webp';

const projects = [
  {
    id: 1,
    name: "MY Dashboard App",
    image: project1,
    link: "https://www.reihan.biz.id",
    repo: "https://github.com",
    category: "Fullstack",
    techStack: ["Kotlin", "Golang", "MySQL", "Redis"],
    description: "Aplikasi produktivitas terpadu untuk monitoring aktivitas harian, cashflow keuangan, dan target personal. Didukung sistem login OAuth Google, push notifications, visualisasi grafik data, dan arsitektur backend berkecepatan tinggi dengan Go dan cache Redis.",
    impact: "+140% Efisiensi Aktivitas",
    impactNumber: 140,
    impactUnit: "%",
    impactLabel: "Efisiensi Aktivitas",
    gallery: [project1]
  },
  {
    id: 2,
    name: "Management Perpustakaan",
    image: project2,
    link: "",
    repo: "https://github.com",
    category: "Fullstack",
    techStack: ["React", "Express.js", "MySQL"],
    description: "Web Perpustakaan: aplikasi fullstack berbasis web untuk mengelola katalog ribuan data buku, anggota, dan sirkulasi transaksi peminjaman secara terpusat dengan validasi konsistensi database real-time.",
    impact: "99.8% Transaksi Akurat",
    impactNumber: 99.8,
    impactUnit: "%",
    impactLabel: "Akurasi Transaksi",
    gallery: [project2]
  },
  {
    id: 3,
    name: "Game Tictactoe",
    image: project3,
    link: "https://game-tictactoe-sigma.vercel.app/",
    repo: "https://github.com",
    category: "Frontend",
    techStack: ["JavaScript", "HTML", "CSS"],
    description: "Game Tic-Tac-Toe interaktif dengan implementasi algoritma state tree, fitur time-travel history rollback, deteksi garis pemenang cerdas, dan visual feedback yang responsif.",
    impact: "<15ms Waktu Respons",
    impactNumber: 15,
    impactUnit: "ms",
    impactLabel: "Waktu Respons",
    gallery: [project3]
  },
  {
    id: 4,
    name: "Blogravel",
    image: project4,
    link: "",
    repo: "https://github.com",
    category: "Fullstack",
    techStack: ["Laravel", "React", "MySQL"],
    description: "Blogravel: platform publikasi artikel editorial fullstack. Dilengkapi panel CMS admin interaktif, otentikasi peran multi-user, manajemen konten Markdown/WYSIWYG, dan backend REST API terstruktur.",
    impact: "+65% Kecepatan Menulis",
    impactNumber: 65,
    impactUnit: "%",
    impactLabel: "Kecepatan Publikasi",
    gallery: [project4]
  },
  {
    id: 5,
    name: "Website Capture The Flag",
    image: project5,
    link: "",
    repo: "https://github.com",
    category: "Security",
    techStack: ["React", "Node.js", "MySQL"],
    description: "Platform kompetisi keamanan siber (CTF). Menyediakan leaderboard live score real-time via websockets, submission flag aman anti-bruteforce, dynamic challenge unlocking, dan audit logging aktivitas peserta.",
    impact: "500+ Peserta Kompetisi",
    impactNumber: 500,
    impactUnit: "+",
    impactLabel: "Peserta Terdaftar",
    gallery: [project5]
  },
  {
    id: 6,
    name: "Website Presensi Digital",
    image: project6,
    link: "https://smart-presence.smkpluspnb.sch.id",
    repo: "https://github.com",
    category: "Fullstack",
    techStack: ["Golang", "MySQL", "Nuxt"],
    description: "Platform presensi digital presisi tinggi bagi siswa & staf SMK Plus Pelita Nusantara. Memanfaatkan pemindaian dynamic QR code terenkripsi, geofencing GPS lokasi radius sekolah, dan pelaporan absensi instan.",
    impact: "+95% Kedisiplinan Siswa",
    impactNumber: 95,
    impactUnit: "%",
    impactLabel: "Akurasi Kehadiran",
    gallery: [project6]
  },
];

export default projects;
