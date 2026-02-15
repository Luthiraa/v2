// Server Component

import Image from "next/image";
import Link from "next/link";

import Template from "@/app/writing/components/ReverseEngineeringTheFeed";
import Lessons2025 from "@/app/writing/components/Lessons2025";
import Reflections21 from "@/app/writing/components/Reflections21";
import ScrollToTop from "@/app/writing/components/ScrollToTop";

// --- Page Setup ---

const posts = {
    "21-reflections": {
        title: "A Note at 21",
        date: "2026-02-14",
        slug: "21-reflections",
        component: Reflections21
    },
    "reverse-engineering-the-feed": {
        title: "Reverse Engineering the Feed",
        date: "2026-01-25",
        slug: "reverse-engineering-the-feed",
        component: Template
    },
    "2025-lessons": {
        title: "2025 Lessons",
        date: "2025-12-31",
        slug: "2025-lessons",
        component: Lessons2025
    }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = posts[params.slug as keyof typeof posts];

    if (!post) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-virgil p-4 text-center">
                <div>
                    <h1 className="text-2xl mb-4">404</h1>
                    <p className="text-gray-500 mb-8">Page not found</p>
                    <Link href="/writing" className="underline hover:text-gray-300">Return to writing</Link>
                </div>
            </div>
        );
    }

    const Content = post.component;

    return (
        <main className="min-h-screen w-full bg-black text-white p-6 md:p-12 font-virgil selection:bg-white selection:text-black">
            {/* Header */}
            <header className="max-w-[650px] mx-auto w-full mb-16 flex items-center gap-4 text-xs text-gray-500">
                <Link href="/" className="hover:text-white transition-colors group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                        <path d="M19 12H5"></path>
                        <path d="M12 19l-7-7 7-7"></path>
                    </svg>
                </Link>
                <Link href="/writing" className="hover:text-white transition-colors">
                    writing
                </Link>
                <span>/</span>
                <span className="text-gray-300 truncate max-w-[150px]">{post.slug}</span>
            </header>

            <article className="max-w-[650px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                <header className="mb-12 border-b border-white/10 pb-8">
                    <span className="text-xs text-gray-500 block mb-3 uppercase tracking-widest">{post.date}</span>
                    <h1 className="text-2xl md:text-5xl font-bold leading-tight font-virgil tracking-tight">{post.title}</h1>
                </header>

                <div className="font-georgia text-lg leading-relaxed text-gray-300">
                    <Content />
                </div>
            </article>

            {/* Footer Navigation */}
            <div className="max-w-[650px] mx-auto w-full mt-24 pt-12 border-t border-white/10 flex justify-between text-xs font-virgil text-gray-500">
                <Link href="/writing" className="hover:text-white transition-colors">← Back to writing</Link>
                <ScrollToTop />
            </div>
        </main>
    );
}
