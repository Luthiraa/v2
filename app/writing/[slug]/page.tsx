"use client";

import Link from "next/link";

// --- Components for the graphical diagrams ---

function PipelineDiagram() {
    return (
        <div className="my-12 p-6 border border-white/10 rounded-lg bg-gray-900/30 font-virgil text-xs select-none">
            <div className="text-center mb-6 text-gray-500 uppercase tracking-widest text-[10px]">The Feed Pipeline</div>

            <div className="flex flex-col items-center gap-6">
                {/* Step 1: Query */}
                <div className="flex flex-col items-center gap-2">
                    <div className="px-4 py-2 bg-black border border-white/20 rounded-full text-white">User Opens App</div>
                    <div className="h-4 w-px bg-white/20"></div>
                </div>

                {/* Step 2: Sources */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <div className="flex flex-col gap-2 p-3 border border-pink-500/20 bg-pink-500/5 rounded text-center">
                        <div className="font-bold text-pink-400">Thunder</div>
                        <div className="text-[10px] text-gray-400">In-Network<br />(Who you follow)</div>
                        <div className="mt-1 text-[9px] text-pink-400/70">Real-time Kafka</div>
                    </div>
                    <div className="flex flex-col gap-2 p-3 border border-blue-500/20 bg-blue-500/5 rounded text-center">
                        <div className="font-bold text-blue-400">Phoenix</div>
                        <div className="text-[10px] text-gray-400">Out-of-Network<br />(Discovery)</div>
                        <div className="mt-1 text-[9px] text-blue-400/70">Vector Search</div>
                    </div>
                </div>

                {/* Merge */}
                <div className="h-4 w-px bg-white/20"></div>

                {/* Step 3: Hydration & Filter */}
                <div className="w-full max-w-[200px] text-center p-2 border border-white/10 bg-black rounded text-gray-300">
                    <div>Hydration & Pre-Filter</div>
                    <div className="text-[9px] text-gray-500 mt-1">Remove seen, blocked, muted</div>
                </div>

                <div className="h-4 w-px bg-white/20"></div>

                {/* Step 4: Scoring */}
                <div className="w-full max-w-[200px] flex flex-col gap-1">
                    <div className="p-2 border border-green-500/20 bg-green-500/5 rounded text-center text-green-400">
                        Phoenix Scorer
                        <div className="text-[9px] opacity-70">Grok-based Transformer</div>
                    </div>
                    <div className="text-center text-[10px] text-gray-600">↓</div>
                    <div className="p-2 border border-white/20 bg-white/5 rounded text-center text-white">
                        Weighted Sum
                        <div className="text-[9px] text-gray-500">P(Like) * w + P(Reply) * w ...</div>
                    </div>
                </div>

                <div className="h-4 w-px bg-white/20"></div>

                {/* Step 5: Selection */}
                <div className="px-6 py-2 bg-white text-black font-bold rounded-full">
                    Final Feed
                </div>
            </div>
        </div>
    );
}

function TwoTowerDiagram() {
    return (
        <div className="my-12 p-6 border border-white/10 rounded-lg bg-gray-900/30 font-virgil text-xs select-none">
            <div className="text-center mb-8 text-gray-500 uppercase tracking-widest text-[10px]">Phoenix Retrieval (Two-Tower)</div>

            <div className="flex justify-between items-center gap-4 max-w-md mx-auto">
                {/* User Tower */}
                <div className="flex-1 flex flex-col items-center gap-3">
                    <div className="text-center">
                        <div className="p-3 border border-gray-700 bg-black rounded mb-2">User History</div>
                        <div className="text-[10px] text-gray-500">Likes, Reposts, Dwell</div>
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-gray-700 to-blue-500"></div>
                    <div className="px-3 py-1.5 border border-blue-500 bg-blue-500/10 rounded text-blue-400 font-bold">User Embedding</div>
                </div>

                {/* Dot Product */}
                <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white font-serif italic bg-white/5">
                        ×
                    </div>
                    <div className="text-[9px] text-gray-500 mt-2">Dot Product</div>
                </div>

                {/* Helper Tower */}
                <div className="flex-1 flex flex-col items-center gap-3">
                    <div className="text-center">
                        <div className="p-3 border border-gray-700 bg-black rounded mb-2">Candidate Post</div>
                        <div className="text-[10px] text-gray-500">Text, Media, Author</div>
                    </div>
                    <div className="h-6 w-px bg-gradient-to-b from-gray-700 to-purple-500"></div>
                    <div className="px-3 py-1.5 border border-purple-500 bg-purple-500/10 rounded text-purple-400 font-bold">Post Embedding</div>
                </div>
            </div>
            <div className="text-center mt-8 text-[10px] text-gray-400 max-w-xs mx-auto">
                The system finds posts where the Post Embedding is mathematically similar (close in vector space) to your User Embedding.
            </div>
        </div>
    );
}

// --- Content Component ---

const TwitterAlgoPost = () => (
    <div className="space-y-8">
        <p>
            The "algorithm" isn't a single magic score. It's a massive, industrial-scale pipeline designed to filter the entire world's noise down to a handful of tweets you might actually care about.
        </p>
        <p>
            Recently, X (formerly Twitter) updated their open-source documentation for the "For You" feed. It's distinct from the 2023 release. I've broken down how it works, what's changed, and mechanically, how you can optimize for it.
        </p>

        <h3 className="text-2xl font-virgil text-white mt-12 mb-4">The Pipeline</h3>
        <p>
            Every time you pull to refresh, the system executes a complex chain of retrieval and ranking. It doesn't score every tweet in existence. That would be impossible. Instead, it uses a funnel approach.
        </p>

        <PipelineDiagram />

        <p>
            The process has two distinct phases: <strong>Candidate Sourcing</strong> (finding possible tweets) and <strong>Ranking</strong> (deciding the order).
        </p>

        <h3 className="text-xl font-virgil text-white mt-8 mb-2">1. Candidate Sourcing: Thunder vs. Phoenix</h3>
        <p>
            The system pulls specifically from two buckets:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-gray-600">
            <li>
                <strong className="text-gray-200">Thunder (In-Network):</strong> This is strict. It looks at people you follow. It's a fast, in-memory store powered by Kafka streams. If someone follows you, your post <em className="italic">will</em> be retrieved by Thunder for them. This is your "guaranteed" distribution pool.
            </li>
            <li>
                <strong className="text-gray-200">Phoenix (Out-of-Network):</strong> This is the discovery engine. It finds content from people the user <em>doesn't</em> follow. It uses a "Two-Tower" neural network architecture.
            </li>
        </ul>

        <TwoTowerDiagram />

        <p>
            In the Phoenix model, your behavior (likes, RTs) creates a "User Embedding". Every post has a "Post Embedding". The system effectively runs a massive similarity search to find posts that are mathematically "close" to your interests.
        </p>

        <h3 className="text-2xl font-virgil text-white mt-12 mb-4">The Scorer</h3>
        <p>
            Once the system has ~1500 candidates from Thunder and Phoenix, it passes them to the <strong>Scorer</strong>. This is where the magic (and the pain) happens.
        </p>
        <p>
            It uses a transformer model (derived from Grok) to predict the probability of you taking specific actions. Note that these are separate predictions—it calculates the chance you'll Like, the chance you'll Reply, the chance you'll Scroll Past, etc.
        </p>
        <p>
            These probabilities are then fed into a linear equation:
        </p>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded font-mono text-xs text-gray-300 overflow-x-auto">
            Score = (w_like * P_like) + (w_reply * P_reply) + (w_repost * P_repost) - (w_mute * P_mute)...
        </div>
        <p>
            <strong>Implication:</strong> Not all engagement is equal. A "Reply" might be weighted 50x higher than a "Like". Crucially, negative signals (blocking, muting, clicking "not interested") have massive negative weights. One "Show fewer like this" can nuke your reach with a cluster of users.
        </p>

        <h3 className="text-2xl font-virgil text-white mt-12 mb-4">How to Beat It</h3>
        <p>
            Understanding the architecture reveals the optimization function.
        </p>

        <div className="space-y-6">
            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">1. Diversity Penalties</h4>
                <p className="text-sm">
                    The system has an explicit "Author Diversity Scorer". If you post 5 times in an hour, the system will likely only show your best one to a user to prevent you from flooding their feed. <strong>Quality &gt; Volume within short windows.</strong>
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">2. Embedding Alignment</h4>
                <p className="text-sm">
                    To show up in "Phoenix" (discovery), your content needs to visually and semantically resemble content that your target audience is already engaging with. Niche-hopping confuses the embedding. <strong>Consistency helps the machine categorize you.</strong>
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">3. The Interaction Hierarchy</h4>
                <p className="text-sm">
                    Because of the weighted sum, high-effort interactions (replies, reposts) are worth exponentially more than passive ones (likes, views). Content that invites conversation (even controversy, unfortunately) will almost always outrank content that is merely "nice" but passive.
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">4. The Filters</h4>
                <p className="text-sm">
                    Before scoring even happens, posts are filtered. 'Muted keywords' and 'Blocked authors' remove you from the candidate pool instantly. If you use words that many people mute, your total addressable market shrinks silently.
                </p>
            </div>
        </div>

        <p className="mt-12 pt-8 border-t border-white/10 text-sm italic opacity-60">
            Source: Analysis based on recently released X algorithm documentation and architecture diagrams.
        </p>
    </div>
);

// --- Page Setup ---

const posts = {
    "reverse-engineering-the-feed": {
        title: "Reverse Engineering the Feed",
        date: "2026-01-25",
        slug: "reverse-engineering-the-feed",
        component: TwitterAlgoPost
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
                    <span className="text-xs font-mono text-gray-500 block mb-3 uppercase tracking-widest">{post.date}</span>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight font-virgil tracking-tight">{post.title}</h1>
                </header>

                <div className="font-georgia text-lg leading-relaxed text-gray-300">
                    <Content />
                </div>
            </article>

            {/* Footer Navigation */}
            <div className="max-w-[650px] mx-auto w-full mt-24 pt-12 border-t border-white/10 flex justify-between text-xs font-virgil text-gray-500">
                <Link href="/writing" className="hover:text-white transition-colors">← Back to writing</Link>
                <Link href="#" className="hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top of page ↑</Link>
            </div>
        </main>
    );
}
