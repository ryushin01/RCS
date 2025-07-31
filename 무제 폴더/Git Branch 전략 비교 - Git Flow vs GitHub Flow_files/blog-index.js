/**
 * blog-index.js
 * @param element
 * @constructor
 */
var pageIndex = 1;
Thub.BlogIndex = function(element) {

    this._element = element;

    this._init();
    this._bindEvent();
}

Thub.BlogIndex.prototype = {

    /**
     * 초기 세팅
     * @private
     */
    _init: function() {
        this._setSlide();
        // externalBlogList('',pageIndex);        
    },

    /**
     * 버튼 이벤트 바인딩
     * @private
     */
    _bindEvent: function () {
		this._element.on('click', '.vlog_banner', $.proxy(this._goBanner, this)); // 강의오픈/개설 신청
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
    },

    /**
     * 강의 오픈/개설 신청 취소 버튼 클릭 이벤트
     * @private
     */
    _popupBannerCancel: function(element) {
        var $layerPopup = $('#vlog-banner');
        $layerPopup.removeClass('on');
    },
    /**
     * Slide 초기화
     * @private
     */
    
    _setSlide: function() {
        var Slide = new Swiper('#swiper01', {
            speed : 400,
            //simulateTouch : false,
            loop : true,
            autoplay : {
                delay : 1000,
                disableOnInteraction : false,
            },
            navigation : {
                prevEl : '.page-area .prev',
                nextEl : '.page-area .next',
            },
            slidesPerView: 3,
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
    }
}

function goCategory(categoryName) {
	if(categoryName == 'DEVOCEAN YOUNG' || categoryName == '데보션 영'){
		location.href = "/community/youngList.do";
	}else if(categoryName == 'DEVOCEAN STUDY' || categoryName == '데보션 스터디'){
		location.href = "/community/studyList.do";
	}else if(categoryName == '데보션 후원행사' || categoryName == '데보션 후원 행사'){
		location.href = "/community/supportList.do";
	}else if(categoryName == 'AI Fellowship'){
		location.href = "/community/aiFellowshipList.do";
	}else{
		var url = '/blog/index.do' ;
		$('#goForm').get(0).searchData.value = categoryName;
		$('#goForm').get(0).boardType.value = "category";
		$('#goForm').attr("action",url);
		$('#goForm').attr("method",'GET');
		$('#goForm').submit();
	}
    
}

function goSubCategory(categoryName) {
	if(categoryName == 'DEVOCEAN YOUNG' || categoryName == '데보션 영'){
		location.href = "/community/youngList.do";
	}else if(categoryName == 'DEVOCEAN STUDY' || categoryName == '데보션 스터디'){
		location.href = "/community/studyList.do";
	}else if(categoryName == '데보션 후원행사' || categoryName == '데보션 후원 행사'){
		location.href = "/community/supportList.do";
	}else if(categoryName == 'AI Fellowship'){
		location.href = "/community/aiFellowshipList.do";
	}else{
	    var url = '/blog/sub/index.do' ;
	    $('#goForm').get(0).subIndex.value = '최신 기술 블로그';
		$('#goForm').get(0).searchData.value = categoryName;
		$('#goForm').attr("action",url);
		$('#goForm').attr("method",'GET');
		$('#goForm').submit();
	}
}

function goSubIndex(type) {
    var url = "/blog/sub/index.do" ;
	$('#goForm').get(0).subIndex.value = type;
	$('#goForm').get(0).searchData.value = '';
    //$('#goForm').get(0).idList.value = '';
	$('#goForm').attr("action",url);
	$('#goForm').attr("method",'GET');
	$('#goForm').submit();
}

function goMainCategory(categoryId){
	var url = '/blog/index.do' ;
    $('#goForm').get(0).subIndex.value = '최신 기술 블로그';
	$('#goForm').get(0).searchDataMain.value = categoryId;
	$('#goForm').attr("action",url);
	$('#goForm').attr("method",'GET');
	$('#goForm').submit();
}





