
function scene0_b() {
	return new TimelineMax()
		.to('.scroll', .5, {autoAlpha:0}, 0)
		.to('.visboxtop', 1.25, {y:-850, autoAlpha:.3, ease:Power1.easeIn}, 0)
		.to('.whitetitle', 1.25, {y:850, ease:Power1.easeIn}, 0)
		.fromTo('.pattern', .8, {autoAlpha:0}, {autoAlpha:1}, 1)
		.fromTo('.blacktxt', .9, {autoAlpha:0, y:6}, {autoAlpha:1, y:0}, .5)
		//.fromTo('#footer', .3, {autoAlpha:1}, {autoAlpha:0}, 0)
		//.fromTo('#footer', .7, {autoAlpha:0}, {autoAlpha:1}, .4)
		.fromTo('.visboxtop2', .6, {y:0}, {y:-40}, .9)
		//.to('.visual.v1', .9, {scale:0.9}, 0)
}
function scene1_a() {
	return new TimelineMax()
		.to('.blacktitle', .9, {y:-50, opacity:0,  ease:Power1.easeIn}, .3)
		.to('.blacktxt', .9, {y:-25,  opacity:0, ease:Power1.easeIn}, .2)
		.to('.pattern', 1.4,  {autoAlpha:0}, .2)
		.to('.imgbox, .v2, .dimm', 1.8, {width:1400, ease:Power2.easeInOut}, .1)
		.to('.visboxtop2', 1.8, {y:-750, ease:Power2.easeInOut}, .0)
		.to('.imgbox', 1, {y:0}, .1)
		.to('.dimm', 1.4, {opacity:0.5, ease:Power2.easeOut}, 1.4)
		.staggerFromTo('.s3_head, .s3_point, .s3_title, .s3_content', .7, {opacity:0, y:6}, {opacity:1, y:0, ease:Power1.easeOut}, .38, 1.6)
}
function scene2_a() {
	return new TimelineMax()
		.set('.visboxbottom2', {display: 'block'}, .01)
		.to('.visboxtop2', 1.25, {y:"-=850", autoAlpha:.3, ease:Power1.easeIn}, 0)
		.to('.s3_head, .s3_point, .s3_title, .s3_content', 1.25, {y:850, ease:Power1.easeIn}, 0)
		.fromTo('.pattern', .9, {autoAlpha:0}, {autoAlpha:1}, 1.1)
		.fromTo('.s4_img', .8, {autoAlpha:0, y:25}, {autoAlpha:1, y:0, ease:Power1.easeOut}, .55)
		.fromTo('.s4_content', .7, {autoAlpha:0, y:15}, {autoAlpha:1, y:0, ease:Power1.easeOut}, .65)
		.fromTo('.s4_title', .7, {autoAlpha:0, y:10}, {autoAlpha:1, y:0, ease:Power1.easeOut}, .9)
		.fromTo('.s4_point, .s4_head', .7, {autoAlpha:0, y:5}, {autoAlpha:1, y:0, ease:Power1.easeOut}, .95)
		.fromTo('.gallery', .6, {y:655, scale:0.74285, opacity:1}, {y:611, opacity:1}, 1.6)
	//.to('.visual.v1', .9, {scale:0.9}, 0)
}
function scene3_a() {
	return new TimelineMax()
		.to('', 2.5, {})
		.to('.gallery', 1.8, {y:0, ease:Power2.easeInOut}, 0.01)
		.fromTo('.gallery', 1.8, {scale:0.74285}, {scale:1, ease:Power2.easeInOut}, 0.11)
		.to('.s4_img', .9, {autoAlpha:0, y:-30, ease:Power1.easeIn}, .1)
		.to('.s4_content', .9, {autoAlpha:0, y:-25, ease:Power1.easeIn}, .1)
		.to('.s4_title', .9, {autoAlpha:0, y:-40, ease:Power1.easeIn}, .3)
		.to('.s4_point, .s4_head', .9, {autoAlpha:0, y:-45, ease:Power1.easeIn}, .4)
		.to('.pattern', 1.7, {autoAlpha:0}, .1)
		.to('.gdimm', 1.6, {opacity:0.75}, 0.15, 0)
		.addCallback(function () {
			$('.gallery .gimg').off('mouseover').off('mouseout');
		}, 1.5)
		.staggerTo(['.gdimm:eq(0)', '.gdimm:eq(3)', '.gdimm:eq(13)'
			, '.gdimm:eq(7)', '.gdimm:eq(11)'], .9, {opacity:0, ease:Power2.easeInOut}, 0.055, 1.9)
		.staggerTo(['.gdimm:eq(2)'
			, '.gdimm:eq(14)', '.gdimm:eq(1)', '.gdimm:eq(9)'
			, '.gdimm:eq(8)'], .9, {opacity:0, ease:Power2.easeInOut}, 0.055, 2.6)
		.staggerTo(['.gdimm:eq(12)', '.gdimm:eq(5)'
			, '.gdimm:eq(4)', '.gdimm:eq(10)', '.gdimm:eq(6)'], .9, {opacity:0, ease:Power2.easeInOut}, 0.055, 3.4)
		.addCallback(function () {
			$('.gallery .gimg').on('mouseover', function () {
				TweenMax.to(this, .6, {borderWidth:15});
				TweenMax.to($(this).find('.gdimm'), .6, {opacity:0.25});
				TweenMax.to($(this).find('.gheadset'), .6, {opacity:1, x:15, y:-15});
				TweenMax.to($(this).find('.simg'), .8, {scale:1.35});
			}).on('mouseout', function () {
				TweenMax.to(this, .6, {borderWidth:0});
				TweenMax.to($(this).find('.gdimm'), .6, {opacity:0});
				TweenMax.to($(this).find('.gheadset'), .6, {opacity:0, x:0, y:0});
				TweenMax.to($(this).find('.simg'), .8, {scale:1});
			});
		}, 4)
}
$(document).ready(function () {
	var scroll = TweenMax.to('.scroll', 1.2, {y:6, yoyo:true, repeat:-1});
	var gtl = new TimelineMax({paused:true})
		.to('.viewer', 1.4, {autoAlpha:1, ease:Power2.easeOut}, 0)
		.fromTo('.pin:eq(0)', 1.5, {autoAlpha:0}, {autoAlpha:1, ease:Power2.easeIn} ,.6)
		.fromTo('.gbtn', .9, {opacity:0}, {opacity:1}, 2.5)
		.fromTo('.gray_first', 1, {x:-101}, {x:0, ease:Power2.easeInOut}, 3.5)
		.fromTo('.gray_last', 1, {x:101}, {x:0, ease:Power2.easeInOut}, 3.5);

	var footmenu = new TimelineMax({paused:true})
		.fromTo('.footmenu', 1.2, {y:750, autoAlpha:0}, {y:0, autoAlpha:1, ease:Power2.easeInOut}, 0)
		.fromTo('.foot_open_bg', 9, {autoAlpha:0, filter:'blur(20px)'}, {autoAlpha:0.23, filter:'blur(0)'}, .5)
		.fromTo('.foot_open_head', .9, {autoAlpha:0, y:10}, {autoAlpha:1, y:0}, 1)
		.fromTo('.foot_open_cont', 1.3, {autoAlpha:0, y:40}, {autoAlpha:1, y:0, ease:Power1.easeInOut}, 1.2);
	$('#footer').on('click', function () {
		footmenu.timeScale(1)
		footmenu.play();
	});
	$('.x').on('click', function () {
		//footmenu.timeScale(1.5)
		footmenu.seek(1.5)
		footmenu.tweenTo(0, {ease:Power1.easeOut});
	})
	$('.visboxtop .upcomming').on('click', function () {
		TweenMax.to('.visboxtop, .vis2', 1.5, {x:-1400, ease:Power2.easeInOut})
	})
	$('.vis2 .current').on('click', function () {
		TweenMax.to('.visboxtop, .vis2', 1.5, {x:0, ease:Power2.easeInOut})
	})

	$(".gbtn").on('click', function () {
		TweenMax.to('.youtube', .2, {delay:0.3, opacity:1})
	})

	$('.gimg:eq(1)').on('click', function () {
		gtl.play();
	})

	var tl = new TimelineMax({paused:true})
		.addLabel('scene0')
		.add(scene0_b())
		.addLabel('scene1')
		.add(scene1_a())
		.addLabel('scene2')
		.add(scene2_a())
		.addLabel('scene3')
		.add(scene3_a())
		.addLabel('scene4')

	var wheelFn = (function () {
		var bi = 0;
		var ai = 0;
		var max = 4;
		return function (e) {
			var direction = -(e.deltaY / Math.abs(e.deltaY));
			var opt = {};

			ai = bi + direction;

			// 예외
			if( tl.isActive() || ai < 0 || ai > max) { return }


			// timeScale Set
			if(ai > bi) { tl.timeScale(1.1); }
			else { tl.timeScale(1.25); opt = {ease:Power1.easeOut}}

			// Start Label
			tl.seek('scene' + bi);

			// reverse animation skip
			if(bi === 2 && ai === 1){
				tl.seek('scene' + bi + '-=1.1')
			}
			if(bi === 4 && ai === 3){
				tl.seek('scene' + bi + '-=1.7')
			}

			// Play
			tl.tweenTo('scene' + ai, opt);

			console.log(bi, ai)
			bi = ai;

		}
	})();
	$('#wrap').on('mousewheel.mainevent', wheelFn);
});