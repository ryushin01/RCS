
/** weblog script js path: ex) /resources/js/script */

//function loadjs(){
//	
////	if(typeof JQuery == 'undefined'){
////		var script = document.createElement('script');
////		script.type = 'text/javascript';
////		script.src = 'https://xtr.tos.sktelecom.com/js/jquery-1.11.3.min.js';
////		document.getElementsByTagName('head')[0].appendChild(script);		//
////
////	}
//
//	var script = document.createElement('script');
//	script.type = 'text/javascript';
//	script.src = 'https://xtr.tos.sktelecom.com/js/xtractor_api.js';
//	//script.src = '/js/xtractor_api.js';
//	document.getElementsByTagName('head')[0].appendChild(script);
//	
//}
//
//loadjs();

/*	if(typeof JQuery != 'undefined'){
		 $(document).ready(function() {
				
				$("form").each(function() {
					$(this).submit(function(event) {
						localStorage.setItem("XTMETHOD", $(this).attr("method").toUpperCase());
						localStorage.setItem("XTPARAM", "?"+$(this).serialize());
					});
				});

			});
	}*/

//setTimeout(function(){
//	 
//	 $(document).ready(function() {
//			
//			$("form").each(function() {
//				$(this).submit(function(event) {
//					localStorage.setItem("XTMETHOD", $(this).attr("method").toUpperCase());
//					localStorage.setItem("XTPARAM", "?"+$(this).serialize());
//				});
//			});
//
//		});
//
//	 }, 200);

var xtr = "";

//var xtrScriptPath = "/js";
//var xtrScriptPath = "https://xtr.tos.sktelecom.com/js";

var GVHOST_STR = '';

/** XTVID �뜝�럥理먧펺�떒苡��뜝�띂�뙑�⑤베�깓�뜝�럡�돲占쎌닂�삕占쎌쥙�쑟筌뤿떣�쐻占쎌늿�굲嶺뚮Ĳ�걠�앓듬쐻占쎈슡�꽠占쎈맮�삕占쎌쥙�윥占쎄퉵�삕�뜝�띂�눇�뙼�뿫�쑋�뜝�룞�삕�뜝�럥理먧펺�떒苡�嚥▲룗�걫占쎌쥙猷욑옙�닂�삕獄쏅똻�렰占쎌쥙�윪獒뺣냵�삕�뜝占� */
var vid = 'XTVID';
var sid = 'XTSID';
var lid = 'XTLID';
var loginid = 'XTLOGINID';

//out referer cookie
var rid = 'XTRID';
var ruid =  'XTRUID';
var rkid =  'XTRKID';

//adKeyword cookie
var xtRef = 'XTREF';
var xtCate = 'XTCATE';
var xtKw = 'XTKW';

//adKeyword parameter
var xtrRef="xtr_ref";
var xtrCate="xtr_cate";
var xtrKw="xtr_kw";

var xtrChk = "false";

var hostIdx = 0;
var innerHostArray = new Array();
innerHostArray.push('tworld.co.kr');
innerHostArray.push('sktelecom.com');
innerHostArray.push('sktmembership.co.kr');
innerHostArray.push('skt0.co.kr');
innerHostArray.push('younghandong.com');
innerHostArray.push('sktelecom5gx.com');
innerHostArray.push('tfactory.co.kr');
innerHostArray.push('tsharp.io');
innerHostArray.push('mpai.kr');
innerHostArray.push('127.0.0.1');
innerHostArray.push('localhost');
innerHostArray.push('sktenterprise.com');
innerHostArray.push('sktenterprise.co.kr');
innerHostArray.push('sktenterprise.kr');
innerHostArray.push('sktenterprise.net');
innerHostArray.push('skt-enterprise.com');
innerHostArray.push('skt-enterprise.co.kr');
innerHostArray.push('skt-enterprise.kr');
innerHostArray.push('skt-enterprise.net');
innerHostArray.push('tworldfriends.co.kr');


makeXTVIDCookie();
makeSESSIONIDCookie();
makeRefererCookie();
makeRefererURLCookie();
makeRefererKeyWordCookie();
makeXTRRefCookie();
makeXTRCateCookie();
makeXTRKwCookie();

function makeXTVIDCookie() {
	if (!existCookie(vid)) {
		setXTVIDCookie(vid);
	}

//	if (!existCookie(newLid) && existCookie(lid)) {
//		var Lid = getXTCookie(lid);
//		var loginId = getXTCookie(loginid);
//		var xtrUrl = "/xtractor/loginDummy";
//		if(xtrUrl.indexOf("?")>0){
//			xtrUrl +="&";
//		}else{
//			xtrUrl +="?";
//		}	
//		/** var url = '<scr'+'ipt src=\"/xtractor/loginDummy.do?V_ID=' + getXTCookie(vid) + '&L_ID=' + loginId + '&ct=' + Math.round(new Date().getTime() / (1000*60)) + '\"><\/script>';
//			console.log(url);
//			document.write(url); 
//		$.get('http://xtr.tos.sktelecom.com/xtractor/loginDummy?V_ID=' + getXTCookie(vid) + '&L_ID=' + Lid + '&LOGIN_ID=' + loginId + '&ct=' + Math.round(new Date().getTime() / (1000*60)));
//		apiConnect(xtrUrl+"V_ID=" + getXTCookie(vid) + "&L_ID=" + Lid + "&LOGIN_ID=" + loginId + "&ct=" + Math.round(new Date().getTime() / (1000*60)));	
//		removeXTCookie(lid);*/
//		//setXTLIDCookie(newLid, loginId);
//	}
}

