/**
 * Login Helper
 * @author knkim@kakao.com
 */
Thub.LoginHelper = (function() {

    var SUCCESS_CODE = 200;

    /**
     * 로그인
     * @param redirectUrl
     * @returns {*}
     */
    var login = function(redirectUrl) {
        var request = new XMLHttpRequest();

        if ( !redirectUrl ) {
            redirectUrl = location.href;
        }

        var defaultUrl = '/tid/login.do';
        var url = redirectUrl ? (defaultUrl + '?redirectUrl=' + redirectUrl) : defaultUrl;
		url = url.replace("&amp;","andcodeyk").replace("&","andcodeyk");
		
		
        request.open('GET', url, false);
        request.send(null);

        if (request.status === SUCCESS_CODE) {
            var result = JSON.parse(request.responseText);
            if ( result.responseCode == 'OK' ) {
                location.href = result.responseData;
            }
        } else {
            alert('T-ID LOGIN에 실패했습니다. 관리자에게 문의바랍니다.');
            location.href = "/";
        }
    }

    /**
     * 로그아웃
     * @returns {*}
     */
    var logout = function() {
        var request = new XMLHttpRequest();
        request.open('GET', '/tid/logout.do' , false);
        request.send(null);

        if (request.status === SUCCESS_CODE) {
            var result = JSON.parse(request.responseText);
            if ( result.responseCode == 'OK' ) {
				var agent = navigator.userAgent.toLowerCase();
				if(agent.indexOf('devoceanapp') > -1){
					var json = new Object();
					json.function = "app_logout";
					window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
				}
				location.href = result.responseData;
				
                
            }
        } else {
            alert('T-ID LOGOUT에 실패했습니다. 관리자에게 문의바랍니다.');
            location.href = "/";
        }
    }

    /**
     * 로그인 체크
     * @param loggedCallback 로그인 시 callback
     * @param unloggedCallback 로그아웃 시 callback
     * @returns {string|boolean}
     */
    var isLogged = function(loggedCallback, unloggedCallback) {
        var request = new XMLHttpRequest();
        request.open('POST', '/tid/loginCheck.do' , false);
        request.send(null);

        if (request.status === SUCCESS_CODE) {
            var result = JSON.parse(request.responseText);
            if ( result == true ) {
                if ( typeof loggedCallback == 'function') {
                    loggedCallback();
                    return true;
                }
            } else {
                if ( typeof unloggedCallback == 'function') {
                    unloggedCallback();
                    return false;
                }
            }
            return request.responseText;
        }

        return false;
    }

    var temp = function() {
        var request = new XMLHttpRequest();
        request.open('GET', '/tid/login.do' , false);
        request.send(null);

        if (request.status === SUCCESS_CODE) {
            var result = JSON.parse(request.responseText);
            if ( result.responseCode == 'OK' ) {
                location.href = result.responseData;
            }
        } else {
            alert('T-ID LOGIN에 실패했습니다. 관리자에게 문의바랍니다.');
            location.href = "/";
        }
    }

    return {
        login: login,
        logout: logout,
        isLogged: isLogged,
        temp: temp
    }
})();