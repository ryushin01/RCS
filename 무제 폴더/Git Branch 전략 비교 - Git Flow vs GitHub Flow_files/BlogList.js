Thub.BlogList = function(element) {
    this._element = element;

    this._shareHelper = Thub.ShareHelper;
    this._commentHelper = Thub.CommentHelper;
    this._likeHelper = Thub.LikeHelper;

    this._init();
    this._bindEvent();
}

Thub.BlogList.prototype = {

	 _init: function() {

	},
	
	_bindEvent: function () {
	   //this._element.on('click', '.comment', $.proxy(this._goComment, this)); // 댓글 화면 보기 이벤트
	   this._element.on('click', '.favorites', $.proxy(this._goLike, this)); // 좋아요 클릭 이벤트
		//this._element.on('click', '.vlog_banner', $.proxy(this._goBanner, this)); // 강의오픈/개설 신청
        
	},
	
	_goComment: function(element) {
        var $target = $(element.currentTarget);

        var boardId = $target.data('board-id');
        var boardTitle = $target.data('board-title');
        var boardType = '';
        if(window.location.pathname.split('/')[2] == 'vlog') {
        	boardType = BOARD_COMMENT_TYPE.VLOG;
        } else {
        	boardType = BOARD_COMMENT_TYPE.BLOG;
        }
        this._commentHelper.openCommentLayer(boardId, boardType, boardTitle);
	},
	
	_goLike: function(element) {
        var $target = $(element.currentTarget);

        var boardId = $target.data('board-id'); // 게시글 번호
        var userId = $target.data('board-user-id'); // 사용자 아이디
        var likeYn = $target.hasClass('on') ? 'N' : 'Y'; // on class 로 구분지음
        var boardLikeType = '';
        if(window.location.pathname.split('/')[2] == 'vlog') {
        	boardLikeType = BOARD_LIKE_TYPE.VLOG;
        } else {
        	boardLikeType = BOARD_LIKE_TYPE.BLOG;
        }

        this._likeHelper.setLike(likeYn, boardId, userId, boardLikeType, $target);
    },
	/**
     * 강의 오픈/개설 신청 팝업
     * @param element
     * @private
     */
    /*_goBanner: function(element) {
        var $layerPopup = $('#vlog-banner');
        var $popupClose = $('.bg');

        $layerPopup.addClass('on');
        $popupClose.on('click', function() {
            $layerPopup.removeClass('on');
        });

        $layerPopup.on('click', '.popup-submit', $.proxy(this._popupBannerSubmit, this));
        $layerPopup.on('click', '.popup-cancel', $.proxy(this._popupBannerCancel, this));
    },*/

    /**
     * 강의 오픈/개설 신청 확인 버튼 클릭 이벤트
     * @private
     */
    /*_popupBannerSubmit: function(element) {
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
            type: 'GET',
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
    },*/

    /**
     * 강의 오픈/개설 신청 취소 버튼 클릭 이벤트
     * @private
     */
    _popupBannerCancel: function(element) {
        var $layerPopup = $('#vlog-banner');
        $layerPopup.removeClass('on');
    },
}

function goDetail(element,id,e) {
	
	var menuName = window.location.pathname.split('/')[1];
	var detailName = window.location.pathname.split('/')[2];
	const urlParams = new URL(location.href).searchParams;
	const techType = urlParams.get('techType');
	//var blogList = $(element).data('list');
	var boardType= $(element).data('board-type');
	var url = '' ;
	var blankUrl = '';
	
	
	if(menuName == 'blog' || menuName == 'tech') {
		url = '/blog/techBoardDetail.do' ;
	} else if(menuName == 'opensource') {
		url = '/opensource/techBoardDetail.do' ;
	} else if(menuName == 'experts') {
		if(boardType == 'expertsStory'){
			url = '/experts/storyDetail.do';
		}else{
			url = '/experts/techBoardDetail.do' ;
		}
	} else if(menuName == 'common') {
		url = '/search/techBoardDetail.do' ;
	} else if(menuName == 'search') {
		if(detailName == 'experts') {
			url = '/experts/techBoardDetail.do';
			
		} else {
			url = '/blog/techBoardDetail.do';
		}
		
	} else if(menuName == 'community' || menuName == 'story'){
		url = '/community/detail.do';
	}
	blankUrl = url;
	
	blankUrl += '?ID=';
	blankUrl += id;
	blankUrl += '&boardType=';
	blankUrl += boardType;
	if($(element).hasClass("comment")){
		blankUrl += '&comment=Y';
	}
	//blankUrl += '&idList=';
	//blankUrl += $('#' + blogList).val();

	if($(element).data('commlist') == null || $(element).data('commlist') == undefined) {
	} else {
		if($(element).data('commlist').trim() != '') {
			//$('#goForm').get(0).searchData.value = $(element).data('commlist').trim();
			//blankUrl += '&searchData=';
			//blankUrl +=  $(element).data('commlist').trim();
		}
	}
	//$('#goForm').get(0).idList.value = $('#' + blogList).val();
	$('#goForm').get(0).ID.value = id;
	$('#goForm').get(0).boardType.value = boardType;
	if($(element).hasClass("comment")){
		$('#goForm').get(0).comment.value = 'Y';
	}
	$('#goForm').attr("action",url);
	$('#goForm').attr("method",'GET');
	
	if(e){
		
		openBlankPage(e, blankUrl, 'goForm');
		
	}else{
		$('#goForm').submit();
	}
}


