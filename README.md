# WASM-stuff

 Playing around with WebAssembly textual representation.

## Dependencies

- [WABT](https://github.com/WebAssembly/wabt) - `wat2wasm` to compile WAT (WASM textual representation) to binary WASM files. `wasm-merge` to merge WASM files into a single one.
- [Binaryen](https://github.com/WebAssembly/binaryen) - `wasm-opt` to optimize the generated binary WASM file.

## WASM Runtimes and Their Features

Official WASM site with features of the main implementations: [Roadmap](https://webassembly.org/roadmap/).

- [WASMEdge](https://wasmedge.org/docs/develop/wasmedge/extensions/proposals) and [Proprietary Extensions](https://wasmedge.org/docs/develop/wasmedge/extensions/unique_extensions)
- [WASMer](https://docs.wasmer.io/runtime/features#webassembly-features)
- [WASMTime](https://docs.wasmtime.dev/stability-wasm-proposals-support.html)

## WASM Features

### Tail Calls

- Chrome: >=112
- Node: flag `--experimental-wasm-return-call`
- Deno: flag `--v8-flags=--experimental-wasm-extended-const`

### GC

- Chrome: option `chrome://flags/#enable-webassembly-garbage-collection`

### 64 Bit Memory

- Chrome option `chrome://flags/#enable-experimental-webassembly-features`
- Node: flag `--experimental-wasm-memory64`
- Deno: flag `--v8-flags=--experimental-wasm-memory64`
- WASMTime: flag `--wasm-features=memory64`

### Threads

- Chrome: >=74
- Node: >=16.4
- Deno: >=1.9
