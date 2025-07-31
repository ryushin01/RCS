/**
 * Hbs Helper
 * @author knkim@kakao.com
 */
Thub.HbsHelper = (function() {

    /**
     * Hbs 기능 초기
     */
    var eventInit = function() {
        _ifelse();
        _eq();
        _isNull();
        _isNotNull();
        _toEnter();
    }

    /**
     * HBS if-else 조건 사용 함수
     *
     * how to use?
     *
     *  {{#compare v1 v2}}
     *    {{v1}} is equal to {{v2}}
     *  {{else}}
     *    {{v1}} is not equal to {{v2}}
     *  {{/compare}}
     */

    var _ifelse = function () {
        Handlebars.registerHelper('compare', function(compare1, compare2, options) {
            if ( compare1 == compare2 ) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    }

    /**
     * if-elseif 를 사용하기 위해
     * @private
     */
    var _eq = function() {
        Handlebars.registerHelper('eq', function () {
            const args = Array.prototype.slice.call(arguments, 0, -1);
            return args.every(function (expression) {
                return args[0] === expression;
            });
        });
    }

    var _isNull = function() {
        Handlebars.registerHelper('isNull', function (data, options) {
            if ( data == null ) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    }

    var _isNotNull = function() {
        Handlebars.registerHelper('isNotNull', function (data, options) {
            if ( data != null ) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    }

    /**
     * textarea 에서 enter를 처리
     * @private
     */
    var _toEnter = function() {
        Handlebars.registerHelper('toEnter', function(text) {
            return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
        });
    }

    /**
     * Hbs 파일 load
     */
    var getHbs = function(hbsFileName) {
        var SUCCESS_CODE = 200;

        var request = new XMLHttpRequest();
        request.open('GET', '/resource/hbs/' + hbsFileName , false);
        request.send(null);

        if (request.status === SUCCESS_CODE) {
            return request.responseText;
        }

        return null;
    }

    return {
        eventInit: eventInit,
        getHbs: getHbs

    }

})();