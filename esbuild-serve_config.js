/*
 * SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Project:  WASM-stuff
 * File:     esbuild-serve_config.js
 * Date:     25.Jun.2023
 *
 * ==============================================================================
 */
import * as esS from "esbuild-server";
import * as fs from "node:fs";

esS.createServer(
    {
        bundle: true,
        entryPoints: ["./src/main_web.ts"],
        outfile: "./out/script_web.js",
    },
    {
        static: "out",
        port: 8080,
        https: {
            key: fs.readFileSync("../https_cert-key.pem"),
            cert: fs.readFileSync("../https_cert.pem"),
        },
    }
).start();
