var replyCnt = 0;
var globalBoardId = '';
var gptCommentId = 0;
var regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?@&=:;200-377()]+)","gi");
var regMarkdownBold = new RegExp("\\*\\*(.*?)\\*\\*", "g");
function numberWithComma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
};
//blog 댓글
function getReplyList(boardId, boardType){
	var orderType = $(".replyOrderBtn.on").attr("data-value");
	globalBoardId = boardId;
	$.ajax({
        url: '/common/comment/list.json',
        data: {
            'boardId': boardId,
            'boardType': boardType,
			'orderType': orderType
        },
        dataType: 'json',
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(result) {
			var replyList = result.data;
			replyCnt = 0;
			var htmlTxt = makeReplyList(replyList);
			$("#blogReplyUl").html(htmlTxt);
			$("#blogReplyTotalCnt").text(replyCnt);
			$(".detailComment").text(replyCnt);
			
			if(gptCommentId != 0){
				var htmlStr = '';
				htmlStr += '<li id="replyLi_0000" class="parent-comment reply">';
				htmlStr += '	<p class="comment-desc loading_gpt" id="old_reply_0000">';
				htmlStr += '	    <span class="reply_loading"></span>';
				htmlStr += '        <strong class="reply_loading_text">';
				htmlStr += '	        <span style="color:#1044FF">DEVOTEE</span>가 답변을 작성하고 있어요! 조금만 기다려주세요.';
				htmlStr += '        </strong>';
				htmlStr += '	</p>';
				htmlStr += '</li>';
				$("#replyLi_"+gptCommentId).after(htmlStr);
				gptCommentId = 0;
			}
			
			const urlParams = new URL(location.href).searchParams;
	    	const commentYn = urlParams.get('comment');
	    	if(commentYn == 'Y'){
	    		$("html,body").animate( { scrollTop : $("#blogReplyTotalCnt").offset().top-200 }, 0 );
				urlParams.delete('comment');
				var changeUrl = window.location.origin + window.location.pathname + "?" + urlParams;
				history.pushState(null,null,changeUrl);
	    	}
        }
    });
}
function makeReplyList(replyList){
	var htmlTxt = '';
	replyCnt += replyList.length;
	for(var i = 0; i < replyList.length; i++){
		htmlTxt += '<li id="replyLi_'+replyList[i].commentId+'" class="parent-comment';
		if(replyList[i].commentParentId != null && replyList[i].commentParentId != ''){
			htmlTxt += ' reply';
		}
		htmlTxt += '">';
		htmlTxt += '    <div class="comment-top">';
		htmlTxt += '        <dl class="author">';
		if(replyList[i].userId == 'DEVOTEE'){
			htmlTxt += '            <dt><img src="/resource/images/external/blog/ico_bot.png" alt=""></dt>';
		}else{
			if(replyList[i].anonymousYn == 'Y'){
				htmlTxt += '            <dt><img src="/resource/images/external/blog/ico_anonymity.png" alt=""></dt>';
			}else{
				htmlTxt += '            <dt><img src="'+replyList[i].picturePath+'" alt=""></dt>';
			}
		}
		
		htmlTxt += '            <dd>';
		htmlTxt += '                <em>';
		if(replyList[i].userId == 'DEVOTEE'){
			htmlTxt += 'DEVOTEE';
		}else{
			if(replyList[i].withdrawYn == 'Y'){
				htmlTxt += '존재하지않는 계정'
			}else{
				if(replyList[i].anonymousYn == 'Y'){
					htmlTxt += '익명';
				}else{
					htmlTxt += replyList[i].userName;
					//htmlTxt += '<span class="score">'+numberWithComma(replyList[i].activityScore)+'</span>';
				}
			}
			
			
		}
		htmlTxt += '</em>';
		htmlTxt += '                <span>'+replyList[i].regDate.substr(0,19)+'</span>';
		htmlTxt += '            </dd>';
		htmlTxt += '        </dl>';
		htmlTxt += '    </div>';
		if(replyList[i].deleteYn == 'N'){
			htmlTxt += '    <p class="comment-desc" id="old_reply_'+replyList[i].commentId+'">';
			var contentText = replyList[i].content;
			if(replyList[i].userId == 'DEVOTEE'){
				var textCnt = '';
				if(window.innerWidth <= 599){
					textCnt = 270;
				}else if (window.innerWidth > 599 &&window.innerWidth <= 768) {
					textCnt = 350;
				}else if(window.innerWidth > 768 && window.innerWidth <= 1024){
					textCnt = 390;
				}else{
					textCnt = 500;
				}
				if(contentText.length >= textCnt){
					var originalTextArr = contentText.match(regURL);
					var subTextArr = contentText.substr(0, textCnt).match(regURL);
					var subText = contentText.substr(0, textCnt);
					if(subTextArr != null){
						for(var k = 0; k < subTextArr.length; k++){
							if(subTextArr[k] == originalTextArr[k]){
								var aTagText = "<a href='"+originalTextArr[k]+"' target='_blank' class='text_link'>"+originalTextArr[k]+"</a>";
								subText = subText.replace(originalTextArr[k], aTagText);
							}
						}
					}
					
					var originalTextArr2 = subText.match(regMarkdownBold);
					var subTextArr2 = subText.substr(0, textCnt).match(regMarkdownBold);
					var subText2 = subText.substr(0, textCnt);
					if(subTextArr2 != null){
						for(var p = 0; p < subTextArr2.length; p++){
							if(subTextArr2[p] == originalTextArr2[p]){
								var bTagText = originalTextArr2[p].replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
								subText2 = subText2.replace(originalTextArr2[p], bTagText);
							}
						}
					}
					
					htmlTxt += subText2.replace(/\*\*(.*?)/g, "") + '... <span class="moreSpan">더 보기</span>';
				}else{
					htmlTxt += contentText.replace(regURL,"<a href='$1://$2' target='_blank' class='text_link'>$1://$2</a>").replace(regMarkdownBold,"<b>$1</b>");
				}
			}else{
				htmlTxt += contentText.replace(regURL,"<a href='$1://$2' target='_blank' class='text_link'>$1://$2</a>").replace(regMarkdownBold,"<b>$1</b>");
			}
			htmlTxt +='</p>';
			htmlTxt += '    <p class="comment-desc realText" style="display:none">'+replyList[i].content.replace(regURL,"<a href='$1://$2' target='_blank' class='text_link'>$1://$2</a>").replace(regMarkdownBold,"<b>$1</b>")+'</p>';
			htmlTxt += '    <p class="comment-desc modiText" style="display:none" id="old_reply_ori_'+replyList[i].commentId+'">'+replyList[i].content+'</p>';
			if(replyList[i].loginId == replyList[i].userId){
				htmlTxt += '		<div class="reply_input modi_reply comment_reply" id="reply_modi_'+replyList[i].commentId+'">';
				htmlTxt += '		  <textarea placeholder="댓글을 입력해주세요." value="'+replyList[i].content+'" data-replyidx="'+replyList[i].commentId+'"></textarea>';
				htmlTxt += '		  <button type="button" class="reply_save reply_modi_btn" data-loginid="'+replyList[i].loginId+'" data-replyidx="'+replyList[i].commentId+'">등록</button>';
				htmlTxt += '		  <button type="button" class="reply_cancel reply_cancel_btn" data-replyidx="'+replyList[i].commentId+'">취소</button>';
				htmlTxt += '		</div>';
			}
		}else{
			htmlTxt += '    <p class="comment-desc">삭제된 댓글입니다.</p>';
		}
		htmlTxt += '    <div class="comment-bottom">';
		htmlTxt += '        <div class="comment-icon">';
		if(replyList[i].userId != 'DEVOTEE' && replyList[i].deleteYn == 'N'){
			htmlTxt += '            <span data-loginid="'+replyList[i].loginId+'" data-replyidx="'+replyList[i].commentId+'" class="favorites';
			if(replyList[i].likeYn == 'Y'){
				htmlTxt += ' on';
			}
			if(replyList[i].loginId != null && replyList[i].loginId != ''){
				htmlTxt += ' favoritesBtn';
			}
			htmlTxt += '">'+replyList[i].likeCount+'</span>';
		}
		if(replyList[i].commentParentId == null && replyList[i].deleteYn == 'N'){
			htmlTxt += '            <span data-replyidx="'+replyList[i].commentId+'" class="comment">'+replyList[i].childs.length+'</span>';
		}
		htmlTxt += '        </div>';
		if(replyList[i].commentParentId == null){
			htmlTxt += '        <div class="comment_reply rereply_div">';
			htmlTxt += '            <textarea placeholder="댓글을 입력해주세요." class="rereplyTextarea"></textarea>';
			htmlTxt += '            <button type="button" class="reply_save rereplySaveBtn" data-parentreplyidx="'+replyList[i].commentId+'" data-loginid="'+replyList[i].loginId+'">등록</button>';
			htmlTxt += '            <button type="button" class="reply_cancel" data-parentreplyidx="'+replyList[i].commentId+'">취소</button>';
			htmlTxt += '        </div>';
		}
		htmlTxt += '    </div>';
		if(replyList[i].loginId != null && replyList[i].loginId != '' && replyList[i].deleteYn == 'N' && !(replyList[i].gptYn == 'Y' && replyList[i].discussionYn == 'N')){
			htmlTxt += '    <div class="reply_btn_wrap">';
			htmlTxt += '        <button class="reply_btn"></button>';
			htmlTxt += '        <ul class="reply_option">';
			if(replyList[i].commentParentId == null && replyList[i].deleteYn == 'N'){
				htmlTxt += '            <li>';
				htmlTxt += '                <button type="button" class="reply replyReply" data-replyidx="'+replyList[i].commentId+'">답글</button>';
				htmlTxt += '            </li>';
			}
			if(replyList[i].userId != 'DEVOTEE' && replyList[i].loginId != replyList[i].userId){
				htmlTxt += '            <li>';
				htmlTxt += '                <button type="button" class="report replyReport" data-replyidx="'+replyList[i].commentId+'">신고</button>';
				htmlTxt += '            </li>';
			}
			if(replyList[i].loginId == replyList[i].userId){
				htmlTxt += '            <li>';
				htmlTxt += '                <button type="button" class="modi replyModi" data-replyidx="'+replyList[i].commentId+'">수정</button>';
				htmlTxt += '            </li>';
				htmlTxt += '            <li>';
				htmlTxt += '                <button type="button" class="del replyDel" data-replyidx="'+replyList[i].commentId+'" data-loginid="'+replyList[i].loginId+'">삭제</button>';
				htmlTxt += '            </li>';
			}
			htmlTxt += '        </ul>';
			htmlTxt += '    </div>';
		}
		htmlTxt += '</li>';
		if(replyList[i].childs.length != 0){
			htmlTxt += makeReplyList(replyList[i].childs);
		}
	}
	return htmlTxt;
}
//더보기 눌렀을때 댓글 확장
$(document).on('click', '.comment-desc span.moreSpan', function(){
	var moreTxt =  $(this).parents('.comment-desc').siblings('.realText').html();
	$(this).parents('.comment-desc').html(moreTxt);
})
//댓글 정렬
$(document).on('click','.replyOrderBtn',function(){
	$(".replyOrderBtn").removeClass('on');
	$(this).addClass('on');
	
	getReplyList(globalBoardId, 'BLOG');
})
//textarea에 focus 됐을때 로그인 체크
$(document).on('focus', '#replyTextarea', function(){
	if($("#replySaveBtn").attr("data-loginid") == undefined || $("#replySaveBtn").attr("data-loginid") == ''){
		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf('devoceanapp') > -1){
			var json = new Object();
			json.function = "login_question";
			window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
		}else{
			if(confirm("로그인이 필요한 서비스입니다. 로그인을 하시겠습니까?")){
				$('.sns-login').click();
			}
		}
		$("#replyTextarea").blur();
	}
})
//댓글 등록
$(document).on('click','#replySaveBtn',function(){
	if($("#replyTextarea").val().trim() == ''){
		alert("댓글을 입력하세요.");
		return;
	}
	if($(this).attr('data-loginid') == undefined || $(this).attr('data-loginid') == ''){
		return;
	}
	var anonymousYn = $("#anonymousYnBtn").is(":checked") ? 'Y' : 'N';
	var gptYn = $("#gptYnBtn").hasClass('on') ? 'Y' : 'N';
	var targetUrl = location.pathname + location.search;
	$.ajax({
        url: '/common/comment/insert.json',
        data: {
            'boardId': globalBoardId,
            'boardType': 'BLOG',
            'content': $("#replyTextarea").val().trim(),
            'userId': $(this).attr('data-loginid'),
            'targetUrl': targetUrl,
			'anonymousYn': anonymousYn
        },
        dataType: 'json',
		type:'post',
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(result) {
			$("#replyTextarea").val('');
			$("#anonymousYnBtn").attr("checked",false);
			$("#gptYnBtn").removeClass("on");
			if(gptYn == 'Y'){
				gptCommentId = result.data.commentId;
			}else{
				gptCommentId = 0;
			}
			getReplyList(globalBoardId, 'BLOG');
			if(gptYn == 'Y'){
				insertGptReply(result.data.content, result.data.loginId, result.data.commentId);
			}
        }
    });
})
function insertGptReply(content, userId, commentParentId){
	var targetUrl = location.pathname + location.search;
	
	/*fetch('/common/comment/gptReplyInsert.json', {
        method: 'POST', // 데이터를 POST로 전송
        headers: {
            'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify({
		    boardId: globalBoardId,
		    boardType: 'BLOG',
		    content: content,
		    userId: userId,
		    commentParentId: commentParentId,
			targetUrl: targetUrl,
		}), // JSON 데이터를 문자열로 변환
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // ReadableStream을 사용하여 SSE 응답 처리
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        const outputElement = document.getElementById('output');

        function readStream() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    console.log('SSE stream closed');
                    return;
                }

                // 받은 데이터 디코딩 및 화면에 출력
                const chunk = decoder.decode(value, { stream: true });
                console.log('Received chunk:', chunk);

                // SSE 형식의 데이터 파싱
                const lines = chunk.split('\n');
                lines.forEach(line => {
                    if (line.startsWith('data: ')) {
                        const message = line.substring(6); // "data: " 이후의 내용
                        outputElement.innerText += message + '\n';
                    }
                });

                // 다음 청크 읽기
                readStream();
            });
        }

        readStream();
    }).catch(error => {
        console.error('Error during SSE connection:', error);
    });*/
	
	$.ajax({
        url: '/common/comment/gptReplyInsert.json',
        data: {
            'boardId': globalBoardId,
            'boardType': 'BLOG',
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
            getReplyList(globalBoardId, 'BLOG');
        }
    });
}
//댓글 삭제
$(document).on('click','.replyDel',function(){
	if ( !confirm('해당 댓글을 삭제하시겠습니까?') ) {
        return;
    }

    $.ajax({
        url: '/common/comment/delete.json',
        data: {
            'commentId': $(this).attr('data-replyidx'),
            'boardType': 'BLOG',
            'userId': $(this).attr('data-loginid')
        },
        dataType: 'json',
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(result) {
            if ( result ) {
                getReplyList(globalBoardId, 'BLOG');
            }
        }
    });
})
//댓글 수정 눌렀을때 수정 인풋 세팅
$(document).on('click','.reply_option .replyModi',function(){
	if($("#replyLi_"+$(this).attr("data-replyidx")).find(".rereply_div").hasClass("on")){
		$("#replyLi_"+$(this).attr("data-replyidx")).find(".rereply_div").removeClass("on");
	}
	$("#reply_modi_"+$(this).attr("data-replyidx")+" textarea").val($("#old_reply_ori_"+$(this).attr("data-replyidx")).text());
	$("#reply_modi_"+$(this).attr("data-replyidx")).addClass("on");
	$("#old_reply_"+$(this).attr("data-replyidx")).removeClass("on");
	$(".reply_option").each(function(){
		$(this).removeClass("on");
	})
	$("#reply_modi_"+$(this).attr("data-replyidx")+" textarea").focus();
})
//댓글 수정
$(document).on('click','.reply_modi_btn',function(){
	$.ajax({
        url: '/common/comment/udpate.json',
        data: {
            'commentId': $(this).attr('data-replyidx'),
            'boardType': 'BLOG',
            'userId': $(this).attr('data-loginid'),
			'content':$(this).siblings('textarea').val().trim()
        },
        dataType: 'json',
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(result) {
            if ( result ) {
                getReplyList(globalBoardId, 'BLOG');
            }
        }
    });
})
//답글창 열기(댓글 아이콘 눌렀을때)
$(document).on('click',".comment",function(){
	if($("#replySaveBtn").attr("data-loginid") == undefined || $("#replySaveBtn").attr("data-loginid") == ''){
		var agent = navigator.userAgent.toLowerCase();
		if(agent.indexOf('devoceanapp') > -1){
			var json = new Object();
			json.function = "login_question";
			window.flutter_inappwebview.callHandler('devocean', JSON.stringify(json));
		}else{
			if(confirm("로그인이 필요한 서비스입니다. 로그인을 하시겠습니까?")){
				$('.sns-login').click();
			}
		}
	}else{
		if($("#reply_modi_"+$(this).attr("data-replyidx")).hasClass("on")){
			$("#reply_modi_"+$(this).attr("data-replyidx")).removeClass("on");
		}
		if($(this).parents(".comment-bottom").children(".rereply_div").hasClass("on")){
			$(this).parents(".comment-bottom").children(".rereply_div").removeClass("on");
		}else{
			$(this).parents(".comment-bottom").children(".rereply_div").addClass("on");
		}
	    
	}
});
//답글창 열기(메뉴에서 답글 메뉴 눌렀을때)
$(document).on('click', '.replyReply', function(){
	if($("#reply_modi_"+$(this).attr("data-replyidx")).hasClass("on")){
		$("#reply_modi_"+$(this).attr("data-replyidx")).removeClass("on");
	}
	if($(this).parents(".parent-comment").find(".rereply_div").hasClass('on')){
		$(this).parents(".parent-comment").find(".rereply_div").removeClass("on");
	}else{
		$(this).parents(".parent-comment").find(".rereply_div").addClass("on");
	}
	
	$(this).parent().parent().removeClass('on');
})
//리댓 등록
$(document).on('click','.rereplySaveBtn',function(){
	if($(this).siblings('textarea').val().trim() == ''){
		alert("댓글을 입력하세요.");
		return;
	}
	var targetUrl = location.pathname + location.search;
	$.ajax({
        url: '/common/comment/insert.json',
        data: {
            'boardId': globalBoardId,
            'boardType': 'BLOG',
            'content': $(this).siblings('textarea').val().trim(),
            'userId': $(this).attr('data-loginid'),
            'commentParentId': $(this).attr('data-parentreplyidx'),
            'targetUrl': targetUrl,
        },
        dataType: 'json',
		type:'post',
        context: this,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(result) {
            getReplyList(globalBoardId, 'BLOG');
        }
    });
})
//리댓 등록(textarea에서 엔터눌렀을때..는 일단 두기로 함)
//좋아요
$(document).on('click',".favoritesBtn",function(){
	var targetUrl = location.pathname + location.search;
	var likeYn = $(this).hasClass('on') ? 'N' : 'Y';
	var loginId = $(this).attr("data-loginid");
    $.ajax({
        url: '/common/like.json',
        data: {
            'likeTargetId': $(this).attr('data-replyidx'),
            'likeTargetType': BOARD_LIKE_TYPE.COMMENT,
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

            $(this).toggleClass("on")
            var likeCount = $(this).text();
            if ( $(this).hasClass('on') ) {
                likeCount++;
            } else {
                likeCount--;
            }
            $(this).text(likeCount);
        }
    });
});

