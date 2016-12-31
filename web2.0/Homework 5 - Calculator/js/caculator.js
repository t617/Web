
  /* 临时初始变量 */
  var formula=0, flag=true;
  /* 表达式相加 */
  function jsq(formula) {
    if (flag==true||(formula=="+"||formula=="-"||formula=="*"||formula=="/")&&flag==false) {
      document.getElementById('input_sreeen').value += document.getElementById(formula).value;
      flag=true;
    } else {
      Clear();
      document.getElementById('input_sreeen').value += document.getElementById(formula).value;
      flag=true;
    }
  }
  /* eval函数求出值并可以抛出异常 */
  function eva() {
    try {
      flag=false;
      document.getElementById("input_sreeen").value = eval(document.getElementById("input_sreeen").value);
    }
    catch(exception) {
      alert(exception);
    }
  }
  /* 清屏 */
  function Clear() {
    document.getElementById("input_sreeen").value=null;
    document.getElementById("input_sreeen").focus();
  }
  /* 退格截断最后一个字符 */
  function Back() {
    var temp = document.getElementById("input_sreeen");
    temp.value = temp.value.substring(0, temp.value.length - 1);
  }