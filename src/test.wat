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
    (i32.add
      (local.get $lhs)
      (local.get $rhs)))

  (export "add" (func $add))

  (func $fac (param $a i32) (result i32)
    (if (result i32)
      (i32.le_s (local.get $a) (i32.const 1))
      (then (local.get $a))
      (else (i32.mul
              (local.get $a)
              (call $fac (i32.sub (local.get $a) (i32.const 1)))))))

  (export "fac" (func $fac))

  (func $facTCHelper (param $acc i32) (param $b i32) (result i32)
    (if (result i32)
      (i32.le_s (local.get $b) (i32.const 1))
      (then (i32.mul (local.get $b) (local.get $acc)))
      (else (return_call $facTCHelper
                (i32.mul (local.get $acc) (local.get $b))
                (i32.sub (local.get $b) (i32.const 1))))))

  (func $facTC (param $a i32) (result i32)
    (return_call $facTCHelper (i32.const 1) (local.get $a)))
  (export "facTC" (func $facTC))

  (func $main (result i32)
    (call $fac (i32.const 6)))
  (export "_start" (func $main))
)