function goTagList(tag) {
	var url = '';
	var mainCategory = tag.split("--")[0];
	var subCategoryNm = '#'+tag.split("--")[1];
	var subCategoryId = tag.split("--")[2];
	const urlParams = new URL(location.href).searchParams;
	const searchDataSub = urlParams.get('searchDataSub');
	if(mainCategory == 'DEVOCEAN_YOUNG'){
		url = "/community/youngList.do";
		$('#goForm').get(0).searchDataSub.value = subCategoryId;
	}else if(mainCategory == 'AI_FELLOWSHIP'){
		if(subCategoryId.indexOf("AI_FELLOWSHIP_R") > -1){
			url = "/community/aiFellowshipProject.do";
		}else if(subCategoryId == 'FellowshipActivity'){
			url = "/community/aiFellowshipNews.do";
		}else {
			url = "/community/aiFellowshipList.do";
		}
		$('#goForm').get(0).searchDataSub.value = subCategoryId;
	}else if(mainCategory == 'OPENLAB'){
		if(subCategoryId == 'openlab_1'){
			url = "/community/openLabProjectInternal.do";
		}else if(subCategoryId == 'openlab_2'){
			url = "/community/openLabProject.do";
		}else if(subCategoryId == 'DEVOCEAN_STUDY'){
			url = "/community/openLabNews.do";
		}else {
			url = "/blog/index.do";
		}
		$('#goForm').get(0).searchDataSub.value = subCategoryId;
	}else if(mainCategory == 'PROGRAM'){
		if(subCategoryNm == '#데보션 스터디' || subCategoryNm == '#DEVOCEAN STUDY'){
			url = "/blog/index.do";
			$('#goForm').get(0).techType.value = 'OPENLAB';
		}else if(subCategoryNm == '#데보션 후원행사' || subCategoryNm == '#데보션 후원 행사'){
			url = "/community/supportList.do";
		}
	}else{
		url = "/blog/index.do";
		if(subCategoryNm == '#Tech Today'){
			$('#goForm').get(0).techType.value = 'NEWS';
		}else{
			$('#goForm').get(0).techType.value = 'BLOG';
			$('#goForm').get(0).searchDataMain.value = mainCategory;
		}
		if(searchDataSub == '' || searchDataSub == null || searchDataSub == undefined || searchDataSub.indexOf('AI_FELLOWSHIP_R') > -1){
			$('#goForm').get(0).searchDataSub.value = '';
		}
	}
	$('#goForm').get(0).searchText.value = subCategoryNm;
	$('#goForm').attr("action",url);
	$('#goForm').attr("method",'GET');
	$('#goForm').submit();
}

function goWriter(element, wName, idx) {
    var external = $(element).data('external');

    if (external == 'Y') {
    	var url = '/experts/view.do' ;
		$('#goForm').get(0).ID.value = idx;
		$('#goForm').attr("action",url);
		$('#goForm').attr("method",'GET');
		$('#goForm').submit();
    } else {
    	var url = '/blog/writer/index.do' ;
    	$('#goForm').get(0).searchData.value = wName;
    	$('#goForm').attr("action",url);
    	$('#goForm').attr("method",'GET');
    	$('#goForm').submit();
    }

}

function goPage(page) {
	var url = '';
	var menuName = window.location.pathname.split('/')[1];
	var subMenuName = window.location.pathname.split('/')[2];
	if(menuName == 'blog' || menuName == 'tech') {
		if(subMenuName == 'writer') {
			url = '/blog/writer/index.do'
		} else if(subMenuName == 'tags') {
			url = '/blog/tags/index.do'
		} else {
			url = '/blog/index.do' ;
			
		}
	} else if(menuName == 'opensource') {
		url = '/opensource/index.do';
	} else if(menuName == 'search') {
		if(subMenuName == 'experts') {
			url = '/search/experts/view.do';
		} else {
			url = '/search/index.do';
		}
		
	} else if(menuName == 'experts') {
		if(subMenuName == 'story.do'){
			url = '/experts/story.do';
		}else{
			$("#writing").load("/experts/expertsViewBlog.do", {ID: $("#writerData").val(),page:page});
			return;
			//url = '/experts/view.do';
		}
	} else if(menuName == 'community'){
		url = '/community/'+subMenuName;
	}
	$('#goForm').get(0).page.value = page;
	$('#goForm').attr("action",url);
	$('#goForm').attr("method",'GET');
	$('#goForm').submit();
}

function goDetailNews(element,id,e){
	var url = '/blog/techBoardDetail.do' ;
	//var blogList = $(element).data('list');
	var boardType= $(element).data('board-type');
	//var listArr = $('#' + blogList).val();
	//$('#goForm').get(0).idList.value = listArr;
    $('#goForm').get(0).ID.value = id;
	$('#goForm').get(0).boardType.value = boardType;
    $('#goForm').attr("action",url);
	$('#goForm').attr("method",'GET');
	if(e){
		url += '?ID=';
		url += id;
		url += '&boardType=';
		url += boardType;
		openBlankPage(e, url, 'goForm');
	}else{
		$('#goForm').submit();
	}
    
}