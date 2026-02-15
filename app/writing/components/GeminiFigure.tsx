"use client";

import Image from "next/image";

export default function GeminiFigure({
    src,
    alt,
    caption,
    width,
    height
}: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
}) {
    return (
        <figure className="my-10">
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full object-contain"
                />
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
