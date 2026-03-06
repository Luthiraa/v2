"use client";

import Link from "next/link";

export default function ScrollToTop() {
    return (
        <Link
            href="#"
            className="hover:text-black transition-colors"
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
        >
            Top of page ↑
        </Link>
    );
}
