"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const photos = [
    "1000017637.png",
    "IMG_5302.PNG",
    "IMG_5260.mov"
];

// Rough hand-drawn SVG paths for borders
const scribblePaths = [
    "M10,10 C100,8 200,12 300,10 C310,10 310,100 305,200 C300,300 100,290 10,295 C-5,200 5,100 10,10", // Rough Box 1
    "M5,5 C50,0 250,5 295,10 C305,50 300,250 290,290 C200,300 50,295 10,290 C0,200 0,50 5,5",       // Rough Box 2
    "M15,15 C100,5 200,0 285,15 C305,100 295,200 285,285 C200,300 100,295 15,285 C0,200 5,100 15,15", // Rough Box 3
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

import { useRef } from "react";

function ScribbleItem({ src, index }: { src: string; index: number }) {
    // Pick a random scribble path based on index
    const path = scribblePaths[index % scribblePaths.length];
    const isVideo = src.toLowerCase().endsWith(".mov") || src.toLowerCase().endsWith(".mp4");
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset to start
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, delay: index % 5 * 0.1 }}
            className="relative group cursor-pointer w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* The Content Container */}
            <div className="relative z-10 p-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={src}
                        muted
                        loop
                        playsInline
                        className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                        width={500}
                        height={400}
                    />
                ) : (
                    <Image
                        src={src}
                        alt="Memory"
                        width={500}
                        height={400}
                        className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>

            {/* The Animated Scribble Border */}
            <div className="absolute inset-0 z-20 pointer-events-none -m-2">
                <svg className="w-[calc(100%+1rem)] h-[calc(100%+1rem)]" viewBox="0 0 310 310" preserveAspectRatio="none">
                    <motion.path
                        d={path}
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.3 }} // Initial roughly drawn state
                        whileHover={{
                            pathLength: [0.8, 1, 0.9, 1], // Jittery animation
                            opacity: 1,
                            strokeDasharray: "0 0" // Become solid line
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            {/* Messy "Tape" or "Scribble" Overlay randomly placed */}
            {index % 3 === 0 && (
                <div className="absolute -top-4 -right-4 z-30 w-12 h-12 opacity-80 group-hover:animate-pulse">
                    <svg viewBox="0 0 50 50" className="text-white w-full h-full transform rotate-12">
                        <path d="M10,10 L40,40 M40,10 L10,40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            )}

            {/* Caption that appears on hover, looking like handwriting */}
            <div className="absolute -bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest text-xs z-30">
                <span className="bg-black px-2">fig. {index + 1} {isVideo && "(mov)"}</span>
            </div>

        </motion.div>
    );
}
