/* 本地校验 */
window.onload = function() {
	var text = document.getElementsByClassName('text');
	var tip_name = document.getElementById('tip_name');
  var tip_id = document.getElementById('tip_id');
  var tip_tel = document.getElementById('tip_tel');
  var tip_email = document.getElementById('tip_email');
  var reset = document.getElementById('reset');
  var flag = true;
	for (var i = 0; i < text.length; i++) {
		text[i].onblur = function() {
			var value = this.value, name = this.name;
			if (value == "")
				return;
			if (name == "username") {
				if (/\W/.test(value) || /[a-zA-Z]\w{5,17}/.test(value) == false || value.length > 18 || /[a-zA-Z]/.test((value)[0]) == false)
					tip_name.textContent =  "Sorry, your username is invalid!";
				else
					tip_name.textContent = "";
			}
			if (name == "id") {
				if (/\D/.test(value) || (value)[0] == '0' || /\d{8}/.test(value) == false || value.length > 8)
					tip_id.textContent = "Sorry, your student id is invalid!";
				else
					tip_id.textContent = "";
			}
			if (name == "tel") {
				if (/\D/.test(value) || (value)[0] == '0' || /\d{11}/.test(value) == false || value.length > 11)
					tip_tel.textContent = "Sorry, your telephone number is invalid!";
				else
					tip_tel.textContent = "";
			}
			if (name == "email") {
				if (/^[a-zA-Z_0-9\-]+@(([a-zA-Z_0-9\-])+\.)+[a-zA-Z]{2,4}$/.test(value) == false)
					tip_email.textContent = "Sorry, your email address is invalid!";
				else
					tip_email.textContent = "";
			}
		}
    reset.onclick = function() {
      tip_name.textContent = "";
      tip_id.textContent = "";
      tip_tel.textContent = "";
      tip_email.textContent = "";
    }
	};
}