function getURLParameter(url, name) {
    return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1]
        );
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");

    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }

    return sval;
}

function makeXTRRefCookie() {
	var value = getParam(xtrRef);
	if(value != null){
		setXTLIDCookie(xtRef, value); 
	}
}

function makeXTRCateCookie() {
	var value = getParam(xtrCate);
	if(value != null){
		setXTLIDCookie(xtCate, value); 
	}
}

function makeXTRKwCookie() {
	var value = getParam(xtrKw);
	if(value != null){
		setXTLIDCookie(xtKw, value); 
	}
}

function getRefererDomain(referer){
	
	if (typeof referer != "undefined"){
		referer = referer.replace("https://", "");
		referer = referer.replace("http://", "");
		if(referer.indexOf("/") > -1){
			referer = referer.substring(0,referer.indexOf("/"));
		}
		return referer;
	}
}

function getRefererURL(referer){
	if (typeof referer != "undefined"){
		referer = referer.replace("https://", "");
		referer = referer.replace("http://", "");
		if(referer.indexOf("/") > -1){
			var urlLength = url.indexOf("?");
			referer = referer.substring(referer.indexOf("/"),urlLength);
		}
		return referer;
	}
}

function getRefererKeyword(referer){
	if (typeof referer != "undefined"){
		referer = referer.replace("https://", "");
		referer = referer.replace("http://", "");
		if(referer.indexOf("/") > -1){
			referer = getURLParameter(referer, "search");
		}
		return referer;
	}
}

/** XTRID Create*/
function makeRefererCookie() {
	try {
		var referer = document.referrer;
		if (typeof referer != "undefined"){
			var isInnerHost = false;
			for ( var int = 0; int < innerHostArray.length; int++) {
				var innerHost = innerHostArray[int];
				if(referer.indexOf(innerHost) > -1){
					isInnerHost = true;
				}
			}
			if(!isInnerHost){
				var refererDomain = getRefererDomain(referer);	
				if (typeof refererDomain != "undefined"){
					document.cookie = rid + "=" + refererDomain + ";" + "path=/;domain=" + getXDomain();
				}
			}
		}		
	} catch (e) {
	}
}

/** XTRUID Create*/
function makeRefererURLCookie() {
	try {
		var referer = document.referrer;
		if (typeof referer != "undefined"){
			var isInnerHost = false;
			for ( var int = 0; int < innerHostArray.length; int++) {
				var innerHost = innerHostArray[int];
				if(referer.indexOf(innerHost) > -1){
					isInnerHost = true;
				}
			}
			if(!isInnerHost){
				var refererURL = getRefererURL(referer);	
				if (typeof refererDomain != "undefined"){
					document.cookie = ruid + "=" + refererURL + ";" + "path=/;domain=" + getXDomain();
				}
			}
		}		
	} catch (e) {
	}
}

/** XTRKID Create*/
function makeRefererKeyWordCookie() {
	try {
		var referer = document.referrer;
		if (typeof referer != "undefined"){
			var isInnerHost = false;
			for ( var int = 0; int < innerHostArray.length; int++) {
				var innerHost = innerHostArray[int];
				if(referer.indexOf(innerHost) > -1){
					isInnerHost = true;
				}
			}
			if(!isInnerHost){
				var refererKeyword = getRefererKeyword(referer);	
				if (typeof refererDomain != "undefined"){
					document.cookie = rkid + "=" + refererKeyword + ";" + "path=/;domain=" + getXDomain();
				}
			}
		}		
	} catch (e) {
	}
}


/** XTSID*/
function makeSESSIONIDCookie() {
	var xtsidExpire = 30;
	var xtrTodayDate = new Date();
	xtrTodayDate.setMinutes(xtrTodayDate.getMinutes() + xtsidExpire);
	var expiresInfo = xtrTodayDate.toUTCString();
	if (!existCookie(sid)) {
		var randomid = Math.floor(Math.random() * 1000);
		var xtsid = "A" + makeXTVIDValue() + randomid;
		document.cookie = sid + "=" + xtsid + ";" + "path=/;domain=" + getXDomain() + ";expires=" + expiresInfo;
	} else {
		document.cookie = sid + "=" + getXTCookie(sid) + ";" + "path=/;domain=" + getXDomain() + ";expires=" + expiresInfo;
	}

}

/** XTSID�뜝�럥理먧펺�떒苡��뜝�뜴�쐻占쎈뜄源밧뜝�룞�삕*/
function makeXTLIDCookie(value) {
	if (!existCookie(lid)) {
		setXTLIDCookie(lid, value);
	}
}

