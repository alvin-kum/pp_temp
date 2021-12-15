var type_b = function () {
	// var $globalDimm = $('.globaldimm');
	// var index = 9999;
	// var interval = window.setInterval(function () {
	// 	$(".next").eq(0).trigger('click');
	// }, 2500);

	// var $lis = $('.visual_b ul li');

	// var lock = false;
	TweenMax.set($('.pos_current .txt01'), {display:'none', x:-50, autoAlpha:0});
	TweenMax.set($('.pos_current .txt02'), {display:'none', x:-50, autoAlpha:0});
	TweenMax.set($('.pos_current .txt03'), {display:'none', autoAlpha:0});

	TweenMax.set($('.pos_upcomming .txt01'), {display:'none', x:-50, autoAlpha:0});
	TweenMax.set($('.pos_upcomming .txt02'), {display:'none', x:-50, autoAlpha:0});
	TweenMax.set($('.pos_upcomming .txt03'), {display:'none', autoAlpha:0});

	TweenMax.set($('.white'), {display:'block', autoAlpha:1});
	TweenMax.set($('.black'), {display:'none', autoAlpha:0});

	var visual = function () {
		var $paging = $('.pos_page');
		var $prev = $paging.find('.past');
		var $next = $paging.find('.upcomming');

		TweenMax.to($('.pos_current .txt01'), 1, {display:'block', x:0, autoAlpha:1});
		TweenMax.to($('.pos_current .txt02'), 1, {delay:.35, display:'block', x:0, autoAlpha:1});
		TweenMax.to($('.pos_current .txt03'), 1, {delay:.75, display:'block', autoAlpha:1});

		$paging.on('click', '.upcomming', function(e){
			e.preventDefault();

			TweenMax.to($('.pos_current'),.75,{scale:.8, onUpdate:function () {
				TweenMax.to($('.pos_current .txt01'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_current .txt02'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_current .txt03'), .5, {autoAlpha:0});

				TweenMax.set($('.pos_current .img'), {webkitFilter:'blur(' + this.progress() * 3 + ')'});
			}, scale:0.8})
			TweenMax.to($('.pos_upcomming'),.75,{scale:.8, onUpdate:function () {
				TweenMax.set($('.pos_upcomming .img'), {webkitFilter:'blur(' + this.progress() * 3 + ')'});
			}, scale:0.8, onComplete: function(){
				TweenMax.to($('.wrap_01 .visual'),.6,{left:-1400, onComplete: function(){
					$paging.find('.upcomming img').attr('src',$paging.find('.upcomming img').attr('src').replace('upcommin','current'))
					$paging.find('.upcomming').removeClass('upcomming').addClass('current');
					$('.wrap_02 .visual').removeAttr('style');
					TweenMax.to($('.pos_upcomming'),.75,{scale:1, onUpdate:function () {
						TweenMax.set($('.pos_upcomming .img'), {webkitFilter:'blur(' + this.progress() * 0 + ')'});
					}, scale:1, onComplete:function(){
						TweenMax.to($('.pos_upcomming .txt01'), 1, {display:'block', x:0, autoAlpha:1});
						TweenMax.to($('.pos_upcomming .txt02'), 1, {delay:.35, display:'block', x:0, autoAlpha:1});
						TweenMax.to($('.pos_upcomming .txt03'), 1, {delay:.75, display:'block', autoAlpha:1});
					}})
				}})
			}})
		})

		$paging.on('click', '.current', function(e){
			e.preventDefault();
			TweenMax.to($('.pos_upcomming'),.75,{scale:.8, onUpdate:function () {
				TweenMax.to($('.pos_upcomming .txt01'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_upcomming .txt02'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_upcomming .txt03'), .5, {autoAlpha:0});

				TweenMax.set($('.pos_upcomming .img'), {webkitFilter:'blur(' + this.progress() * 3 + ')'});
			}, scale:0.8})
			TweenMax.to($('.pos_current'),.75,{scale:.8, onUpdate:function () {
				TweenMax.set($('.pos_current .img'), {webkitFilter:'blur(' + this.progress() * 3 + ')'});
			}, scale:0.8, onComplete: function(){
				TweenMax.to($('.wrap_01 .visual'),.6,{left:0, onComplete: function(){
					$paging.find('.current img').attr('src',$paging.find('.current img').attr('src').replace('current','upcommin'));
					$paging.find('.current').removeClass('current').addClass('upcomming');
					$('.wrap_01 .visual').removeAttr('style');
					TweenMax.to($('.pos_current'),.75,{scale:1, onUpdate:function () {
						TweenMax.set($('.pos_current .img'), {webkitFilter:'blur(' + this.progress() * 0 + ')'});
					}, scale:1, onComplete:function(){
						TweenMax.to($('.pos_current .txt01'), 1, {display:'block', x:0, autoAlpha:1});
						TweenMax.to($('.pos_current .txt02'), 1, {delay:.35, display:'block', x:0, autoAlpha:1});
						TweenMax.to($('.pos_current .txt03'), 1, {delay:.75, display:'block', autoAlpha:1});
					}})
				}})
			}})
		})
		TweenMax.set($('.pos_current .img'), {webkitFilter:'blur(' + 0 + ')'});
		TweenMax.set($('.pos_upcomming .img'), {webkitFilter:'blur(' + 0 + ')'});
	};

	var gnb = function () {
		var $gnb_btn = $(".ui_gnb_w");
		var $gnb = $('.ui_gnb');
		TweenMax.set($gnb,  {autoAlpha:0});
		$gnb.hide();

		var tl = new TimelineMax({paused:true})
				.to($gnb_btn.find('.before'), .5, {top:20}, 0)
				.to($('.ui_gnb_w .d_hamburger'), .5, {autoAlpha:0}, 0)
				.to($gnb_btn.find('.after'), .5, {bottom:20}, 0)
				.to($gnb_btn.find('.before'), .5, {transform: 'rotate(-45deg)', background: '#000'}, .5)
				.to($gnb_btn.find('.after'), .5, {transform: 'rotate(45deg)', background: '#000'}, .5)
				.to($gnb, 1, {display:'block', autoAlpha:1}, .7)
				.to($gnb_btn, 1, {display:'none', autoAlpha:0}, .5)

		$gnb_btn.click(function () {
			tl.play()
			// TweenMax.to($globalDimm, .4, {opacity:0.6});
			// $gnb.fadeIn().click(function () {
			// 	TweenMax.to($globalDimm, .4, {opacity:0});
			// 	$(this).fadeOut();
			// });



			// $gnb.fadeIn();
			$gnb.removeClass('gnb_close').addClass('gnb_open');
		});
		$gnb.on('click', function(e){
			e.preventDefault();
			tl.tweenTo(0, {ease:Power1.easeOut});
			// TweenMax.to($gnb_btn.find('.before'), .5, {top:20});
			// TweenMax.to($('.d_hamburger'), .5, {autoAlpha:0});
			// TweenMax.to($gnb_btn.find('.after'), .5, {bottom:20, onComplete: function(){
			// 	TweenMax.to($gnb_btn.find('.before'), .5, {transform: 'rotate(-45deg)', background: '#000'});
			// 	TweenMax.to($gnb_btn.find('.after'), .5, {transform: 'rotate(45deg)', background: '#000'});
			// 	$gnb.fadeIn(1200);
			// }});
			// $gnb.fadeOut();
			// $gnb.removeClass('gnb_open').addClass('gnb_close');

		})
	};

	var mouseScrollUi = (function(){
		var el;
		var currentIdx = 0,wheeling
		,wheeldelta = {
		  x: 0,
		  y: 0
		},vheight,conNum = 5;

		function init(){
			vheight= $(window).height();

			$('body').css({
				overflowY :'hidden'
			});

			$('#wrap').css({
			     // height: vheight
				overflow :'hidden'
			});

			$('.wrap_01 .visual').css({
			      height: 850,
			     position:'absolute'
			});

			$('#container').css({
			      height: $('#wrap').height()
			      ,overflow :'hidden'
			});

			TweenMax.set($('.wrap_02 .line'),{height:.0});
			TweenMax.set($('.wrap_02 .pos_ttl'),{autoAlpha:0, rotationX:90});
			TweenMax.set($('.wrap_02 .pos_txt01'),{autoAlpha:0, y: 100});
			TweenMax.set($('.wrap_02 .pos_txt02'),{autoAlpha:0, y: 100});
			TweenMax.set($('.wrap_02 .pos_txt03'),{autoAlpha:0});
			TweenMax.set($('.wrap_02 .pos_txt04'),{autoAlpha:0, rotationY:90});
			TweenMax.set($('.wrap_02 .pos_txt05'),{overflow:'hidden', height:0, autoAlpha:0});

			TweenMax.set($('.wrap_03 .img'),{overflow:'hidden', width:.0}); //1400
			TweenMax.set($('.wrap_03 .line'),{width:.0}); //807
			TweenMax.set($('.wrap_03 .pos_ttl'),{autoAlpha:0, rotationX:90});
			TweenMax.set($('.wrap_03 .pos_txt01'),{autoAlpha:0, y: 100});
			TweenMax.set($('.wrap_03 .pos_txt02'),{autoAlpha:0, y: 100});
			TweenMax.set($('.wrap_03 .pos_txt03'),{autoAlpha:0});

			TweenMax.set($('.wrap_04 .pos_ttl'),{autoAlpha:0, rotationX:90});
			TweenMax.set($('.wrap_04 .pos_txt01'),{autoAlpha:0, x: -50});
			TweenMax.set($('.wrap_04 .pos_txt02'),{autoAlpha:0});

			TweenMax.set($('.wrap_05 .pos_ttl'),{autoAlpha:0, rotationX:90});
			TweenMax.set($('.wrap_05 .pos_txt02'),{autoAlpha:0, scale:.8});
			TweenMax.set($('.wrap_05 .pos_txt01'),{autoAlpha:0, y: 100});
			TweenMax.set($('.wrap_05 .pos_txt03'),{autoAlpha:0, x: 50});
			// TweenMax.set($('.wrap_03 .pos_txt03'),{autoAlpha:0});

			TweenMax.set($('.pop01'), {display:'none'});
			TweenMax.set($('.pop01 .visual'), {display:'none'});
			TweenMax.set($('.pop01 .dimm'), {display:'none', autoAlpha:0});
			TweenMax.set($('.pop01 .pop'), {display:'none', autoAlpha:0});

			TweenMax.set($('.pop02'), {display:'none'});
			TweenMax.set($('.pop02 .visual'), {display:'none'});
			TweenMax.set($('.pop02 .pop'), {display:'none', autoAlpha:0});
			TweenMax.set($('.pop02 .pos_txt03'), {display:'none', autoAlpha:0});
			TweenMax.set($('.pop02 .pos_close'), {display:'none', autoAlpha:0});

			// TweenMax.set($('.pop01'), {display:'none'/*, autoAlpha:0*/});
			// TweenMax.set($('.pop02'), {display:'none'/*, autoAlpha:0*/});

			bindEvent();
		}

		function bindEvent(){
			scrEvent();
		}

		var scrolled = false;

		function scrEvent(){

			$('#wrap').on('mousewheel DOMMouseScroll', function (e) {

				if(scrolled){
					return;
				}

				clearTimeout(wheeling);
				wheeling = setTimeout(function() {

					if(wheeldelta.y < 0){
						currentIdx = currentIdx +1
					}else{
						currentIdx = currentIdx -1
					};
					wheeling = undefined;
					goIndex()

					wheeldelta.x = 0;
					wheeldelta.y = 0;
				}, 250);

				wheeldelta.x += e.deltaFactor * e.deltaX;
				wheeldelta.y += e.deltaFactor * e.deltaY;
			});
		}

		function goIndex(){
			if(currentIdx > conNum){
				currentIdx = conNum;

			}else if(currentIdx < 0){
				currentIdx = 0
			}

			playM();
		}

		function playM(){
			var tm = new TimelineMax({paused: true});
			console.log(currentIdx)
			if(currentIdx == 1 && wheeldelta.y < 0){
				$(".hamburger").off('click');
				$('.pos_page').fadeOut();
				TweenMax.to($('.pos_upcomming .txt01'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_upcomming .txt02'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_upcomming .txt03'), .5, {autoAlpha:0});
				TweenMax.to($('.pos_current .txt01'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_current .txt02'), .5, {x:50, autoAlpha:0});
				TweenMax.to($('.pos_current .txt03'), .5, {autoAlpha:0});

				TweenMax.to($('.pos_current'),1,{scale:.85})
				TweenMax.to($('.pos_upcomming'),1,{scale:.85, onComplete: function(){
					$('.pos_num .current img').attr('src', $('.pos_num .current img').attr('src').replace('n01','n02'));
					$('.pos_num .current img').attr('alt', $('.pos_num .current img').attr('alt').replace('01','02'));
					$('.pos_num').css({top:600});
					$('.pos_num .all img').eq(0).attr('src', $('.pos_num .all img').eq(0).attr('src').replace('w.png','b.png'));
					$('.pos_num .all img').eq(1).attr('src', $('.pos_num .all img').eq(1).attr('src').replace('w.png','b.png'));
					TweenMax.to($('.wrap_01 .visual .pos_current .img'), .4, {overflow:'hidden', height:0});
					TweenMax.to($('.wrap_01 .visual .pos_upcomming .img'), .4, {overflow:'hidden', height:0});
					TweenMax.to($('.white'), 1, {display:'none', autoAlpha:0});
					TweenMax.to($('.black'), 1, {display:'block', autoAlpha:1});
					$(".ui_gnb_w").fadeOut();
					TweenMax.to($('.wrap_02'),.7,{y:-850, onComplete: function(){
						// TweenMax.to($('.pos_upcomming'),1,{scale:1})
						TweenMax.to($('.pos_indigator .bar .indi01'), .6, {top: 560/4});
						TweenMax.to($('.wrap_02 .line'), 1, {height:850})
						TweenMax.to($('.wrap_02 .pos_ttl'), 1, {autoAlpha:1, rotationX:0})
						TweenMax.to($('.wrap_02 .pos_txt01'), 1, {autoAlpha:1, y:0})
						TweenMax.to($('.wrap_02 .pos_txt02'), 1, {delay:.2, autoAlpha:1, y:0})
						TweenMax.to($('.wrap_02 .pos_txt03'), 1, {delay:.6, autoAlpha:1})
						TweenMax.to($('.wrap_02 .pos_txt04'), 1, {delay:.6, autoAlpha:1, rotationY:0})
						TweenMax.to($('.wrap_02 .pos_txt05'), 1, {delay:.8, autoAlpha:1,  height:410})
					}})
				}})
			}
			else if(currentIdx == 2 && wheeldelta.y < 0){
				TweenMax.to($('.wrap_02'),1,{scale:.85, onComplete: function(){
					$('.pos_num .current img').attr('src', $('.pos_num .current img').attr('src').replace('n02','n03'));
					$('.pos_num .current img').attr('alt', $('.pos_num .current img').attr('alt').replace('02','03'));
					TweenMax.to($('.wrap_02'), .4, {overflow:'hidden', height:0});
					TweenMax.to($('.wrap_03'),.7,{y:-850, onComplete: function(){
						// TweenMax.to($('.pos_upcomming'),1,{scale:1})
						TweenMax.to($('.pos_indigator .bar .indi01'), .6, {top: 560/3});
						TweenMax.to($('.wrap_03 .img'), .7, {width:1400})
						TweenMax.to($('.wrap_03 .pos_ttl'), 1, {autoAlpha:1, rotationX:0})
						TweenMax.to($('.wrap_03 .line'), .5, {delay:.8, width:807})
						TweenMax.to($('.wrap_03 .pos_txt01'), 1, {delay:1.2,autoAlpha:1, y:0})
						TweenMax.to($('.wrap_03 .pos_txt02'), 1, {delay:1.4, autoAlpha:1, y:0})
						TweenMax.to($('.wrap_03 .pos_txt03'), 1, {delay:1.8, autoAlpha:1})
					}})
				}})
			}
			else if(currentIdx == 3 && wheeldelta.y < 0){
				TweenMax.to($('.wrap_03'),1,{scale:.85, onComplete: function(){
					$('.pos_num .current img').attr('src', $('.pos_num .current img').attr('src').replace('n03','n04'));
					$('.pos_num .current img').attr('alt', $('.pos_num .current img').attr('alt').replace('03','04'));
					TweenMax.to($('.wrap_03'), .4, {overflow:'hidden', height:0});
					TweenMax.to($('.wrap_04'),.7,{y:-850, onComplete: function(){
						TweenMax.to($('.pos_indigator .bar .indi01'), .6, {top: 560/2});
						TweenMax.to($('.wrap_04 .pos_ttl'), 1, {autoAlpha:1, rotationX:0});
						TweenMax.to($('.wrap_04 .pos_txt01'), 1, {delay:.5, autoAlpha:1, x: 0});
						TweenMax.to($('.wrap_04 .pos_txt02'), 1, {delay:.7, autoAlpha:1});


						// TweenMax.to($('.pos_upcomming'),1,{scale:1})
						var swiper = new Swiper('.swiper-container', {
							pagination: '.swiper-pagination',
							slidesPerView: 'auto',
							// slidesOffsetBefore:90,
							slidesOffsetAfter:40,
							nextButton:'',
							prevButton:'',
							grabCursor: true,
							autoslide:true,
							freeMode: true
						});
						TweenMax.set($('.pos_slide ul li .img>img'), {
							immediateRender:true,
							transformPerspective:200, transformStyle:"preserve-3d",
							y:0,
							rotationY:0,
							rotationX: 0,
							boxShadow: "0px 0px 0px rgba(0,0,0,0)"
						});

						$('.pos_slide ul li').on('mouseover mousemove', '.img>img', function(e){
							var wHalf = $(this).width()/2
							var hHalf = $(this).height()/2
							var ratioX = (e.offsetX - wHalf)/wHalf
							var ratioY = (e.offsetY - hHalf)/hHalf

							TweenMax.to($(this), .7, {
								immediateRender:true,
								transformPerspective:200, transformStyle:"preserve-3d",
								y:-30,
								rotationY: -ratioX*5,
								rotationX: ratioY*5,
								boxShadow: "8px 25px 38px rgba(68,68,68,0.6)",
							});
						}).on('mouseout', '.img>img', function(){
							TweenMax.to($(this), 1.5, {
								immediateRender:true,
								transformPerspective:200, transformStyle:"preserve-3d",
								y:0,
								rotationY:0,
								rotationX: 0,
								boxShadow: "0px 0px 0px rgba(0,0,0,0)"
							});
						});

						$('.wrap_04 .pos_txt02 a').on('click', function(e){
							e.preventDefault();

							TweenMax.set($('.pop01'), {display:'block'});
							TweenMax.set($('.pop01 .visual'), {display:'block'});
							TweenMax.to($('.pop01 .dimm'), .5, {display:'block', autoAlpha:.6, onComplete:function(){
								TweenMax.to($('.pop01 .pop'), .5, {display:'block', autoAlpha:1});
							}});
						});

						$('.pos_slide ul li').on('click',' .img', function(e){
							e.preventDefault();
							TweenMax.to($('.wrap_04 .pos_ttl'), 1, {autoAlpha:0});
							TweenMax.to($('.wrap_04 .pos_txt01'), 1, {autoAlpha:0});
							TweenMax.to($('.wrap_04 .pos_txt02'), 1, {autoAlpha:0});
							TweenMax.to($('.wrap_04 .pos_slide'), 1, {autoAlpha:0});

							TweenMax.set($('.pop02'), {display:'block'});
							TweenMax.set($('.pop02 .visual'), {display:'block'});
							TweenMax.to($('.pop02 .pop'), .5, {display:'block', autoAlpha:1});
							TweenMax.to($('.pop02 .pos_txt03'), .5, {display:'block', autoAlpha:1});
							TweenMax.to($('.pop02 .pos_close'), .5, {display:'block', autoAlpha:1});
							// TweenMax.to($('.pop02'), 1, {display:'block'/*, autoAlpha:1*/});
						});

						$('.pop01 .dimm, .pop01 .pop').on('click', function(e){
							e.preventDefault();

							TweenMax.to($('.pop01 .pop'), .5, {display:'none', autoAlpha:0,onComplete:function(){
								TweenMax.to($('.pop01 .dimm'), .5, {display:'none', autoAlpha:0, onComplete: function(){
									TweenMax.set($('.pop01'), {display:'none'});
									TweenMax.set($('.pop01 .visual'), {display:'none'});
								}});
							}});
							// TweenMax.to($('.pop01'), .1, {display:'none'/*, autoAlpha:1*/});
						})

						$('.pop02 .visual').on('click', function(e){
							e.preventDefault();
							TweenMax.set($('.pop02'), {display:'none'});
							TweenMax.set($('.pop02 .visual'), {display:'none'});
							TweenMax.set($('.pop02 .pop'), {display:'none', autoAlpha:0});
							TweenMax.set($('.pop02 .pos_txt03'), {display:'none', autoAlpha:0});
							TweenMax.set($('.pop02 .pos_close'), {display:'none', autoAlpha:0});

							TweenMax.to($('.wrap_04 .pos_ttl'), 1, {autoAlpha:1});
							TweenMax.to($('.wrap_04 .pos_txt01'), 1, {autoAlpha:1});
							TweenMax.to($('.wrap_04 .pos_txt02'), 1, {autoAlpha:1});
							TweenMax.to($('.wrap_04 .pos_slide'), 1, {autoAlpha:1});
							// TweenMax.to($('.pop02'), .1, {display:'none'/*, autoAlpha:1*/});
						})
					}})
				}})
			}
			else if(currentIdx == 4 && wheeldelta.y < 0){
				TweenMax.to($('.wrap_04'),1,{scale:.85, onComplete: function(){
					$('.pos_num .current img').attr('src', $('.pos_num .current img').attr('src').replace('n04','n05'));
					$('.pos_num .current img').attr('alt', $('.pos_num .current img').attr('alt').replace('04','05'));
					TweenMax.to($('.wrap_04'), .4, {overflow:'hidden', height:0});
					TweenMax.to($('.white'), 1, {display:'block', autoAlpha:1});
					TweenMax.to($('.black'), 1, {display:'none', autoAlpha:0});
					$(".ui_gnb_w").fadeIn();
					TweenMax.to($('.wrap_05'),.7,{y:-850, onComplete: function(){
						// TweenMax.to($('.pos_upcomming'),1,{scale:1})
						TweenMax.to($('.pos_indigator .bar .indi01'), .6, {top: 445/1});
						TweenMax.to($('.wrap_05 .pos_ttl'), 1, {autoAlpha:1, rotationX:0});
						TweenMax.to($('.wrap_05 .pos_txt02'), 1, {autoAlpha:1, scale:1});
						TweenMax.to($('.wrap_05 .pos_txt01'), 1, {delay:.5, autoAlpha:1, y: 0});
						TweenMax.to($('.wrap_05 .pos_txt03'), 1, {delay:.7, autoAlpha:1, x: 0});
					}})
				}})
			}
			else if(currentIdx == 5 && wheeldelta.y < 0){
				$('html, body, #wrap, #container').removeAttr('style');
				// TweenMax.to($('.wrap_05'),1,{scale:.85, onComplete: function(){
				// 	TweenMax.to($('.wrap_05'), .4, {overflow:'hidden', height:0});
					TweenMax.to($('.wrap_06'),.5,{y:-850, onComplete: function(){
						// TweenMax.to($('.pos_upcomming'),1,{scale:1})
						// $('html, body').animate({scrollTop: 374},1000)
					}})
				// }})
				$('.wrap_05').on('click', function(e){
					e.preventDefault();
					TweenMax.to($('.wrap_06'),.5,{y:0});
					TweenMax.to($('.wrap_05'), 1, {scale:.85, onComplete: function(){
						TweenMax.to($('.wrap_05'), .4, {overflow:'hidden', height:0});
						TweenMax.to($('.black'), 1, {display:'block', autoAlpha:1});
						TweenMax.to($('.white'), 1, {display:'none', autoAlpha:0});
						TweenMax.to($('.ui_gnb_w'), 1, {display:'none', autoAlpha:0});
						$('.pos_num .current img').attr('src', $('.pos_num .current img').attr('src').replace('n05','n04'));
						$('.pos_num .current img').attr('alt', $('.pos_num .current img').attr('alt').replace('05','04'));
						TweenMax.to($('.wrap_04'),.7,{y:-850, height:850, onComplete: function(){
							TweenMax.to($('.wrap_04'), 1, {scale:1})
							$('body').css({
								overflowY :'hidden'
							});

							$('#wrap').css({
							     // height: vheight
								overflow :'hidden'
							});

							// $('.wrap_01 .visual').css({
							//       height: 850,
							//      position:'absolute'
							// });

							$('#container').css({
							      height: $('#wrap').height()
							      ,overflow :'hidden'
							});
						}})
					}})
					currentIdx = 3
				})
			}

		}

		return {init:init
			,scrEvent:scrEvent
		}
	})();

	visual();
	gnb();
	mouseScrollUi.init();
};

$(document).ready(function () {
	type_b();
});