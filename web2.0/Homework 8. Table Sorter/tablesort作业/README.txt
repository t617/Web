************************************************

对其他网页使用：

http://oj.jzxx.net/problemset.php
https://leetcode.com/problemset/algorithms/
http://soj.sysu.edu.cn/ranklist.php


一行代码：

$(document).ready(function() {$("table").each(function(which) {$("table:eq(" + which + ") thead td").each(function(col) {var times = 0;$(this).click(function() {times++;var rows = new Array();var choose_by = "";$("table:eq(" + which + ") tbody tr").each(function(i) {rows.push([$(this).html()]);choose_by = $(this).children().eq(col).html();rows[i].key = choose_by;});var te = rows[3].key;var choice = "";if (!isNaN(Number(te))) {choice = "number";} else {choice = "string";}rows.sort(function(a, b) {if (choice == "number") {return (a.key - b.key);} else {if (a.key > b.key) {return 1;} else if (a.key < b.key) {return -1;} else {return 0;}}});if (times % 2 == 0) {rows.reverse();}$("table:eq(" + which + ") tbody tr").each(function(h) {this.innerHTML = rows[h];});});});});});

************************************************
