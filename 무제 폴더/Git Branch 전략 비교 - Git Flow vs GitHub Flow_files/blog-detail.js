/**
 * blog-detail.js
 * @param element
 * @constructor
 */
Thub.BlogDetailIndex = function(element) {
    this._element = element;
	this._commentHelper = Thub.CommentHelper;
	this._shareHelper = Thub.ShareHelper;
	 this._likeHelper = Thub.LikeHelper;
    this._init();
    this._bindEvent();
}

Thub.BlogDetailIndex.prototype = {

    /**
     * 초기 세팅
     * @private
     */
    _init: function() {
        this._setSlide();
    },

    /**
     * 버튼 이벤트 바인딩
     * @private
     */
    _bindEvent: function () {
		//this._element.on('click', '.comment', $.proxy(this._goComment, this)); // 댓글 화면 보기 이벤트
		this._element.on('click', '.view-sns .facebook', $.proxy(this._shareFacebook, this)); // 페이스북 공유
        this._element.on('click', '.view-sns .twitter', $.proxy(this._shareTwitter, this)); // 트위터 공유
        this._element.on('click', '.view-sns .kakao', $.proxy(this._shareKakao, this)); // 카카오톡 공유
        this._element.on('click', '.view-sns .link', $.proxy(this._copyLink, this)); // 링크 공유
        this._element.on('click', '.favorite', $.proxy(this._goLike, this)); // 좋아요 클릭 이벤트
        this._element.on('click', '.preBlog', $.proxy(this._goPreBlog, this)); // 이전글  클릭 이벤트
        this._element.on('click', '.nextBlog', $.proxy(this._goNextBlog, this)); // 다음글 클릭 이벤트
		this._element.on('click', '.vlog_banner', $.proxy(this._goBanner, this)); // 강의오픈/개설 신청
        
    },

    /**
     * Slide 초기화
     * @private
     */
    _setSlide: function() {
    	var liNum = $('#swiper002 > ul > li').length > 3 ? 3 : $('#swiper002 > ul > li').length;
        var Slide = new Swiper('#swiper002', {
            speed : 400,
            // simulateTouch : false,
            loop : true,
            autoplay : {
                delay : 8000,
                disableOnInteraction : false,
            },
            navigation : {
                prevEl : '.page-area .prev',
                nextEl : '.page-area .next',
            },
            slidesPerView: liNum,
            spaceBetween: 30,
            breakpoints: {
                375: {
                    slidesPerView: 2,
                    spaceBetween:20,
                    slidesPerView:'auto'
                },
                580: {
                    slidesPerView: 2,
                    spaceBetween:20,
                    slidesPerView:'auto'
                },
                768: {
                slidesPerView: 2,
                spaceBetween: 20,
                },
                1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                },
            }
        });
	},
	
	_goComment: function(element) {
        var $target = $(element.currentTarget);

        var boardId = $target.data('board-id');
        var boardType = BOARD_COMMENT_TYPE.BLOG; // B.Log 전용
        this._commentHelper.openCommentLayer(boardId, boardType);
	},
	
	 /**
     * 페이스북 공유
     * @param element
     * @private
     */
    _shareFacebook: function(element) {
        var $target = $(element.currentTarget);
        var boardId = $target.data('board-id');
        if (boardId) {
        	var url = location.origin + location.pathname + '?ID=' + boardId
        	this._shareHelper.openFacebookShare(url);
        } else {
            console.log('ID 값을 확인해주세요. ' + boardId);
        }
    },

    /**
     * 트위터 공유
     * @param element
     * @private
     */
    _shareTwitter: function(element) {
    	var $target = $(element.currentTarget);
        var boardId = $target.data('board-id');
        if (boardId) {
        	var url = location.origin + location.pathname + '?ID=' + boardId
        	this._shareHelper.openTwitterShare(url);
        } else {
            console.log('ID 값을 확인해주세요. ' + boardId);
        }
    },

    /**
     * 카카오톡 공유
     * @param element
     * @private
     */
    _shareKakao: function(element) {
        var options = this._getShareData();
        this._shareHelper.openKakaoShare(options);
    },

    /**
     * 링크 복사
     * @private
     */
    _copyLink: function(element) {
    	var $target = $(element.currentTarget);
        var boardId = $target.data('board-id');
        if (boardId) {
        	var url = location.origin + location.pathname + '?ID=' + boardId;
			//var url = "https://skdevocean.page.link?apn=com.sktelecom.devocean&ibi=com.sktelecom.devocean&isi=1632168032&ius=devocean&ofl=https://devocean.sk.com/blog/techBoardDetail.do?ID="+boardId+"&link=https://skdevocean.page.link/blog?id="+boardId;
			this._shareHelper.copyClipboardLink(url, true);
        } else {
            console.log('ID 값을 확인해주세요. ' + boardId);
        }
        
	},
	
	 _getShareData: function() {
        var $target = this._element.find('form[id="shareForm"]');
		var thumnailUrl = location.protocol + '//' + location.hostname + $target.find('input[name="thumnailUrl"]').val(); // 섬네일 이미지 조합
        return {
            'title': $target.find('input[name="title"]').val(),
            'content': $target.find('input[name="content"]').val(),
            'thumnailUrl': thumnailUrl,
            'linkUrl': location.href,
        };
    },

    _goLike: function(element) {
        var $target = $(element.currentTarget);

        var boardId = $target.data('board-id'); // 게시글 번호
        var userId = $target.data('board-user-id'); // 사용자 아이디
        var likeYn = $target.hasClass('on') ? 'N' : 'Y'; // on class 로 구분지음
        var boardLikeType = BOARD_LIKE_TYPE.BLOG;

        this._likeHelper.setLike(likeYn, boardId, userId, boardLikeType, $target);
    },

    _goPreBlog: function(element) {
        var menuName = window.location.pathname.split('/')[1];
        var url = '' ;
        if(menuName == 'blog') {
            url = '/blog/techBoardDetail.do' ;
        } else if(menuName == 'opensource') {
            url = '/opensource/techBoardDetail.do' ;
        } else if(menuName == 'experts') {
            url = '/experts/techBoardDetail.do' ;
        } else if(menuName == 'common') {
            url = '/search/techBoardDetail.do' ;
        } else if(menuName == 'community'){
			url = '/community/detail.do';
		}
        var $target = $(element.currentTarget);
        var boardId = $target.data('id');
		var viewId = $target.data('viewid');
		var boardType = $target.data('board-type');
        //var curIdList = $('#idList').val().substr(1).slice(0,-1).split(', ');
        //var curSeq = _getBlogIdSeq(boardId,curIdList);
        if(viewId == 0) {
            alert("이전 글이 존재하지 않습니다.");
        } else {
            $('#goForm').get(0).ID.value = viewId;
			$('#goForm').get(0).boardType.value = boardType;
            $('#goForm').attr("action",url);
            $('#goForm').attr("method",'GET');
            $('#goForm').submit();
        }
    },

    _goNextBlog: function(element) {
        var menuName = window.location.pathname.split('/')[1];
        var url = '' ;
        if(menuName == 'blog') {
            url = '/blog/techBoardDetail.do' ;
        } else if(menuName == 'opensource') {
            url = '/opensource/techBoardDetail.do' ;
        } else if(menuName == 'experts') {
            url = '/experts/techBoardDetail.do' ;
        } else if(menuName == 'common') {
            url = '/search/techBoardDetail.do' ;
        } else if(menuName == 'community'){
			url = '/community/detail.do';
		}
        var $target = $(element.currentTarget);
        var boardId = $target.data('id');
		var viewId = $target.data('viewid');
		var boardType = $target.data('board-type');
        //var curIdList = $('#idList').val().substr(1).slice(0,-1).split(', ');
        //var curSeq = _getBlogIdSeq(boardId,curIdList);
        if(viewId == 0) {
            alert("다음 글이 존재하지 않습니다.");
        } else {
            $('#goForm').get(0).ID.value = viewId;
			$('#goForm').get(0).boardType.value = boardType;
            $('#goForm').attr("action",url);
            $('#goForm').attr("method",'GET');
            $('#goForm').submit();
        }
    },
	/**
     * 강의 오픈/개설 신청 팝업
     * @param element
     * @private
     */
    _goBanner: function(element) {
        var $layerPopup = $('#vlog-banner');
        var $popupClose = $('.bg');

        $layerPopup.addClass('on');
        $popupClose.on('click', function() {
            $layerPopup.removeClass('on');
        });

        $layerPopup.on('click', '.popup-submit', $.proxy(this._popupBannerSubmit, this));
        $layerPopup.on('click', '.popup-cancel', $.proxy(this._popupBannerCancel, this));
    },

    /**
     * 강의 오픈/개설 신청 확인 버튼 클릭 이벤트
     * @private
     */
    _popupBannerSubmit: function(element) {
        var $layerPopup = $('#vlog-banner');

        var comment = $layerPopup.find('textarea[name="comment"]').val();
        var email = $layerPopup.find('input[name="senderEmail"]').val();
        var videoUrl = $layerPopup.find('input[name="vUrl"]').val();

        if ( !Thub.CheckerHelper.isEmpty(comment) ) {
            alert('강의 내용을 입력해주세요.');
            return;
        }

        if ( !Thub.CheckerHelper.isEmpty(email) ) {
            alert('이메일을 입력해주세요.');
            return;
        }

        if ( !Thub.CheckerHelper.isEmail(email) ) {
            alert('이메일 형식이 잘못됐습니다. 이메일 형식을 다시한번 확인해주세요.');
            return;
        }

        if ( !Thub.CheckerHelper.isStringEmpty(videoUrl) ) {
            alert('동영상 URL 주소를 입력해주세요.');
            return;
        }

        $.ajax({
            url: '/vlog/lecture/request.json',
            data: $('#lectureForm').serialize(),
            type: 'POST',
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                if ( result == 'true' || result == true ) {
                    alert('담당자에게 강의 오픈/개설 신청에 대한 요청을 신청했습니다.');
                    location.reload();
                } else {
                    alert('이메일 전송에 실패했습니다. 담당자에게 문의바랍니다.');
                }
            }
        });
    },

    /**
     * 강의 오픈/개설 신청 취소 버튼 클릭 이벤트
     * @private
     */
    _popupBannerCancel: function(element) {
        var $layerPopup = $('#vlog-banner');
        $layerPopup.removeClass('on');
    },
}

