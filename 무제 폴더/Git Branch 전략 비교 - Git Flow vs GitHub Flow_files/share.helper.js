/**
 * Share Helper
 * @author knkim@kakao.com
 */
Thub.ShareHelper = (function() {
    
    var SHARE_TWITTER_URL = 'http://twitter.com/share?url=';
    var SHARE_FACEBOOK_URL = 'https://www.facebook.com/sharer/sharer.php?u=';
    
    /**
     * 카카오톡 공유
     * @param options에 대한 정의 (아래 내용참고)
     * {
     *     title: 'Title 입니다', // 카카오톡 공유 타이틀 (Required)
     *     content: 'description 입니다', // 카카오톡 공유 본문 (Required)
     *     thumnailUrl: 'http://dev-stg.sktelecom.com//resource/images/external/vlog/img_vlog_tech02.png', // 섬네일 이미지 URL (Required)
     *     linkUrl: 'http://dev-stg.sktelecom.com//blog/techBoardDetail.do?ID=70', // 카카오톡 공유 컨텐츠에 대한 Redirect URL (Required)
     *     social: { // (Optional)
     *          likeCount: 300, // 좋아요 개수
     *          commentCount: 47 // 커멘트 개수
     *     }
     * }
     */
    var openKakaoShare = function(options) {
        if ( !options.title || !options.content || !options.thumnailUrl || !options.linkUrl ) {
            console.error('KakaoTalk Share options의 Required값을 확인해주세요.');
            console.error(options);
            return;
        }
		var link = options.linkUrl.split("&idList=")[0];
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: options.title,
                description: '',
                imageUrl: options.thumnailUrl,
                link: {
                    //mobileWebUrl: options.linkUrl,
					mobileWebUrl: link,
                    webUrl: link
					//androidExecutionParams: options.linkUrl,
					//iosExecutionParams: options.linkUrl
                }
            },
            // social: options.social,
        })
    }

    /**
     * Facebook 공유
     * @param options
     * {
     *     title: 'Title 입니다', // 페이스북 공유 타이틀 (Required)
     *     content: 'description 입니다', // 페이스북 공유 본문 (Required)
     *     thumnailUrl: 'http://dev-stg.sktelecom.com//resource/images/external/vlog/img_vlog_tech02.png', // 섬네일 이미지 URL (Required)
     *     linkUrl: 'http://dev-stg.sktelecom.com//blog/techBoardDetail.do?ID=70' // 페이스북 공유 컨텐츠에 대한 Redirect URL (Required)
     * }
     */
    var openFacebookShare = function() {
    	var shareURL = encodeURIComponent($.trim($('meta[property="og:url"]').attr("content")));
        var url = SHARE_FACEBOOK_URL + shareURL;

        window.open(url,"_blank", _getPopupOption(500, 500));
    }

    /**
     * Twitter 공유
     * @param options
     */
    var openTwitterShare = function() {
    	var shareURL = encodeURIComponent($.trim($('meta[name="twitter:url"]').attr("content")));
    	var text = encodeURIComponent($.trim($('meta[name="twitter:title"]').attr("content")));

        var url = SHARE_TWITTER_URL + shareURL + '&text=' + text;
        window.open(url,"_blank", _getPopupOption(500, 500));
    }

    /**
     * 클립보드 복
     * @param link
     * @param isAlert
     */
    var copyClipboardLink = function(link, isAlert) {
        var temp = document.createElement('input');
        document.body.appendChild(temp);
        temp.value = link
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);

        if ( isAlert ) {
            alert('클립보드에 URL이 복사 되었습니다.');
        }
    }

    /**
     * 팝업를 가로 세로 가운데 정렬 옵션 리턴
     * @returns {string}
     * @private
     */
    var _getPopupOption = function(width, height) {
        var top = (window.innerHeight - height) / 2 + screenY;
        var left = (window.innerWidth - width) / 2 + screenX;

        var spec = 'status=no, menubar=no, toolbar=no, resizable=no';
        spec += ', width=' + width + ', height=' + height;
        spec += ', top=' + top + ', left=' + left;
        return spec;
    }

    var initShare = function(options) {
        $('meta[property="og\\:title"]').attr('content', options.title);
        $('meta[property="og\\:description"]').attr('content', options.content);
        $('meta[property="og\\:image"]').attr('content', options.thumnailUrl);
        $('meta[property="og\\:url"]').attr('content', options.linkUrl);

        $('meta[property="twitter\\:title"]').attr('content', options.title);
        $('meta[property="twitter\\:description"]').attr('content', options.content);
        $('meta[property="twitter\\:image"]').attr('content', options.thumnailUrl);
        $('meta[property="twitter\\:site"]').attr('content', options.linkUrl);
    }

    return {
        openKakaoShare: openKakaoShare,
        openFacebookShare: openFacebookShare,
        openTwitterShare: openTwitterShare,
        copyClipboardLink: copyClipboardLink,
        initShare: initShare
    }
})();

Thub.ShareHelperInit = (function() {
    var KAKAO_SERVICE_KEY = 'a10b1b272365008093ec1028f476c830';

    var init = function() {
        Kakao.init(KAKAO_SERVICE_KEY);
    }
    return {
        init: init
    }
})();