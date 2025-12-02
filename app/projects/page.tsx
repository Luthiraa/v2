import Link from "next/link";

const projects = [
    {
        title: "RLC Dev",
        description: "Leetcode for electrical engineers - democratizing the ee interview process, 3500 submissions in 2 weeks",
        href: "https://rlcdev.app/"
    },
    {
        title: "Talos",
        description: "Hardware accelerator for convolutional neural networks that runs both training and inference on chip.",
        href: "https://deepudocs.vercel.app/"
    },
    {
        title: "Hackerfab",
        description: "Making open source fabrication tools, chips, and qubits from the ground up.",
        href: "https://www.torontohackerfab.com/"
    },
    {
        title: "CVChess",
        description: "End-to-end board-to-FEN model that’s 4x better than state of the art and any existing model in the world.",
        href: "https://arxiv.org/abs/2511.11522"
    },
    {
        title: "AutoGrid AI",
        description: "Autonomous microgrid management with deep reinforcement learning, published on ieee sege 2025.",
        href: "https://arxiv.org/abs/2509.03666"
    },
    {
        title: "DeepMetal",
        description: "Compiler stack that transforms ML models into optimized edge executables, speed and efficiency you unlike standard toolchains.",
        href: "https://github.com/Luthiraa/DeepMetal"
    },
    {
        title: "A.I.M.",
        description: "Artificially Intelligent Maps, worlds first AI enabled map with map agents that can plan your day,trip and more.",
        href: "https://github.com/Luthiraa/AIM"
    },
];

export default function Projects() {
    return (
        <main className="min-h-screen w-full bg-black text-white p-8 font-mono flex flex-col items-center">
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
                    <span className="text-white">projects</span>
                </header>

                <div className="text-left mb-12">
                    <p className="text-xs italic text-gray-400">you've found an easter egg! here are some of the things i've built</p>
                </div>

                {/* Projects List */}
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <div key={index} className="space-y-1">
                            <Link
                                href={project.href}
                                target={project.href !== "#" ? "_blank" : undefined}
                                className="block text-sm font-medium hover:text-gray-300 underline decoration-1 underline-offset-4 transition-colors"
                            >
                                {project.title}
                            </Link>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