function goDataCheck(id){
	
	var returnStr = '';
	var goCheckUrl = '/blog/techBlogDataCheck.do';
	$.ajax({
		url:goCheckUrl,
		type:"post",
		cache:false,
		async:false,
		dataType:"json",
		data:{				
				"ID":id				
			 },					 		
		success:function(data){						
			returnStr = data.returnData;
		},
		error:function(request,status,error){
			 alert(request,status,error);
		}
		
	});
	
	return returnStr ;
}

function goList(Id){
	var menuName = window.location.pathname.split('/')[1];
	if(menuName == 'opensource') {
		location.href="/opensource/index.do" ;
	} else if(menuName == 'blog') {
		if($("#techType").val()){
			location.href="/blog/index.do?techType="+$("#techType").val();
		}else{
			location.href="/blog/index.do";
		}
	} else if(menuName == 'experts') {
		$('#goForm').get(0).ID.value = Id;
		$('#goForm').attr("action",'/experts/view.do');
		$('#goForm').attr("method",'GET');
		$('#goForm').submit();
	} else if(menuName == 'search') {
		location.href="/common/search.do?query=" + $('#query').val();
	} else if(menuName == 'community' ){
		location.href = Id;
	}
}

function _getBlogIdSeq(id,idList) {
    for(var i = 0; i< idList.length; i++) {
        if(id == idList[i]) {
            return i;
        }
    }
    return 0;
}