/** �뜝�럥理먧펺�떒苡�嚥♂쇱씀占쎌쥙�쓠�뜝�룞�삕�⑤챷沅⑨옙醫롫윪�몭�씛�삕占쏙옙占쏙옙醫롫짗占쎌닂彛싷옙�눖�뜲占쎌쥙�윪獒뺣냵�삕�뜝占� */
function existCookie(name) {
	var vid = getXTCookie(name);
	if (vid != null && vid != "") {
		return true;
	}
	return false;
}

/** 占쎈굝�뒩占쎌꼪�젂繹먮씮占쏙옙醫롫짗占쎌닂�삕�뜝�뜫沅뽳옙醫롫짗占쎌닂�삕�눧誘れぁ雅��굝�ο㎗濡⑥쾵占쎈슢援� 占쎌쥙�윪亦낆쥜�삕占쏙옙�굲占쎌쥜�삕*/
function getXTCookie(name) {
	var cookies = document.cookie.split("; ");
	for ( var i = 0; i < cookies.length; i++) {
		var cPos = cookies[i].indexOf("=");
		var cName = cookies[i].substring(0, cPos);
		if (cName == name) {
			return unescape(cookies[i].substring(cPos + 1));
		}
	}
	// a cookie with the requested name does not exist
	return "";
}

/** XTVID �뜝�럥理먧펺�떒苡�嚥▲룗�걫占쎌쥙猷욑옙�닂�삕獄쏅똻�렰占쎌쥙�윪獒뺣냵�삕�뜝占� */
function setXTVIDCookie(name) {
	/** 3占쎌쥙�윥�걫�뜝�룞�삕占쎌쥙�윪獒뺣돍�삕�뜝�뜾�쎗占쎈끏痢뗧뭐癒뀁삕*/
	var randomid = Math.floor(Math.random() * 1000);

	/** XTVID =  占쎌쥙�윥�뜝�띁�빝占썩뫖�뵛占쎌쥙猷욑옙�닂�삕筌뤿굢�삕�뜝�럩堉뷂㎖琉꾩삕�뜝占�(A...Z ) 占쎌쥙�윪獒뺣돍�삕熬곥끇�렓占쎌쥜�삕+ yymmdd (�뜝�럥理먧펺�떒苡�嚥〓끃�굲�뜝�럥媛앾옙癒⑤쐻占쎈슢�땾�뜝�룞�삕  + hhmmss (�뜝�럥理먧펺�떒苡�嚥〓끃�굲�뜝�럥媛앾옙癒⑤쐻占쎈슢痢뉛옙�슪�삕  +  MMM (�뜝�럥理먧펺�떒苡��뜝�뜴�쐻占쎈슢�뒄占쎈쵓�삕占쎌닂�삕癰귨옙�쐺 1/1000 �뜝�떥�슦�굲 + RRR (占쎌쥙�윪獒뺣돍�삕�뜝占� */
	var xtvid = "A" + makeXTVIDValue() + randomid;
	/** /var xtvid = makeXTVIDValue() + randomid; */
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear() + 10);
	setXTCookie(name, xtvid, 365 * 10, "/", getXDomain());
}

/** XTSID �뜝�럥理먧펺�떒苡�嚥▲룗�걫占쎌쥙猷욑옙�닂�삕獄쏅똻�렰占쎌쥙�윪獒뺣냵�삕�뜝占� */
function setXTSIDCookie(name) {
	/** 3占쎌쥙�윥�걫�뜝�룞�삕占쎌쥙�윪獒뺣돍�삕�뜝�뜾�쎗占쎈끏痢뗧뭐癒뀁삕*/
	var randomid = Math.floor(Math.random() * 1000);

	/** XTVID =  占쎌쥙�윥�뜝�띁�빝占썩뫖�뵛占쎌쥙猷욑옙�닂�삕筌뤿굢�삕�뜝�럩堉뷂㎖琉꾩삕�뜝占�(A...Z ) 占쎌쥙�윪獒뺣돍�삕熬곥끇�렓占쎌쥜�삕+ yymmdd (�뜝�럥理먧펺�떒苡�嚥〓끃�굲�뜝�럥媛앾옙癒⑤쐻占쎈슢�땾�뜝�룞�삕  + hhmmss (�뜝�럥理먧펺�떒苡�嚥〓끃�굲�뜝�럥媛앾옙癒⑤쐻占쎈슢痢뉛옙�슪�삕 +  MMM (�뜝�럥理먧펺�떒苡��뜝�뜴�쐻占쎈슢�뒄占쎈쵓�삕占쎌닂�삕癰귨옙�쐺 1/1000 �뜝�떥�슦�굲 + RRR (占쎌쥙�윪獒뺣돍�삕�뜝占� */
	var xtvid = "A" + makeXTVIDValue() + randomid;
	/** var xtvid = makeXTVIDValue() + randomid; */
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear() + 10);

	setXTCookie(name, xtvid, -1, "/", getXDomain());
}

