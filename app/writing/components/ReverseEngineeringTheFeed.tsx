"use client";



function PipelineDiagram() {
    return (
        <div className="my-12 p-8 border border-black/[0.08] rounded-2xl bg-[#fafafa] text-xs select-none shadow-sm">
            <div className="text-center mb-8 text-gray-400 font-medium uppercase tracking-[0.15em] text-[10px]">The Feed Pipeline</div>

            <div className="flex flex-col items-center gap-4">
                {/* Step 1: Query */}
                <div className="flex flex-col items-center gap-4">
                    <div className="px-5 py-2.5 bg-white border border-black/[0.08] rounded-full text-gray-700 shadow-sm font-medium">User Opens App</div>
                    <div className="h-6 w-px bg-black/10"></div>
                </div>

                {/* Step 2: Sources */}
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    <div className="flex flex-col gap-2 p-4 border border-black/[0.08] bg-white rounded-xl text-center shadow-sm">
                        <div className="font-medium text-gray-800">Thunder</div>
                        <div className="text-[10px] text-gray-500 leading-relaxed">In-Network<br />(Who you follow)</div>
                        <div className="mt-1 text-[9px] text-gray-400 font-mono">Real-time Kafka</div>
                    </div>
                    <div className="flex flex-col gap-2 p-4 border border-black/[0.08] bg-white rounded-xl text-center shadow-sm">
                        <div className="font-medium text-gray-800">Phoenix</div>
                        <div className="text-[10px] text-gray-500 leading-relaxed">Out-of-Network<br />(Discovery)</div>
                        <div className="mt-1 text-[9px] text-gray-400 font-mono">Vector Search</div>
                    </div>
                </div>

                {/* Merge */}
                <div className="h-6 w-px bg-black/10 mt-2"></div>

                {/* Step 3: Hydration & Filter */}
                <div className="w-full max-w-[240px] text-center p-3 border border-black/[0.08] bg-white rounded-xl shadow-sm text-gray-800 font-medium">
                    <div>Hydration & Pre-Filter</div>
                    <div className="text-[10px] text-gray-500 mt-1 font-normal">Remove seen, blocked, muted</div>
                </div>

                <div className="h-6 w-px bg-black/10"></div>

                {/* Step 4: Scoring */}
                <div className="w-full max-w-[240px] flex flex-col border border-black/[0.08] rounded-xl overflow-hidden shadow-sm">
                    <div className="p-3 bg-white text-center text-gray-800 font-medium border-b border-black/[0.04]">
                        Phoenix Scorer
                        <div className="text-[10px] text-gray-400 font-normal mt-0.5">Grok-based Transformer</div>
                    </div>
                    <div className="p-3 bg-gray-50 text-center text-gray-700">
                        <div className="font-medium text-[11px]">Weighted Sum</div>
                        <div className="text-[9px] text-gray-500 mt-1 font-mono">P(Like) * w + P(Reply) * w ...</div>
                    </div>
                </div>

                <div className="h-6 w-px bg-black/10"></div>

                {/* Step 5: Selection */}
                <div className="px-6 py-2.5 bg-gray-900 border border-transparent text-white font-medium rounded-full shadow-md">
                    Final Feed
                </div>
            </div>
        </div>
    );
}

