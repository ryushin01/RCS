// 쿠키 저장하기
var setCookie = function(name, value, exp) {
	var date = new Date();      
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toGMTString() + ';path=/';  
};

// 쿠키 가져오기
var getCookie = function(name) {      
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value? value[2] : null;  
};

// 쿠키 삭제하기
var deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
}