/* 占쎌쥙�윥占쎌궏臾억옙�늿�굲占쎌쥙�쓡野껁깿伊덌옙猷삳쭕 占쎌쥙�윪獒뺣돍�삕�뜝占�*/
try {
	var pcX = screen.width;
	var pcY = screen.height;
	var xloc = pcX+"X";
	xloc += pcY;
	setXTCookie("xloc", xloc, 365 * 10, "/", getXDomain());
} catch (e) {
}
/* 占쎌쥙�윥占쎌궏臾억옙�늿�굲占쎌쥙�쓡野껁깿伊덌옙猷삳쭕 占쎌쥙猷욑옙占�*/


/** XTLID �뜝�럥理먧펺�떒苡�嚥▲룗�걫占쎌쥙猷욑옙�닂�삕獄쏅똻�렰占쎌쥙�윪獒뺣냵�삕�뜝占� */
function setXTLIDCookie(name, value) {
	setXTCookie(name, value, -1, "/", getXDomain());
}

/** XTLID �뜝�럥理먧펺�떒苡�嚥▲룗�걫占쎌쥙猷욑옙�눨�쐻占쎈슣�졆占쎌쥙�윪獒뺣냵�삕�뜝占� */
function removeXTCookie(name) {
	setXTCookie(name, "", 0, "/", getXDomain());
}

/** 占쎈굝�뒩占쎌꼪�젂繹먮씮占쏙옙醫롫쓠�뜝�뜽占썩뫀�뒦占쎈짘�쐻占쎈슢�땻繞벿우삕�뜝�럥理먧펺�떒苡�嚥▲룗�걫占쎌쥙猷욑옙�닂�삕獄쏅똻�렰占쎌쥙�윪獒뺣냵�삕�뜝占� */
function setXTCookie(name, value, expires, path, domain) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expires);
	var expiresInfo = (expires < 0) ? '' : todayDate.toGMTString();
	document.cookie = name + "=" + escape(value) + ";" + "path=" + path	+ ";domain=" + domain + ";expires=" + expiresInfo;
}

/** �뜝�럥理먧펺�떒苡�嚥〓끃�굲�뜝�럥媛앾옙癒⑤쐻占쎌늿�굲占쎌쥙�윞占쎈뱾�눀�뜝�뜴�쐻占쎄쑴維딁춯�볥굫占쎌닂彛쀨쥈�뫖援� 占쎌쥙�윪亦낆쥜�삕占쏙옙�굲占쎌쥜�삕*/
function getXDomain() {
	var host = document.domain;
	var hostIp = host.replace(/\./g, "");

	if(!isNaN(hostIp) == true) {
		return host;
	} else {
		var tokens = host.split('.');
		var xdomain = tokens[tokens.length - 2] + '.' + tokens[tokens.length - 1];
		var newXdomain = (tokens[tokens.length - 1].length == 2) ? tokens[tokens.length - 3] + '.' + xdomain : xdomain;
		
		newXdomain = newXdomain.replace("undefined.","");
		return newXdomain;
	}
}

/** XTVID 占쎈씈猷녶뜝�룞�삕�뜝�뜴�쐻占쎈슢�뒄占쎈쵓�삕占쎌닂�삕筌먲퐢�렡. */
function makeXTVIDValue() {
	var str = '';
	nowdate = new Date();
	digit = nowdate.getFullYear();
	if (digit < 2000) {
		digit = digit - 1900;
	} else {
		digit = digit - 2000;
	}
	str += paddingNo(digit);

	digit = nowdate.getMonth() + 1;
	str += paddingNo(digit);

	digit = nowdate.getDate();
	str += paddingNo(digit);

	digit = nowdate.getHours();
	str += paddingNo(digit);

	digit = nowdate.getMinutes();
	str += paddingNo(digit);

	digit = nowdate.getSeconds();
	str += paddingNo(digit);

	digit = nowdate.getMilliseconds();
	if ((digit <= 99) && (digit > 9)) {
		str += '0' + digit;
	} else if (digit <= 9) {
		str += '00' + digit;
	} else {
		str += '' + digit;
	}
	return str;
}

/** 10占쎄퀗�옖�뜝�룞�삕�뜝�뜴�쐻占쎈뜆�꺍占쎌쥜�삕占쎌쥙�쑌�댆猿볦삕熬곎딆굲占쎌쥜�삕0'占쎌쥙猷욑옙�늹異��뜝�럩維믣뜝�룞�삕�뜝�럡�녇占썬굦�룈占쎌쥙�윪獒뺣냵�삕�뜝占� */
function paddingNo(val) {
	var st = '';
	if (val <= 9) {
		st += '0' + val;
	} else {
		st = '' + val;
	}
	return st;
}

/** XTVID �뜝�럥理먧펺�떒苡�嚥〓끃�굲�뜝�럥媛앾옙占� 占쎌쥙�윥筌�琉꾩삕�뜝占�*/
//makeXTVIDCookie();
/** makeSESSIONIDCookie(); */

/** WebLog 占쎌쥙�윥甕곤옙�뜝�럥�뺧옙�눨�쐻占쎌늿�굲�뜝�럩�윞�떋�슱�삕繹먮냵�삕�뜝�룞�삕END **/
var getContextPath = function() {
	var offset=location.href.indexOf(location.host)+location.host.length;
	var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));

	return ctxPath;
};

