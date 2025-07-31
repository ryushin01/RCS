var Thub = Thub || {};
var ENV_TYPE = '';

$(function() {
    new Thub.Header($('.header'));
    new Thub.Footer($('.footer'));
    new Thub.ShareHelperInit.init();
    new Thub.HbsHelper.eventInit();

    if ( ENV_TYPE == 'live' && location.href.indexOf('http://') > -1) {
        // http:// 프로토콜로 접속하는 URL에 대해서 https:// 프로토콜로 replace
        var replaceUrl = location.href.replace('http://', 'https://');
        location.href = replaceUrl;
    }

    if ( location.hostname == 'thubgate.sktelecom.com') {
        location.href = 'https://devocean.sk.com/internal/index.do';
    }

    if ( location.hostname == 'thub.sk.com') {
        location.href = 'https://devocean.sk.com/internal/login.do';
    }
})