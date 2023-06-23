;; SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
;; SPDX-License-Identifier: GPL-3.0-or-later
;;
;; Project:  WASM-stuff
;; File:     test.wat
;; Date:     23.Jun.2023
;;
;; ==============================================================================

(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)