var _ConntectInfo = (function() {
	
	/** apiServer占쎌쥙猷욑옙�뀬p, port, site�뜝�럥�빒占쎈��占쎈뿦琉놅옙�맩�굲?), script占쎈벚�쀯옙�뙋�삕�뜝占� ?, ?, ?, ? */
	var info = [ 'xtr.tos.sktelecom.com', '443', GVHOST_STR, 'api', '0','NaPm,Ncisy', 'ALL', '0' ];
	//var info = [ '150.19.43.204:8080', '8080', GVHOST_STR, 'api', '0','NaPm,Ncisy', 'ALL', '0' ];
	
	var _CI = (!_ConntectInfo) ? [] : _ConntectInfo.val;
	var _N = 0;
	var _T = new Image(0, 0);
	if (_CI.join('.').indexOf(info[3]) < 0) {
		_CI.push(info);
		_N = _CI.length;
	}
	return {
		len : _N,
		val : _CI
	};
})();
//var _ApiConnectJSLoad = (function() {
//	var G = _ConntectInfo;
//	if (G.len != 0) {
//		var _A = G.val[G.len - 1];
//		var _G = (_A[0]).substr(0, _A[0].indexOf('.'));
//		var _C = (_A[7] != '0') ? (_A[2]) : _A[3];
//		var _U = (_A[5]).replace(/\,/g, '_');
//		var _S = (([ '<scr', 'ipt', 'type="text/javascr', 'ipt"></scr', 'ipt>' ])
//				.join('')).replace('tt', 't src="' + xtrScriptPath + '/xtractor_' + _C + '.js?gc='
//				+ _A[2] + '&py=' + _A[4] + '&gd=' + _G + '&gp=' + _A[1]
//				+ '&up=' + _U + '&rd=' + (new Date().getTime()) + '" t');
//		document.writeln(_S);
//		return _S;
//	}
//})();

function scriptValueGet(O, T) {
	for (var i = 0; i < O.val.length; i++) {
		var _AR = O.val[i];
/** if (_AR[3] == T) { */
			return O.val[i];
/**		} */
		;
	}
}

function apiConnect(param) {

	if (typeof (_ConntectInfo) == 'object') {
		var ciValue = scriptValueGet(_ConntectInfo, 'Api');
		var _UD = 'undefined';
		if (typeof (ciValue) != _UD) {
			var _GUL = ciValue[0];
			var _GPT = ciValue[1];
			var _GVHOST = ciValue[2];
			var _gU = '/xtractor/userScript/UserInfoGet?';
			var _rf = document.referrer;
			var _DC = document.cookie;
			function _NIM() {
				return new Image();
			}
			
			var _AIU = _NIM();
			
			function _IL(a) {
				return a != _UD ? a.length : 0;
			}
			function _UL(a) {
				a = _LST(a, '#');
				a = _CST(a, '://');
				if (a.length > 512) {
					a = a.substring(0, 511);
				}
				;
				return a;
			}
			function _PT() {
				return "https://" + _GUL;
				//return "http://" + _GUL;
				// return location.protocol == "https:" ? "https://" + _GUL : "http://" + _GUL + ":" + _GPT;
			}
			function _PL(a, uid) {
				
				_rf = _rf.replace("http://", "");
				_rf = _rf.replace("https://", "");
				
				if (_rf.substring(_rf.length-1, _rf.length) == "/") {
					_rf = _rf.substring(0,_rf.length-1);
				}
				
				_arg = _PT() + _gU;
				if (typeof _ERR != _UD && _ERR == 'err') {
					_arg = _PT() + _gE;
				}
				;
				var hs = "200";
				if (typeof errorStatus != "undefined"){
					hs = errorStatus;
				}
				var method = "GET";
				if ( localStorage.getItem("XTPARAM") != null ) {
					
					try{
						var lsParam = localStorage.getItem("XTPARAM");
						var lsParamStr = lsParam;
						if(a.indexOf("?") != -1){
							a += "&"+lsParamStr;
						}else{
							a += "?"+lsParamStr;
						}
						
					}catch(e){}
					//a += localStorage.getItem("XTPARAM");
					localStorage.removeItem("XTPARAM");
				}
				if ( localStorage.getItem("XTMETHOD") != null ) {
					method = localStorage.getItem("XTMETHOD");
					localStorage.removeItem("XTMETHOD");
				}
				
				if (a.length > 1000) {
					a = a.substring(0, 1000);
				}

				a = encodeURIComponent(a);
				
				var srcUrl = _arg + "&url=" + a;
				
				if (_rf != "") {
					srcUrl += "&ref=" + encodeURIComponent(encodeURIComponent(_rf));
					//srcUrl += "&ref=" + _rf;
					
//					for ( var int = 0; int < innerHostArray.length; int++) {
//						var innerHost = innerHostArray[int];
//						if(referer.indexOf(innerHost) > -1){
//							srcUrl += "&ref=" + encodeURIComponent(_rf);
//						}else{
//							srcUrl += "&ref=" + _rf;							
//						}
//					}
					
				}
				srcUrl += "&req_type=xml" + "&ua="+encodeURIComponent(navigator.userAgent) + "&dc=" + encodeURIComponent(document.cookie) + "&xtuid=" +uid + "&httpstatus="+hs +"&method="+method;
				
				srcUrl += "&gvhost="+_GVHOST;
				_AIU.src = srcUrl;
/** _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&req_type=xml" + "&ua="+navigator.userAgent + "&dc=" + document.cookie +
 "&xtuid=" +uid + "&httpstatus="+hs;
 _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&dc=" + _DC + "&req_type=xml" + "&ua="+navigator.userAgent;
 console.log(_AIU.src);
 for(var i=0; i<_AIU.src.split("&").length; i++) {
 console.log(_AIU.src.split("&")[i]);
 } */
				setTimeout("", 300);
			}
			try{
/**				var fp = new Fingerprint2(getFPOptions()); */
				var url = document.URL.replace("http://", "");
				url = url.replace("https://", "");
				
				if(typeof param != "undefined") {
					var domain = window.location.host;
					url = domain+param;
				}
				
				_PL(url, "");
/**				fp.get(function(result) {
					_PL(url, result);

					if(typeof window.console !== "undefined") {	
						console.log("finger: " + result);
					}
				}); */
			}catch(e){
				_PL(url, 'FP_ERROR');

				if(typeof window.console !== "undefined") {
					console.log(e);	
				}
			}
		}
	}
	xtrChk = "true";

}

