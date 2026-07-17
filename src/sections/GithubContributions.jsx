import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const fallbackRepos = [
  {
    id: 1,
    name: "PortoReact",
    description: "Personal Portfolio built with React, Tailwind CSS v4, and GSAP animations.",
    html_url: "https://github.com/ehanz12/PortoReact",
    language: "JavaScript",
    stargazers_count: 5,
    forks_count: 2,
  },
  {
    id: 2,
    name: "Management-Perpustakaan",
    description: "A fullstack library management system designed to handle cataloging, user management, and lending transactions.",
    html_url: "https://github.com/ehanz12",
    language: "Go",
    stargazers_count: 3,
    forks_count: 1,
  },
  {
    id: 3,
    name: "Website-Capture-The-Flag",
    description: "A legal cybersecurity training platform with challenges, scores validation, and a real-time leaderboard.",
    html_url: "https://github.com/ehanz12",
    language: "Go",
    stargazers_count: 4,
    forks_count: 0,
  },
  {
    id: 4,
    name: "Blogravel",
    description: "A dynamic blogging platform powered by Laravel backend APIs and clean, responsive UI layouts.",
    html_url: "https://github.com/ehanz12",
    language: "PHP",
    stargazers_count: 2,
    forks_count: 1,
  }
];

const languageColors = {
  JavaScript: "bg-yellow-400",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Go: "bg-cyan-400",
  PHP: "bg-indigo-500",
  TypeScript: "bg-blue-500",
  Python: "bg-green-500",
};

