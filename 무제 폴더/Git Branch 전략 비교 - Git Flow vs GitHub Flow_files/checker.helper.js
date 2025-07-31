/**
 * Checker Helper
 * @author knkim@kakao.com
 */
Thub.CheckerHelper = (function() {

    /**
     *
     * @param text
     * @returns {boolean}
     */
    var isEmpty = function(text) {
        if ( !text || text == '' || text.length == 0 ) {
            return false;
        }

        return true;
    }

    /**
     *
     * @param text
     * @returns {boolean}
     */
    var isStringEmpty = function(text) {
        if ( !text || text == '' || text.length == 0 || typeof text != 'string') {
            return false;
        }

        return true;
    }

    /**
     * 이메일 검사
     * @param text
     * @returns {boolean}
     */
    var isEmail = function(text) {
        var regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        return regex.test(text);
    }

    /**
     * 휴대전화 검사
     * @param text
     */
    var isPhonenumber = function(text) {
        var regex = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;
        return regex.test(text);
    }

    /**
     * 숫자 검사
     * @param text
     * @returns {boolean}
     */
    var isNumber = function(text) {
        var regex = /^\d+$/;
        return regex.test(text);
    }

    return {
        isEmpty: isEmpty,
        isStringEmpty: isStringEmpty,
        isEmail: isEmail,
        isPhonenumber: isPhonenumber,
        isNumber: isNumber,
    }
})();