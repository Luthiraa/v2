"use client";

import Image from "next/image";
import Link from "next/link";

// --- Components for the graphical diagrams ---

function GeminiFigure({
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
        <figure className="my-12 rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950/80 to-slate-900/30 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.45)]">
            <div className="overflow-hidden rounded-xl border border-white/5 bg-black/40">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="h-full w-full object-contain bg-[radial-gradient(circle_at_top,#1f2634,#05060a)]"
                />
            </div>
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-slate-400">
                {caption}
            </figcaption>
        </figure>
    );
}

function PipelineDiagram() {
    return (
        <GeminiFigure
            src="/images/writing/2025-lessons/feed-pipeline.svg"
            alt="Gemini-styled diagram of the 2025 feed pipeline from Thunder and Phoenix through filtering and the multi-task scorer into the final feed UI."
            caption="Gemini render · Systems context over the feed pipeline"
            width={960}
            height={540}
        />
    );
}

function TwoTowerDiagram() {
    return (
        <GeminiFigure
            src="/images/writing/2025-lessons/two-tower.svg"
            alt="Gemini-styled visual of the Phoenix two-tower retrieval flow with user features, dot-product similarity, and candidate post embeddings."
            caption="Gemini render · Phoenix retrieval two-tower view"
            width={960}
            height={540}
        />
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
        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-gray-600 mt-4 text-lg">
            <li>
                <strong>The Mechanism:</strong> A candidate tweet can attend to the User Context (your history, demographics, cell state), but it is mathematically blinded to other candidate tweets in the same batch via an attention mask.
            </li>
            <li>
                <strong>The Why:</strong> This ensures <strong>Score Stability</strong>. If Tweet A scores 0.9, it should score 0.9 regardless of whether it's paired with a viral meme or a boring ad. This also allows for aggressive <strong>caching</strong>, meaning previously scored candidates can be reused without re-inference.
            </li>
        </ul>

        <h4 className="font-virgil text-white mt-8 mb-2 text-xl">The Weighted Sum (Multi-Task Learning)</h4>
        <p>
            The neural network does <em>not</em> output a single "quality score." Instead, it uses <strong>Multi-Task Learning (MTL)</strong> to predict a vector of independent probabilities for every possible user action:
        </p>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded font-mono text-sm text-gray-300 overflow-x-auto whitespace-nowrap my-4">
            [P(Like), P(Reply), P(Repost), P(Video_View_50%), P(Report), P(Mute)...]
        </div>
        <p>
            These probabilities are fed into a final logistic regression layer:
        </p>
        <div className="px-4 py-2 bg-blue-900/10 border-l-2 border-blue-500 font-mono text-sm text-blue-200 mb-6">
            Final_Score = Σ (Weight_i * Probability_i)
        </div>
        <p>
            <strong>The Asymmetry of Signals:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-gray-600 mt-2 text-lg">
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
                <h4 className="font-bold text-white mb-1 font-virgil text-xl">1. Diversity Attentuation (The "Spam" Damper)</h4>
                <p className="text-lg">
                    The system runs an explicit <strong>Author Diversity Scorer</strong> after the main ranking. It penalizes multiple posts from the same author in a single session.
                    <br /><em className="text-gray-500">Tactic:</em> Posting 10 times an hour is actively harmful. The system will likely only pick your highest-scoring post and suppress the others to preserve feed variety. <strong>Focus on one high-signal post rather than volume.</strong>
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil text-xl">2. Embedding Stability (The Niche Rule)</h4>
                <p className="text-lg">
                    To be retrieved by Phoenix, your <code>Post_Vector</code> needs to be stable. If you post about coding today, politics tomorrow, and cooking on Sunday, your vector drifts. You become "retrievable" to no one because your semantic center is diluted.
                    <br /><em className="text-gray-500">Tactic:</em> <strong>Consistency tightens your embedding variance.</strong> Pick a lane to help the ANN search find you.
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil text-xl">3. Optimizing for Weighted Actions</h4>
                <p className="text-lg">
                    Because <code>w_reply {'>'}{'>'} w_like</code>, content that generates discussion outranks content that generates passive agreement. However, <code>w_mute</code> is a massive penalty.
                    <br /><em className="text-gray-500">Tactic:</em> Avoid rage-bait. While it drives replies, it also drives mutes and blocks, which are heavily weighted negatives that will blacklist you from future candidate sets.
                </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 py-1">
                <h4 className="font-bold text-white mb-1 font-virgil text-xl">4. The "Zero-Day" Filter Problem</h4>
                <p className="text-lg">
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



function VectorDiagram() {
    return (
        <GeminiFigure
            src="/images/vector-field.png"
            alt="Vector field comparison: scattered noise vs aligned directional band."
            caption=""
            width={800}
            height={800}
        />
    );
}

function IntegrityDiagram() {
    return (
        <GeminiFigure
            src="/images/stress-strain.png"
            alt="Stress-strain curve showing elastic stability versus brittle snap failure."
            caption=""
            width={800}
            height={800}
        />
    );
}

function StructureDiagram() {
    return (
        <GeminiFigure
            src="/images/control-loop.png"
            alt="Control loop diagram with feedback stabilization."
            caption=""
            width={800}
            height={800}
        />
    );
}

function PeopleDiagram() {
    return (
        <GeminiFigure
            src="/images/network-graph.png"
            alt="Network graph contrasting sparse reliable clusters with chaotic webs."
            caption=""
            width={800}
            height={800}
        />
    );
}



const LessonsPost2025 = () => (
    <div className="space-y-24">
        {/* Intro */}
        <section className="space-y-5">
            <div className="text-base text-white/85 font-sans leading-8 tracking-tight space-y-4 [text-wrap:pretty]">
                <p>
                    Possibility is a luxury I’ve been given, and 2025 made it obvious how rare it is to have room to be uncertain, to try things and fail, to pivot, and to stay messy while life keeps moving. I’m grateful for that space and treat it like borrowed time because the year basically turned into a class on how to wield it without wasting it, even when the experiments went sideways.
                </p>
                <p>
                    I captured these lessons mostly so I don’t forget what the year actually taught me and so I can see the difference between the narrative and the facts. These notes keep me honest about what changed, what still hurts, and what deserves another run, and I’m sharing them in case they help anyone else who is trying to balance ambition with being a decent human.
                </p>
            </div>
        </section>

        {/* Speed / Direction */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Speed is the advantage. Direction is the multiplier.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                I learned that raw velocity is one of my sharper edges. When I have a target I spin up ridiculous throughput, jumping from context switch to iteration without losing steam, and I keep pushing even when the reward signal is faint. The year also made it painfully clear that un-aimed speed turns into churn that mimics progress while mostly creating entropy.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    The “non-linear” feeling came less from chaos than from under-specified objectives. When direction is vague, every task can justify itself, attention fragments, and you end up with a calendar loaded with activity but a backlog packed with “almost” outcomes: almost shipped, almost consistent, almost locked in. That is not a time-management flaw; it is a systems issue where the lack of a north star defaults everything to opportunistic routing.
                </p>
                <VectorDiagram />
                <p>
                    The fix is to treat direction like an interface rather than a mood. It has to be explicit enough to constrain decisions, to act like a filter that automatically rejects even attractive distractions, and to define what gets ignored along with what “winning the week” actually means. Precision around direction keeps tradeoffs grounded in priorities instead of emotions.
                </p>
                <p>
                    Direction also isn’t a one-time commit; it behaves like a feedback loop where you set a heading, watch for drift, and adjust before the system goes too far off course. Without that loop you quietly optimize for dopamine inputs such as urgent tasks, novelty, or external validation, and with it even rough days still serve the trajectory because course corrections happen quickly.
                </p>
                <p className="text-white">
                    The takeaway is to keep the velocity but stop letting it pick the destination. Choose a measurable vector, review it weekly, and deploy speed deliberately like a tool you are responsible for instead of a coping mechanism you hide behind.
                </p>
            </div>
        </section>

        {/* Shipping */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Shipping is the real identity. Half-built doesn’t count.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                There is a failure mode that masquerades as progress: kick something off, imagine the polished end state, talk about it as if it already exists, then stall before it becomes real. That is vaporware behavior, even when it is unintentional, and this year forced me to admit how addictive it can be because you get the dopamine of potential without paying the cost of completion. The longer you stay there, the harder it becomes to pick the work back up.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    Potential is just narrative, and narrative collapses under pressure because it is not backed by evidence. Shipping is the evidence because it is the moment you stop negotiating with yourself, accept the truth of what you actually produced, and hold an artifact rather than a fantasy. You either have the build or you have an excuse.
                </p>
                <p>
                    Shipping ended up being less about huge builds and more about tight scope, a clear definition of “done,” and aggressive closure. Most projects die from scope inflation where every feature idea sneaks in as a requirement, so the fix is to define a brutally constrained MVP, ship it, and iterate. Version zero has to exist long before version one becomes a real conversation.
                </p>
                <p>
                    Shipping also re-calibrates the inside of your head by replacing fantasy confidence with earned confidence. Finished work compounds because you can reuse it, improve it, show it, and build distribution around it, while unfinished work just sits there as cognitive debt that quietly accrues interest and taxes future energy. The longer it sits, the harder it is to trust yourself with the next experiment.
                </p>
                <p className="text-white">
                    The identity shift is to stop being someone who starts and to become the person who finishes. Small, consistent ships beat one massive idea stuck in limbo because they stack proof, feedback, and momentum that cannot be faked.
                </p>
            </div>
        </section>

        {/* Integrity */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Integrity is leverage. Shortcuts are expensive.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                This year reframed integrity as an engineering constraint more than a moral lecture. It is the stabilizer that keeps your system steady under load, and the moment you start taking shortcuts to force an outcome you inject hidden risk and long-term instability. Worse, you begin eroding self-trust, and that erosion makes every future decision heavier than it needs to be.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    The tricky part is that shortcuts rarely announce themselves as shortcuts. They show up as “just this once” impulses fueled by ego, insecurity, or pressure, and the instinct is to avoid looking back, avoid admitting you are not ready, and avoid taking the loss. Clean losses are cheaper than dirty wins because a clean loss teaches while a dirty win poisons confidence when you know it was not real.
                </p>
                <IntegrityDiagram />
                <p>
                    Integrity also compounds socially. People bet on you when you are reliable and candid about the actual state of things, including what is shipped, what is pending, and what is still unproven. Overclaiming is a silent killer because it traps you in optics management instead of letting you keep building reality.
                </p>
                <p>
                    I am treating integrity like leverage worth guarding aggressively because it reduces downside, keeps relationships intact, and keeps the reputation clean so the next door actually opens when you knock. It also preserves the internal signal-to-noise ratio and lets me move fast without scattering fragility everywhere.
                </p>
            </div>
        </section>

        {/* Usefulness */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Usefulness beats impressiveness. Outcomes beat optics.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                A big shift this year was realizing that “impressive” usually chases reactions while usefulness behaves like a production function. Usefulness is the ability to convert ambiguity into a concrete outcome, and it measures whether you actually helped the system move forward.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    I used to assume usefulness meant overwhelming technical dominance, but 2025 made it obvious that it is broader and more interesting. You can be useful by framing the right problem, designing a plan that actually gets executed, making the tough call while everyone else debates, and doing the last-mile polish that turns “good” into “shippable.” Usefulness also shows up in communicating clearly enough that the work does not implode from misalignment and in following through after the excitement fades.
                </p>
                <p>
                    That is why outcomes beat optics. Optics are the story you tell, while outcomes are the artifact still standing when the story is over. When outcomes are real, optics take care of themselves, and when outcomes are weak, optics become exhausting because you are constantly trying to justify motion.
                </p>
                <p>
                    The deeper realization is that usefulness creates trust, and trust creates opportunity. It is the quiet kind of opportunity where people hand you responsibility, autonomy, and harder problems because you close loops and deliver finished things rather than leaving loose threads everywhere.
                </p>
                <p className="text-white">
                    So the aim is not to be the flashiest person in the room. It is to be the person whose presence increases throughput, reduces chaos, increases clarity, and makes progress feel inevitable for everyone involved.
                </p>
            </div>
        </section>

        {/* Structure */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Structure creates freedom. No structure becomes drift.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                I learned I am not magically disciplined in a vacuum. Without a scaffold I do not become “free,” I become reactive and start chasing novelty, urgency, and dopamine until the days blur. Then I wake up feeling behind, which triggers panic productivity that feels like sprinting without a roadmap. That spiral is what drift looks like in real time.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    Structure is not restriction; it is a control system. It blocks random inputs from hijacking the day and reduces decision fatigue by turning the basics into defaults like sleep, training, deep work blocks, downtime, and social time. Once those are scheduled, your brain stops renegotiating every hour and energy goes back into the work.
                </p>
                <StructureDiagram />
                <p>
                    The counterintuitive part is that structure creates space for spontaneity. When the baseline is stable you can say yes to random things without derailing your life, but when the baseline is chaos every extra thing feels like drowning. Structure ends up being the thing that gives you bandwidth to explore.
                </p>
                <p>
                    I also started respecting unstructured time in the healthy sense, meaning moments with no stimulation where your brain can defrag, think, and reconnect ideas. That only works when the rest of life is not already on fire; otherwise unstructured time turns into avoidance and the cycle restarts.                     So I am treating structure like an operating system that keeps everything else from crashing. The goal is not rigidity but stability plus flexibility, consistent enough to compound and flexible enough to stay alive.

                </p>
            </div>
        </section>

        {/* Intensity */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Intensity can fake alignment. Fast isn’t automatically right.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                One of the subtler traps this year was how easily intensity impersonates meaning. When something is moving fast, packed with emotion and urgency, it is tempting to assume it must be the thing. Acceleration is merely proof that something is happening, not that it aligns with where you want to end up.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    I naturally associate speed with progress, so if it is accelerating I tend to assume it is good. The year showed how easy it is to build momentum around something that does not match your values or trajectory, and you often do not notice until the system starts failing. By the time the warning lights turn on, the sunk costs are already high.
                </p>
                <p>
                    Alignment is quieter. It is not adrenaline; it is clarity that survives time, choices that still make sense a week later, and work that feels worth doing even when nobody is watching. Alignment does not beg for constant emotional reinforcement because it already has context.
                </p>
                <p>
                    I am forcing a pause at decision points to run a simple check: is this actually aligned or just stimulating, is it building something durable or simply fast, and would I keep doing it if the external validation disappeared? The check slows me down just enough to see whether the excitement is honest or manufactured.
                </p>
            </div>
        </section>

        {/* People */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">People are multipliers or liabilities. Reliability is the filter.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                This year made it obvious that people are not just “company”; they are infrastructure. They shape standards, stress, output, and opportunity every day whether you notice it or not. That infrastructure can either multiply what you are building or clog the systems with chaos.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    Reliability turned out to be the trait that mattered most. Talent and charisma are great, but reliability is what turns plans into output and makes collaboration feel like teamwork instead of babysitting. When reliability is missing, everything gets heavier, you start compensating, and focus bleeds into interpersonal noise.
                </p>
                <PeopleDiagram />
                <p>
                    I also learned that being selective is not arrogance; it is risk management. If you move fast, chaos inside your circle carries a higher price because it can spark blowups that cost time, reputation, and attention. Some people are fun yet expensive, and some are familiar yet unstable, so keeping distance becomes an operational decision, not a personal judgment.
                </p>
                <p>
                    On the flip side, the right people raise your baseline without trying. They normalize consistency, make execution feel natural, push you through the parts you would normally avoid, and make you better simply by existing near you. The difference between those two categories is the difference between compounding momentum and permanent damage control.
                </p>
                <p className="text-white">
                    So the filter is simple: do they keep their word, do they respect time, and do they reduce entropy? If the answer is unclear, they do not get access to the parts of life that matter.
                </p>
            </div>
        </section>

        {/* Ownership */}
        <section className="space-y-6">
            <h2 className="text-xl text-white font-virgil mb-6">Ownership compounds. Prestige fades.</h2>
            <p className="text-base text-white/70 mb-8 font-sans leading-relaxed border-l-2 border-gray-800 pl-4">
                Prestige is loud because it is the tidy answer, the recognizable label, and the thing that makes people nod. I understand why it is addictive since it delivers instant validation and can open doors. The rush fades quickly, and you are left with whatever your daily reality actually looks like.
            </p>
            <div className="text-base text-white/90 font-sans leading-8 tracking-tight space-y-7 [text-wrap:pretty]">
                <p>
                    The year made me see how quickly prestige decays once the novelty passes. After the first surge, you are left with what you truly do, control, and own, which is why ownership becomes the real north star. Ownership forces you to care about substance over labels.
                </p>
                <p>
                    Ownership is quiet and sometimes looks worse on paper at first, yet it compounds because it creates assets such as stacked skills, reusable artifacts, controlled systems, growing distribution, and sharper judgment. It also forces responsibility, which is uncomfortable but powerful, because you cannot hide inside someone else’s structure when you are the one making the calls.
                </p>
                <p>
                    The deeper layer is psychological because ownership gives agency. Effort starts to feel like it is building your future instead of feeding someone else’s machine, and even if jobs stay in the picture, that mindset shift changes everything. You extract learning and convert it into leverage you actually control rather than waiting for permission.
                </p>

            </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-5 border-t border-white/10 pt-10">
            <div className="text-base text-white/85 font-sans leading-8 tracking-tight space-y-4 [text-wrap:pretty]">
                <p>
                    When I zoom out, all of these lessons are really about staying grounded. I want to keep building ambitious things without losing the parts of life that make the work meaningful, like family group chats, long walks, showing up for my people, and sleeping enough to be kind. Direction, shipping, usefulness, structure, and integrity feel different when they are anchored in real life instead of performance.
                </p>
                <p>
                    2026 is a fresh canvas, and I am carrying these reminders as the filters I will run whenever I get tempted to chase speed for ego or hide behind busyness. If any of this hits for you, let me know what you are bringing into the next year. I would genuinely love to trade notes and compare playbooks.
                </p>
            </div>
        </section>
    </div>
);


// --- Page Setup ---

const posts = {
    "reverse-engineering-the-feed": {
        title: "Reverse Engineering the Feed",
        date: "2026-01-25",
        slug: "reverse-engineering-the-feed",
        component: TwitterAlgoPost
    },
    "2025-lessons": {
        title: "2025 Lessons",
        date: "2025-12-31",
        slug: "2025-lessons",
        component: LessonsPost2025
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
                <Link href="#" className="hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top of page ↑</Link>
            </div>
        </main>
    );
}
