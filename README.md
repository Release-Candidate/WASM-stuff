# WASM-stuff

 Playing around with WebAssembly textual representation (Webassembly assembler).

- [Dependencies](#dependencies)
- [WASM Runtimes and Their Features](#wasm-runtimes-and-their-features)
- [WASM Features](#wasm-features)
  - [Tail Calls](#tail-calls)
  - [Typed Function References](#typed-function-references)
  - [GC](#gc)
  - [64 Bit Memory](#64-bit-memory)
  - [Threads](#threads)
- [WASMEdge: Running WASM Directly](#wasmedge-running-wasm-directly)
  - [Main Entry point](#main-entry-point)
    - [Example](#example)
- [WASM Binaries to WAT](#wasm-binaries-to-wat)
  - [WASM Compiler Output Online](#wasm-compiler-output-online)
- [License](#license)

## Dependencies

- [WABT](https://github.com/WebAssembly/wabt) - `wat2wasm` to compile WAT (WASM textual representation) to binary WASM files. `wasm2wat` to disassemble binary WASM files (`.wasm`) to text format (`.wat`).
- [Binaryen](https://github.com/WebAssembly/binaryen) - `wasm-opt` to optimize the generated binary WASM file. `wasm-merge` to merge WASM files into a single one.
- [WASMEdge](https://github.com/WasmEdge/WasmEdge)

## WASM Runtimes and Their Features

Official WASM site with features of the main implementations: [Roadmap](https://webassembly.org/roadmap/).
Sadly not up-to-date/wrong.

- [WASMEdge](https://wasmedge.org/docs/develop/wasmedge/extensions/proposals) and [Proprietary Extensions](https://wasmedge.org/docs/develop/wasmedge/extensions/unique_extensions)
- [WASMer](https://docs.wasmer.io/runtime/features#webassembly-features)
- [WASMTime](https://docs.wasmtime.dev/stability-wasm-proposals-support.html)

## WASM Features

### Tail Calls

- Chrome: >=112
- Node: flag `--experimental-wasm-return-call` (not necessary any more)
- Deno: flag `--v8-flags=--experimental-wasm-extended-const`
- WASMEdge: option `--enable-tail-call`

### Typed Function References

Chrome: supported.
Node: supported.

### GC

`wat2wasm`  version 1.0.33 does not know of `struct.new`, even with `--enable-all` or `--enable-gc`.
`wasm-opt` version 113 can handle it with `--all-features`.

- Chrome: option `chrome://flags/#enable-webassembly-garbage-collection`
- Node: flag `--experimental-wasm-gc`

### 64 Bit Memory

- Chrome option `chrome://flags/#enable-experimental-webassembly-features`
- Node: flag `--experimental-wasm-memory64`
- Deno: flag `--v8-flags=--experimental-wasm-memory64`
- WASMTime: flag `--wasm-features=memory64`

### Threads

- Chrome: >=74
- Node: >=16.4
- Deno: >=1.9
- WASMEdge: option `--enable-threads`

## WASMEdge: Running WASM Directly

### Main Entry point

`wasmedge` calls the function with exported name `_start` if no function name to call has been given at the command line.

#### Example

This WASMEdge command line

```text
wasmedge --enable-all --enable-all-statistics test.wasm
```

calls the `main` function of this WASM file (actually the compiled WASM binary of this source file) exportted as `_start`:

```wasm
(module
 (func $fac (param $a i32) (result i32) ...)

 (func $main (result i32)
    (call $fac (i32.const 6)))
  (export "_start" (func $main)))
```

## WASM Binaries to WAT

To get the s-expression syntax in the right order, use the option `--fold-exprs` to `wasm2wat`.

**Example:**

S-Expr output with `--fold-exprs`:

```text
wasm2wat out/test.wasm --enable-all --fold-exprs
```

```wasm
(module
  (type (;0;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 0) (param i32 i32) (result i32)
    (i32.add
      (local.get 0)
      (local.get 1))))
```

Flat output without:

```text
wasm2wat out/test.wasm --enable-all
```

```wasm
(module
  (type (;0;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 0) (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add))
```

### WASM Compiler Output Online

On the [Rust Playground](https://play.rust-lang.org/) WASM output can be enabled to the right of the `RUN` button.

## License

Everything in this repository **WASM-stuff** is licensed under the GPLv3 or later. See file [./LICENSE](./LICENSE) for details.