const GithubContributions = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // Fetch User Profile
        const profileRes = await fetch("https://api.github.com/users/ehanz12");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        // Fetch User Repositories
        const reposRes = await fetch("https://api.github.com/users/ehanz12/repos?sort=updated&per_page=6");
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          // Filter out forks if preferred
          setRepos(reposData.slice(0, 4));
        } else {
          setRepos(fallbackRepos);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setRepos(fallbackRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  useGSAP(() => {
    // Section header animation
    gsap.from(".github-title-anim", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    // Profile card & repos list trigger animation
    gsap.from(".github-card-anim", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".github-grid",
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  // Generate random data for contribution heatmap simulation (for premium visual representation)
  const renderContributionGrid = () => {
    const grid = [];
    const colorLevels = [
      "bg-zinc-900 border-zinc-950",      // 0 commits
      "bg-emerald-950 border-emerald-950/20",   // 1-3 commits
      "bg-emerald-800 border-emerald-900/20",   // 4-6 commits
      "bg-emerald-600 border-emerald-700/20",   // 7-9 commits
      "bg-emerald-400 border-emerald-500/20",   // 10+ commits
    ];

    // Create 18 weeks * 7 days grid
    for (let i = 0; i < 126; i++) {
      // Weight randomizer towards lower numbers (darker greens/gray) to look natural
      const rand = Math.random();
      let levelIndex = 0;
      if (rand > 0.85) levelIndex = 4;
      else if (rand > 0.7) levelIndex = 3;
      else if (rand > 0.5) levelIndex = 2;
      else if (rand > 0.2) levelIndex = 1;

      grid.push(
        <div
          key={i}
          className={`w-3.5 h-3.5 rounded-sm ${colorLevels[levelIndex]} transition-all duration-300 hover:scale-130 hover:shadow-[0_0_8px_rgba(52,211,153,0.6)] cursor-pointer`}
          title={`${Math.floor(rand * 12)} kontribusi`}
        />
      );
    }
    return grid;
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="relative z-20 bg-black text-white py-24 lg:py-40 overflow-hidden border-t border-white/5"
    >
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-emerald-900/10 blur-[140px] pointer-events-none -z-10" />

      <div className="main-container">
        {/* Header */}
        <div className="github-title-anim mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="mb-3 text-white/40">GitHub Activity</h3>
            <p className="font-heading font-bold text-3xl lg:text-5xl text-white">
              Repositori &amp; Kontribusi
            </p>
          </div>
          <p className="text-base lg:text-lg text-white/60 max-w-md">
            Melihat aktivitas pengodean saya secara real-time, proyek open source yang dikembangkan, dan kontribusi komparatif di GitHub.
          </p>
        </div>

        {/* GitHub Grid */}
        <div className="github-grid grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Profile Card & Simulated Heatmap */}
          <div className="github-card-anim lg:col-span-1 flex flex-col gap-6">
            
            {/* User Profile Card */}
            <div className="relative bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6 relative">
                <img
                  src={profile?.avatar_url || "https://avatars.githubusercontent.com/u/161427503?v=4"}
                  alt={profile?.name || "Reihan Aditya"}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:border-indigo-400 transition-colors duration-300"
                />
                <div>
                  <h4 className="font-heading font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
                    {profile?.name || "Reihan Aditya Putra"}
                  </h4>
                  <a
                    href={profile?.html_url || "https://github.com/ehanz12"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    @{profile?.login || "ehanz12"}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/70 text-sm mb-6 font-body leading-relaxed">
                {profile?.bio || "Pelajar SMK Plus Pelita Nusantara Jurusan RPL. Tertarik dalam pengembangan website Fullstack dengan Laravel, Golang, & React."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                <div>
                  <p className="text-xs text-white/40 font-heading">Repos</p>
                  <p className="text-lg font-heading font-bold text-white mt-0.5">{profile?.public_repos || "12"}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-heading">Followers</p>
                  <p className="text-lg font-heading font-bold text-white mt-0.5">{profile?.followers || "15"}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-heading">Following</p>
                  <p className="text-lg font-heading font-bold text-white mt-0.5">{profile?.following || "20"}</p>
                </div>
              </div>
            </div>

            {/* Simulated Heatmap Box */}
            <div className="bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-white/40">Grafik Kontribusi</span>
                <span className="text-xs text-emerald-400 font-body flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Aktif Berkontribusi
                </span>
              </div>

              {/* Contribution Grid */}
              <div className="flex flex-wrap gap-1 max-w-[280px] sm:max-w-none mx-auto justify-center">
                {renderContributionGrid()}
              </div>

              <div className="flex justify-between items-center mt-4 text-[10px] text-white/30 font-body">
                <span>Kurang aktif</span>
                <div className="flex gap-1 items-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-zinc-900" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-800" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                </div>
                <span>Sangat aktif</span>
              </div>
            </div>

          </div>

          {/* Right Column: Repositories List */}
          <div className="github-card-anim lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading font-semibold text-lg text-white">Repositori Terpilih</h4>
              <a
                href="https://github.com/ehanz12?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-heading uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                Lihat Semua Repo
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {loading ? (
              // Skeleton Loader
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-44 bg-zinc-950/40 border border-white/5 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : (
              // Repositories Cards
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(repos.length ? repos : fallbackRepos).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-zinc-950/60 border border-white/10 hover:border-white/25 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] group overflow-hidden"
                  >
                    {/* Linear Gradient glow inside cards */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div>
                      {/* Name & Icon */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h5 className="font-heading font-bold text-white text-base leading-tight break-all group-hover:text-indigo-400 transition-colors duration-300">
                          {repo.name}
                        </h5>
                        <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>

                      {/* Description */}
                      <p className="text-white/60 text-xs leading-relaxed mb-6 font-body line-clamp-3">
                        {repo.description || "Tidak ada deskripsi yang tersedia untuk repositori ini."}
                      </p>
                    </div>

                    {/* Stats & Languages */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 text-[11px] text-white/50 font-body">
                      {/* Left: Language */}
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`} />
                        <span>{repo.language || "Unknown"}</span>
                      </div>

                      {/* Right: Stars & Forks */}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-yellow-500/80" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>

                  </a>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Link Button */}
        <div className="github-card-anim mt-16 text-center">
          <a
            href="https://github.com/ehanz12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-heading font-semibold tracking-wider text-sm rounded-full btn border text-white transition duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z" />
            </svg>
            Kunjungi GitHub Saya
          </a>
        </div>
      </div>
    </section>
  );
};

export default GithubContributions;