//신고 팝업 띄우기
$(document).on('click', '.replyReport', function(){
	$.ajax({
	  url : "/report/selectReportCdList.do",
	  type : "post",
	  dataType:"json",
	  enctype: 'multipart/form-data',
	  processData: false,
	  contentType: false,
	  context: this,
	  data:{id:"id"},
	  success:function(data){
			var list = data.reportCdList;
			var htmltxt = '';
			htmltxt += '<option value="">선택</option>';
			for(var i = 0; i < list.length; i++){
				htmltxt += '<option value="'+list[i].cdVal+'">'+list[i].cdNm+'</option>';
			}
			$("#reportSelect").html(htmltxt);
			$("#reportConfirmBtn").attr('data-comment-id', $(this).attr('data-replyidx'));
			$("#reportConfirmBtn").attr('data-type', 'BLOG_REPLY');
			$(".pop-wrap.report .popup-close, .pop-wrap.report .close").attr('data-type', 'BLOG_REPLY');
			$('.dim').removeClass('on');
			$(".pop-wrap.report").addClass("on");
			$(this).parent().parent().removeClass('on');
		},error:function(request,status,error){
			alert("신고하기에 오류가 발생하였습니다.");
		}
  	})
})

//detail에서 댓글 아이콘 클릭했을때 댓글창으로 포커싱
$(document).on('click','.detailComment',function(){
	$("html,body").animate( { scrollTop : $("#blogReplyTotalCnt").offset().top-200 }, 0 );
})
//기타

$(document).on('click',".gpt_reply",function(){
	if($(this).hasClass("on")){
		$(this).removeClass("on");
		$(".gpt_reply_text").removeClass("on");
	}else{
		$(this).addClass("on");
		$(".gpt_reply_text").addClass("on");
		setTimeout(function(){
		    $(".gpt_reply_text").removeClass("on");
		}, 2000);
	}
});



$(document).on('click',".reply_cancel",function(){
    $(this).parents(".comment_reply").removeClass("on");
});

$(document).on('click',".reply_btn",function(){
   $(this).next(".reply_option").toggleClass("on");
});