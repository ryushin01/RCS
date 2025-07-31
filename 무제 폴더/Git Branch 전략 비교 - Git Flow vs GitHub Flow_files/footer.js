/**
 * Footer.js
 * @param element
 * @constructor
 */
Thub.Footer = function(element) {
    this._element = element;
    
    this._initLetter(); 
    this._bindEvent();
	this._initFamily();
}

Thub.Footer.prototype = {

    /**
     * 버튼 이벤트 바인딩
     * @private
     */
    _bindEvent: function () {
        this._element.on('click', '.go-integration', $.proxy(this._goIntegration, this)); // thub 인증 프로세스
        this._element.on('click', '.go-terms', $.proxy(this._goTerms, this)); // 이용약관
        
        this._element.on('click', '.site.letter-area li', $.proxy(this._goLetter, this)); // letter를 클릭했을 때
    },
    
    /**
     * 뉴스레터 데이터 조회
     */
    _initLetter: function() {
    	var $letterList = $('.site.letter-area');
    	
    	 $.ajax({
             url: '/common/footer/letter.json',
             dataType: 'json',
             context: this,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             success: function(result) {
            	if ( !result || result.length == 0 ) {
            		$('#latter-area').remove();
            		return;
            	}
            	
            	var hbsHtml = Thub.HbsHelper.getHbs('latter.hbs?v=20250624');
             	var template = Handlebars.compile(hbsHtml);
                var data = result;
                
                var html = template(data);
                $letterList.append(html);
             }
    	 })
    },
	/**
     * 패밀리사이트 데이터 리스트 생성
     */
    _initFamily: function() {
    	 $.ajax({
             url: '/common/footer/family.json',
             dataType: 'json',
             context: this,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             success: function(result) {
            	if ( !result || result.length == 0 ) {
            		$('#familySiteUl').remove();
            		return;
            	}
                var data = result;
				var htmlString = '';
                $.each(data, function (index, item) {
					htmlString += '<li><a href="'+item.cdVal+'" target="_blank">'+item.cdNm+'</a></li>';
				});
				$("#familySiteUl").html(htmlString);
             }
    	 })
    },
    /**
     * 인증 프로세스
     * @param element
     * @private
     */
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

    /**
     * 이용약관 페이지 이동
     * @param element
     * @private
     */
    _goTerms: function(element) {
        location.href = '/terms/index.do';
    },
    
    /**
     * DEVOCEAN Letter 팝업창
     * @param element
     * @private
     */
    _goLetter: function(element) {
        var oldNewType = $(element.currentTarget).data('old-new-type');
        if( oldNewType && oldNewType === 'old') {
            var letterLink = $(element.currentTarget).data('link');
            var letterTitle = $(element.currentTarget).data('title');
            if ( !letterLink ) {
                alert('설정된 DEVOCEAN Letter가 존재하지않습니다.');
                return;
            }

            letterTitle = letterTitle != '' ? letterTitle : 'DEVOCEAN Letter';

            var wid = '825';
            var heig = '700';
            var left = Math.ceil(( window.screen.width - wid )/2);
            var top = Math.ceil(( window.screen.height - heig )/2);

            var options = 'width='+ wid +', height='+ heig +', left=' + left + ', top='+ top +', resizable=no, scrollbars=no, location=no';
            window.open(letterLink, letterTitle, options);
        }else{
            var inx = $(element.currentTarget).data('inx');

            $.ajax({
                url:"/about/letterDetail.do",
                type:"post",
                dataType:"json",
                async: false,
                data:{"inx":inx},
                success:function(data) {
                    if(data.result == 'success'){
                        const style = document.createElement('style');
                        style.innerHTML = `
                           li {list-style-type:disc;}
                            body {background:#ECEEF1;}
                            em {font-style:italic;}
                        `;

                        var letterTitle = data.letterDetail.board_title;
                        var jsonStr = data.letterDetail.detail;
                        var jsonData = JSON.parse(jsonStr);
                        letterTitle = letterTitle != '' ? letterTitle : 'DEVOCEAN Letter';

                        var wid = '800';
                        var heig = '700';
                        var left = Math.ceil(( window.screen.width - wid )/2);
                        var top = Math.ceil(( window.screen.height - heig )/2);

                        var options = 'width='+ wid +', height='+ heig +', left=' + left + ', top='+ top +', resizable=no, scrollbars=no, location=no';
                        var openWin = window.open('/letter/letterPopup.do', letterTitle, options);
                        openWin.onload = function () {
                            openWin.document.title = letterTitle;
                            openWin.document.head.appendChild(style);
                            $(openWin.document).find(".letterDataPreview").each(function(){
                                var key = $(this).attr("data-class");
                                var tagName = $(this).attr("data-tag");
                                if(tagName === 'a'){
                                    if (jsonData[key]) {
                                        $(this).attr("href",jsonData[key]);
                                    } else {
                                        $(this).attr("href","#none");
                                    }
                                }else if(tagName === 'img') {
                                    if (jsonData[key]) {
                                        $(this).attr("src", jsonData[key]);
                                    }
                                }else if(tagName === 'radio'){
                                    if(jsonData[key]){
                                        $(this).attr("src", jsonData[key]);
                                    }
                                }else if(tagName === 'span'){
                                    if (jsonData[key]) {
                                        $(this).html(jsonData[key]);
                                    }
                                }else if(tagName === 'p') {
                                    var textkey = key+'_text';
                                    if (jsonData[textkey]) {
                                        $(this).html(jsonData[textkey]);
                                    }
                                    if(jsonData[key]){
                                        $(this).attr("href", jsonData[key]);
                                    }else{
                                        $(this).attr("href","#none");
                                    }
                                }else if(tagName === 'div'){
                                    if (jsonData[key]) {
                                        $(this).html(jsonData[key]);
                                    }
                                }
                            })
                        };
                    }else{
                        alert("레터 상세 조회에 실패했습니다.");
                    }
                },
                error:function() {
                    alert("레터 상세 조회에 실패했습니다.");
                }
            });
        }
    },
}