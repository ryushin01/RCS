var mainslide01;
var mainSlide02;
var mainSlide03;

//브라우저 로드시 작동
$(window).load(function(){
    var hrefArr = window.location.href.split('#');	
    if(hrefArr[hrefArr.length-1] == 'none' || globalIsApp == "true") {
        introFuncNoEffect();
    } else {
		var intro = getCookie("intro");
		if(intro == null){
			introFunc();
			setCookie("intro", "false", 30);
		} else {
			introFuncNoEffect();
		}
    }
}) 

$(function() {
    progressBarSet();
    animateFunc();    
});



// 메인 로딩 바 세팅
function progressBarSet() {
    var slideSize = $('.main-sec-visual .swiper-slide').not('.swiper-slide-duplicate').length;

    for (i = 0; i < slideSize; i++) {
        var color = $('.main-sec-visual .swiper-slide').not(
                '.swiper-slide-duplicate').eq(i)
                .attr('data-progress-color');
        $('.progress .move').append(
                '<div class="target"><span class="sequence">' + (i + 1)
                        + '번</span><span class="target-percent ' + color
                        + '" style="width:0%;"></span></div>');
    }
}

// 메인 인트로
function introFunc(){
    var introWrap = $(".main-intro-wrap"),
        visualTxt = $(".visual-txt.first"),
        header = $(".header.main"),
        body = $(".mian-body");

    introWrap.addClass("on");
    visualTxt.addClass("on");
    header.addClass("on");
    body.css("overflow-y","hidden");

    setTimeout(function(){
        introWrap.addClass("off");
    },1000);
    setTimeout(function(){
       introWrap.fadeOut(500);
        body.css("overflow-y","auto");
    },2000);
    setTimeout(function(){
       visualTxt.removeClass("on");
    },5000);
}

//메인 인트로 없이 화면 띄움
function introFuncNoEffect(){
    var introWrap = $(".main-intro-wrap"),
        visualTxt = $(".visual-txt.first"),
        header = $(".header.main"),
        body = $(".mian-body");

    introWrap.addClass("on off");
    introWrap.css("display","none");
    header.addClass("on");
    body.css("overflow-y","auto"); 
}
