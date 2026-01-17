"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const ScribbleItem = dynamic(() => import("./ScribbleItem"), { ssr: false });

const photos = [
    "IMG_5179.MOV",
    "screen_recording_1.mov",
    "original_4b82bc4e-0419-4559-a048-fcb12fc7e53c_PXL_20240718_122608667.MP~2.jpg",
    "original_1f8ec597-e4da-4ec5-8f42-eb0495519bff_PXL_20230721_135822754~2.jpg",
    "meraki_me_luthira.jpg",
    "PXL_20250818_013751623.jpg",
    "PXL_20250802_193956919.mp4",
    "PXL_20250721_154842553.mp4",
    "PXL_20250721_035153535.jpg",
    "PXL_20250720_154632579.jpg",
    "PXL_20250719_191248778.jpg",
    "PXL_20250719_021833105.MP.jpg",
    "PXL_20250719_185050030.jpg",
    "PXL_20240831_230134704.jpg",
    "PXL_20240831_163629996.jpg",
    "PXL_20240726_073401979.jpg",
    "PXL_20240725_204910448.jpg",
    "PXL_20240725_105907996.jpg",
    "PXL_20240722_104024828.jpg",
    "PXL_20240722_103517581.jpg",
    "PXL_20240720_082110249.jpg",
    "PXL_20240717_192332254.jpg",
    "PXL_20240506_232037123.jpg",
    "PXL_20240506_225408619.mp4",
    "PXL_20240501_222812735.MP.jpg",
    "PXL_20231228_222236990~2.jpg",
    "PXL_20231228_213258249.jpg",
    "PXL_20231225_223901262.NIGHT.jpg",
    "PXL_20231225_222659146.jpg",
    "PXL_20231219_214311917.jpg",
    "PXL_20231207_165110679.jpg",
    "PXL_20230720_211023118.jpg",
    "PXL_20230720_210311516.jpg",
    "PXL_20230612_195349301.MP.jpg",
    "PXL_20230607_180447197.jpg",
    "PXL_20230501_161118142.MP.jpg",
    "IMG_5302.PNG",
    "IMG_5260.mov",
    "IMG_5164.jpg",
    "IMG_4980.mov",
    "IMG_4980.jpg",
    "IMG-20241124-WA0001.jpg",
    "3b447e1e-d5fa-484e-aa50-cfe63c1d8f5d_0.jpg",
    "1000017637.png",
    "1000009922.jpg",
    "1000007103.jpg",
    "1000007088.jpg",
    "1000006982.jpg",
    "1000006317.jpg"
];

export default function Secret() {
    return (
        <main className="min-h-screen w-full bg-black text-white p-4 md:p-8 font-virgil overflow-x-hidden selection:bg-white selection:text-black">

            {/* Nav */}
            <nav className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-none">
                <Link href="/" className="text-sm hover:underline underline-offset-4 decoration-1 opacity-50 hover:opacity-100 transition-opacity pointer-events-auto">
                    ← return
                </Link>
            </nav>

            <div className="max-w-[1920px] mx-auto pt-24 pb-40">
                <header className="mb-24 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold opacity-100 mb-4 tracking-tighter relative inline-block">
                        <span className="relative z-10">Darkroom</span>
                        <svg className="absolute -bottom-2 left-0 w-full h-4 text-white/50 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </h1>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        Rough drafts of memory.
                    </p>
                </header>

                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8 px-4">
                    {photos.map((photo, index) => (
                        <div key={photo} className="break-inside-avoid pt-2 pl-2">
                            <ScribbleItem src={`/secret/${photo}`} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
