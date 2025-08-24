"use client"
import { Calendar, User, Github } from "lucide-react"

export default function DeepMetalProject() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <article className="bg-[#232323] border border-gray-800 rounded-lg p-8 text-white">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight text-center">
              DeepMetal
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed text-center">
              edge ai compiler for high level deep learning frameworks
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>UofT Hacker Fab Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>June 2025</span>
              </div>
              <span>- 6 min read</span>
            </div>

            <div className="flex justify-center gap-3 mb-6">
              <a
                href="https://github.com/Luthiraa/DeepMetal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-700 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>

            <div className="w-full h-px bg-gray-200/20 mb-8"></div>
          </header>

          <div className="space-y-8 text-gray-200 leading-relaxed">
            <p>
              we built deepmetal because we kept running into the same wall: you
              can’t really run machine learning on tiny microcontrollers without
              hitting memory and speed limits. most of the time you’re stuck
              with big frameworks that don’t fit, or you end up hand-coding tiny
              models just to make them run. we wanted something in between, a
              way to take a small pytorch model and turn it into code that
              actually works on chips like the stm32f446re.
            </p>

            <p>
              the pipeline is simple. we train or export a model with
              export_model.py, usually mnist-scale linear, conv, or hybrid
              networks. that gives us .pth files and state dicts. then we push
              it through one of three converters. the c converter makes pure c
              with static memory and ping pong buffers tuned for cortex-m4. the
              llvm ir converter emits .ll and object files so we can run
              cross-platform on x86, aarch64, or risc v. the c++ converter
              builds templates and a model_config.json for metadata. once the
              code is generated, we compile with the right flags for the mcu and
              drop it into the stm32 demo projects we wrote, with led blink,
              uart, and simple nn inference.
            </p>

            <p>
              the repo is set up with python scripts and shell helpers for
              training, exporting, and compiling. the embedded demo sits in
              backend/src/stm32_project with linker scripts, startup files,
              uart, led, and demo variants. we also added a small react/vite
              frontend to show results, but it’s more extra than core.
            </p>

            <p>
              we made some design choices early. no malloc, only static
              allocation with ping pong buffers, capped at max_buffer_size =
              2048. operators are limited to linear, conv2d, and relu. no
              pooling, batch norm, or softmax yet. cortex-m4 is the main target,
              but the llvm ir path works across platforms. the demo firmware
              sets up gpio, usart2, and enables the fpu so everything runs at
              full speed.
            </p>

            <p>
              it wasn’t easy. memory planning was the hardest part. static
              allocation works but it’s clunky, and a real planner would be
              better. operator coverage is thin, so more ops like pooling and
              batch norm folding are needed. quantization and cmsis-nn aren’t in
              yet, but they’d cut down ram and flash and make things faster.
              benchmarks are rough too, we only have ballpark numbers. even the
              frontend could use better docs to explain how it ties into the
              converters.
            </p>

            <p>
              our roadmap is clear. add onnx export with a fixed op subset, fold
              batch norm into conv weights, support simple pooling, build a
              smarter memory planner, and add quantization (q7/q15 and
              cmsis-nn). we also want parity tests with checked-in tensors and
              expected logits, plus a timing harness. the docs need a design
              page with diagrams showing the flow and memory layout.
            </p>

            <p>
              so far the models look solid. linear nets hit around 95 percent
              with ~107k params, conv nets 98 percent with ~23k, hybrids 97
              percent with ~15k. on an 80 mhz cortex-m4, latency is about 2 ms
              for linear, 5 ms for hybrid, 8 ms for conv. ram use is 2–64 kb and
              flash 15–400 kb.
            </p>

            <p>
              the first working version landed june 21 with the full backend,
              stm32 project, and scripts. june 22 we cleaned up the pipeline,
              added frontend updates, and a small mnist flask demo. by june 26
              we had polished the readme and added repo badges. the code and
              history are all up on github if you want to see it.
            </p>

            <div className="pt-6">
              <ul className="space-y-2 text-purple-400">
                <li>
                  <a
                    href="https://github.com/Luthiraa/DeepMetal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repo
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Luthiraa/DeepMetal/commit/da25219175be3ea51b267cfe98188a0cdeb5943e"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Working Version 1.0.0 Commit
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Luthiraa/DeepMetal/commits/main/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Commit History
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
