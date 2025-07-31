//브라우저 로드시 작동
$(window).load(function(){
    headerIntro();
    subVisual();
})

$(function(){
    headerMenuFunc();
    animateFunc();
    //scrollAnimateFunc('.to-animate-sec');
    searchBox();
    asideMenuFunc();
    commentFunc();
    mobilemenuFunc();
    sitemapFunc();
    headerSearch();
    topBtnFunc();
});

function headerMenuFunc(){
    var e = $('.header-menu > li'),
        s = $('.header-dropbox');

    e.each(function(){
        $(this).on('mouseenter focusin',function() {
            e.children('a').next('.menu-sub').css('height', '165px');
            s.css('height', '180px');
            e.children('a').removeClass('on');
            $(this).children('a').addClass('on');
        });
    });

    e.each(function(){
		$(this).on('mouseleave focusout',function() {
			e.children('a').next('.menu-sub').css('height', '0');
			s.css('height', '0');
			$(this).children('a').removeClass('on');
		});
	});
}

// 애니메이션
function animateFunc(){
    var e = $('.animate');

	e.scrolla({
		mobile: true,
		once: true,
		animateCssVersion:3
	});
}

// 스크롤애니메이션
function scrollAnimateFunc(e){
    var $eleAnimateSec = $(e);
    var clsAnimate = 'animated';
    var percent = 1;
    var time = null;

    function action(){
        $eleAnimateSec.each(function(){
            var $this = $(this);
            var objH = $this.offset().top + ($this.outerHeight() * percent);
            var winH = $(window).scrollTop() + $(window).outerHeight();

            if (winH > objH){
                $this.addClass(clsAnimate).addClass($this.attr('data-animate'));
                $this.find('.to-animate').each(function(){
                    $(this).addClass(clsAnimate).addClass($(this).attr('data-delay')).addClass($(this).attr('data-animate'));
                })
            }
        })
    }
    $(window).on('scroll',function(){
        clearTimeout(time);
        time = setTimeout(function(){action()});
    })

    action();
}

// searchbox
function searchBox(){
    $('.etc-search').on('click',function(){
        $('.search').toggleClass('on');
    });
    $('.search button').on('click',function(){
        $('.search').removeClass('on');
    });
}

// 메인 인트로
function headerIntro(){
    var header = $(".header");

	var agent = navigator.userAgent.toLowerCase();
	if(navigator.userAgent.toLowerCase().indexOf('devoceanapp') <= -1){
    	header.addClass("on");
	}
}

// aside 메뉴
function asideMenuFunc(){
    var e = $('.menu-list li.active'),
        t = $('.menu-list li.has-sub>a');

    e.addClass('open').children('ul').show();

    t.on('click', function(){
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp(200);
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown(200);
            element.siblings('li').children('ul').slideUp(200);
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp(200);
        }
    });
}

function subVisual(){
    var visual = $('.sub-visual-bg');

    visual.addClass("on");
}

// 댓글메뉴
function commentFunc(){
    var comment = $('#comment'),
        dim = $('.dim'),
        side = $('.sub-sec-side');

    comment.on('click',function(){
        dim.toggleClass('on');
        side.toggleClass('on');
    });

    dim.on('click',function(){
        $(this).removeClass('on');
        side.removeClass('on');
    });

    $('.sub-sec-side .close').on('click',function(){
        dim.removeClass('on');
        side.removeClass('on');
    });
}

// 팝업오픈
function popupFunc(e){
    var layerPop = $('#' + e);
        popClose = $('.bg, .pop-head .close');

    layerPop.addClass('on');

    popClose.on('click',function(){
        layerPop.removeClass('on');
    });
}

