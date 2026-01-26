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
            The "algorithm" isn't a single magic score. It's a massive, industrial-scale retrieval and ranking pipeline designed to filter the entire world's noise down to a handful of tweets you might actually care about.
        </p>
        <p>
            Recently, X (formerly Twitter) updated their open-source documentation for the "For You" feed. It's distinct from the 2023 release. I've broken down how it works, what's changed, and mechanically, how you can optimize for it.
        </p>

        <h3 className="text-2xl font-virgil text-white mt-12 mb-4">The Pipeline Architecture</h3>
        <p>
            Every time you pull to refresh, the system executes a complex chain of operations. It doesn't score every tweet in existence (which would be computationally impossible). Instead, it uses a <strong>funnel approach</strong>:
        </p>

        <PipelineDiagram />

        <p>
            The process has two distinct phases: <strong>Candidate Sourcing</strong> (fetching ~1500 candidates from hundreds of millions) and <strong>Ranking</strong> (scoring and sorting them).
        </p>

        <h3 className="text-xl font-virgil text-white mt-8 mb-2">1. Candidate Sourcing: Thunder vs. Phoenix</h3>
        <p>
            The system pulls candidates from two primary engines. This is not a simple database query; it is a distributed systems challenge of retrieving relevant items from a pool of hundreds of millions within typical P99 latency constraints (under 200ms).
        </p>
        <ul className="list-disc pl-5 space-y-6 text-gray-400 marker:text-gray-600 mt-6">
            <li>
                <div className="text-gray-200 font-bold text-lg font-virgil">Thunder (In-Network)</div>
                <div className="text-sm mt-2 leading-relaxed">
                    Thunder is the evolution of Twitter's legacy timeline infrastructure (replacing the old "fanout-on-write" Redis clusters). It functions as a scalable, in-memory graph store specialized for "In-Network" retrieval.
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-gray-500">
                        <li><strong>Mechanism:</strong> It consumes high-throughput Kafka streams of post-creation events.</li>
                        <li><strong>Storage:</strong> Instead of materialized home timelines (which waste RAM for inactive users), Thunder likely uses a hybrid approach: storing "User Active" windows in RAM (Manhattan/Redis-style) and falling back to computed indexes for cold retrieval.</li>
                        <li><strong>Efficiency:</strong> It guarantees sub-millisecond access to the most recent tweets of everyone you follow, regardless of graph density (whether you follow 10 or 10,000 people).</li>
                    </ul>
                </div>
            </li>
            <li>
                <div className="text-gray-200 font-bold text-lg font-virgil">Phoenix (Out-of-Network)</div>
                <div className="text-sm mt-2 leading-relaxed">
                    Phoenix is the "For You" discovery engine. It solves the problem: <em>"Find the 100 best tweets for User A from the 500 million posted today."</em> It does this via <strong>Vector Similarity Search</strong> using a Two-Tower architecture.
                    <ul className="list-disc pl-4 mt-2 space-y-2 text-gray-500">
                        <li>
                            <strong>The User Tower:</strong> Aggregates your real-time engagement history (likes, retweets, dwell time), negative signals, and static demographics into a dense vector (e.g., 144 dimensions). This embedding updates in near real-time.
                        </li>
                        <li>
                            <strong>The Candidate Tower:</strong> Processes every new tweet through LLMs (BERT-derived) to extract semantic meaning, coupled with author reputation graphs (PageRank), to produce a static <em>Candidate Embedding</em>.
                        </li>
                        <li>
                            <strong>Approximate Nearest Neighbor (ANN):</strong> The system uses HNSW (Hierarchical Navigable Small World) graphs to perform dot-product similarity searches across millions of vectors in milliseconds. It doesn't check every tweet; it traverses the graph to find the "neighborhood" of vectors most aligned with your current state.
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <TwoTowerDiagram />

        <p className="text-sm text-gray-400 border-l border-blue-500/30 pl-4 py-1 mt-4">
            <strong>Key Distinction:</strong> Thunder is deterministic (you follow them, you see it). Phoenix is probabilistic (mathematical guess of interest).
        </p>

        <h3 className="text-2xl font-virgil text-white mt-12 mb-4">The Scorer: Candidate Isolation</h3>
        <p>
            The ranking stage reduces the ~1500 candidates to the final ~20 items you see. This is done by a heavy-weight <strong>48M parameter Masked Transformer</strong>.
        </p>
        <p>
            Unlike a standard transformer (like GPT-4) where tokens attend to all other tokens, the feed scorer utilizes <strong>Candidate Isolation</strong>.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-gray-600 mt-4">
            <li>
                <strong>The Mechanism:</strong> A candidate tweet can attend to the User Context (your history, demographics, cell state), but it is mathematically blinded to other candidate tweets in the same batch via an attention mask.
            </li>
            <li>
                <strong>The Why:</strong> This ensures <strong>Score Stability</strong>. If Tweet A scores 0.9, it should score 0.9 regardless of whether it's paired with a viral meme or a boring ad. This also allows for aggressive <strong>caching</strong>—previously scored candidates can be reused without re-inference.
            </li>
        </ul>

        <h4 className="font-virgil text-white mt-8 mb-2 text-lg">The Weighted Sum (Multi-Task Learning)</h4>
        <p>
            The neural network does <em>not</em> output a single "quality score." Instead, it uses <strong>Multi-Task Learning (MTL)</strong> to predict a vector of independent probabilities for every possible user action:
        </p>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded font-mono text-xs text-gray-300 overflow-x-auto whitespace-nowrap my-4">
            [P(Like), P(Reply), P(Repost), P(Video_View_50%), P(Report), P(Mute)...]
        </div>
        <p>
            These probabilities are fed into a final logistic regression layer:
        </p>
        <div className="px-4 py-2 bg-blue-900/10 border-l-2 border-blue-500 font-mono text-xs text-blue-200 mb-6">
            Final_Score = Σ (Weight_i * Probability_i)
        </div>
        <p>
            <strong>The Asymmetry of Signals:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-gray-600 mt-2">
            <li>
                <strong>Positive Signals:</strong> A <code>Reply</code> is heavily upweighted (e.g., 54x a Like) because it signals time spent and conversation.
            </li>
            <li>
                <strong>Negative Signals:</strong> <code>Mute</code>, <code>Block</code>, and <code>Report</code> carry massive negative coefficients (-74x to -369x).
            </li>
            <li>
                <strong>Implication:</strong> You can hunt for likes all day, but one "Not Interested" signal effectively erases the positive signal of dozens of likes. It is a survival game first, a popularity contest second.
            </li>
        </ul>

        <h3 className="text-2xl font-virgil text-white mt-12 mb-4">Optimization Strategy</h3>
        <p>
            Understanding the architecture reveals the optimization function. Here is the technical breakdown of how to align with the system:
        </p>

        <div className="space-y-8">
            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">1. Diversity Attentuation (The "Spam" Damper)</h4>
                <p className="text-sm">
                    The system runs an explicit <strong>Author Diversity Scorer</strong> after the main ranking. It penalizes multiple posts from the same author in a single session.
                    <br /><em className="text-gray-500">Tactic:</em> Posting 10 times an hour is actively harmful. The system will likely only pick your highest-scoring post and suppress the others to preserve feed variety. <strong>Focus on one high-signal post rather than volume.</strong>
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">2. Embedding Stability (The Niche Rule)</h4>
                <p className="text-sm">
                    To be retrieved by Phoenix, your <code>Post_Vector</code> needs to be stable. If you post about coding today, politics tomorrow, and cooking on Sunday, your vector drifts. You become "retrievable" to no one because your semantic center is diluted.
                    <br /><em className="text-gray-500">Tactic:</em> <strong>Consistency tightens your embedding variance.</strong> Pick a lane to help the ANN search find you.
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">3. Optimizing for Weighted Actions</h4>
                <p className="text-sm">
                    Because <code>w_reply {'>'}{'>'} w_like</code>, content that generates discussion outranks content that generates passive agreement. However, <code>w_mute</code> is a massive penalty.
                    <br /><em className="text-gray-500">Tactic:</em> Avoid rage-bait. While it drives replies, it also drives mutes and blocks, which are heavily weighted negatives that will blacklist you from future candidate sets.
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil">4. The "Zero-Day" Filter Problem</h4>
                <p className="text-sm">
                    Before scoring, posts pass through boolean filters. The most dangerous are "Blocked Author" and "Muted Keywords".
                    <br /><em className="text-gray-500">Tactic:</em> If you use polarizing keywords that many people have on their mute list, you are filtered out <strong>before the model even sees your content.</strong> Clean vocabulary increases total addressable market.
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