//apiConnect();

function ScriptApi(Param) {

	if (typeof (_ConntectInfo) == 'object') {
		var ciValue = scriptValueGet(_ConntectInfo, 'Api');
		var _UD = 'undefined';
		if (typeof (ciValue) != _UD) {
			var _GUL = ciValue[0];
			var _GPT = ciValue[1];
			var _GVHOST = ciValue[2];
			var _gU = '/xtractor/userScript/UserInfoGet?';
			var _rf = document.referrer;
			var _DC = document.cookie;
			function _NIM() {
				return new Image();
			}
			
			var _AIU = _NIM();
			
			function _IL(a) {
				return a != _UD ? a.length : 0;
			}
			function _UL(a) {
				a = _LST(a, '#');
				a = _CST(a, '://');
				if (a.length > 512) {
					a = a.substring(0, 511);
				}
				;
				return a;
			}
			function _PT() {
				return "https://" + _GUL;
				//return "http://" + _GUL;
				// return location.protocol == "https:" ? "https://" + _GUL : "http://" + _GUL + ":" + _GPT;
			}
			function _PL(a, uid) {
				
				_rf = _rf.replace("http://", "");
				_rf = _rf.replace("https://", "");
				
				if (_rf.substring(_rf.length-1, _rf.length) == "/") {
					_rf = _rf.substring(0,_rf.length-1);
				}
				
				_arg = _PT() + _gU;
				if (typeof _ERR != _UD && _ERR == 'err') {
					_arg = _PT() + _gE;
				}
				;
				var hs = "200";
				if (typeof errorStatus != "undefined"){
					hs = errorStatus;
				}
				var method = "GET";
				if ( localStorage.getItem("XTPARAM") != null ) {
					
//					a += localStorage.getItem("XTPARAM");
					localStorage.removeItem("XTPARAM");
				}
				if ( localStorage.getItem("XTMETHOD") != null ) {
					method = localStorage.getItem("XTMETHOD");
					localStorage.removeItem("XTMETHOD");
				}

				if (a.length > 1000) {
					a = a.substring(0, 1000);
				}

				a = encodeURIComponent(a);
				
				var srcUrl = _arg + "&url=" + a;
				
				if (_rf != "") {
					srcUrl += "&ref=" + _rf;
				}
				srcUrl += "&req_type=xml" + "&ua="+encodeURIComponent(navigator.userAgent) + "&dc=" + encodeURIComponent(document.cookie) + "&xtuid=" +uid + "&httpstatus="+hs +"&method="+method;
				
				srcUrl += "&gvhost="+_GVHOST;
				_AIU.src = srcUrl;
/** _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&req_type=xml" + "&ua="+navigator.userAgent + "&dc=" + document.cookie +
 "&xtuid=" +uid + "&httpstatus="+hs;
 _AIU.src = _arg + "&url=" + escape("script."+a) + "&ref=" + escape(_rf) +
 "&dc=" + _DC + "&req_type=xml" + "&ua="+navigator.userAgent;
 console.log(_AIU.src);
 for(var i=0; i<_AIU.src.split("&").length; i++) {
 console.log(_AIU.src.split("&")[i]);
 } */
				setTimeout("", 300);
			}
			
			try{
/**				var fp = new Fingerprint2(getFPOptions()); */
				var url = "";
				//var url = document.URL.replace("http://", "");
				//url = url.replace("https://", "");
				
				if(typeof Param != "undefined") {	
					if(url.indexOf("?") == -1){
						//url.replace("?[object Arguments]", "");
						url= Param;
					}
				}
				
				_PL(url, "");
/**				fp.get(function(result) {
					_PL(url, result);

					if(typeof window.console !== "undefined") {	
						console.log("finger: " + result);
					}
				}); */
			}catch(e){
				_PL(url, 'FP_ERROR');

				if(typeof window.console !== "undefined") {
					console.log(e);	
				}
			}
		}
	}
}


