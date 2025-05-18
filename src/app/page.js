"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const socialLinks = [
  { href: "https://github.com/Luthiraa", label: "GitHub", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
  ) },
  { href: "https://www.linkedin.com/in/luthiraa/", label: "LinkedIn", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8a6 6 0 0 1 6 6v6M2 8v6a6 6 0 0 0 6 6h6"/><circle cx="8" cy="8" r="1"/><rect x="7" y="11" width="2" height="6"/></svg>
  ) },
  { href: "luthira.abeykoon@mail.utoronto.ca", label: "Email", icon: (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
  ) },
];

const controlBarIcons = [
  { label: "Home", icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L10 4l7 5.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/></svg>
  ), href: "/" },
  { label: "Gallery", icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5-4 4-2-2-5 5"/></svg>
  ), href: "/gallery" },
];

export default function Home() {
  const [showBadge, setShowBadge] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBadge(true), 100);
    setTimeout(() => setShowName(true), 400);
    setTimeout(() => setShowSubtitle(true), 700);
    setTimeout(() => setShowButton(true), 1000);
    setTimeout(() => setShowIcons(true), 1300);
    setTimeout(() => setShowMenu(true), 1600);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#111] text-white relative">
      {/* Centered Full Landing Page */}
      <section className={`flex flex-col items-start max-w-2xl w-full px-4 justify-center min-h-screen ${showBadge ? '' : 'opacity-0'}`}>
        {/* Badge */}
        <Fade triggerOnce>
          <div className="mb-8">
            <span className="inline-flex items-center px-5 py-2 rounded-md bg-[#232323]/60 backdrop-blur-sm text-base font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 inline-block animate-pulsate"></span>
              Building at <a href="#" className="underline font-bold ml-1">Dash Social</a>
            </span>
          </div>
        </Fade>
        {/* Name */}
        <Fade triggerOnce delay={200}>
          <h1 className="text-5xl font-extrabold mb-2 leading-tight">Luthira Abeykoon</h1>
        </Fade>
        {/* Subtitle */}
        <Fade triggerOnce delay={400}>
          <p className="text-base text-gray-300 mb-2 max-w-xl">Engineer building at the intersection of embedded software and machine learning. Currently stuying Electrical Engineering at the University of Toronto. Seeking summer 2026 internships/PEY.</p>
        </Fade>
        {/* More About Me Button */}
        <Fade triggerOnce delay={600}>
          <a href="#work" className="mt-6 mb-10 inline-flex items-center px-7 py-3 border border-white rounded-md font-bold text-white hover:bg-white hover:text-black transition duration-300 text-base bg-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white mr-2 inline-block"></span>
            More About Me
          </a>
        </Fade>
        {/* Social Icons */}
        <Fade triggerOnce delay={800}>
          <div className="flex gap-8 mt-2">
            {socialLinks.map((link, i) => (
              <a key={i} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition text-2xl font-bold">
                {link.icon}
              </a>
            ))}
          </div>
        </Fade>
      </section>
      {/* Work Section */}
      <Fade triggerOnce>
        <section id="work" className="w-full flex flex-col items-center mt-32">
          <div className="max-w-5xl w-full px-4">
            <h2 className="flex items-center text-2xl font-bold mb-10">
              <svg className="mr-2" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><rect x="2" y="7" width="24" height="15" rx="2"/><path d="M16 13h6"/></svg>
              Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
    
              <div className="flex flex-col gap-8">
    
                {/* Work Item */}
                <Fade triggerOnce>
                  <div className="flex gap-4 items-start group hover-orange-glow transition">
                    <img src="/images/dash.png" alt="DH" className="w-12 h-12 rounded-md bg-[#18181b] object-contain" />
                    <div>
                      <div className="font-semibold text-lg">Dash Social</div>
                      <a href="https://dashsocial.com/" className="text-purple-400 font-medium hover:underline">Software Engineering Intern</a>
                      <div className="text-sm text-gray-400">May 2025 - August 2025</div>
                    </div>
                  </div>
                </Fade>
                {/* Work Item */}
                <Fade triggerOnce delay={100}>
                  <div className="flex gap-4 items-start group hover-orange-glow transition">
                    <img src="/images/borealis.jpg" alt="Borealis" className="w-12 h-12 rounded-md bg-[#18181b] object-contain" />
                    <div>
                      <div className="font-semibold text-lg">RBC Borealis</div>
                      <a href="https://rbcborealis.com/lets-solve-it/" className="text-purple-400 font-medium hover:underline">Student Researcher</a>
                      <div className="text-sm text-gray-400">March 2025 - May 2025</div>
                    </div>
                  </div>
                </Fade>
                {/* Work Item */}
                <Fade triggerOnce delay={200}>
                  <div className="flex gap-4 items-start group hover-orange-glow transition">
                    <img src="/images/ac.jpg" alt="AC" className="w-12 h-12 rounded-md bg-[#18181b] object-contain" />
                    <div>
                      <div className="font-semibold text-lg">Acceleration Consortium</div>
                      <a href="https://acceleration.utoronto.ca/" className="text-purple-400 font-medium hover:underline">Developer</a>
                      <div className="text-sm text-gray-400">September 2024 - April 2025</div>
                    </div>
                  </div>
                </Fade>
                {/* Work Item */}
                <Fade triggerOnce delay={300}>
                  <div className="flex gap-4 items-start group hover-orange-glow transition">
                    <img src="/images/teknion.jpg" alt="Teknion" className="w-12 h-12 rounded-md bg-[#18181b] object-contain" />
                    <div>
                      <div className="font-semibold text-lg">Teknion</div>
                      <a href="https://www.teknion.com/ca" className="text-purple-400 font-medium hover:underline">Software Engineer Intern</a>
                      <div className="text-sm text-gray-400">May 2024 - August 2024</div>
                    </div>
                  </div>
                </Fade>
                {/* Work Item */}
                <Fade triggerOnce delay={400}>
                  <div className="flex gap-4 items-start group hover-orange-glow transition">
                    <img src="/images/bme.jpg" alt="WAT.ai" className="w-12 h-12 rounded-md bg-[#18181b] object-contain" />
                    <div>
                      <div className="font-semibold text-lg">Institute of Biomedical Engineering</div>
                      <a href="https://ww1.ibbme-neurolab.com/?usid=19&utid=22069006427" className="text-purple-400 font-medium hover:underline">Undergraduate Researcher</a>
                      <div className="text-sm text-gray-400">May 2024 - August 2024</div>
                    </div>
                  </div>
                </Fade>
                {/* Work Item */}
                <Fade triggerOnce delay={500}>
                  <div className="flex gap-4 items-start group hover-orange-glow transition">
                    <img src="/images/ontario.png" alt="D&D Skunkworks" className="w-12 h-12 rounded-md bg-[#18181b] object-contain" />
                    <div>
                      <div className="font-semibold text-lg">Government of Ontario</div>
                      <a href="https://www.ontario.ca/page/land-registry-offices-lro" className="text-purple-400 font-medium hover:underline">IT & Automation Intern</a>
                      <div className="text-sm text-gray-400">June 2023 - August 2023</div>
                    </div>
                  </div>
                </Fade>
              </div>
              {/* Right column: descriptions */}
              <div className="flex flex-col gap-8">
                <Fade triggerOnce>
                  <div className="text-gray-200">Building the backend data infrastructure for Dash Web — integrating Instagram, Facebook, and a custom content library into a unified, scalable system. </div>
                </Fade>
                <Fade triggerOnce delay={100}>
                  <div className="text-gray-200">Developed forecasting models for solar and wind energy generation using Transformer architecture, and built API-driven data pipelines to support a deep reinforcement learning agent.</div>
                </Fade>
                <Fade triggerOnce delay={200}>
                  <div className="text-gray-200">Primary workstudy cohort core memebr for self driving labs (training labs) of the Global Materials Discovery Lab team, building smart data pipelines to automate temperature control in next-gen material experiments</div>
                </Fade>
                <Fade triggerOnce delay={300}>
                  <div className="text-gray-200">Core ERP software infrastructure team, autonomous OCR reciept proceeing and inventory management.</div>
                </Fade>
                <Fade triggerOnce delay={400}>
                  <div className="text-gray-200">Simulations and data analytics for single-fiber action potential nerve propagation through non-invasive saphenous nerve stimulation for overactive bladder treatment. </div>
                </Fade>
                <Fade triggerOnce delay={500}>
                  <div className="text-gray-200">Built OCR data pipelines automating manual data entry for 100,000+ land registry pins. (LRO #66)</div>
                </Fade>
              </div>
            </div>
          </div>
        </section>
      </Fade>
      {/* Projects Section */}
      <Fade triggerOnce>
        <section id="projects" className="w-full flex flex-col items-center mt-32 mb-24">
          <div className="max-w-5xl w-full px-4">
            <h2 className="flex items-center text-2xl font-bold mb-10">
              <svg className="mr-2" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><rect x="2" y="7" width="24" height="15" rx="2"/><path d="M16 13h6"/></svg>
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Example Project Card */}
              <Fade triggerOnce>
                <div className="flex flex-col gap-4 group hover-orange-glow transition">
                  <a href="https://github.com/kennykguo/autogrid-ai" className="block bg-[#18181b] rounded-xl overflow-hidden shadow-xl transition-transform transform hover:-translate-y-1 hover:-shadow-2xl hover:bg-[#2a2a2a] duration-300">
                    <img
                      src="/images/dashboard.png"
                      alt="Maestro"
                      className="w-full object-cover aspect-video"
                      width={1500}
                      height={1000}
                    />
                  </a>
                  <div className="p-2">
                    <div className="font-semibold text-xl mb-2">AutoGrid AI</div>
                    <div className="text-gray-400 text-base">Microgrid management with deep reinforcement learning</div>
                  </div>
                </div>
              </Fade>
              <Fade triggerOnce delay={100}>
                <div className="flex flex-col gap-4 group hover-orange-glow transition">
                  <a href="https://github.com/Luthiraa/RLC.dev" className="block bg-[#18181b] rounded-lg overflow-hidden shadow transition-transform transform hover:-translate-y-1 hover:-shadow-lg hover:bg-[#2a2a2a] duration-300">
                    <img src="/images/rlc.png" alt="Politicate" className="w-full object-cover aspect-video" />
                  </a>
                  <div className="p-2">
                    <div className="font-semibold text-lg">RLC.dev</div>
                    <div className="text-gray-400 text-sm">Master Electrical Engineering with leetcode style questions</div>
                  </div>
                </div>
              </Fade>
              <Fade triggerOnce delay={200}>
                <div className="flex flex-col gap-4 group hover-orange-glow transition">
                  <a href="https://github.com/Luthiraa/Zephron" className="block bg-[#18181b] rounded-lg overflow-hidden shadow transition-transform transform hover:-translate-y-1 hover:-shadow-lg hover:bg-[#2a2a2a] duration-300">
                    <img src="/images/zephron.jpg" alt="steersafe" className="w-full object-cover aspect-video" />
                  </a>
                  <div className="p-2">
                    <div className="font-semibold text-lg">Zephron</div>
                    <div className="text-gray-400 text-sm">RISC V Robot Arm with AXI communication and VGA dashboard.</div>
                  </div>
                </div>
              </Fade>
              <Fade triggerOnce delay={300}>
                <div className="flex flex-col gap-4 group hover-orange-glow transition">
                  <a href="https://github.com/Luthiraa/AIM" className="block bg-[#18181b] rounded-lg overflow-hidden shadow transition-transform transform hover:-translate-y-1 hover:-shadow-lg hover:bg-[#2a2a2a] duration-300">
                    <img src="/images/iam.png" alt="DreamTeam" className="w-full object-cover aspect-video" />
                  </a> 
                  <div className="p-2">
                    <div className="font-semibold text-lg">A.I.M.</div>
                    <div className="text-gray-400 text-sm">Artificially Intelligent Maps (w/ LLM powered Agentic Assistant)</div>
                  </div>
                </div>
              </Fade>
              <Fade triggerOnce delay={400}>
                <div className="flex flex-col gap-4 group hover-orange-glow transition">
                  <a href="https://github.com/Luthiraa/Go-Fish" className="block bg-[#18181b] rounded-lg overflow-hidden shadow transition-transform transform hover:-translate-y-1 hover:-shadow-lg hover:bg-[#2a2a2a] duration-300">
                    <img src="/images/gofish.png" alt="" className="w-full object-cover aspect-video"/>
                  </a>
                  <div className="p-2">
                    <div className="font-semibold text-lg">Go Fish</div>
                    <div className="text-gray-400 text-sm"> Internal semantic retrieval system using Transformer-based dense embeddings and RAG</div>
                  </div>
                </div>
              </Fade>
              <Fade triggerOnce delay={500}>
                <div className="flex flex-col gap-4 group hover-orange-glow transition">
                  <a href="https://github.com/Luthiraa/Weave" className="block bg-[#18181b] rounded-lg overflow-hidden shadow transition-transform transform hover:-translate-y-1 hover:-shadow-lg hover:bg-[#2a2a2a] duration-300">
                    <img src="/images/weave.png" alt="Project LeBron" className="w-full object-cover aspect-video" />
                  </a>
                  <div className="p-2">
                    <div className="font-semibold text-lg">Weave</div>
                    <div className="text-gray-400 text-sm">  The app that remembers names so you don't have to — never say "who was that again?" ever again</div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>
      </Fade>
      {/* Floating Control Bar */}
      <Fade triggerOnce>
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#18181b]/60 border border-[#232323] rounded-xl px-6 py-2 flex gap-6 shadow-lg z-50 backdrop-blur-sm transition-opacity duration-700 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
          {controlBarIcons.map((item, i) => (
            <a key={i} href={item.href} aria-label={item.label}>
              <Fade triggerOnce delay={i * 100}>
                <div className="p-2 hover:bg-[#232323] rounded-lg transition">
                  {item.icon}
                </div>
              </Fade>
            </a>
          ))}
        </div>
      </Fade>
      {/* Footer */}
      <Fade triggerOnce>
        <footer className="w-full flex justify-between items-center py-4 px-4 text-gray-500 text-sm mt-16">
          <span>Luthira Abeykoon</span>
          {/* <span>Last updated: [Fetch last commit date from GitHub]</span> */}
        </footer>
      </Fade>
    </div>
  );
}
