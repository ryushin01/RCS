/**
 * header.js
 * @param element
 * @constructor
 */
Thub.Header = function(element) {
    this._element = element;
    this._loginHelper = Thub.LoginHelper;

    this._bindEvent();
    this._loadNotification(); // Notification 데이터 조회
    this._loadNotificationConfig(); // Notification Config 데이터 조회

    this._loadUserInfo(); // 사용자 정보 조회 (마일리지, 로그인 횟수, 사진 등등..)
    this._loadEnvType(); // envType을 얻음
}

Thub.Header.prototype = {

    /**
     * 버튼 이벤트 바인딩
     * @private
     */
    _bindEvent: function () {
        this._element.on('click', '.tid-login', $.proxy(this._login, this)); // Login
        this._element.on('click', '.tid-logout', $.proxy(this._logout, this)); // Logout

        this._element.on('click', '.my-mileage', $.proxy(this._goMileage, this)); // 마일리지 보기
        this._element.on('keyup', '.thub-search', $.proxy(this._goSearch, this)); // 검색 엔터 이벤트
        this._element.on('click', '.header-search .search-btn', $.proxy(this._goSearchIcon, this)); // 검색 이벤트

        this._element.on('click', '.noti-all-view', $.proxy(this._viewAllNotification, this)); // 전체 알람 보기
        this._element.on('click', '.noti-all-delete', $.proxy(this._deleteAllNotification, this)); // 전체 알람 식제

        this._element.on('click', '.alarm-apply', $.proxy(this._setAlarmApply, this)); // 알람 적용
		this._element.on('click', '.alarm-applyNew', $.proxy(this._setAlarmApplyNew, this)); // 알람 적용
        this._element.on('click', '.alarm-close', $.proxy(this._setAlarmClose, this)); // 알람 취소

        this._element.on('click', '.profile', $.proxy(this._clickProfile, this)); // 프로파일 변경 버튼
        this._element.on('change', '#profile-file', $.proxy(this._changeProfile, this)); // 프로파일 변경 후 저장 시
        
        this._element.on('click', '.etc-person2', $.proxy(this._goPerson, this)); // 인재DB
        this._element.on('click', '.link', $.proxy(this._goPerson, this)); // 인재DB

        this._element.on('click', '.etc-person3', $.proxy(this._goPerson2, this)); // 채용공고
        this._element.on('click', '.inquiry2', $.proxy(this._goPerson2, this)); // 채용공고

        this._element.on('click', '#user-db .close', $.proxy(this._closeEventPopup, this)); // 창 닫기
        this._element.on('click', '#user-db .pop-img', $.proxy(this._popupBannerSubmit, this)); // 창 닫기

        this._element.on('click', '#user-db2 .close', $.proxy(this._closeEventPopup2, this)); // 창 닫기
        this._element.on('click', '#user-db2 .pop-img', $.proxy(this._popupBannerSubmit2, this)); // 창 닫기
		this._element.on('click', '.go-integration', $.proxy(this._goIntegration, this)); // thub 인증 프로세스
        },

    /**
     * 로그인 바인딩
     * @private
     */
    _login: function() {
        this._loginHelper.login();
    },

    /**
     * 로그아웃 바인딩
     * @private
     */
    _logout: function() {
		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf('devoceanapp') > -1){
			var json = new Object();
			json.function = "get_device_id";
			window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json)).then(function(result){
				var deviceId = result.device_id;
				$.ajax({
					url:"/sns/deleteDeviceToken.do",
					type:"post",
					cache:false,
					async:false,
					dataType:"json",
					data:{				
							"deviceId":deviceId
						 },					 		
					success:function(result){
						
					},
					error:function(request,status,error){
					}
				});
			});
			this._loginHelper.logout();
		}else{
			this._loginHelper.logout();
		}
    },

    /**
     * 마일리지 보기
     * @private
     */
    _goMileage: function() {
        location.href = '/my/mileage/list.do';
    },

    /**
     * 인재DB
     * @private
     */
    _goPerson: function() {

    	//alert('더 많은 기회가 찾아올 수 있도록 당신의 인재 DB를 등록해주세요. \n\n※ 등록 페이지 하단의 인재DB 등록사유 필드에 “데보션을 통해 등록“이라고,\n  남겨주시는 분께 데보션 마일리지 200점을 부여합니다.');
//        var $layerPopup = $('#user-db');
       // var $popupClose = $('.bg');

//        $layerPopup.addClass('on');

//        $layerPopup.on('click', '#user-db .popup-box', $.proxy(this._popupBannerSubmit, this));
//        $layerPopup.on('click', '.popup-submit', $.proxy(this._popupBannerSubmit, this));
			window.open('about:blank').location.href='https://www.skcareers.com/MyPage/Talent';
    },

    _goPerson2: function() {
        //alert('본 페이지를 통해 지원 시 지원정보>지원경로>기타 선택 후 기타 경로 입력란에 \n"데보션을 통해 지원" 이라고 작성해주시면 감사의 의미로 데보션 마일리지 200점을 부여합니다.');

//         var $layerPopup = $('#user-db2');

//         $layerPopup.addClass('on');

//         $layerPopup.on('click', '#user-db2 .popup-box', $.proxy(this._popupBannerSubmit2, this));
//         $layerPopup.on('click', '.popup-submit', $.proxy(this._popupBannerSubmit2, this));
			window.open('about:blank').location.href='https://careers.sktelecom.com/';
    },
   /**
     * 인재DB 이동 버튼 클릭시
     * @private
     */
    _popupBannerSubmit: function(element) {
        var $layerPopup = $('#user-db');

        window.open('about:blank').location.href='https://www.skcareers.com/MyPage/Talent';
     },

    /**
     * 인재DB Event 팝업 닫음
     * @param element
     * @private
     */
     _closeEventPopup: function(element) {
        $('#user-db').removeClass('on');
    },

   /**
     * 채용공고 이동 버튼 클릭시
     * @private
     */
    _popupBannerSubmit2: function(element) {
        var $layerPopup = $('#user-db2');

        window.open('about:blank').location.href='https://careers.sktelecom.com/';
     },

    /**
     * 채용공고 Event 팝업 닫음
     * @param element
     * @private
     */
     _closeEventPopup2: function(element) {
        $('#user-db2').removeClass('on');
    },
    
    /**
     * 검색
     * @private
     */
    _goSearch: function(element) {
        var ENTER_CODE = 13;
        var $target = $(element.currentTarget);
        if ( element.keyCode === ENTER_CODE && $target.val() != '' ) {
            if($target.val().length > 100){
                alert("검색어는 100자까지 입력가능합니다.");
            }else{
		 		$("#searchForm").find("#query").val($target.val());
				$("#searchForm").attr("action","/common/search/appIndex.do");
		        $("#searchForm").submit();
            }
        }
    },

    /**
     * 검색
     * @param element
     * @private
     */
    _goSearchIcon: function(element) {
        var query = $('.header-search .thub-search').val();
        if ( query != '' ) {
            if(query.length > 100){
                alert("검색어는 100자까지 입력가능합니다.");
            }else{
				$("#searchForm").find("#query").val(query);
				$("#searchForm").attr("action","/common/search/appIndex.do");
		        $("#searchForm").submit();
            }
            
        }
    },

    /**
     * 알람 리스트
     * @private
     */
    _loadNotification: function() {
        var $push = $('.header-etc .push');
        var $pushList = $('.push-list');

        $.ajax({
            url: '/common/notification/header/list.json',
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(result) {
                $push.find('.etc-push span').text(result.length);
				
                if ( result && result.length !== 0 ) {
                    $push.find('.push-title .noti-count strong').text(result.length); // 내 알림 카운터 설정

					var htmlText = "";
					for(var i = 0; i < result.length; i++){
						htmlText += '<li>';
						if(result[i].boardType == 'COMMUNITY'){
							htmlText += '    <a href="#none" onClick="goNotificationHeaderCommunity(this,'+result[i].id+');" data-id="'+result[i].id+'" data-target-url="'+result[i].targetUrl+'" data-content-id="'+result[i].contentId+'">';
						}else if(result[i].boardType == 'BADGE'){
							htmlText += '    <a href="#none" onClick="goNotificationHeaderBadgeView(this,'+result[i].id+');" data-id="'+result[i].id+'" data-target-url="'+result[i].targetUrl+'">';
						}else{
							htmlText += '    <a href="#none" onClick="goNotificationHeader(this,'+result[i].id+');" data-id="'+result[i].id+'" data-target-url="'+result[i].targetUrl+'">';
						}
						
						if(result[i].notificationType == 'ADMIN_NOTIFICATION'){
							htmlText += '		<span class="category">운영진 알림</span>';
						}else{
							if(result[i].boardType == 'COMMUNITY'){
								htmlText += '		<span class="category">DEVOCEAN 커뮤니티</span>';
							}else if(result[i].boardType == 'EVENT'){
								htmlText += '		<span class="category">DEVOCEAN 이벤트</span>';
							}else if(result[i].boardType == 'VLOG'){
								htmlText += '		<span class="category">DEVOCEAN 동영상</span>';
							}else if(result[i].boardType == 'BADGE'){
								htmlText += '		<span class="category">DEVOCEAN 배지</span>';
							}else{
								htmlText += '		<span class="category">DEVOCEAN 블로그</span>';
							}
						}
						
						
						if(result[i].notificationType.indexOf("LIKE") > -1){
							htmlText += '        <p>[좋아요] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("ARTICLE") > -1){
							htmlText += '        <p>[새 글] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("REPLY") > -1){
							htmlText += '        <p>[댓글] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("ANSWER") > -1){
							htmlText += '        <p>[답글] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("VOTE") > -1){
							htmlText += '        <p>[투표마감] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("VLOG") > -1){
							htmlText += '        <p>[동영상] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("EVENT") > -1){
							htmlText += '        <p>[이벤트] '+result[i].content+'</p>';
						}else if(result[i].notificationType.indexOf("BADGE") > -1){
							htmlText += '        <p>[배지] '+result[i].content+'</p>';
						}else{
							htmlText += '        <p>'+result[i].content+'</p>';
						}
				        
				        htmlText += '        <em>'+result[i].regDate+'</em>';
				        htmlText += '    </a>';
						htmlText += '    <button class="delete-noti" data-id="'+result[i].id+'">닫기</button>';
						htmlText += '</li>';
					}
						
			        $(".push-list").html(htmlText);
			        

                    //var data = {
                    //    list: result
                    //}

                    //var hbsHtml = $('#notification-template').html();
                    //var template = Handlebars.compile(hbsHtml);
                    //var html = template(data);

                    //$pushList.append(html);

                    $pushList.find('.go-noti-view').on('click', $.proxy(this._goNotification, this));
                    $pushList.find('.delete-noti').on('click', $.proxy(this._deleteNotification, this));

                } else {
                    $push.find('.push-title .noti-count strong').text('0'); // 내 알림 카운터 0
                    $push.find('.push-title .noti-all-delete').addClass('none'); // 전체 삭제 버튼 삭제
                    $push.find('.push-msg').removeClass('none'); // 지금은 도착한 알림이 없어요! 출력
                }
            }
        });
    },

    /**
     * 알람 설정 정보 조회
     * @private
     */
    _loadNotificationConfig: function() {
        var $alarmListOld = $('.alarm-toggle-list li');
		var $alarmList = $('.alarmLi');
        $.ajax({
            url: '/common/notification/header/config.json',
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                for (var prop in result) {
                    var isChecked = result[prop] == 'Y' ? true : false;
                    $alarmList.find('input[name="' + prop + '"]').prop('checked', isChecked);
					$alarmListOld.find('input[name="' + prop + '"]').prop('checked', isChecked);
                }
				if(result.newArticle=='Y'){
					$("#categoryUl").css("display","block");
				}else{
					$("#categoryUl").css("display","none");
				}
            }
        });
    },


    /**
     * 알람 상세 페이지 이동
     * @private
     */
    _goNotification: function(element) {
        var $target = $(element.currentTarget);
        var id = $target.data('id');
        var targetUrl = $target.data('target-url');

        $.ajax({
            url: '/common/notification/header/view.json',
            dataType: 'json',
            data: {
                'id': id
            },
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
                location.href = targetUrl;
            }
        });
    },

    /**
     * 알림 삭제
     * @private
     */
    _deleteNotification: function(element) {
        if ( !confirm('해당 알람을 삭제하시겠습니까?') ) {
            return;
        }

        var $target = $(element.currentTarget);
        var id = $target.data('id');

        $.ajax({
            url: '/common/notification/header/view.json',
            dataType: 'json',
            data: {
                'id': id
            },
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
                location.reload();
            }
        });
    },

    /**
     * 전체 알람 보기
     * @param element
     * @private
     */
    _viewAllNotification: function(element) {
        location.href = '/notification/list.do';
    },

    /**
     * 알림 전체 삭제
     * @private
     */
    _deleteAllNotification: function() {
        if ( !confirm('모든 알람을 삭제하시겠습니까?') ) {
            return;
        }

        $.ajax({
            url: '/common/notification/header/deleteAll.json',
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
                location.reload();
            }
        });
    },

    /**
     * 알람 설정
     * @private
     */
    _setAlarmApply: function(element) {
        var $alarmList = $('.alarm-toggle-list li');
        var data = _.reduce($alarmList, function(object, item) {
            var $input = $(item).find('input');
            var name = $input.attr('name');
            var value = $input.is(':checked') == true ? 'Y' : 'N';

            object[name] = value;
            return object;
        }, {});

        $.ajax({
            url: '/common/notification/header/config/update.json',
            dataType: 'json',
            context: this,
            data: data,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
                alert('알람을 설정하였습니다.');
                location.reload();
            }
        });
    },

	_setAlarmApplyNew: function(element) {
		var $alarmListNew = $('.alarmLi');
        var data = _.reduce($alarmListNew, function(object, item) {
            var $inputNew = $(item).find('input');
            var nameNew = $inputNew.attr('name');
            var valueNew = $inputNew.is(':checked') == true ? 'Y' : 'N';

            object[nameNew] = valueNew;
            return object;
        }, {});

        $.ajax({
            url: '/common/notification/header/config/update.json',
            dataType: 'json',
            context: this,
            data: data,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
                alert('알람을 설정하였습니다.');
                location.reload();
            }
        });
    },

    /**
     * 알람 취소
     * @param element
     * @private
     */
    _setAlarmClose: function(element) {
        $('.alarm-popup').removeClass('on');
    },

    /**
     * 사용자 정보 조회 (마일리지, 로그인 횟수, 사진 등등..)
     *
     * @param element
     * @private
     */
    _loadUserInfo: function(element) {
        /*$.ajax({
            url: '/tid/userInfo.json',
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (result) {
                if (result != null) {
                    $('.mileage-point').text(result.mileagePoint);
                    $('.mileage-sum').text(result.mileageSum);
                    $('.user-point .log-count').text(result.loginCount);
					$('.profile-user').prop('src', result.picturePath);
                    $('.go-integration').data('tid-auth', result.tidAuthYn);
                }
            }
        });*/
    },

    /**
     * envType를 얻음
     * @private
     */
    _loadEnvType: function() {
        $.ajax({
            url: '/tid/envtype.json',
            dataType: 'json',
            context: this,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            async: false,
            success: function (result) {
                $('footer input[name="envtype"]').val(result.envtype)

                ENV_TYPE = $('footer input[name="envtype"]').val();
            },
            error: function(err) {
                //console.log(err);
            }
        });
    },

    /**
     * 프로필 변경 (클릭)
     * @param element
     * @private
     */
    _clickProfile: function(element) {
        element.preventDefault();
		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf('devoceanapp') > -1){
			var json = new Object();
			var data = new Object();
			json.function = "set_profile_image";
			data.user_uid = Number("${userInfo.inx}");
			json.data = data;
			window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
		}else{
			this._element.find('input[type="file"][id="profile-file"]').click();
		}
        
    },

    /**
     * 프로필 변경의 확인 시 동작되는 이벤트
     * @param element
     * @private
     */
    _changeProfile: function(element) {
        var LIMIT_CAPACITY = 1; // 1MB

        var FILE_EXTS = ['.jpg', '.jpeg', '.png']; // 허용가능한 확장자
        var $file = $(element.currentTarget)[0].files[0];

        var fileName = $file.name;
        var fileExt = fileName.substring(fileName.lastIndexOf('.'), fileName.lastIndexOf('.') + fileName.length);
        var fileSize = ($file.size / 1024 / 1024).toFixed(1);

        var isAllowExt = FILE_EXTS.indexOf(fileExt) > -1 ? true : false; // 확장자 체크
        if ( !isAllowExt ) { // 확장자 체크
            var arrowExts = FILE_EXTS.join(', ');
            alert('업로드할 수 없는 확장자입니다.\n허용가능 확장자는 "' + arrowExts + '" 입니다.');
            return;
        }

        if ( fileSize > LIMIT_CAPACITY ) { // 파일 사이즈 체크
            alert('프로필 사진 업로드 가능 용량은 최대 ' +LIMIT_CAPACITY + 'MB 입니다.\n업로드 하려는 파일 사이즈: ' + fileSize + 'MB');
            return;
        }

        var formData = new FormData();
        formData.append('uploadProfile', $file);

        $.ajax({
            url: '/tid/upload/profile.json',
            type: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: formData,
            success: function (result) {
                if ( result ) {
                    alert('프로필을 변경하였습니다.');
                } else {
                    alert('프로필을 변경에 실패했습니다. 관리자에게 문의바랍니다.');
                }

                location.reload();
            }
        });

    },
	_goIntegration: function(element) {
        Thub.LoginHelper.isLogged(
            $.proxy(function() { // 로그인 되었을 때
                var $target = $(element.currentTarget);
                var tidAuthYn = $target.data('tid-auth'); // TID 인증 여부
                if ( tidAuthYn == 'Y' ) { // TID 인증을 받았다면?
                    var openNewWindow = window.open("about:blank"); // _blank 로 띄워주기 위해
                    openNewWindow.location.href = '/internal/index.do';
                } else { // TID 인증을 받지 않았다면?
                    location.href = '/integration/index.do';
                }
            }, this),
            $.proxy(function() { // 로그인이 안되어있을 때 callback
                var openNewWindow = window.open("about:blank"); // _blank 로 띄워주기 위해
                openNewWindow.location.href = '/internal/login.do';
            }, this)
        );
    },
}
function alertErrorMessage(request,status,error) {

	var message = $(request.responseText).find('#errorMsg').html();
	if (message) {
		message = message.replace(/<br?\/?>/g, '\n');
	} else {
				
		message = "오류가 발생하였습니다.\n";
		
		if (request.status == 0) {
			message += "잠시후에 다시 시도하여주십시요.\n";
		} else {
			
			var find = $(request.responseText).find('#loginBtn');
			
			if (find.length > 0) {
				message += "로그아웃 되었습니다. 다시 로그인해주십시요.\n";
			}
			//message += "메시지:"+error+"("+request.status+")\n";
		}
		
	}

	alert(message);
	
}
//알람 상세 페이지 이동
function goNotificationHeader(element,id){
    var id = id;
    var targetUrl = $(element).data('target-url');
    $.ajax({
        url: '/common/notification/header/view.json',
        dataType: 'json',
        data: {
            'id': id
        },
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function () {
            location.href = targetUrl;
        }
    });
}

