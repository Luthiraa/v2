"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
    src: string;
    type: "image" | "video";
    alt?: string;
}

interface CarouselProps {
    slides: Slide[];
}

export default function Carousel({ slides }: CarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Auto-scroll functionality using requestAnimationFrame for smoothness
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || isHovered || !isAutoScrolling) return;

        let animationFrameId: number;

        const scroll = () => {
            if (container) {
                // Scroll speed (pixels per frame)
                const speed = 0.5;

                if (container.scrollLeft >= container.scrollWidth / 2) {
                    // Reset to start (seamless loop because of duplicated items)
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += speed;
                }

                animationFrameId = requestAnimationFrame(scroll);
            }
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered, isAutoScrolling]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollBy({ left: -300, behavior: "smooth" });
            setIsAutoScrolling(false); // Pause auto-scroll on manual interaction
            setTimeout(() => setIsAutoScrolling(true), 3000); // Resume after invalidation
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollBy({ left: 300, behavior: "smooth" });
            setIsAutoScrolling(false);
            setTimeout(() => setIsAutoScrolling(true), 3000);
        }
    };

    // Duplicate slides to create seamless infinite scroll effect
    const allSlides = [...slides, ...slides, ...slides];

    return (
        <div
            className="relative w-full group py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    // Prevent elastic scrolling on Mac to keep the marquee smooth
                    overscrollBehaviorX: 'none'
                }}
            >
                {allSlides.map((slide, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 relative h-[300px] w-auto aspect-[3/4] md:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-white/5 transition-transform duration-300 hover:scale-[1.02]"
                    >
                        {slide.type === "video" ? (
                            <video
                                src={slide.src}
                                controls
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={slide.src}
                                alt={slide.alt || `Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Left Control */}
            <button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white/80 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110 disabled:opacity-0"
                aria-label="Scroll left"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Right Control */}
            <button
                onClick={scrollRight}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white/80 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 hover:scale-110"
                aria-label="Scroll right"
            >
                <ChevronRight size={24} />
            </button>

            {/* Gradient Masks for smooth fade effect at edges */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 to-transparent pointer-events-none opacity-0 md:opacity-100" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/80 to-transparent pointer-events-none opacity-0 md:opacity-100" />
        </div>
    );
}
