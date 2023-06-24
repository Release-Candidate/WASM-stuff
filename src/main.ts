/*
 * SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Project:  WASM-stuff
 * File:     main.ts
 * Date:     23.Jun.2023
 *
 * ==============================================================================
 */

import * as fs from "node:fs";

/**
 * Main entry point.
 */
export async function main() {
    const wasmModule = await WebAssembly.compile(
        fs.readFileSync("./out/test.wasm")
    );
    const wasm = (await WebAssembly.instantiate(wasmModule)).exports;
    // eslint-disable-next-line no-unused-vars
    const wasmAdd = wasm.add as (a: number, b: number) => number;
    // eslint-disable-next-line no-console, no-magic-numbers
    console.log(`WASM add: ${wasmAdd(5, 4)}`);
}

main();
