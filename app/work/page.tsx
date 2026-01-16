import Link from "next/link";

const workExperience = [
    {
        company: "ARISE",
        role: "Engineering",
        date: "Jul 2025 - Nov 2025",
        description: "Building the world's first all in one robotics education platform.",
        href: "https://arisesim.com/"
    },
    {
        company: "Dash Social",
        role: "Engineering",
        date: "May 2025 - Aug 2025",
        description: "Data foundation team - building data monitoring and analysis tools.",
        href: "https://dashsocial.com/"
    },
    {
        company: "RBC Borealis",
        role: "Research",
        date: "Mar 2025 - May 2025",
        description: "Deep reinforcement learning agent for microgrid management.",
        href: "https://arxiv.org/abs/2509.03666"
    },
    {
        company: "Acceleration Consortium",
        role: "Engineering",
        date: "Sep 2024 - Apr 2025",
        description: "First intern cohort, automation for self driving labs.",
        href: "https://acceleration.utoronto.ca/"
    },
    {
        company: "Teknion",
        role: "Engineering",
        date: "May 2024 - Aug 2024",
        description: "Core erp software infrastructure",
        href: "https://www.teknion.com/ca"
    },
    {
        company: "Institute of Biomedical Engineering",
        role: "Research",
        date: "May 2024 - Aug 2024",
        description: "Saphenous nerve stimulation simulations.",
        href: "https://ww1.ibbme-neurolab.com/?usid=19&utid=22069006427"
    }
];

export default function Work() {
    return (
        <main className="min-h-screen w-full bg-black text-white p-8 font-virgil flex flex-col items-center">
            <div className="max-w-[500px] w-full">
                {/* Header */}
                <header className="flex items-center gap-4 mb-12 text-xs text-gray-400">
                    <Link href="/" className="hover:text-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </Link>
                    <span>/</span>
                    <span className="text-white">work</span>
                </header>

                <div className="text-left mb-12">
                    <p className="text-xs italic text-gray-400">places i've worked</p>
                </div>

                {/* Work List */}
                <div className="space-y-10">
                    {workExperience.map((job, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                                <Link
                                    href={job.href}
                                    target="_blank"
                                    className="text-sm font-medium hover:text-gray-300 underline decoration-1 underline-offset-4 transition-colors"
                                >
                                    {job.company}
                                </Link>
                                <span className="text-[10px] text-gray-500">{job.date}</span>
                            </div>
                            <p className="text-xs text-gray-400">{job.role}</p>
                            <p className="text-xs text-gray-500 leading-relaxed pt-1">
                                {job.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
