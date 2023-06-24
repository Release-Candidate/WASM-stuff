/*
 * SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Project:  WASM-stuff
 * File:     wasm_test.ts
 * Date:     23.Jun.2023
 *
 * ==============================================================================
 */

/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */

import * as cj from "chai";
import * as fc from "fast-check";
import * as nfs from "node:fs";

const wasmPath = "./out/test.wasm";

const int32Prop = fc.integer({ min: -2_147_483_648, max: 2_147_483_647 });

/**
 * Javascript version of factorial.
 * Tail call version.
 * @param a The number to take the factorial of.
 * @returns The factorial of `a`.
 */
function jsFac(a: number): number {
    // eslint-disable-next-line jsdoc/require-jsdoc
    function facTC(acc: number, b: number) {
        const newAcc = acc * b;
        if (b < 2) {
            return newAcc;
        } else {
            return facTC(newAcc, b - 1);
        }
    }
    return facTC(1, a);
}

// eslint-disable-next-line no-undef-init
let wasm: WebAssembly.Exports | undefined = undefined;

describe("Test test.wat functions", () => {
    before(async () => {
        const wasmModule = await WebAssembly.compile(
            nfs.readFileSync(wasmPath)
        );
        wasm = (await WebAssembly.instantiate(wasmModule)).exports;
    });
    it("WASM export should exist", () => cj.expect(wasm).not.undefined);
    it("Test add", () => {
        // eslint-disable-next-line no-unused-vars
        const wasmAdd = wasm?.add as (x: number, y: number) => number;
        cj.expect(wasmAdd(1, 2)).to.equal(3);
    });
    it("Check add properties: commutative", () => {
        fc.assert(
            fc.property(int32Prop, int32Prop, (a, b) => {
                // eslint-disable-next-line no-unused-vars
                const wasmAdd = wasm?.add as (x: number, y: number) => number;
                cj.assert.equal(wasmAdd(a, b), wasmAdd(b, a));
            }),
            { verbose: true, numRuns: 1000 }
        );
    });
    it("Check add properties: associative", () => {
        fc.assert(
            fc.property(int32Prop, int32Prop, int32Prop, (a, b, c) => {
                // eslint-disable-next-line no-unused-vars
                const wasmAdd = wasm?.add as (x: number, y: number) => number;
                cj.assert.equal(
                    wasmAdd(wasmAdd(a, b), c),
                    wasmAdd(a, wasmAdd(b, c))
                );
            }),
            { verbose: true, numRuns: 1000 }
        );
    });
    it("Test factorial", () => {
        // eslint-disable-next-line no-unused-vars
        const wasmFac = wasm?.fac as (x: number) => number;
        cj.expect(wasmFac(1)).to.equal(1);
        cj.expect(wasmFac(5)).to.equal(120);
        cj.expect(wasmFac(12)).to.equal(479001600);
    });
    it("Test JS factorial", () => {
        // eslint-disable-next-line no-unused-vars
        cj.expect(jsFac(1)).to.equal(1);
        cj.expect(jsFac(5)).to.equal(120);
        cj.expect(jsFac(12)).to.equal(479001600);
    });
    it("Test tail call factorial", () => {
        // eslint-disable-next-line no-unused-vars
        const wasmFac = wasm?.facTC as (x: number) => number;
        cj.expect(wasmFac(1)).to.equal(1);
        cj.expect(wasmFac(5)).to.equal(120);
        cj.expect(wasmFac(12)).to.equal(479001600);
    });
});