function TwoTowerDiagram() {
    return (
        <div className="my-12 p-8 border border-black/[0.08] rounded-2xl bg-[#fafafa] select-none text-gray-800 shadow-sm relative overflow-hidden">
            <div className="flex flex-col items-center gap-10 relative z-10">

                {/* Upper Section: Towers and Dot Product */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">

                    {/* User Tower */}
                    <div className="flex flex-col gap-3 p-5 border border-black/[0.08] bg-white rounded-[20px] w-full max-w-[260px] text-center shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">User Tower</div>
                        <div className="text-[11px] text-gray-500">Recent actions / traits</div>

                        <div className="h-px w-full bg-black/5 my-1"></div>

                        <div className="text-[11px] text-gray-500">Likes · Reposts · Dwell</div>

                        <div className="p-2.5 border border-black/[0.04] bg-gray-50/80 rounded-xl text-[11px] text-gray-500 mt-2 font-medium">
                            Feature tensor
                        </div>
                        <div className="relative p-2.5 border border-[#dcfce7] bg-[#f0fdf4] rounded-xl text-[11px] text-[#166534] font-semibold">
                            User Embedding
                        </div>
                    </div>

                    {/* Connection */}
                    <div className="flex flex-col items-center gap-0 md:flex-row md:items-center">
                        <div className="hidden md:block w-8 h-px bg-black/10 -mr-1"></div>
                        <div className="md:hidden h-8 w-px bg-black/10 -mb-1"></div>

                        <div className="relative w-[88px] h-[88px] rounded-full border border-black/[0.08] bg-white flex flex-col items-center justify-center z-10 shadow-sm">
                            <div className="text-[10px] text-gray-400 font-mono mb-1">dot product</div>
                            <div className="text-[10px] text-gray-800 font-medium text-center leading-tight">Similarity<br />score</div>
                        </div>

                        <div className="hidden md:block w-8 h-px bg-black/10 -ml-1"></div>
                        <div className="md:hidden h-8 w-px bg-black/10 -mt-1"></div>
                    </div>

                    {/* Content Tower */}
                    <div className="flex flex-col gap-3 p-5 border border-black/[0.08] bg-white rounded-[20px] w-full max-w-[260px] text-center shadow-sm">
                        <div className="text-sm font-semibold text-gray-900">Content Tower</div>
                        <div className="text-[11px] text-gray-500">Tweet text · media · author</div>

                        <div className="h-px w-full bg-black/5 my-1"></div>

                        <div className="text-[11px] text-gray-500">LLM summaries</div>

                        <div className="p-2.5 border border-black/[0.04] bg-gray-50/80 rounded-xl text-[11px] text-gray-500 mt-2 font-medium">
                            Semantic vector
                        </div>
                        <div className="relative p-2.5 border border-[#fef08a] bg-[#fefce8] rounded-xl text-[11px] text-[#854d0e] font-semibold">
                            Post Embedding
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Top-K */}
                <div className="flex flex-col items-center gap-0 -mt-4">
                    <div className="h-6 w-px bg-black/10"></div>
                    <div className="p-4 border border-black/[0.08] bg-white rounded-xl w-[220px] text-center shadow-sm">
                        <div className="text-xs font-semibold text-gray-900">Top-K candidates</div>
                        <div className="text-[10px] text-gray-500 mt-1.5">Feed scorer consumes this set</div>
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
                <div className="text-base text-black/85 font-sans leading-8 tracking-tight space-y-4 [text-wrap:pretty]">
                    <p>
                        The "algorithm"isn't a single magic score. It's a massive, industrial-scale retrieval and ranking pipeline designed to filter the entire world's noise down to a handful of tweets you might actually care about.
                    </p>
                    <p>
                        Recently, X (formerly Twitter) updated their open-source documentation for the "For You"feed. It's distinct from the 2023 release. I've broken down how it works, what's changed, and mechanically, how you can optimize for it.
                    </p>
                </div>
            </section>

            {/* Pipeline Architecture */}
            <section className="space-y-6">
                <h2 className="text-xl text-black mb-6">The Pipeline Architecture</h2>
                <p className="text-base text-black/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    Every time you pull to refresh, the system executes a complex chain of operations. It doesn't score every tweet in existence. Instead, it uses a funnel approach.
                </p>
                <div className="text-base text-black/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <PipelineDiagram />
                    <p>
                        The process has two distinct phases: <strong>Candidate Sourcing</strong> (fetching ~1500 candidates from hundreds of millions) and <strong>Ranking</strong> (scoring and sorting them).
                    </p>
                </div>
            </section>

            {/* Candidate Sourcing */}
            <section className="space-y-6">
                <h2 className="text-xl text-black mb-6">Candidate Sourcing: Thunder vs. Phoenix</h2>
                <p className="text-base text-black/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    The system pulls candidates from two primary engines. This is a distributed systems challenge of retrieving relevant items from hundreds of millions within P99 latency constraints (under 200ms).
                </p>
                <div className="text-base text-black/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <p>
                        <strong className="text-black">Thunder (In-Network)</strong> is the evolution of Twitter's legacy timeline infrastructure. It functions as a scalable, in-memory graph store specialized for "In-Network"retrieval, consuming high-throughput Kafka streams of post-creation events and guaranteeing sub-millisecond access to recent tweets from everyone you follow.
                    </p>
                    <p>
                        <strong className="text-black">Phoenix (Out-of-Network)</strong> is the discovery engine solving the problem: "Find the 100 best tweets for User A from the 500 million posted today."It uses Vector Similarity Search with a Two-Tower architecture.
                    </p>
                    <TwoTowerDiagram />
                    <p>
                        The <strong>User Tower</strong> aggregates your real-time engagement history into a dense vector (e.g., 144 dimensions) that updates in near real-time. The <strong>Candidate Tower</strong> processes every new tweet through LLMs to extract semantic meaning, coupled with author reputation graphs (PageRank), to produce a static Candidate Embedding.
                    </p>
                    <p className="text-black">
                        The system uses HNSW graphs to perform dot-product similarity searches across millions of vectors in milliseconds—it traverses the graph to find vectors most aligned with your current state.
                    </p>
                </div>
            </section>

            {/* The Scorer */}
            <section className="space-y-6">
                <h2 className="text-xl text-black mb-6">The Scorer: Candidate Isolation</h2>
                <p className="text-base text-black/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    The ranking stage reduces ~1500 candidates to the final ~20 items you see using a 48M parameter Masked Transformer with Candidate Isolation.
                </p>
                <div className="text-base text-black/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <p>
                        Unlike a standard transformer where tokens attend to all other tokens, here a candidate tweet can attend to the User Context (your history, demographics, cell state) but is mathematically blinded to other candidate tweets via an attention mask.
                    </p>
                    <p>
                        This ensures Score Stability—if Tweet A scores 0.9, it should score 0.9 regardless of whether it's paired with a viral meme or a boring ad. This also allows for aggressive caching where previously scored candidates can be reused without re-inference.
                    </p>
                    <p>
                        The neural network outputs a vector of independent probabilities for every possible user action using Multi-Task Learning: P(Like), P(Reply), P(Repost), P(Video_View_50%), P(Report), P(Mute). These feed into a weighted sum where Reply is heavily upweighted (54x a Like) and negative signals like Mute carry massive negative coefficients (-74x to -369x).
                    </p>
                    <p className="text-black">
                        One "Not Interested"signal effectively erases the positive signal of dozens of likes. It is a survival game first, a popularity contest second.
                    </p>
                </div>
            </section>

            {/* Optimization Strategy */}
            <section className="space-y-6">
                <h2 className="text-xl text-black mb-6">Optimization Strategy</h2>
                <p className="text-base text-black/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                    Understanding the architecture reveals the optimization function. Here is how to align with the system.
                </p>
                <div className="text-base text-black/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                    <p>
                        <strong className="text-black">Diversity Attenuation:</strong> The system runs an explicit Author Diversity Scorer after ranking that penalizes multiple posts from the same author in a single session. Posting 10 times an hour is actively harmful—focus on one high-signal post rather than volume.
                    </p>
                    <p>
                        <strong className="text-black">Embedding Stability:</strong> To be retrieved by Phoenix, your Post_Vector needs to be stable. If you post about coding today, politics tomorrow, and cooking on Sunday, your vector drifts. Consistency tightens your embedding variance—pick a lane to help the ANN search find you.
                    </p>
                    <p>
                        <strong className="text-black">Weighted Actions:</strong> Content that generates discussion outranks content that generates passive agreement, but w_mute is a massive penalty. Avoid rage-bait—it drives replies but also drives mutes and blocks that will blacklist you from future candidate sets.
                    </p>
                    <p className="text-black">
                        <strong>The Filter Problem:</strong> If you use polarizing keywords that many people have on their mute list, you are filtered out before the model even sees your content. Clean vocabulary increases total addressable market.
                    </p>
                </div>
            </section>

            <p className="mt-12 pt-8 border-t border-black/10 text-sm italic opacity-60">
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