function getFPOptions() {
	var optionsValue = {
		excludeUserAgent: false,
		excludeLanguage: false,
		excludeColorDepth: true,
		excludePixelRatio: true,
		excludeScreenResolution: true,
		excludeAvailableScreenResolution: true,
		excludeTimezoneOffset: false,
		excludeSessionStorage : true,
		excludeIndexedDB : true,
		excludeAddBehavior : true,
		excludeOpenDatabase : true,
		excludeCpuClass: false,
		excludePlatform: false,
		excludeDoNotTrack: true,
		excludeCanvas : true,
		excludeWebGL: true,
		excludeAdBlock: true,
		excludeHasLiedLanguages: true,
		excludeHasLiedResolution: true,
		excludeHasLiedOs: true,
		excludeHasLiedBrowser: true,
		excludeJsFonts: true,
		excludeFlashFonts: true,
		excludePlugins: true,
		excludeIEPlugins: true,
		excludeTouchSupport: true
	};

	return optionsValue;
}


/*
 * form submit 占쎌쥙�윥占쏙옙�삕占쎈뜆苡든춯琉욧탿占쏙옙 占쎌쥙�윥�굢占쎌삕�뜝�룞�삕占쎈챷�굲�뜝�룞�삕
 */
//$(document).ready(function() {
//	
//	$("form").each(function() {
//		$(this).submit(function(event) {
//			localStorage.setItem("XTMETHOD", $(this).attr("method").toUpperCase());
//			localStorage.setItem("XTPARAM", "?"+xtr(this).serialize());
//		});
//	});
//	
//	/*
//	 * jquery Ajax default setting
//	 */
//
//});

/*
 * XMLHttpRequest Ajax default setting
 */

_sendAjax = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function() {
    if (arguments[0] != null) {
    	//localStorage.setItem("XTPARAM", "?"+arguments);
    	localStorage.setItem("XTPARAM", arguments[0]);
    	
    }
    //apiConnect();
 
    //try{
    _sendAjax.apply(this, arguments);
    //}catch(e){
    	//console.log(e);
    //}
};

_openAjax = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
	
	if (arguments[0] != null) {
    	localStorage.setItem("XTMETHOD", arguments[0]);
    }
	
	_openAjax.apply(this, arguments);
};


function new_callCSScript(E_ID, ACTION) {     
	 
    var URI = location.protocol + "//www.tworld.co.kr/global/xtractor/CSDummy";
    var v_id = GetCookie('XTVID'); 
    var l_id = GetCookie('XTLID'); //占쎈슣苑묕옙類ｋ궖(占쏙옙占쎌뮉�돳占쏙옙)
    var u_id = "";                 //占쎈슣苑묕옙類ｋ궖(占썬끋�돳占쏙옙)
    if(l_id != "")					//嚥≪뮄�젃占쎈챶由븝옙�똻�뿳占쎌눖�늺
    {
    	u_id = GetCookie('XTUID');  
    	if(u_id !="")				//占쎈슣苑묋퉪占썲칰�럩肉ч겫占� 占쎈벡�뵥占쎌꼷肉� 癰귨옙野껋�釉� 占썬끋�돳占쎌쥙�몵嚥∽옙 占쎄쑬�뼎
    	{
    		l_id = u_id;
    	}     	
    }     
    var PARAMS = "V_ID=" + v_id + "&L_ID=" + l_id + "&E_ID=" + E_ID + "&CS_ID=&P_ID=&ACTION="+ACTION;   
    var ajax = new AJAX();
    URI = URI+"?"+PARAMS+"&_dt="+Math.floor(new Date().getTime()/1000); 
    ajax.sendRequest("GET", URI, false, null, PARAMS);
}

var AJAX = function() {
	var request = null;
	this.sendRequest = sendRequest;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		request = new ActiveXObject("MSXML2.XMLHTTP");
		if (!request) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	function sendRequest(reqType, url, asynch, action, queryString) {
		//request.onreadystatechange = action;  // CallBack
		request.open(reqType, url, asynch);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");
		request.send(queryString);
	}
}

var XtractorError = {
		
};

XtractorError.sendError = function(ex) {
	
	var msg = encodeURIComponent("JavaScript-"+ex.message);
	msg = msg.replace(/ /g, "_");
	
	
	var dd = ex.stack.split("\n");
	var errorLine = "";
	if(dd.length>0){
		var r =dd[1];
		errorLine = encodeURIComponent(r);
	}
	
	var xtrUrl = document.URL;
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"ErrMsg="+ msg + "&ErrLine="+errorLine);	
	//xtr.getJSON(xtrUrl+"ErrMsg="+ msg);
};

var XtractorEvent = {
		
};

