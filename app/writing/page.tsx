import Link from "next/link";

const posts = [
    {
        id: 0,
        title: "Reverse Engineering the Feed",
        date: "2026-01-25",
        summary: "A deep dive into the X ranking system: Thunder, Phoenix, and optimization strategies.",
        slug: "reverse-engineering-the-feed"
    },
];

export default function Writing() {
    return (
        <main className="min-h-screen w-full bg-black text-white p-8 font-virgil flex flex-col items-center selection:bg-white selection:text-black">
            <div className="max-w-[500px] w-full">
                {/* Header */}
                <header className="flex items-center gap-4 mb-16 text-xs text-gray-400">
                    <Link href="/" className="hover:text-white transition-colors group">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                            <path d="M19 12H5"></path>
                            <path d="M12 19l-7-7 7-7"></path>
                        </svg>
                    </Link>
                    <span>/</span>
                    <span className="text-white">writing</span>
                </header>

                <div className="text-left mb-16">
                    <p className="text-sm italic text-gray-500">
                        thoughts, notes, and incomplete ideas.
                    </p>
                </div>

                {/* Posts List */}
                <div className="space-y-12">
                    {posts.map((post) => (
                        <div key={post.id} className="group cursor-pointer">
                            <Link href={`/writing/${post.slug}`} className="block space-y-2">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-600 tracking-wider">{post.date}</span>
                                    <h2 className="text-xl text-gray-200 group-hover:text-white transition-colors">
                                        {post.title}
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                                    {post.summary}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>


            </div>
        </main>
    );
}
