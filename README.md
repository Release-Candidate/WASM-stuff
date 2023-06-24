# WASM-stuff

 Playing around with WebAssembly textual representation.

## Dependencies

- [WABT](https://github.com/WebAssembly/wabt) - `wat2wasm` to compile WAT (WASM textual representation) to binary WASM files. `wasm-merge` to merge WASM files into a single one.
- [Binaryen](https://github.com/WebAssembly/binaryen) - `wasm-opt` to optimize the generated binary WASM file.