XtractorEvent.xtrEvent = function(Parameter) {
	
//	var param = encodeURIComponent(Parameter);
	var param = Parameter.replace(/ /g, "_");
	
	var domain = window.location.host;
	var xtrUrl = domain+"/eventDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+param);	
};


var XtractorScript = {
		
};


XtractorScript.xtrLoginDummy = function(Parameter) {

	//var param = encodeURIComponent(Parameter);
	var param = Parameter.replace(/ /g, "_");
	
	var domain = window.location.host;
	var xtrUrl = domain+"/loginDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+param);
};

XtractorScript.xtrCSDummy = function(E_ID, CS_ID, ACTION) {

	var eid = E_ID.replace(/ /g, "_");

	var csid = CS_ID.replace(/ /g, "_");

	var action = null;
	
	var fullurl = null;
	if(ACTION) {
		action = ACTION.replace(/ /g, "_");
	}

	var domain = window.location.host;
	
	var url = window.location.pathname;
	var hash = window.location.hash;
	
	if(url){
		fullurl = url;		
	}
	if(hash){
		fullurl +=hash;
	}

	var xtrUrl = domain+"/csDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	if(action != null){
		if(fullurl != null){
			ScriptApi(xtrUrl+"E_ID="+ eid + "&CS_ID="+csid + "&ACTION="+action+ "&frontURL="+fullurl);
		}else{
			ScriptApi(xtrUrl+"E_ID="+ eid + "&CS_ID="+csid + "&ACTION="+action);
		}
	}else{
		if(fullurl != null){
			ScriptApi(xtrUrl+"E_ID="+ eid + "&ACTION="+csid+ "&frontURL="+fullurl);
		}else{
			ScriptApi(xtrUrl+"E_ID="+ eid + "&ACTION="+csid);
		}
	}
};


XtractorScript.xtrSns = function(prodID, SNS) {

	//var pid = encodeURIComponent(prodID);
	var pid = prodID.replace(/ /g, "_");

	//var tw = encodeURIComponent(SNS);
	var tw = SNS.replace(/ /g, "_");
	
	var domain = window.location.host;
	var xtrUrl = domain+"/snsDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"PROD_ID="+ pid + "&SNS="+tw);	
};

XtractorScript.xtrOrder = function(pid, cnt, type, grade, age, gender) {

	var domain = window.location.host;
	var xtrUrl = domain+"/orderDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}	
	ScriptApi(xtrUrl+"P_ID="+ pid +"&CNT="+cnt+"&TYPE="+type+"&GRADE="+grade+"&AGE="+age+"&GENDER="+gender);	
};

XtractorScript.xtrMenualApi = function(url) {

	var domain = window.location.host;
	var xtrUrl = domain+url;
	ScriptApi(xtrUrl);

};


XtractorScript.xtrSearch = function(kwd, inKwd, cArea) {

	var keyword = kwd.replace(/ /g, "_");

	var inkeyword = inKwd.replace(/ /g, "_");

	var clickArea = null;
	if(cArea) {
		clickArea = cArea.replace(/ /g, "_");
	}

	var domain = window.location.host;

	var xtrUrl = domain+"/searchDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	if(clickArea != null){
		ScriptApi(xtrUrl+"keyword="+ keyword + "&inkeyword="+inkeyword + "&clickarea="+clickArea);			
	}else{
		ScriptApi(xtrUrl+"keyword="+ keyword + "&clickarea="+inkeyword);
	}
};

XtractorScript.xtrSearchResult = function(kwd, inKwd, result) {

	var keyword = kwd.replace(/ /g, "_");

	var inkeyword = inKwd.replace(/ /g, "_");

	var resultList = result.replace(/ /g, "_");
	
	var domain = window.location.host;

	var xtrUrl = domain+"/searchResultDummy";
	
	if(xtrUrl.indexOf("?")>0){
		xtrUrl +="&";
	}else{
		xtrUrl +="?";
	}
		
	ScriptApi(xtrUrl+"keyword="+ keyword + "&inkeyword="+inkeyword + "&resultList="+resultList);			
	
};

function postParam(){ 
	var forms = document.getElementsByTagName("form");
	if(typeof forms !== "undefined") {
		for ( var int = 0; int < forms.length; int++) {
			var getForm = forms[int];
			var oriSubmit = getForm.submit;
			getForm.submit = function(e) {
				localStorage.setItem("XTMETHOD", 'POST');
				var formData = [];
				var elem = this.elements;
				var postParamStr = "";
				for(var i=0; i<elem.length; i++) {
					var name = elem[i].name;
					var value = elem[i].value;
					formData.push(name + '=' + value);
					if(i > 0){
						postParamStr += "&";
					}
					postParamStr += name + "=" + value;
				}
				localStorage.setItem("XTPARAM", postParamStr);
				oriSubmit.apply(this);
			};
		}
	}
	
}

var ready = function(){
	postParam();
};

if(document.readyState == 'complete' ) ready();
else if(document.addEventListener) {
	ready();
}
else document.attachEvent('onreadystatechange', function() { 
	if(document.readyState === 'complete') ready();
});



