export default function DeepMetalProject() {
  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-12 flex flex-col items-center">
      <div className="max-w-3xl w-full prose prose-invert prose-lg">
        <p>
          <strong>[Add a hero image here: e.g. a stylized STM32 board, or a screenshot of the DeepMetal UI]</strong>
        </p>
        <p>
          I started DeepMetal because I wanted to run real neural networks on microcontrollers—no Python, no TensorFlow Lite, just pure C or C++ that I could drop into an STM32 project. MNIST was my first target: it’s the classic “hello world” for embedded ML, and I wanted to see if I could get a PyTorch-trained model running on bare metal, with LED blinks and UART logging.
        </p>
        <p>
          The pipeline is pretty wild. First, I train a model in PyTorch—usually a simple linear or conv net for MNIST. I use <code>export_model.py</code> to save the weights and state dict. Then comes the magic: I wrote a converter that takes those weights and spits out C code, with all the layers unrolled and memory statically allocated. No malloc, no dynamic buffers—just ping-pong arrays sized for the biggest intermediate tensor. (I spent way too long debugging buffer overflows. If you want to see pain, look at my commit history around MAX_BUFFER_SIZE.)
        </p>
        <p>
          <strong>[Add a diagram here: "DeepMetal pipeline"—PyTorch → Converter → C/LLVM/C++ → STM32]</strong>
        </p>
        <p>
          Once I have the C code, I drop it into a minimal STM32 project. The demo firmware sets up the FPU, blinks an LED, and logs inference results over UART. I even wrote linker scripts and startup vectors from scratch, just to make sure everything was as bare metal as possible. There’s a shell script to flash the board and run a debug build that prints logits for MNIST digits. (If you want to see the full workflow, check out <a href="https://github.com/Luthiraa/DeepMetal/commit/da25219175be3ea51b267cfe98188a0cdeb5943e" target="_blank" rel="noopener noreferrer">this commit</a>.)
        </p>
        <p>
          <strong>[Add a photo here: STM32 board with LEDs blinking, UART console output]</strong>
        </p>
        <p>
          The repo also has an LLVM IR backend (for cross-platform experiments) and a C++ template generator. But the real heart is the C emitter: it’s tuned for ARM Cortex-M4, uses static buffers, and exposes a dead-simple API: <code>int predict(const float* input, int h, int w, int ch);</code>.
        </p>
        <p>
          MNIST is the main demo. I trained three models: linear (~107K params, ~95% accuracy), conv (~23K, ~98%), and hybrid (~15K, ~97%). RAM usage is 2–64 KB, flash is 15–400 KB, and latency is 2–8 ms at 80 MHz. These numbers are ballpark, but they’re good enough for real-time LED blinks and UART prints.
        </p>
        <p>
          <strong>[Add a screenshot here: MNIST digit inference, UART output, maybe a confusion matrix]</strong>
        </p>
        <p>
          The hardest part? Memory planning. I started with a global MAX_BUFFER_SIZE (8192, then 2048), but it’s a blunt instrument. A real liveness-based planner would be smarter, but for now, I just make sure my models fit. Operator coverage is also thin—just Linear, Conv2d, and ReLU. No pooling, no BatchNorm, no quantization (yet). If you try to export a model with BN, the converter throws a clear error and points you to the README.
        </p>
        <p>
          <strong>[Add a code snippet here: Example of generated C code for a Conv2d layer]</strong>
        </p>
        <p>
          The STM32 demo is fun: FPU enabled, LED blinks, UART logs, and multiple linker scripts. There’s even a shell script to flash and run everything. I wrote validation and benchmark scripts to check numerical parity and measure speed, but I still need to check in golden outputs and timing logs.
        </p>
        <p>
          <strong>[Add a screenshot here: STM32 project folder, linker script, startup code]</strong>
        </p>
        <p>
          What’s next? I want to add ONNX support, fold BatchNorm into Conv weights, introduce per-layer buffer sizing, and start quantization (Q7/Q15, maybe CMSIS-NN). Parity tests and a timing harness are on the list, along with better docs and diagrams.
        </p>
        <p>
          If you want to try it, clone <a href="https://github.com/Luthiraa/DeepMetal" target="_blank" rel="noopener noreferrer">the repo</a> and run <code>python export_model.py --model-type hybrid --epochs 5</code>, then <code>./test_conversion.sh</code> and <code>python test_complete_workflow.py</code>. If you break it, send me a PR or open an issue—I’ve probably hit the same bug.
        </p>
        <p>
          <strong>[Add a closing image: maybe a photo of the board running MNIST, or a meme about embedded ML]</strong>
        </p>
      </div>
    </div>
  );
}
