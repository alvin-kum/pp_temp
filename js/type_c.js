(function($){
	var para_c = (function(){
		// var el, dcmH, timer, currentIdx, wheelOverap, tl01, tl_motion01, tl02, tl03, tl04, tl05;
		var scene1, scene2
		function init(){

			scene1 = $('.screen1');
			scene2 = $('.screen2');

			TweenMax.set(scene1.find('.ui_txt'), {opacity:0, marginTop:-50});
			TweenMax.set(scene1.find('.ui_clop'), {position:'absolute',  x:670, opacity:0});
			TweenMax.set(scene2.find('.ui_clop'), {position:'absolute', x:1400, display:'block', opacity:0});
			TweenMax.set(scene2.find('.ui_txt'), {display:'block', opacity:0, marginTop:-50});
			backClopMotion();
			openingMov();
			// bindEvents();
		}

		function openingMov(){
			TweenMax.to(scene1.find('.ui_txt'), 0.7, {opacity:1, marginTop:0});
			TweenMax.to(scene1.find('.ui_clop'), 1, {position:'absolute', opacity:1});

			setTimeout(function(){
				TweenMax.to(scene1.find('.ui_clop'), 1,{x:-474, ease: Power2.easeOut});
				TweenMax.set(scene1.find('.ui_vis') , {display:'block', opacity:0, left:1000});
				TweenMax.to(scene1.find('.ui_vis'), 1,{opacity:1, left:576});
				TweenMax.to(scene2.find('.ui_clop'), 1,{x:1300, opacity:1, ease: Power2.easeOut, onComplete: function(){
					 bindEvents();
				}});
			},2000)
		}

		function bindEvents(){
			$('.obj_wrap').find('img').attr('data-bind')

			$('.btn_r').on('click', function(e){
				e.preventDefault();
				//배경 체인지
				$('.obj_wrap').find('img').each(function(){
					$(this).attr('src',$(this).attr('src').replace('objbl','objorg'))
				})
				$('.cont').css({background:'url(../images/c/bg_org.jpg)'});

				TweenMax.set(scene2.find('.ui_clop_pink'), {position:'absolute', x:1400, display:'block', opacity:0});
				TweenMax.to(scene1.find('.ui_txt'), 0.7, {opacity:0, marginTop:-50, onComplete: function(){
					// scene1.find('.ui_txt').hide();
					TweenMax.to(scene2.find('.ui_txt'), 0.7, {opacity:1, marginTop:0});
				}});
				TweenMax.to(scene1.find('.ui_vis'), 1,{opacity:0, left:0});
				TweenMax.to(scene1.find('.ui_clop'), 1,{x:-625, ease: Power2.easeOut});

				TweenMax.to(scene2.find('.ui_clop'), 1, {position:'absolute',  x:670});

				TweenMax.to($('.bn_wrap').eq(0), 1, {opacity:0});
				TweenMax.to($('.bn_wrap').eq(1), 1, {opacity:1});
				setTimeout(function(){
					TweenMax.to(scene2.find('.ui_clop'), 1,{x:-484, ease: Power2.easeOut});
					TweenMax.set(scene2.find('.ui_vis') , {display:'block', opacity:0, left:1000});
					TweenMax.to(scene2.find('.ui_vis'), 1,{opacity:1, left:576});
					TweenMax.to(scene2.find('.ui_clop_pink'), 1,{x:1300, opacity:1, ease: Power2.easeOut, onComplete: function(){
						 bindEvents();
						 $('.btn_r').off('click')
					}});
				},2000)
			})

			$('.btn_l').on('click', function(e){
				e.preventDefault();
				$('.obj_wrap').find('img').each(function(){
					$(this).attr('src',$(this).attr('src').replace('objorg','objbl'));
				})
				$('.cont').css({background:'url(../../images/c/bg_bl.jpg)'});

				TweenMax.to(scene2.find('.ui_txt'), 0.7, {opacity:0, marginTop:-50, onComplete: function(){
					// scene1.find('.ui_txt').hide();
					TweenMax.to(scene1.find('.ui_txt'), 0.7, {opacity:1, marginTop:0});
				}});
				TweenMax.to(scene2.find('.ui_vis'), 1,{opacity:0, left:0});
				TweenMax.to(scene2.find('.ui_clop'), 1,{x:-625, ease: Power2.easeOut});
				TweenMax.set(scene1.find('.ui_clop'), {position:'absolute',  x:670, opacity:0});
				TweenMax.to(scene1.find('.ui_clop'), 1, {position:'absolute', opacity:1});
				TweenMax.to(scene2.find('.ui_clop_pink'), 1,{x:1400, opacity:0});

				TweenMax.to($('.bn_wrap').eq(0), 1, {opacity:1});
				TweenMax.to($('.bn_wrap').eq(1), 1, {opacity:0});

				setTimeout(function(){
					TweenMax.to(scene1.find('.ui_clop'), 1,{x:-474, ease: Power2.easeOut});
					TweenMax.set(scene1.find('.ui_vis') , {display:'block', opacity:0, left:1000});
					TweenMax.to(scene1.find('.ui_vis'), 1,{opacity:1, left:576});
					TweenMax.set(scene2.find('.ui_clop'), {position:'absolute', x:1400, display:'block'});
					TweenMax.to(scene2.find('.ui_clop'), 1,{x:1300, opacity:1, ease: Power2.easeOut, onComplete: function(){
						 bindEvents();
						 $('.btn_l').off('click')
						  // $('.btn_r').on('click')
					}});
				},2000)
			})


		}

		function backClopMotion(){
			TweenMax.to('.obj_wrap > img:eq(0)', 1.5, {y: 20, repeat: -1, yoyo: true, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(1)', 1.7, {x: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(2)', 1.7, {y: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(3)', 1.8, {y: 20, repeat: -1, yoyo: true, delay:0.4, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(4)', 1.2, {y: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(5)', 1.3, {x: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(6)', 1.5, {y: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(7)', 1.5, {y: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(8)', 1.3, {x: 20, repeat: -1, yoyo: true, delay:0.4, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(9)', 1, {y: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(10)', 1.7, {y: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(11)', 1.5, {x: 20, repeat: -1, yoyo: true, delay:0.4, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(12)', 1.6, {y: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(13)', 1.8, {x: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(14)', 1.3, {y: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(15)', 1.5, {x: 20, repeat: -1, yoyo: true, delay:0.4, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(16)', 1.7, {y: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(17)', 1.5, {x: 20, repeat: -1, yoyo: true, delay:0.3, ease: Power0.easeIn});
			TweenMax.to('.obj_wrap > img:eq(18)', 1.5, {y: 20, repeat: -1, yoyo: true, delay:0.2, ease: Power0.easeIn});
			// $(window).on('scroll', function(e){
			// 	e.preventDefault();

			// 	var sc = $(window).scrollTop();
			// 	if(sc == 1000){
			// 		// TweenMax.to($('.header').eq(1), 1,{top:0});
			// 	}else if(sc < 1000){
			// 		// TweenMax.to($('.header').eq(1), 1,{top:120});
			// 	}
			// })
			TweenMax.set('.cont_wrap1', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap1 .tit', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap2', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap2 .tit', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap3', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap3 .tit', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap4', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap4 .tit', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap5', {y: 50, autoAlpha: 0});
			TweenMax.set('.cont_wrap5 .tit', {y: 50, autoAlpha: 0});

			$(window).on('scroll', function(e){
					var st = $(window).scrollTop();

					if(getElScrollTop('.cont_wrap1, .cont_wrap2, .cont_wrap3')){
						// TweenMax.set('.cont_wrap1', {y: 50, autoAlpha: 0});
						// TweenMax.set('.cont_wrap1 .tit', {y: 50, autoAlpha: 0});
						TweenMax.to('.cont_wrap1', 1, { y: 0, autoAlpha: 1});
						TweenMax.to('.cont_wrap1 .tit', 1, {delay: 0.1, y: 0, autoAlpha: 1});

						TweenMax.to('.cont_wrap2', 1, {delay: 0.2, y: 0, autoAlpha: 1});
						TweenMax.to('.cont_wrap2 .tit', 1, {delay: 0.3, y: 0, autoAlpha: 1});

						TweenMax.to('.cont_wrap3', 1, {delay: 0.3, y: 0, autoAlpha: 1});
						TweenMax.to('.cont_wrap3 .tit', 1, {delay: 0.4, y: 0, autoAlpha: 1});
					}else if(getElScrollTop(' .cont_wrap4, .cont_wrap5')){

						TweenMax.to('.cont_wrap4', 1, {y: 0, autoAlpha: 1});
						TweenMax.to('.cont_wrap4 .tit', 1, {delay: 0.1, y: 0, autoAlpha: 1});

						TweenMax.to('.cont_wrap5', 1, {delay: 0.2, y: 0, autoAlpha: 1});
						TweenMax.to('.cont_wrap5 .tit', 1, {delay: 0.3, y: 0, autoAlpha: 1});
					}
				});
		}

		function getElScrollTop(el){
			var st = $(window).scrollTop();
			if(st >= $(el).offset().top - (window.innerHeight/3*2) && !$(el).hasClass('scroll_on')){
				$(el).addClass('scroll_on');

				return true;
			}else{
				return false;
			}
		}

		return{
			init : init
		}
	})();

	$(function(){
		para_c.init();
	})
})(jQuery);