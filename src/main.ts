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

/* eslint-disable no-console */

import * as fs from "node:fs";
import * as proc from "node:process";
import * as wasc from "wasm-check";

/**
 * Main entry point.
 */
export async function main() {
    checkWasmFeatures();
    const wasmModule = await WebAssembly.compile(
        fs.readFileSync("./out/test.wasm")
    );
    const wasm = (await WebAssembly.instantiate(wasmModule)).exports;
    // eslint-disable-next-line no-unused-vars
    const wasmAdd = wasm.add as (a: number, b: number) => number;
    // eslint-disable-next-line no-magic-numbers
    console.log(`WASM add: ${wasmAdd(5, 4)}`);
    // eslint-disable-next-line no-unused-vars
    const wasmFacTC = wasm.facTC as (a: number) => number;
    // eslint-disable-next-line no-magic-numbers
    console.log(`WASM facTC: ${wasmFacTC(5)}`);
}

/**
 * Checks and displays Node's supported and unsupported WASM features.
 */
function checkWasmFeatures() {
    // eslint-disable-next-line jsdoc/require-jsdoc
    function suppString(supported: boolean): string {
        return supported ? "supported." : "not supported.";
    }
    console.log(`Checking WASM features of Node version ${proc.version}`);
    console.log(`WASM 1.0 ${suppString(wasc.support(1))}`);
    // eslint-disable-next-line no-magic-numbers
    console.log(`WASM 2.0 ${suppString(wasc.support(2))}`);
    for (const [name, supported] of Object.entries(wasc.feature)) {
        console.log(`${name} ${suppString(supported)}`);
    }
    console.log(`Finished checking WASM features.`);
}

main();
