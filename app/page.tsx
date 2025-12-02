import Link from "next/link";

export default function Home() {
    return (
        <main className="h-screen w-full flex flex-col items-center justify-center p-4 text-center max-w-[500px] mx-auto space-y-6 font-mono text-xs overflow-hidden">

            {/* Header */}
            <header className="space-y-2">
                <h1 className="text-base font-medium tracking-wide">Luthira Abeykoon</h1>
                <div className="text-gray-400">
                    <span>Contact intercept • </span>
                    <a href="mailto:luthira.abeykoon@gmail.com" className="underline decoration-1 underline-offset-4 hover:text-white transition-colors">
                        luthira.abeykoon@gmail.com
                    </a>
                </div>
            </header>

            {/* Action Button */}
            <div>
                <Link href="/gallery">
                    <button className="border border-white/80 px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300 ease-in-out text-xs">
                        Accelerate the Luthira-TFLOPs
                    </button>
                </Link>
            </div>

            {/* Bio Section */}
            <section className="space-y-4 text-left w-full leading-relaxed max-w-[400px] mx-auto">
                <p className="font-semibold">
                    I <Link href="/projects" className="underline decoration-1 underline-offset-4 hover:text-gray-300">make</Link> things, break things, and <Link href="/work" className="underline decoration-1 underline-offset-4 hover:text-gray-300">ship</Link> fast.
                </p>

                <p>
                    I like building things end to end, from the idea stage to something real people can try.
                </p>

                <p>
                    I work across hardware, software, and AI. I’ve built tools, sites, and systems that solve problems I care about, and I’m always looking for the next thing to make.
                </p>
            </section>

            {/* Links Section */}
            <footer className="space-y-4 pt-4 w-full text-center">

                <div className="space-y-0.5">
                    <Link href="https://github.com/Luthiraa" target="_blank" className="block underline decoration-1 underline-offset-4 hover:text-gray-300">
                        GitHub
                    </Link>
                    <p className="text-gray-500 text-[10px]">Source loci</p>
                </div>

                <div className="space-y-0.5">
                    <Link href="https://x.com/luthiraabeykoon" target="_blank" className="block underline decoration-1 underline-offset-4 hover:text-gray-300">
                        X Dot Com
                    </Link>
                    <p className="text-gray-500 text-[10px]">updates, builds, whatever i’m thinking about that day</p>
                </div>

                <div className="space-y-0.5">
                    <Link href="https://www.linkedin.com/in/luthiraa/" target="_blank" className="block underline decoration-1 underline-offset-4 hover:text-gray-300">
                        LinkedIn
                    </Link>
                    <p className="text-gray-500 text-[10px]">career mode lite (trying to deprecate)</p>
                </div>

            </footer>
        </main>
    );
}
