"use client";



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
        <div className="my-12 p-6 border border-white/10 rounded-lg bg-gray-900/30 font-virgil select-none text-white/90">
            <div className="flex flex-col items-center gap-12">

                {/* Upper Section: Towers and Dot Product */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">

                    {/* User Tower */}
                    <div className="flex flex-col gap-3 p-4 border border-white/10 bg-black/40 rounded-lg w-full max-w-[240px] text-center">
                        <div className="text-sm font-bold text-gray-200">User Tower</div>
                        <div className="text-[10px] text-gray-500">Recent actions / traits</div>
                        <div className="h-px w-full bg-white/10 my-1"></div>
                        <div className="text-[10px] text-gray-500">Likes · Reposts · Dwell</div>

                        <div className="p-2 border border-white/10 bg-white/5 rounded text-[11px] text-gray-400 mt-1">
                            Feature tensor
                        </div>
                        <div className="p-2 border border-green-500/20 bg-green-500/20 rounded text-[11px] text-green-400 font-bold shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                            User Embedding
                        </div>
                    </div>

                    {/* Connection */}
                    <div className="flex flex-col items-center gap-1 md:flex-row md:items-center">
                        <div className="hidden md:block w-8 h-px bg-white/20"></div>
                        <div className="md:hidden h-8 w-px bg-white/20"></div>

                        <div className="relative w-24 h-24 rounded-full border border-white/10 bg-black flex items-center justify-center z-10">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            <div className="absolute top-1/2 mt-2 flex flex-col items-center">
                                <div className="text-[8px] text-gray-500 font-mono">dot product</div>
                                <div className="text-[8px] text-gray-700">Similarity score</div>
                            </div>
                        </div>

                        <div className="hidden md:block w-8 h-px bg-white/20"></div>
                        <div className="md:hidden h-8 w-px bg-white/20"></div>
                    </div>

                    {/* Content Tower */}
                    <div className="flex flex-col gap-3 p-4 border border-white/10 bg-black/40 rounded-lg w-full max-w-[240px] text-center">
                        <div className="text-sm font-bold text-gray-200">Content Tower</div>
                        <div className="text-[10px] text-gray-500">Tweet text · media · author</div>
                        <div className="h-px w-full bg-white/10 my-1"></div>
                        <div className="text-[10px] text-gray-500">LLM summaries</div>

                        <div className="p-2 border border-white/10 bg-white/5 rounded text-[11px] text-gray-400 mt-1">
                            Semantic vector
                        </div>
                        <div className="p-2 border border-yellow-500/20 bg-yellow-500/20 rounded text-[11px] text-yellow-400 font-bold shadow-[0_0_10px_rgba(250,204,21,0.1)]">
                            Post Embedding
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Top-K */}
                <div className="flex flex-col items-center gap-2 -mt-4">
                    <div className="h-8 w-px bg-white/20"></div>
                    <div className="p-3 border border-white/10 bg-white/5 rounded-lg w-[200px] text-center">
                        <div className="text-xs font-bold text-white">Top-K candidates</div>
                        <div className="text-[10px] text-gray-500 mt-1">Feed scorer consumes this set</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function ReverseEngineeringTheFeed() {
    return (
        <div className="space-y-24">
            {/* Intro */}
            <section className="space-y-5">
                <div className="text-base text-white/85 font-sans leading-8 tracking-tight space-y-4 [text-wrap:pretty]">
                    <p>
                        The "algorithm" isn't a single magic score. It's a massive, industrial-scale retrieval and ranking pipeline designed to filter the entire world's noise down to a handful of tweets you might actually care about.
                    </p>
                    <p>
                        Recently, X (formerly Twitter) updated their open-source documentation for the "For You" feed. It's distinct from the 2023 release. I've broken down how it works, what's changed, and mechanically, how you can optimize for it.
                    </p>
                </div>
            </section>

            {/* Pipeline Architecture */}
            <section className="space-y-6">
                <h2 className="text-xl text-white font-virgil mb-6">The Pipeline Architecture</h2>
                <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    Every time you pull to refresh, the system executes a complex chain of operations. It doesn't score every tweet in existence. Instead, it uses a funnel approach.
                </p>
                <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <PipelineDiagram />
                    <p>
                        The process has two distinct phases: <strong>Candidate Sourcing</strong> (fetching ~1500 candidates from hundreds of millions) and <strong>Ranking</strong> (scoring and sorting them).
                    </p>
                </div>
            </section>

            {/* Candidate Sourcing */}
            <section className="space-y-6">
                <h2 className="text-xl text-white font-virgil mb-6">Candidate Sourcing: Thunder vs. Phoenix</h2>
                <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    The system pulls candidates from two primary engines. This is a distributed systems challenge of retrieving relevant items from hundreds of millions within P99 latency constraints (under 200ms).
                </p>
                <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <p>
                        <strong className="text-white">Thunder (In-Network)</strong> is the evolution of Twitter's legacy timeline infrastructure. It functions as a scalable, in-memory graph store specialized for "In-Network" retrieval, consuming high-throughput Kafka streams of post-creation events and guaranteeing sub-millisecond access to recent tweets from everyone you follow.
                    </p>
                    <p>
                        <strong className="text-white">Phoenix (Out-of-Network)</strong> is the discovery engine solving the problem: "Find the 100 best tweets for User A from the 500 million posted today." It uses Vector Similarity Search with a Two-Tower architecture.
                    </p>
                    <TwoTowerDiagram />
                    <p>
                        The <strong>User Tower</strong> aggregates your real-time engagement history into a dense vector (e.g., 144 dimensions) that updates in near real-time. The <strong>Candidate Tower</strong> processes every new tweet through LLMs to extract semantic meaning, coupled with author reputation graphs (PageRank), to produce a static Candidate Embedding.
                    </p>
                    <p className="text-white">
                        The system uses HNSW graphs to perform dot-product similarity searches across millions of vectors in milliseconds—it traverses the graph to find vectors most aligned with your current state.
                    </p>
                </div>
            </section>

            {/* The Scorer */}
            <section className="space-y-6">
                <h2 className="text-xl text-white font-virgil mb-6">The Scorer: Candidate Isolation</h2>
                <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    The ranking stage reduces ~1500 candidates to the final ~20 items you see using a 48M parameter Masked Transformer with Candidate Isolation.
                </p>
                <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <p>
                        Unlike a standard transformer where tokens attend to all other tokens, here a candidate tweet can attend to the User Context (your history, demographics, cell state) but is mathematically blinded to other candidate tweets via an attention mask.
                    </p>
                    <p>
                        This ensures Score Stability—if Tweet A scores 0.9, it should score 0.9 regardless of whether it's paired with a viral meme or a boring ad. This also allows for aggressive caching where previously scored candidates can be reused without re-inference.
                    </p>
                    <p>
                        The neural network outputs a vector of independent probabilities for every possible user action using Multi-Task Learning: P(Like), P(Reply), P(Repost), P(Video_View_50%), P(Report), P(Mute). These feed into a weighted sum where Reply is heavily upweighted (54x a Like) and negative signals like Mute carry massive negative coefficients (-74x to -369x).
                    </p>
                    <p className="text-white">
                        One "Not Interested" signal effectively erases the positive signal of dozens of likes. It is a survival game first, a popularity contest second.
                    </p>
                </div>
            </section>

            {/* Optimization Strategy */}
            <section className="space-y-6">
                <h2 className="text-xl text-white font-virgil mb-6">Optimization Strategy</h2>
                <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    Understanding the architecture reveals the optimization function. Here is how to align with the system.
                </p>
                <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <p>
                        <strong className="text-white">Diversity Attenuation:</strong> The system runs an explicit Author Diversity Scorer after ranking that penalizes multiple posts from the same author in a single session. Posting 10 times an hour is actively harmful—focus on one high-signal post rather than volume.
                    </p>
                    <p>
                        <strong className="text-white">Embedding Stability:</strong> To be retrieved by Phoenix, your Post_Vector needs to be stable. If you post about coding today, politics tomorrow, and cooking on Sunday, your vector drifts. Consistency tightens your embedding variance—pick a lane to help the ANN search find you.
                    </p>
                    <p>
                        <strong className="text-white">Weighted Actions:</strong> Content that generates discussion outranks content that generates passive agreement, but w_mute is a massive penalty. Avoid rage-bait—it drives replies but also drives mutes and blocks that will blacklist you from future candidate sets.
                    </p>
                    <p className="text-white">
                        <strong>The Filter Problem:</strong> If you use polarizing keywords that many people have on their mute list, you are filtered out before the model even sees your content. Clean vocabulary increases total addressable market.
                    </p>
                </div>
            </section>

            <p className="mt-12 pt-8 border-t border-white/10 text-sm italic opacity-60">
                Sources:
                <ul>
                    <li>
                        <a href="https://github.com/xai-org/x-algorithm" target="_blank" rel="noopener noreferrer">X Algorithm</a>
                    </li>
                </ul>
            </p>
        </div>
    );
}