//앱 이벤트
function goAppEvent(element, id){
	var id = id;
    var contentId = $(element).data('content-id');
    $.ajax({
        url: '/common/notification/header/view.json',
        dataType: 'json',
        data: {
            'id': id
        },
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function () {
        	alert("모바일 앱에서 참여 가능한 이벤트입니다.");
        }
    });	
}

$(document).ready(function(){
	var agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf('devoceanapp') > -1){
		$(".toastui-editor-contents > p > img").attr('onClick','viewImageApp(this)');
	}
})

function viewImageApp(element, postIdx, imgNo){
	var src = $(element).attr('src');
	var srcArr = [];
	if(postIdx){
		$.ajax({
    		url:"/appMain/getCommunityImgList.do",
    		type:"post",
    		cache:false,
    		async:false,
    		dataType:"json",
    		data:{				
    				"post_idx":postIdx
    			 },					 		
    		success:function(data){
				var imgList = data.imgList;
				for(var i = 0; i < imgList.length; i++){
					srcArr.push(imgList[i].file_path);
				}
				var json = new Object();
				var data = new Object();
				json.function = "image_view";
				data.type = "url";
				data.content = srcArr;
				data.position = imgNo;
				json.data = data;
				window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
    		},
    		error:function(request,status,error){
    		}
    	});
	}else{
		if(src.indexOf("data:image/") > -1){
			src = src.split("base64,")[1];
			srcArr.push(src);
			var json = new Object();
			var data = new Object();
			json.function = "image_view";
			data.type = "base64";
			data.content = srcArr;
			data.position = 1;
			json.data = data;
			window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
		}else{
			srcArr.push(src);
			var json = new Object();
			var data = new Object();
			json.function = "image_view";
			data.type = "url";
			data.content = srcArr;
			data.position = 1;
			json.data = data;
			window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
		}
	}
}

