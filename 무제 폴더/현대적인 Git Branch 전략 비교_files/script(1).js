(function($) {

	function gnb(){
		$("#header").on("click", ".mobile-menu", function(){
			if ( $(this).hasClass("on") ){
				$(this).removeClass("on");
				$("#gnb").removeClass("on");
				$("#dimmed").remove();
			} else {
				$(this).addClass("on");
				$("#gnb").addClass("on");
				$("body").append('<div id="dimmed" />').on("click", "#dimmed", function(){
					$(".mobile-menu").click();
				});
			}
		});

		$(window).resize(function(){
			if ( $("#gnb").css("position") == "relative" ){
				if ( $("#dimmed").is(":visible") ){
					$("#dimmed").remove();
				}
				if ( $(".mobile-menu").hasClass("on") ){
					$(".mobile-menu").click();
				}
			}
		});
	}

	function coverSlider(){
		var $slider = $(".cover-slider");

		$slider.each(function(){
			var $this = $(this),
				$sliderItem = $(this).find("li"),
				itemLength = $sliderItem.length,
				num = 0;

			if ( itemLength > 1 ){
				$this.prepend('<button type="button" class="prev">이전</button><button type="button" class="next">다음</button>');
				if ( !$this.find("paging").length ){
					$this.append('<div class="paging"></div>');
					$sliderItem.each(function(i){
						$this.find(".paging").append('<button type="button">'+(i+1)+'</button>');
					});
					$this.find(".paging button:first").addClass("current");
					$this.on("click", ".paging button", function(){
						if ( $(this).index() > num ){
							$sliderItem.eq(num).animate({ left: "-100%" }, 500 ).siblings().css("left","100%");
						} else if ( $(this).index() < num ){
							$sliderItem.eq(num).animate({ left: "100%" }, 500 ).siblings().css("left","-100%");
						}
						num = $(this).index();
						slideMove()
						$(this).addClass("current").siblings().removeClass("current");
					});
				}
				$sliderItem.css({
					"position": "absolute",
					"top": 0,
				});
				$sliderItem.eq(num).siblings().css("left","100%");

				$this.on("click", ".prev", function(){
					if ( !$sliderItem.eq(num).is(":animated") ){
						$sliderItem.eq(num).animate({ left: "100%" }, 500 ).siblings().css("left","-100%");
						num = num-1 < 0 ? $sliderItem.length-1 : num-1;
						slideMove();
					}
				});

				$this.on("click", ".next", function(){
					if ( !$sliderItem.eq(num).is(":animated") ){
						$sliderItem.eq(num).animate({ left: "-100%" }, 500 ).siblings().css("left","100%");
						num = num+1 >= $sliderItem.length ? 0 : num+1;
						slideMove();
					}
				});

				function slideMove(index){
					$sliderItem.eq(num).animate({ left: "0" }, 500 );
					$(".cover-slider .paging button").eq(num).addClass("current").siblings().removeClass("current");
				}

				$this.on("touchstart", function(){
					var touch = event.touches[0];
					touchstartX = touch.clientX,
					touchstartY = touch.clientY;
				});

				$this.on("touchend", function(){
					if( event.touches.length == 0 ){
						var touch = event.changedTouches[event.changedTouches.length - 1];
						touchendX = touch.clientX,
						touchendY = touch.clientY,
						touchoffsetX = touchendX - touchstartX,
						touchoffsetY = touchendY - touchstartY;

						if ( Math.abs(touchoffsetX) > 10 && Math.abs(touchoffsetY) <= 100 ){
							if (touchoffsetX < 0 ){
								$this.find(".next").click();
							} else {
								$this.find(".prev").click();
							}
						}
					}
				});
			}
		});
	}

	function getCookie(name){
		name = new RegExp(name + '=([^;]*)');
		return name.test(document.cookie) ? unescape(RegExp.$1) : '';
	}

	function postListType(){
		var cookie = document.cookie;

		if ( !getCookie('post-type') && !$("body").hasClass("post-type-thumbnail") ){
			$(".post-header .list-type .list").addClass("current");
		}

		if ( $("body").hasClass("post-type-thumbnail") ){
			$(".post-header .list-type .thum").addClass("current").siblings().removeClass("current");
		} else {
			$(".post-header .list-type .list").addClass("current").siblings().removeClass("current");
		}

		$(".post-header .list-type").on("click", "button", function(){
			if ( $(this).hasClass("list") ){
				$("body").addClass("post-type-text");
				$("body").removeClass("post-type-thumbnail");
				$(this).addClass("current").siblings().removeClass("current");
				document.cookie = "post-type=list; path=/; expires=0;"
			} else {
				$("body").addClass("post-type-thumbnail");
				$("body").removeClass("post-type-text");
				document.cookie = "post-type=thumbnail; path=/; expires=0;"
				$(this).addClass("current").siblings().removeClass("current");
			}
		});

		if ( getCookie('post-type') ){
			if ( getCookie('post-type') == 'thumbnail' ){
				$(".post-header .list-type .thum").click();
			} else if ( getCookie('post-type') == 'list' ){
				$(".post-header .list-type .list").click();
			}
		}
	}

	function viewMore(){
		if ( $(".paging-view-more").length && $(".post-item").length ){
			viewMoreShow();
		}

		function viewMoreShow(){
			var nextUrl = $(".pagination .next").attr("href");
			$(".pagination a").hide();
			if( nextUrl ){
				$(".pagination").append('<a href="'+nextUrl+'" class="view-more">목록 더보기</a>');
				$(".pagination .view-more").on("click", function(){
					viewMore(nextUrl);
					return false;
				});
			}
		}

		function viewMore(url){
			$.ajax({
				url: url
			}).done(function (res) {
				var $res = $(res),
						$nextPostItem = $res.find(".post-item"),
						$paginationInner = $res.find(".pagination").html();
				if ( $nextPostItem.length > 0 ){
					$("#content .inner").append($nextPostItem);
					$(".pagination").html($paginationInner);
					viewMoreShow();
				} else {
					$(".pagination").remove();
				}
			});
		}
	}

	function mobileTable(){
		var $table = $(".entry-content table");

		if( $table.length > 0 ){
			$table.each(function(){
				if ( $(this).css("table-layout") == "fixed" && !$(this).parent().hasClass("table-wrap") ){
					$(this).wrap('<div class="table-wrap"></div>');
				}
			});
		}
	}

	// Execute
	gnb();
	if ( $(".cover-slider").length ) coverSlider();
	if ( $(".post-header .list-type").length ) postListType();
	if ( $(".paging-view-more").length && $(".post-item").length ) viewMore();
	if ( $(".entry-content").length ){
		mobileTable();
	}

})(jQuery);
