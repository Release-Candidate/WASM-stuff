// SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
// SPDX-License-Identifier: GPL-3.0-or-later
//
// Project:  WASM-stuff
// File:     wasm_test.ts
// Date:     23.Jun.2023
//
// ==============================================================================

import * as cj from "chai";
import * as fc from "fast-check";
import * as nfs from "node:fs";

const int32Prop = fc.integer({ min: -2_147_483_648, max: 2_147_483_647 });

let wasm: WebAssembly.Exports | undefined = undefined;

before(async () => {
  const wasmModule = await WebAssembly.compile(
    nfs.readFileSync("./out/test.wasm")
  );
  wasm = (await WebAssembly.instantiate(wasmModule)).exports;
});

describe("Test test.wat functions", () => {
  it("WASM export should exist", () => {
    cj.expect(wasm).not.undefined;
  });
  it("Test add", () => {
    cj.expect((wasm?.add as (x: number, y: number) => number)(1, 2)).to.equal(
      3
    );
  });
  it("Check add properties: commutative", () => {
    fc.assert(
      fc.property(int32Prop, int32Prop, (a, b) => {
        cj.assert.equal(
          (wasm?.add as (x: number, y: number) => number)(a, b),
          (wasm?.add as (x: number, y: number) => number)(b, a)
        );
      }),
      { verbose: true, numRuns: 1000 }
    );
  });
  it("Check add properties: associative", () => {
    fc.assert(
      fc.property(int32Prop, int32Prop, int32Prop, (a, b, c) => {
        cj.assert.equal(
          (wasm?.add as (x: number, y: number) => number)(
            (wasm?.add as (x: number, y: number) => number)(a, b),
            c
          ),
          (wasm?.add as (x: number, y: number) => number)(
            a,
            (wasm?.add as (x: number, y: number) => number)(b, c)
          )
        );
      }),
      { verbose: true, numRuns: 1000 }
    );
  });
});