//댓글 신고하기
function reportReply(element){
	var commentId = $(element).attr('data-comment-id');
    var type = $(element).attr('data-type');
	if(type == 'COMMUNITY_POST' || type == 'COMMUNITY_REPLY'){
		commentId = $(element).attr("data-reportidx")
	}
	var postIdx = $(element).attr('data-postidx');
	
	if($("#reportSelect").val() == ''){
		alert("신고사유를 선택해 주세요.");
		return;
	}
	var formData = new FormData();
  	formData.append("type", type);
	formData.append("reportId", commentId);
	formData.append("reportCd", $("#reportSelect").val());
	if($("#reportReason").val() != ''){
		formData.append("reportReason", $("#reportReason").val());
	}
	var blockYn = "";
	if($("input[id='blockYn']:checkbox" ).is(":checked")){
		formData.append("blockYn", "Y");
		blockYn = "Y";
	}else{
		formData.append("blockYn", "N");
		blockYn = "N";
	}
	if(type == 'COMMUNITY_POST' || type == 'COMMUNITY_REPLY'){
		$.ajax({
			url:"/api/community/report.api",
			type:"post",
			dataType:"json",
			async: false,
			//context: this,
			data:{"type":type ,"accessToken":getAccessToken(), "reportIdx": commentId, "repordCd": $("#reportSelect").val(), "reportReason": $("#reportReason").val(), "blockYn": blockYn},
			success:function(data) {
				if(data.result_type == 'success'){
					alert("신고가 완료되었습니다.");
					$(".report").removeClass("on");
					$("#reportReason").val("");
					$("#reportConfirmBtn").removeAttr('data-comment-id');
					$("#reportConfirmBtn").removeAttr('data-type');
					$("#reportConfirmBtn").removeAttr('data-reportidx');
					$("#reportConfirmBtn").removeAttr('data-postidx');
					refreshReply(postIdx, $(".replyOrderBtn.on").attr("data-value"));
				}
			},
			error:function() {
				alert("신고에 실패했습니다.");
			}
		});
	}else{
		$.ajax({
			  url : "/report/insertReportReply.do",
			  type : "post",
			  dataType:"json",
			  enctype: 'multipart/form-data',
			  processData: false,
			  contentType: false,
			  data:formData,
			  success:function(data){
					if(data.result == 'reportSuccess'){
						alert("신고가 완료되었습니다.");
						$(".report").removeClass("on");
						$("#reportReason").val("");
						$('.dim').addClass('on');
						$(".sub-sec-side").css("z-index","110");
						$("#reportConfirmBtn").removeAttr('data-comment-id');
						$("#reportConfirmBtn").removeAttr('data-type');
						$("#reportConfirmBtn").removeAttr('data-postidx');
						$("#reportConfirmBtn").removeAttr('data-reportidx');
						if(data.blockYn == 'Y'){
							if(data.blockResult == 'blockSuccess'){
								var list = data.targetCommentList;
								for(var i = 0; i < list.length; i++){
									var $removeBlockLi = $('ul.sec-comment-list').find('[data-comment-id=' + list[i].commentId + ']');
					                $removeBlockLi.find('.comment-desc').empty();
					                $removeBlockLi.find('.comment-desc').html('<span style="color: #666666;">차단된 회원의 댓글입니다.</span>');
					
					                $removeBlockLi.find('.comment-bottom').remove();
					                $removeBlockLi.find('.delete-button').remove();
								}
								var $removeLi = $('ul.sec-comment-list').find('[data-comment-id=' + commentId + ']');
				                $removeLi.find('.comment-desc').empty();
				                $removeLi.find('.comment-desc').html('<span style="color: #666666;">차단된 회원의 댓글입니다.</span>');
				
				                $removeLi.find('.comment-bottom').remove();
				                $removeLi.find('.delete-button').remove();
							}
						}else{
							var $removeLi = $('ul.sec-comment-list').find('[data-comment-id=' + commentId + ']');
			                $removeLi.find('.comment-desc').empty();
			                $removeLi.find('.comment-desc').html('<span style="color: #666666;">신고 접수된 댓글입니다.</span>');
			
			                $removeLi.find('.comment-bottom').remove();
			                $removeLi.find('.delete-button').remove();
						}
						
					}
				},error:function(request,status,error){
					alert("알 수 없는 오류입니다.");
				}
	  	})
	}
  	
}

function openBlankPage(event, url, formId){
	if(event.ctrlKey || event.metaKey || event.button == 1){
		window.open(url , "_blank").blur();
		setTimeout(function() {
		    if(!document.hasFocus()) {
		      window.focus();
		    }
		  }, 50);
	}else if(event.button == 2){
		document.addEventListener('contextmenu', function(e) {
	  }, true);
	}else{
		$('#'+formId).submit();
	}
}
