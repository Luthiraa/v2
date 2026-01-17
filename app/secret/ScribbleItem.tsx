"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Rough hand-drawn SVG paths for borders
export const scribblePaths = [
    "M10,10 C100,8 200,12 300,10 C310,10 310,100 305,200 C300,300 100,290 10,295 C-5,200 5,100 10,10", // Rough Box 1
    "M5,5 C50,0 250,5 295,10 C305,50 300,250 290,290 C200,300 50,295 10,290 C0,200 0,50 5,5",       // Rough Box 2
    "M15,15 C100,5 200,0 285,15 C305,100 295,200 285,285 C200,300 100,295 15,285 C0,200 5,100 15,15", // Rough Box 3
];

export default function ScribbleItem({ src, index }: { src: string; index: number }) {
    // Pick a random scribble path based on index
    const path = scribblePaths[index % scribblePaths.length];
    const isVideo = src.toLowerCase().endsWith(".mov") || src.toLowerCase().endsWith(".mp4");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Prevent hydration mismatch by rendering nothing on server
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.5, delay: index % 5 * 0.1 }}
            className="relative group cursor-pointer w-full"
        >
            {/* The Content Container */}
            <div
                className="relative z-10 p-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1"
                suppressHydrationWarning // Extra safety, though isMounted should fix it
            >
                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={src}
                        autoPlay
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

            {/* Special 'Pet Me' Interaction for Cat Video/Image */}
            {(src.toLowerCase().includes("5179") || src.toLowerCase().includes("5260") || src.toLowerCase().includes("4980") || src.toLowerCase().includes("5302") || src.toLowerCase().includes("cat_curl")) && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none block whitespace-nowrap">
                    <div className="flex flex-col items-center">
                        <span className="font-virgil text-lg text-white drop-shadow-md bg-black/40 px-2 rounded mb-1">pet me</span>
                        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-bounce">
                            {/* Arrow pointing UP */}
                            <path d="M25,40 Q25,25 25,10" />
                            <path d="M15,20 L25,10 L35,20" />
                        </svg>
                    </div>
                </div>
            )}

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
