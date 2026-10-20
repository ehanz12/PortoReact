import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "../components/GlitchText";
import { SoundManager } from "../components/SoundManager";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Contact = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    gsap.from(".contact-title", {
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
    gsap.from(".contact-card", {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 60%" },
    });
  }, { scope: ref });

  const handleSubmit = (e) => {
    e.preventDefault();
    SoundManager.success();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-36">
      <div className="cyber-container">
        <div className="contact-title mb-12">
          <h2 className="section-title">
            <GlitchText text="Hubungi Saya" trigger="viewport" />
          </h2>
          <p className="section-subtitle mt-3 max-w-lg">Ada proyek menarik? Mari berkolaborasi.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="cyber-card rounded-lg border border-accent/8 overflow-hidden">
            <div className="p-6 space-y-5">
              <div className="contact-card">
                <label className="block font-mono text-xs text-accent mb-2">$ NAME:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-void border border-accent/8 rounded px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none transition-colors"
                  placeholder="Your name..."
                  required
                />
              </div>
              <div className="contact-card">
                <label className="block font-mono text-xs text-accent-copper mb-2">$ EMAIL:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-void border border-accent/8 rounded px-4 py-3 font-mono text-sm text-white focus:border-accent-copper/50 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="contact-card">
                <label className="block font-mono text-xs text-accent mb-2">$ MESSAGE:</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-void border border-accent/8 rounded px-4 py-3 font-mono text-sm text-white focus:border-accent/50 focus:outline-none transition-colors min-h-[120px] resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-mono text-sm text-void bg-accent rounded hover:bg-accent-copper hover:shadow-[0_0_25px_rgba(192,139,92,0.3)] transition-all"
              >
                {submitted ? "> Message sent successfully!" : "> send --message"}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="contact-card cyber-card">
              <h3 className="font-mono text-xs text-accent/60 mb-3">QUICK CONTACT</h3>
              <div className="space-y-3">
                {[
                  { label: "Email", value: "rhanssap@gmail.com", href: "mailto:rhanssap@gmail.com" },
                  { label: "WhatsApp", value: "+62 895 3455 70902", href: "https://wa.me/62895345570902" },
                  { label: "GitHub", value: "github.com/ehanz12", href: "https://github.com/ehanz12" },
                  { label: "Instagram", value: "@rhanz_ap", href: "https://www.instagram.com/rhanz_ap" },
                ].map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-void rounded border border-accent/8 hover:border-accent/30 transition-colors group"
                    onClick={() => SoundManager.hover()}
                  >
                    <div>
                      <p className="text-[10px] font-mono text-muted uppercase">{item.label}</p>
                      <p className="text-sm font-mono text-white group-hover:text-accent transition-colors">{item.value}</p>
                    </div>
                    <span className="text-accent/30 group-hover:text-accent transition-colors">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-card cyber-card">
              <h3 className="font-mono text-xs text-accent-copper/60 mb-3">LOCATION</h3>
              <p className="font-mono text-sm text-white">Bogor, Indonesia</p>
              <p className="font-mono text-xs text-muted mt-1">Timezone: WIB (UTC+7)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
