import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <main className="h-screen w-full flex flex-col items-center justify-center p-4 text-center max-w-[500px] mx-auto space-y-6 text-xs overflow-hidden">


            {/* Header */}
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-wide font-virgil">Luthira Abeykoon</h1>
                <div className="text-gray-400 font-virgil">
                    <span>Contact intercept • </span>
                    <a href="mailto:luthira.abeykoon@gmail.com" className="underline decoration-1 underline-offset-4 hover:text-white transition-colors">
                        luthira.abeykoon@gmail.com
                    </a>
                </div>
            </header>

            {/* Action Button */}
            <div>
                <Link href="/gallery">
                    <button className="border border-white/80 px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300 ease-in-out text-xs font-virgil">
                        Accelerate TFLOPs
                    </button>
                </Link>
            </div>

            {/* Bio Section */}
            <section className="space-y-4 text-left w-full leading-relaxed max-w-[400px] mx-auto tracking-wide text-gray-200 font-virgil text-sm">
                <p>
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
            {/* Links Section */}
            <footer className="w-full pt-0 -mt-6 pb-8 flex flex-col items-center font-virgil relative z-10">

                <div className="relative w-16 h-16 mb-12 group cursor-pointer">
                    {/* Static Image */}
                    <Image
                        src="/cat/cat1.png"
                        alt="Cat"
                        width={64}
                        height={64}
                        className="absolute inset-0 w-full h-full object-contain invert opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                    />
                    {/* Animated GIF */}
                    <Image
                        src="/cat/cat-animated.gif"
                        alt="Cat Animated"
                        width={64}
                        height={64}
                        className="absolute inset-0 w-full h-full object-contain invert opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        unoptimized
                    />
                </div>

                <div className="flex flex-row gap-16 items-start text-sm">

                    {/* GitHub */}
                    <div className="relative group flex flex-col items-center">
                        <Link href="https://github.com/Luthiraa" target="_blank" className="block underline decoration-1 underline-offset-4 hover:text-gray-300 relative z-10 whitespace-nowrap">
                            GitHub
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 flex flex-col items-center pointer-events-none">
                            <div className="relative w-full h-[40px]">
                                <svg className="absolute left-1/2 -translate-x-1/2 -top-1 w-[50px] h-[40px] text-gray-500 opacity-70" viewBox="0 0 50 40" fill="none">
                                    <path d="M15 35 C 20 25, 25 15, 25 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                    <path d="M25 2 L 22 8 M 25 2 L 29 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="absolute left-[10px] top-[25px] text-gray-500 text-[10px] -ml-4 whitespace-nowrap">life monorepository</p>
                            </div>
                        </div>
                    </div>

                    {/* X */}
                    <div className="relative group flex flex-col items-center">
                        <Link href="https://x.com/luthiraabeykoon" target="_blank" className="block underline decoration-1 underline-offset-4 hover:text-gray-300 relative z-10 whitespace-nowrap">
                            X [dot] com
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 flex flex-col items-center pointer-events-none">
                            <svg className="w-[20px] h-[30px] text-gray-500 mb-1 opacity-70" viewBox="0 0 20 30" fill="none">
                                <path d="M10 28 C 10 20, 10 10, 10 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                <path d="M10 2 L 7 7 M 10 2 L 13 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-gray-500 text-[10px] leading-tight text-center w-full">updates, builds, whatever i’m thinking about that day</p>
                        </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="relative group flex flex-col items-center">
                        <Link href="https://www.linkedin.com/in/luthiraa/" target="_blank" className="block underline decoration-1 underline-offset-4 hover:text-gray-300 relative z-10 whitespace-nowrap">
                            LinkedIn
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-40 flex flex-col items-center pointer-events-none">
                            <div className="relative w-full h-[40px]">
                                <svg className="absolute left-1/2 -translate-x-1/2 -top-1 w-[50px] h-[40px] text-gray-500 opacity-70" viewBox="0 0 50 40" fill="none">
                                    <path d="M35 35 C 30 25, 25 15, 25 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                                    <path d="M25 2 L 22 8 M 25 2 L 28 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="absolute right-[10px] top-[25px] text-gray-500 text-[10px] -mr-4 whitespace-nowrap">(public archive)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-0.5 mt-28">
                    <p className="text-gray-600 italic text-sm whitespace-nowrap">~imagination is limitless~</p>
                </div>

            </footer>
        </main>
    );
}
