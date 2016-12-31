$("table").each(function(which) { //获取网页的所有table
  $("table:eq(" + which + ") thead th").each(function(col) {
    var count = 0;
    $(this).click(function() {
      count++;
      Change_table(col, which, count);
    });
  });
});
// click th后的动作
function Change_table(col, which, count) {
  Change_thead(col, which,count);
  Change_tbody(col, which, count);
}
function Change_thead(col, which, count) {
  $("table:eq(" + which + ") thead th").each(function(i) {
    $(this).attr("class", "");
    if (i == col&&count % 2 == 0) {
      $(this).attr("class", "click_even");
    } else if (i == col&&count % 2 == 1) {
      $(this).attr("class", "click_odd");
    }
  });
}

function Change_tbody(col, which, count) { //对td行排序
  var result;
  $("table:eq(" + which + ") thead th").each(function(i) {
    if (i == col&&count % 2 == 0)
      result = Descend(col, which);
    else if (i == col&&count % 2 == 1)
      result = Ascend(col, which);
  });
  update(which, result);
}
/* 默认升序 */
function Ascend(col, which) {
  var rows = new Array();
  $("table:eq(" + which + ") tbody tr").each(function(i) {
    rows.push([$(this).html()]);
    rows[i].key = $(this).children().eq(col).html();
  });
  sort(rows);
  return rows;
}
/*array的reverse*/
function Descend(col, which) {
  var temp = Ascend(col, which);
  temp.reverse();
  return temp;
}
// 排序
function sort(rows) {
  rows.sort(function(a, b) {
  if (a.key > b.key) {
    return 1;
  } else if (a.key < b.key) {
    return -1;
  }
  return 0;
  });
}
/*更新*/
function update(which, result) {
  $("table:eq(" + which + ") tbody tr").each(function(i) {
  $(this).html(result[i]);
  });
}