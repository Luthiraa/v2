"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const galleryImages = [
    {
        src: "/images/gallery/lionsgate.jpg",
        location: "Vancouver - Lion's Gate, Canada",
        date: "July 10, 2025",
    },
    {
        src: "/images/gallery/ferns.jpg",
        location: "Vancouver - Battery Park, Canada",
        date: "July 10, 2025",
    },
    {
        src: "/images/gallery/van1.jpg",
        location: "Vancouver - Battery Park, Canada",
        date: "July 10, 2025",
    },
    {
        src: "/images/gallery/sf3.jpg",
        location: "San Francisco - Bay Area, USA",
        date: "July 08, 2025",
    },
    {
        src: "/images/gallery/pelican.jpg",
        location: "San Francisco - Fisherman's Wharf, USA",
        date: "July 08, 2025",
    },
    {
        src: "/images/gallery/wharf.jpg",
        location: "San Francisco - Fisherman's Wharf, USA",
        date: "July 08, 2025",
    },
    {
        src: "/images/gallery/sealion.jpg",
        location: "San Francisco - Fisherman's Wharf, USA",
        date: "July 08, 2025",
    },
    {
        src: "/images/gallery/alcatraz.jpg",
        location: "San Francisco - Bay Area, USA",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/sunnyalcatraz.jpg",
        location: "San Francisco - Bay Area, USA",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/sf1.jpg",
        location: "San Francisco, California",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/sf2.jpg",
        location: "San Francisco, California",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/sfpark.jpg",
        location: "San Francisco, California",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/sfbay.jpg",
        location: "San Francisco, California",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/hawk.jpg",
        location: "Calgary - Alberta, Canada",
        date: "July 07, 2025",
    },

    {
        src: "/images/gallery/airplane.jpg",
        location: "Somewhere near the pacific",
        date: "July 07, 2025",
    },
    {
        src: "/images/gallery/caldt.jpg",
        location: "Calgary - Alberta, Canada",
        date: "July 06, 2025",
    },
    {
        src: "/images/gallery/peacebridge.jpg",
        location: "Calgary - Alberta, Canada",
        date: "July 06, 2025",
    },
    {
        src: "/images/gallery/skylinecal.jpg",
        location: "Calgary - Alberta, Canada",
        date: "July 06, 2025",
    },
    {
        src: "/images/gallery/tower.jpg",
        location: "Calgary - Alberta, Canada",
        date: "July 06, 2025",
    },
    {
        src: "/images/gallery/skylinecal2.jpg",
        location: "Calgary - Alberta, Canada",
        date: "July 06, 2025",
    },
    {
        src: "/images/gallery/london.jpg",
        location: "London, England",
        date: "August 31, 2024",
    },
    {
        src: "/images/gallery/scotland.jpg",
        location: "Edinbrugh, Scotland",
        date: "September 15, 2024",
    },
    {
        src: "/images/gallery/scotlandstreet1.jpg",
        location: "Edinbrugh, Scotland",
        date: "September 15, 2024",
    },
    {
        src: "/images/gallery/cow.jpg",
        location: "The Highlands, Scotland",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/bambrugh.jpg",
        location: "Bambrugh, Scotland",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/eiffel.jpg",
        location: "Paris, France",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/fountain.jpg",
        location: "Versailles, France",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/arch.jpg",
        location: "Paris, France",
        date: "October 1, 2024",
    }, {
        src: "/images/gallery/oldwoman.jpg",
        location: "Old Woman Bay, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/seal.jpg",
        location: "Sleeping Giant, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/cherry.jpg",
        location: "Toronto, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/niagara.jpg",
        location: "Niagara Falls, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/flatiron.jpg",
        location: "Toronto, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/fallmoose.jpg",
        location: "Algonquin, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/waterfall.jpg",
        location: "Kawartha Lakes, Canada",
        date: "October 1, 2024",
    },
    {
        src: "/images/gallery/toronto.jpg",
        location: "Toronto, Canada",
        date: "October 1, 2024",
    },
];

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    return (
        <main className="min-h-screen w-full bg-black text-white p-8 font-virgil">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <header className="flex items-center gap-4 mb-12 text-xs text-gray-400">
                    <Link href="/" className="hover:text-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </Link>
                    <span>/</span>
                    <span className="text-white">gallery</span>
                </header>

                <div className="text-left mb-12">
                    <Link href="/gallery/moments" className="text-xs italic text-gray-400 hover:text-white transition-colors underline decoration-1 underline-offset-4">
                        a collection of moments
                    </Link>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image.src}
                                alt={image.location}
                                width={500}
                                height={300}
                                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-xs font-medium text-white">{image.location}</p>
                                <p className="text-[10px] text-gray-300">{image.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.location}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="mt-4 text-center space-y-1">
                            <p className="text-sm font-medium">{selectedImage.location}</p>
                            <p className="text-xs text-gray-500">{selectedImage.date}</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
