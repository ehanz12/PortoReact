const certImageModules = import.meta.glob("../assets/images/sertifikat*.webp", { eager: true });
const certImages = Object.keys(certImageModules)
  .sort()
  .map((key) => certImageModules[key].default);

export const certificatesData = [
  {
    id: 1,
    image: certImages[0],
    title: "Google Cloud Roadshows",
    issuer: "Google Developer Group Bogor",
    year: "2025",
    type: "Certificate of Attendance",
  },
  {
    id: 2,
    image: certImages[1],
    title: "From Vision to Version 1.0",
    issuer: "CodeLamp Indonesia",
    year: "2025",
    type: "Webinar Participant",
  },
  {
    id: 3,
    image: certImages[2],
    title: "Google I/O Extended Bogor",
    issuer: "GDG Bogor & Women Techmakers",
    year: "2025",
    type: "Certificate of Attendance",
  },
  {
    id: 4,
    image: certImages[3],
    title: "Game Design: From Hobby to Hook",
    issuer: "CodeLamp Indonesia",
    year: "2025",
    type: "Webinar Participant",
  },
  {
    id: 5,
    image: certImages[4],
    title: "Nasional Basic Public Speaking",
    issuer: "Galeria Potensi",
    year: "2026",
    type: "Webinar Participant"
  },
  {
    id: 6,
    image: certImages[5],
    title: "Introduction to Capture The Flag",
    issuer: "ID-NetWorkers",
    year: "2025",
    type: "Webinar Participant"
  },
  {
    id: 7,
    image: certImages[6],
    title: "Strategi, Menciptakan Komunikasi Yang Nyaman",
    issuer: "Galeria Potensi",
    year: "2026",
    type: "Webinar Participant"
  },
  {
    id: 8,
    image: certImages[7],
    title: "Festival Lomba Kompetisi Siswa Tingkat SMK Kabupaten Bogor",
    issuer: "Disdik Jabar",
    year: "2026",
    type: "Prestasi / Contest"
  },
  {
    id: 9,
    image: certImages[8],
    title: "Python Developer",
    issuer: "Sololearn",
    year: "2025",
    type: "Course Certificate"
  },
  {
    id: 10,
    image: certImages[9],
    title: "Vibe Koding",
    issuer: "Sololearn",
    year: "2025",
    type: "Course Certificate"
  }
];

export default certificatesData;
