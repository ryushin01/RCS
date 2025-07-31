/**
 * Browser Helper
 * @author knkim@kakao.com
 */
Thub.BrowserHelper = (function() {

    /**
     * 접속한 장비에 대한 정보를 얻어옴.
     * @returns {string}
     */
    var getDevice = function() {
        var browserName = undefined;
        var userAgent = navigator.userAgent.toLowerCase();

        switch (true) {
            case /iphone/.test(userAgent):
                browserName = 'ios';
                break;
            case /android/.test(userAgent):
                browserName = 'android';
                break;
            case /naver/.test(userAgent):
                browserName = 'naver';
                break;
            case /msie 6/.test(userAgent):
                browserName = 'ie6';
                break;
            case /msie 7/.test(userAgent):
                browserName = 'ie7';
                break;
            case /msie 8/.test(userAgent):
                browserName = 'ie8';
                break;
            case /msie 9/.test(userAgent):
                browserName = 'ie9';
                break;
            case /msie 10/.test(userAgent):
                browserName = 'ie10';
                break;
            case /edge/.test(userAgent):
                browserName = 'edge';
                break;
            case /chrome/.test(userAgent):
                browserName = 'chrome';
                break;
            case /safari/.test(userAgent):
                browserName = 'safari';
                break;
            case /firefox/.test(userAgent):
                browserName = 'firefox';
                break;
            case /opera/.test(userAgent):
                browserName = 'opera';
                break;
            case /mac/.test(userAgent):
                browserName = 'mac';
                break;
            default:
                browserName = 'unknown';
        }
        return browserName;
    }

    return {
        getDevice: getDevice
    }

})();