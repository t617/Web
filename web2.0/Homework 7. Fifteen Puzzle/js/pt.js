/* By Song Zhiqiang */
window.onload=function() {
  /* 动态创建16个div */
  var pos = document.getElementById('pin_tu');
  var d = document.createDocumentFragment();
  for (var i = 1; i < 17; i++) {
    var div = document.createElement("div");
    div.id = "pt" + i;
    div.className = "position" + i;
    d.appendChild(div);
  }
  pos.insertBefore(d, pos[0]);
  /*点击移动*/
  for (var i = 0; i < 16; i++) {
    (function(i) {
      var pic_num = document.getElementById('pt' + (i + 1));
      pic_num.onclick = function() {
        var temp = document.getElementById('is_s');
        if (is_near(i)) {
          var p1 = document.getElementById('pt1');
          var temp_name = pic_num.className;
          pic_num.className = p1.className;
          p1.className = temp_name; 
          var c = random[0];
          random[0] = random[i];
          random[i] = c;
        }
        var temp = document.getElementById('is_s');
        if (is_succeed()) {
          temp.textContent = "已还原拼图!";
        } else {
          temp.textContent = "加油，还差一点哦!";
        }
      }
    })(i);
  }
  var start = document.getElementById('start');
  var reset = document.getElementById('reset');
  start.onclick = function() {
    start_p();
  }
  reset.onclick = function() {
    reset_p();
  }
}
/* 判断是否拼好 */
function is_succeed() {
  for (var i = 0; i < 16; i++) {
    if ((i + 1)!=random[i]) {
      return false;
    }
  }
  return true;
}
/* 判断能否移动 */
function is_near(k) {
  up = random[k] - 4;
  down = random[k] + 4;
  left = random[k] - 1;
  right = random[k] + 1;
  if ((up>0&&random[0]==up)||(down<17&&random[0]==down)||(random[k]%4!=1&&random[0]==left)||(random[k]%4!=0&&random[0]==right)) {
    return true;
  }
}
/* 随机数组生成 */
function my_ran(n, min, max) {
 var arr = [];
 for(var i = 0; i < n; i++) {
  arr[i] = parseInt(Math.random()*(max-min+1)+min);
  for(j = 0; j < i; j++) {
   if(arr[i] == arr[j]) {
    i = i - 1;
    break;
   }
  }
 }
 return arr;
}
/* 开始拼图 */
function start_p() {
  var temp = document.getElementById('is_s');
  temp.textContent = "开始拼图吧!";
  random = my_ran(16, 1, 16);
  for (var i = 0; i < 16; i++) {
    var pos = document.getElementById('pt' + (i + 1));
    pos.className = "position" + random[i];
  }
}
/* 还原拼图 */
function reset_p() {
  var temp = document.getElementById('is_s');
  temp.textContent = "已还原拼图!";
  for (var i = 0; i < 16; i++) {
    random[i] = i + 1;
    var pos = document.getElementById('pt' + (i + 1));
    pos.className = "position" + (i + 1);
  }
}