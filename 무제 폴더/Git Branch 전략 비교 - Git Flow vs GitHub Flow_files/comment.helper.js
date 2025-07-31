/**
 * Comment Helper
 * @author knkim@kakao.com
 */
Thub.CommentHelper = (function() {

    var _totalCommentCount = 0; // 총 댓글의 개수

    /**
     * 댓글
     * @param id
     */
    var openCommentLayer = function(boardId, boardType, boardTitle, masterRealId) {
        if ( !boardId || !boardType ) {
            return;
        }

        $('.sub-sec-side').empty('');

        var $comment = $('.sub-sec-side');
        var hbsHtml = Thub.HbsHelper.getHbs('comment.hbs');
        var template = Handlebars.compile(hbsHtml);

        $.ajax({
            url: '/common/comment/list.json',
            data: {
                'boardId': boardId,
                'boardType': boardType
            },
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                var list = _initReplyTotalCount(result); // 댓글 및 대댓글의 개수를 초기화함
                _totalCommentCount = _initTotalCount(result); // 총 댓글의 개수를 초기화함

                var data = {
                    'boardId': boardId,
                    'boardType': boardType,
                    'boardTitle': boardTitle,
                    'list': list,
                    'totalComment': _totalCommentCount,
                    'mentoYn': result.mento,
                    'tidInfo': result.tidInfo,
					'masterRealId':masterRealId
                }

                var html = template(data);
                $comment.append(html);

                _layerConfig();
            }
        });
    };

	var setCommentLayer = function(boardId, boardType, boardTitle, masterRealId) {
        if ( !boardId || !boardType ) {
            return;
        }

        $('.sub-sec-side').empty('');

        var $comment = $('.sub-sec-side');
        var hbsHtml = Thub.HbsHelper.getHbs('comment.hbs');
        var template = Handlebars.compile(hbsHtml);

        $.ajax({
            url: '/common/comment/list.json',
            data: {
                'boardId': boardId,
                'boardType': boardType
            },
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                var list = _initReplyTotalCount(result); // 댓글 및 대댓글의 개수를 초기화함
                _totalCommentCount = _initTotalCount(result); // 총 댓글의 개수를 초기화함

                var data = {
                    'boardId': boardId,
                    'boardType': boardType,
                    'boardTitle': boardTitle,
                    'list': list,
                    'totalComment': _totalCommentCount,
                    'mentoYn': result.mento,
                    'tidInfo': result.tidInfo,
					'masterRealId':masterRealId
                }

                var html = template(data);
                $comment.append(html);

                _layerConfig2();
            }
        });
    };
    /**
     * Comment 레이어에 대한 설정
     * @private
     */
    var _layerConfig = function() {
        $('.dim').toggleClass('on');
        $('.sub-sec-side').toggleClass('on');

        $('.sec-comment-top textarea[name="content"]').on('click', $.proxy(_loginChecker, this)); // Login 체크
        $('.sub-sec-side .close').on('click', $.proxy(_closeLayer, this)); // 팝업 닫

        $('.sec-comment-top .reg-button').on('click', $.proxy(_goRegist, this)); // comment 등록 이벤트 바인딩
        $('.comment-top .delete-button').on('click', $.proxy(_goDelete, this)); // comment 삭제 이벤트 바인딩
        $('.comment-bottom .replay-button').on('click', $.proxy(_goReplay, this)); // comment 대댓글 이벤트 바인딩
        $('.comment-bottom .favorites').on('click', $.proxy(_goLike, this)); // comment 좋아요(하트) 이벤트 바인딩

		$('.replay-report').on('click', $.proxy(_openReportLayer, this)); // 댓글 신고하기 팝업 이벤트 바인딩
		$('.replay-report').click(function(){
			$(".sub-sec-side").css("z-index", "9")
		})
		$('.changeViewYn').on('click', $.proxy(_goComment2, this));
		const urlParams = new URL(location.href).searchParams;
    	const openCommentYn = urlParams.get('openCommentYn');
    	const mentoYn = urlParams.get('mentoYn');
		var nowpathname = window.location.pathname;
    	if(nowpathname == '/experts/view.do'){
			if(openCommentYn == 'Y'){
	    		if(mentoYn == 'Y'){
	    			$('input.changeViewYn').click();
	    		}
	    	}
		}
    	
    }
	var _layerConfig2 = function() {
        //$('.dim').toggleClass('on');
        //$('.sub-sec-side').toggleClass('on');

        $('.sec-comment-top textarea[name="content"]').on('click', $.proxy(_loginChecker, this)); // Login 체크
        $('.sub-sec-side .close').on('click', $.proxy(_closeLayer, this)); // 팝업 닫

        $('.sec-comment-top .reg-button').on('click', $.proxy(_goRegist, this)); // comment 등록 이벤트 바인딩
        $('.comment-top .delete-button').on('click', $.proxy(_goDelete, this)); // comment 삭제 이벤트 바인딩
        $('.comment-bottom .replay-button').on('click', $.proxy(_goReplay, this)); // comment 대댓글 이벤트 바인딩
        $('.comment-bottom .favorites').on('click', $.proxy(_goLike, this)); // comment 좋아요(하트) 이벤트 바인딩

		$('.replay-report').on('click', $.proxy(_openReportLayer, this)); // 댓글 신고하기 팝업 이벤트 바인딩
		$('.replay-report').click(function(){
			$(".sub-sec-side").css("z-index", "9")
		})
		$('.changeViewYn').on('click', $.proxy(_goComment2, this));
    }

	var _goComment2 = function(element){
	        var $target = $(element.currentTarget);
	        var masterId = $target.data('masterid');
	        var type = $target.data('btn');
			var name = $target.data('name');
			var masterRealId = $target.data('masterrealid');
	        var boardType = '';
	        if(type == 'EXPERTS_MENTO') {
	            boardType = BOARD_COMMENT_TYPE.EXPERTS_QNA;
	        } else if(type == 'EXPERTS_QNA') {
	            boardType = BOARD_COMMENT_TYPE.EXPERTS_MENTO;
	        }
	        setCommentLayer(masterId, boardType, name, masterRealId);
	}

    /**
     * Login 체크
     * @private
     */
    var _loginChecker = function(element) {
        var $target = $(element.currentTarget);
        var userId = $target.data('board-user-id');
        if ( !userId ) {
			var agent = navigator.userAgent.toLowerCase();
			if(agent.indexOf('devoceanapp') > -1){
				var json = new Object();
				json.function = "login_question";
				window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
			}else{
				var isLogin = confirm('로그인이 필요한 서비스입니다. 로그인을 하시겠습니까?');
				if ( isLogin ){
					$('.dim').toggleClass('on');
        			$('.sub-sec-side').toggleClass('on');
					$(".sns-login").trigger("click");
				}else{
					$target.blur();
				}
			}
        }
    }

    /**
     * Comment 등록 이벤트
     * @param element
     * @private
     */
    var _goRegist = function(element) {
        var $target = $(element.currentTarget);

        var boardId = $target.data('board-id');
        var boardType = $target.data('board-type');
        var userId = $target.data('board-user-id');
        var commentParentId = $target.data('board-comment-parent-id');
        var targetUrl = location.pathname + location.search;
		var masterRealId = $target.data('master-real-id');
		if(masterRealId != null && masterRealId != ''){
			targetUrl = '/experts/view.do?ID='+masterRealId;
		}
		if(boardType == 'EXPERTS_QNA'){
			targetUrl += '&openCommentYn=Y&mentoYn=N';
		}else if(boardType == 'EXPERTS_MENTO'){
			targetUrl += '&openCommentYn=Y&mentoYn=Y';
		}
        var content = $target.parent().parent().find('textarea').val(); // 상위 textarea 의 값을 찾음. (대댓글 대응)
        if ( content == '' ) {
            alert('내용을 입력해주세요.');
            return;
        }

        $.ajax({
            url: '/common/comment/insert.json',
            data: {
                'boardId': boardId,
                'boardType': boardType,
                'content': content,
                'userId': userId,
                'commentParentId': commentParentId,
                'targetUrl': targetUrl,
            },
            dataType: 'json',
			type:'post',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                $target.parent().parent().find('textarea').val(''); // textarea clear
                var data = {
                    'data': result.data,
                    'tidInfo': result.tidInfo
                }

                if ( commentParentId ) { // 대 댓글을 작성 할 때
                    var hbsHtml = Thub.HbsHelper.getHbs('comment-re-reply.hbs');
                    var template = Handlebars.compile(hbsHtml);
                    var html = template(data);

                    var $appendLi = $('ul.sec-comment-list').find('[data-comment-id=' + commentParentId + ']');
                    $appendLi.find('.replay-button').removeClass('on');
                    $appendLi.find('.comment-reply').remove();

                    // 대댓글 시 댓글의 카운터를 증가시킴.
                    var $comment = $appendLi.find('.comment');
                    var commentCount = $comment.text();
                    commentCount++;
                    $comment.text(commentCount);

                    $appendLi.after(html);

                    var $eventLi = $('ul.sec-comment-list').find('[data-comment-id=' + result.data.commentId + ']');
                    $eventLi.find('.delete-button').on('click', $.proxy(_goDelete, this)); // 삭제 이벤트 바인딩
                    $eventLi.find('.favorites').on('click', $.proxy(_goLike, this)); // 좋아요 이벤트 바인딩

                } else { // 대댓글이 아닌 일반 댓글을 달 때
                    var hbsHtml = Thub.HbsHelper.getHbs('comment-reply.hbs');
                    var template = Handlebars.compile(hbsHtml);
                    var html = template(data);

                    $('.sub-sec-side.on ul.sec-comment-list').prepend(html);

                    var $appendLi = $('ul.sec-comment-list').find('[data-comment-id=' + result.data.commentId + ']');
                    $appendLi.find('.replay-button').on('click', $.proxy(_goReplay, this)); // 댓글 이벤트 바인딩
                    $appendLi.find('.delete-button').on('click', $.proxy(_goDelete, this)); // 삭제 이벤트 바인딩
                    $appendLi.find('.favorites').on('click', $.proxy(_goLike, this)); // 좋아요 이벤트 바인딩
                }

                // 댓글을 추가할때마다 총 커멘트 개수를 증가
                _totalCommentCount++
                $('.total-comment').text(_totalCommentCount);

            }
        });
    };

    /**
     * Comment 삭제 이벤트
     * @param element
     * @private
     */
    var _goDelete = function(element) {
        var $target = $(element.currentTarget);

        var commentId = $target.data('board-comment-id');
        var boardType = $target.data('board-type');
        var userId = $target.data('board-user-id');

        if ( !confirm('해당 댓글을 삭제하시겠습니까?') ) {
            return;
        }

        $.ajax({
            url: '/common/comment/delete.json',
            data: {
                'commentId': commentId,
                'boardType': boardType,
                'userId': userId
            },
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                if ( result ) {
                    var $removeLi = $('ul.sec-comment-list').find('[data-comment-id=' + commentId + ']');
                    $removeLi.find('.comment-desc').empty();
                    $removeLi.find('.comment-desc').html('<span style="color: #666666;">삭제된 댓글입니다.</span>');

                    $removeLi.find('.comment-bottom').remove();
                    $removeLi.find('.delete-button').remove();
                }
            }
        });
    };

    /**
     * Comment 대댓글 이벤트
     * @param element
     * @private
     */
    var _goReplay = function(element) {
        var $target = $(element.currentTarget);

        var boardId = $target.data('board-id');
        var boardType = $target.data('board-type');
        var userId = $target.data('board-user-id');
        var commentParentId = $target.data('board-comment-parent-id');

        var $appendLi = $('ul.sec-comment-list').find('[data-comment-id=' + commentParentId + ']');

        if ( $target.hasClass('on') ) {
            $target.removeClass('on');
            $appendLi.find('.comment-reply').remove();
        } else {
            $target.addClass('on');

            var data = {
                'boardId': boardId,
                'boardType': boardType,
                'userId': userId,
                'commentParentId': commentParentId,
            };
            var hbsHtml = Thub.HbsHelper.getHbs('comment-reply-area.hbs');
            var template = Handlebars.compile(hbsHtml);
            var html = template(data);

            $appendLi.append(html);
            $appendLi.find('.re-replay-button').on('click', $.proxy(_goRegist, this));
        }
    };

    /**
     * 댓글 좋아요
     * @param element
     * @private
     */
    var _goLike = function (element) {
        var $target = $(element.currentTarget);
        var boardId = $target.data('board-id');
        var userId = $target.data('board-user-id'); // 사용자 아이디
        var likeYn = $target.hasClass('on') ? 'N' : 'Y'; // on class 로 구분지음
        var boardLikeType = BOARD_LIKE_TYPE.COMMENT; // V.Log 전용

        Thub.LikeHelper.setLike(likeYn, boardId, userId, boardLikeType, $target);
    };

    /**
     * 댓글의 개수 (댓글 및 대댓글)을 구함
     * @param result
     * @private
     */
    var _initTotalCount = function(result) {
        // 총 댓글의 개수를 얻음
        return _.reduce(result.data, function(num, item) {
            num += 1; // 객체 1개
            if ( item.childs.length !== 0 ) { // 객체안의 자식 객체의 개수를 더함
                num += item.childs.length;
            }
            return num;
        }, 0);
    }

    /**
     * 댓글 및 대댓글의 개수를 구
     * @param result
     * @returns {*}
     * @private
     */
    var _initReplyTotalCount = function(result) {
        return _.reduce(result.data, function(arr, item) {
            arr.push(Object.assign(item, {
                'commentCount': item.childs.length // childs의 length만큼 댓글의 개수를 지정
            }));

            return arr;
        }, []);
    }

    /**
     * 레이어 닫기
     * @param isShow
     * @private
     */
    var _closeLayer = function(element) {
        $('.dim').removeClass('on');
        $('.sub-sec-side').removeClass('on');
    }



	/**
     * 댓글 신고 팝업 띄우기 이벤트
     * @param element
     * @private
     */
    var _openReportLayer = function(element) {
        var $target = $(element.currentTarget);
		$('.dim').removeClass('on');
		$(".pop-wrap.report").addClass("on");
        var commentId = $target.data('comment-reply-id');
        var type = $target.data('type');

        $.ajax({
		  url : "/report/selectReportCdList.do",
		  type : "post",
		  dataType:"json",
		  enctype: 'multipart/form-data',
		  processData: false,
		  contentType: false,
		  data:{id:"id"},
		  success:function(data){
				var list = data.reportCdList;
				var htmltxt = '';
				htmltxt += '<option value="">선택</option>';
				for(var i = 0; i < list.length; i++){
					htmltxt += '<option value="'+list[i].cdVal+'">'+list[i].cdNm+'</option>';
				}
				$("#reportSelect").html(htmltxt);
				$("#reportConfirmBtn").attr('data-comment-id', commentId);
				$("#reportConfirmBtn").attr('data-type', type);
				$(".pop-wrap.report .popup-close, .pop-wrap.report .close").attr('data-type', type);
			},error:function(request,status,error){
				alert("신고하기에 오류가 발생하였습니다.");
			}
	  	})
    };

    return {
        openCommentLayer: openCommentLayer
    }

}())