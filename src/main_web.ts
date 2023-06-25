/*
 * SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Project:  WASM-stuff
 * File:     main_web.ts
 * Date:     25.Jun.2023
 *
 * ==============================================================================
 */

/**
 * Loads the WASM object.
 */
async function main() {
    const wasmResp = await fetch("./test.wasm");
    const wasmBuf = await wasmResp.arrayBuffer();
    const wasmMod = await WebAssembly.compile(wasmBuf);
    const wasm = (await WebAssembly.instantiate(wasmMod)).exports;

    // eslint-disable-next-line no-unused-vars
    const wasmAdd = wasm.add as (a: number, b: number) => number;
    // eslint-disable-next-line no-unused-vars
    const wasmFac = wasm.fac as (a: number) => number;
    // eslint-disable-next-line no-unused-vars
    const wasmFacTC = wasm.facTC as (a: number) => number;
    // eslint-disable-next-line no-magic-numbers
    console.error(`add(6,2): ${wasmAdd(6, 2)}`);
    // eslint-disable-next-line no-magic-numbers
    console.error(`fac(9): ${wasmFac(9)}`);
    // eslint-disable-next-line no-magic-numbers
    console.error(`facTC(8): ${wasmFacTC(8)}`);
}

main();