// header 팝업 메뉴
function headerPopFunc(e){
    var headerPop = $('.' + e),
        popArea = $(headerPop).attr('rel');

	if(e == 'user-box' && !$('.user-box').hasClass('on') && $('.etc-push').hasClass('on')){
		headerPop.toggleClass('on');
    	$('#' + popArea).toggleClass('on');
		
		$(".etc-push").removeClass('on');
		$('.push-box').removeClass('on');
	}else if(e == 'etc-push' && $('.user-box').hasClass('on') && !$('.etc-push').hasClass('on')){
		headerPop.toggleClass('on');
    	$('#' + popArea).toggleClass('on');
		
		$(".user-box").removeClass('on');
		$('#userArea').removeClass('on');
	}else{
		headerPop.toggleClass('on');
    	$('#' + popArea).toggleClass('on');
	}
	
    $('.push .close').on('click',function(){
        headerPop.removeClass('on');
        $('.push-box').removeClass('on');
    });
}

// 모바일 메뉴
function mobilemenuFunc(){
    $('.etc-menu').on('click',function(){
        $('.menu-dim').toggleClass('on');
        $('.menu').toggleClass('on');
    });
    $('.menu .close,.menu-dim').on('click',function(){
        $('.menu-dim').removeClass('on');
        $('.menu').removeClass('on');
    });
}

// 탭 메뉴
function tabMenu(e, cont) {

    var tabMenu = null,
        tabMenuList = null,
        tabCont = null,
        tabContShow = null;

    function tabMenuFunc(e) {
        tabMenu = $(e);
        tabMenuList = tabMenu.find('li a');
        tabCont = $(cont).children();
        tabContShow = $(cont).children('.active');

        tabCont.hide();
        tabContShow.show();

        tabMenuList.on('click', function () {
            tabMenuList.parent('li').removeClass('on');
            $(this).parent('li').addClass('on');
            tabCont.hide();
            var activeTabs = $(this).parent('li').attr('rel');
            $('#' + activeTabs).stop().fadeIn();
        });
    }

    tabMenuFunc(e);
}

// 아코디언 메뉴
function accordionMenu(e){

    var accordionDt = $(e).children('dt'),
        accordionToggle = accordionDt.children('.toggle'),
        accordionDd = accordionDt.next('dd');

        accordionDd.hide();

        accordionToggle.click(function(){
            accordionToggle.removeClass("on");
            accordionDd.slideUp(300);
            if(!$(this).parents('dt').next("dd").is(":visible"))
            {
                $(this).addClass("on");
                $(this).parents('dt').next("dd").slideDown(300);
            }else{
                accordionToggle.removeClass("on");
            }
        })
}

// sitemap 메뉴
function sitemapFunc(){
    var button = $('.site-area button'),
        menu = $(".site-area ul  li");

    button.on('click',function(){
        $(this).next("ul").stop().slideToggle('100');
		$(this).toggleClass("on")
		return false;
    });

    menu.click(function() {
		$(this).parent().hide().parent(".site-area").children("button").text($(this).text());
		$(this).prependTo($(this).parent());
		button.toggleClass("on");
	});

}

function headerSearch(){
    $('.etc-search2').on('click',function(){
        $(this).toggleClass('on');
        $('.header-search').toggleClass('on');
    });
}

function topBtnFunc(){
    $(".top-btn").hide();

    $(window).on("scroll touchmove mousewheel DOMMouseScroll", function(e) {
        if($(window).scrollTop() >= 20) $(".top-btn").fadeIn();
            else $(".top-btn").fadeOut();
        });
        $(".top-btn").click(function(){
        $("html,body").animate({ scrollTop: 0 }, "2000");
    });
}

function showExternalLoading(){
	$(".loading_external").css("display", "flex");
}
function hideExternalLoading(){
	$(".loading_external").css("display", "none");
}

window.addEventListener('load', function() {
    var circleWrap = document.querySelector('.circle_wrap');
    var appIntroPc = document.querySelectorAll('.app_intro_pc');

    if (circleWrap && appIntroPc.length > 0) {
        appIntroPc.forEach(function(appIntroPc) {
            appIntroPc.classList.add('new-class');
        });
    }
});