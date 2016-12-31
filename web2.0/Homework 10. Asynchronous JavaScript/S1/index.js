/* 人工交互 */
$(document).ready(function() {
  // 移除环形菜单的原来图片 气泡
  var RemoveContent = function () {
    $("#info-bar").empty();
    $(".unread").remove();
    $("#control-ring li").each(function () {
      $(this).css("background", "none");
    })
  }
  RemoveContent();
  var ButtonOver_flag = false; //鼠标是否移过@的标志
  var ClickBuble_flag = false; //鼠标是否点击气泡的标志
  
  var AddContent = function () {
    ClickBuble_flag = false;
    var lis = $("#control-ring li"); //获取li
    for (var i = 0; i < lis.length; i++) {
      lis[i].innerHTML = String.fromCharCode('A'.charCodeAt(0) + i); // 添加ABCDE
      lis[i].HadClicked = false;  //设置初始click状态
    }
    lis.css("background-color", "#3b3bb1") // 初始为蓝色
  }
  
  // 移入at-plus-container时效果
  var HoverIn = function () {
    buttonover_flag = true;
    AddContent();
  }
  // 移出at-plus-container时效果
  var HoverOut = function () {
    buttonover_flag = false;
    RemoveContent();
  }
  // 初始红色圆圈
  var addNumber = function () {
    var temp = document.createElement("span");
    temp.className = "unread";
    temp.innerHTML = "..";
    $(this).append(temp);
    To_gray.call(this);
  }

  var getNumber = function () {
    $.get('/api/', num => { // 获取服务端的随机数
      if ($(this).find(".unread")[0]) {
        var all_flag = true;
        $(this).find(".unread")[0].innerHTML = num; //小圆圈显示数字
        this.HadClicked = true; // 其他气泡不可点击
        $(this).css("background-color", "#6d6a70")
        To_Blue.call(this);
        $("#control-ring li").each(function () { // 判断其他位置的小气泡是否可点击
          if (!$(this)[0].HadClicked) {
            all_flag = false;
          }
        })
        if (all_flag) {
          $("#info-bar")[0].Click = true;
          $("#info-bar").css("background", "#3b3bb1");
        }
      }
    })
  }
  // 灭活变为灰色
  var To_gray = function () {
    ClickBuble_flag = true;
    $("#control-ring li").each(function () {
      if (!$(this)[0].HadClicked) {
        $(this).css("background-color", "#6d6a70");
      }
    })
  }
  // 激活变为蓝色
  var To_Blue = function () {
    ClickBuble_flag = false;
    $("#control-ring li").each(function () {
      if (!$(this)[0].HadClicked) {
        $(this).css("background-color", "#3b3bb1");
      }
    })
  }
  // 获取计算的和
  var getResult = function () {
    var result = 0;
    $("#control-ring li").each(function () {
      result += parseInt($(this).find(".unread")[0].innerHTML);
    })
    return result;
  }
  var addElement = function () {
    $("#button").hover(HoverIn, HoverOut); // jquery鼠标移入移出执行事件
    $("#control-ring li").each(function () {
      $(this)[0].onclick = function() {
        if (buttonover_flag && !ClickBuble_flag && !this.HadClicked) {
          addNumber.call(this); //添加红色小圆圈...
          getNumber.call(this); //获得并添加数字
        }
      }
    })
    // 气泡点击事件
    $("#info-bar")[0].onclick = function() {
      if (this.Click) {
        var result = document.createElement("span");
        result.className = "result";
        result.innerHTML = getResult();
        $(this).append(result);
        $("#info-bar").css("background", "#6d6a70");
        this.Click = false;
      }
    }
  }
  addElement();
})