/**
 * Like Helper
 * @author knkim@kakao.com
 */
Thub.LikeHelper = (function() {

    /**
     * Comment 좋아요(하트) 이벤트
     * @param element
     * @private
     */
    var setLike = function(likeYn, id, loginId, likeType, $target) {
        if ( !id || !likeType ) {
            return;
        }

        if ( !_loginChecker(loginId) ) {
            return;
        }

        var targetUrl = location.pathname + location.search;

        $.ajax({
            url: '/common/like.json',
            data: {
                'likeTargetId': id,
                'likeTargetType': likeType,
                'likeYn': likeYn,
                'loginId': loginId,
                'targetUrl': targetUrl,
            },
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                if ( !result ) {
                    return;
                }

                $target.toggleClass('on');
                var likeCount = $target.text();
                if ( $target.hasClass('on') ) {
                    likeCount++;
                } else {
                    likeCount--;
                }
                $target.text(likeCount);
            }
        });
    };

    /**
     * Login 체크
     * @private
     */
    var _loginChecker = function(loginId) {
        if ( !loginId ) {
			var agent = navigator.userAgent.toLowerCase();
			if(agent.indexOf('devoceanapp') > -1){
				var json = new Object();
				json.function = "login_question";
				window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
			}else{
				var isLogin = confirm('로그인이 필요한 서비스입니다. 로그인을 하시겠습니까?');
	            if ( isLogin ) {
	                //Thub.LoginHelper.login();
					$(".sns-login").trigger("click");
	                return false;
	            } else {
	                return false;
	            }
			}
        }
        return true;
    }

    return {
        setLike: setLike
    }

}());
