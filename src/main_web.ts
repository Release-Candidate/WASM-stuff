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
// eslint-disable-next-line max-statements
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
    // eslint-disable-next-line no-unused-vars
    const wasmTCTest = wasm.tcTest as (a: number) => number;
    // eslint-disable-next-line no-magic-numbers
    console.error(`WASM TC Test (200000): ${wasmTCTest(200000)}`);
    const wasmMkTestStruct = wasm.mkTestStruct as (
        // eslint-disable-next-line no-unused-vars
        a: BigInt,
        // eslint-disable-next-line no-unused-vars
        b: number,
        // eslint-disable-next-line no-unused-vars
        c: number
    ) => {};
    // eslint-disable-next-line no-unused-vars
    const wasmTestStructField1 = wasm.getTestStruct1 as (struct: {}) => BigInt;
    // eslint-disable-next-line no-unused-vars
    const wasmTestStructField2 = wasm.getTestStruct2 as (struct: {}) => number;
    // eslint-disable-next-line no-unused-vars
    const wasmTestStructField3 = wasm.getTestStruct3 as (struct: {}) => number;
    // eslint-disable-next-line no-magic-numbers
    const wasmObject = wasmMkTestStruct(BigInt(15), 16, 17);
    // eslint-disable-next-line no-magic-numbers
    console.error(`WASM struct field 1: ${wasmTestStructField1(wasmObject)}`);
    // eslint-disable-next-line no-magic-numbers
    console.error(`WASM struct field 2: ${wasmTestStructField2(wasmObject)}`);
    // eslint-disable-next-line no-magic-numbers
    console.error(`WASM struct field 3: ${wasmTestStructField3(wasmObject)}`);
}

main();
