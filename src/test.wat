;; SPDX-FileCopyrightText:  Copyright 2023 Roland Csaszar
;; SPDX-License-Identifier: GPL-3.0-or-later
;;
;; Project:  WASM-stuff
;; File:     test.wat
;; Date:     23.Jun.2023
;;
;; ==============================================================================

(module
  ;; Adds `$a` and `$b`.
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    (i32.add
      (local.get $lhs)
      (local.get $rhs)))

  (export "add" (func $add))

  ;; Naive factorial implementation.
  (func $fac (param $a i32) (result i32)
    (if (result i32)
      (i32.le_s (local.get $a) (i32.const 1))
      (then (local.get $a))
      (else (i32.mul
              (local.get $a)
              (call $fac (i32.sub (local.get $a) (i32.const 1)))))))

  (export "fac" (func $fac))

  ;; Factorial using tail call optimization.
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

  ;; This should not cause a stack overflow, even with _really_ big `$a`s.
  (func $tcTest (param $a i32) (result i32)
    (if (result i32)
      (i32.le_s (local.get $a) (i32.const 1))
      (then (i32.const 1))
      (else (return_call $tcTest
              (i32.sub (local.get $a) (i32.const 1))))))
  (export "tcTest" (func $tcTest))

  ;; This should cause a stack overflow, if `$a` is large enough.
  (func $nonTCTest (param $a i32) (result i32)
    (if (result i32)
      (i32.le_s (local.get $a) (i32.const 1))
      (then (i32.const 1))
      (else (call $nonTCTest
              (i32.sub (local.get $a) (i32.const 1))))))
  (export "nonTCTest" (func $nonTCTest))

  ;; Test WASM GC. =============================================================

  ;; A `struct` with 3 fields, all immutable.
  (type $testStruct
    (struct
      (field $first i64)
      (field $foo f32)
      (field $baz f64)))

  ;; Constructor.
  (func $mkTestStruct
    (param $a i64) (param $b f32) (param $c f64) (result (ref $testStruct))
      (struct.new $testStruct (local.get $a) (local.get $b) (local.get $c)))
  (export "mkTestStruct" (func $mkTestStruct))

  ;; Getter function for the three fields:

  (func $getTestStruct1 (param $rs (ref $testStruct)) (result i64)
    (struct.get $testStruct 0 (local.get $rs)))
  (export "getTestStruct1" (func $getTestStruct1))

  (func $getTestStruct2 (param $rs (ref $testStruct)) (result f32)
    (struct.get $testStruct 1 (local.get $rs)))
  (export "getTestStruct2" (func $getTestStruct2))

  (func $getTestStruct3 (param $rs (ref $testStruct)) (result f64)
    (struct.get $testStruct 2 (local.get $rs)))
  (export "getTestStruct3" (func $getTestStruct3))

  ;; An immutable array.


  ;; A linked list.
  (type $list (struct (field $value i32) (field $next (ref null $list))))

  (func $mkListTest (param $v i32) (result (ref $list))
    (struct.new $list (local.get $v) (ref.null $list)))
  (export "mkListTest" (func $mkListTest))

  ;; WASMEdge calls the function with the exported name `_start` as "main".
  (func $main (result i32)
    (call $tcTest (i32.const 200000)))
  (export "_start" (func $main))
)
